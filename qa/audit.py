"""Accessibility + responsive audit. axe-core is injected only in a test context that bypasses CSP
(a testing tool, not part of the site); the menu/keyboard tests run with the site's CSP fully enforced.
Needs the local server (qa/serve.py) and axe-core (npm i axe-core in a tools folder)."""
import json, re, sys
from playwright.sync_api import sync_playwright
BASE = 'http://127.0.0.1:4321'
AXE = '/home/claude/qa-tools/node_modules/axe-core/axe.min.js'
PAGES = ['/', '/privacy', '/terms', '/disclaimer', '/404']
res = {'axe': {}, 'overflow': {}, 'targets': {}, 'structure': {}, 'menu': {}, 'keyboard': {}}
with sync_playwright() as p:
    b = p.chromium.launch()
    # ---- axe (WCAG 2.x A/AA + best practices) on every page, desktop and mobile
    for vp_name, vp in {'desktop': {'width': 1440, 'height': 900}, 'mobile': {'width': 390, 'height': 844}}.items():
        ctx = b.new_context(viewport=vp, bypass_csp=True, reduced_motion='reduce'); pg = ctx.new_page()
        for path in PAGES:
            pg.goto(BASE + path, wait_until='networkidle'); pg.add_script_tag(path=AXE)
            r = pg.evaluate("axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}})")
            res['axe'][f'{vp_name} {path}'] = {'violations': [(v['id'], v['impact'], len(v['nodes']), v['help']) for v in r['violations']], 'passes': len(r['passes']), 'incomplete': [(v['id'], len(v['nodes'])) for v in r['incomplete']]}
        ctx.close()
    # ---- overflow at 4 widths, tap targets, structure (CSP enforced)
    for w in (320, 390, 820, 1440):
        ctx = b.new_context(viewport={'width': w, 'height': 900}, reduced_motion='reduce'); pg = ctx.new_page()
        pg.goto(BASE + '/', wait_until='networkidle')
        res['overflow'][w] = pg.evaluate("({sw:document.documentElement.scrollWidth, iw:window.innerWidth})")
        small = pg.evaluate("""() => [...document.querySelectorAll('a,button,summary,[role=button]')].filter(e=>{const r=e.getBoundingClientRect(); const cs=getComputedStyle(e); return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&!e.closest('[hidden]')}).map(e=>{const r=e.getBoundingClientRect(); return {t:(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,32), w:Math.round(r.width), h:Math.round(r.height), inline:!!e.closest('p,li.legal')}}).filter(x=>x.h<44||x.w<44)""")
        res['targets'][w] = {'under44': len(small), 'under24': [s for s in small if s['h'] < 24 or s['w'] < 24][:8], 'sample': small[:6]}
        ctx.close()
    ctx = b.new_context(viewport={'width': 390, 'height': 844}); pg = ctx.new_page(); errs = []
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    pg.goto(BASE + '/', wait_until='networkidle')
    res['structure'] = pg.evaluate("""() => { const hs=[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>+h.tagName[1]); let skips=0; for(let i=1;i<hs.length;i++) if(hs[i]-hs[i-1]>1) skips++;
      const imgs=[...document.images]; const noAlt=imgs.filter(i=>!i.hasAttribute('alt')).length;
      const ids=new Set([...document.querySelectorAll('[id]')].map(e=>e.id)); const bad=[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href').slice(1)).filter(h=>h&&!ids.has(h));
      const ext=[...new Set([...document.querySelectorAll('a[href^="http"]')].map(a=>a.href))]; const badRel=[...document.querySelectorAll('a[target=_blank]')].filter(a=>!/noopener/.test(a.rel)).length;
      return {h1:document.querySelectorAll('h1').length, headingSkips:skips, imagesWithoutAlt:noAlt, brokenAnchors:bad, externalLinks:ext, blankWithoutNoopener:badRel, lang:document.documentElement.lang, title:document.title, desc:(document.querySelector('meta[name=description]')||{}).content.length} }""")
    # mobile menu under the enforced CSP
    btn = pg.locator('[data-menu-toggle]'); menu = pg.locator('#mobile-menu')
    before = menu.is_hidden(); btn.click(); pg.wait_for_timeout(200)
    opened = menu.is_visible() and btn.get_attribute('aria-expanded') == 'true'
    pg.keyboard.press('Escape'); pg.wait_for_timeout(200); closed = menu.is_hidden()
    btn.click(); pg.locator('[data-menu-link]').first.click(); pg.wait_for_timeout(300)
    res['menu'] = {'starts_closed': before, 'opens': opened, 'escape_closes': closed, 'link_closes_and_scrolls': menu.is_hidden() and pg.evaluate('scrollY') > 100, 'csp_errors': errs}
    # keyboard: focus ring visible on the first interactive elements (desktop)
    ctx2 = b.new_context(viewport={'width': 1440, 'height': 900}); k = ctx2.new_page(); k.goto(BASE + '/', wait_until='networkidle'); ring = []
    for _ in range(8):
        k.keyboard.press('Tab'); ring.append(k.evaluate("(()=>{const e=document.activeElement; const cs=getComputedStyle(e); return {el:(e.innerText||e.getAttribute('aria-label')||e.tagName).trim().slice(0,24), outline:cs.outlineStyle+' '+cs.outlineWidth}})()"))
    res['keyboard'] = ring
    b.close()
print(json.dumps(res, indent=1, default=str))
