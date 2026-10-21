"""Screenshots + console/CSP error capture. The site's CSP stays fully enforced: nothing is injected.
Full-page shots use the browser's reduced-motion mode (the site's own CSS then shows all content at once).
Needs the local server (qa/serve.py)."""
import json
from playwright.sync_api import sync_playwright
BASE = 'http://127.0.0.1:4321'
VIEWS = {'desktop': {'width': 1440, 'height': 900}, 'tablet': {'width': 820, 'height': 1180}, 'mobile': {'width': 390, 'height': 844}}
out = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    for name, vp in VIEWS.items():
        dsf = 2 if name == 'mobile' else 1
        # 1) normal motion, CSP enforced: record every console message and take the above-the-fold shot
        ctx = b.new_context(viewport=vp, device_scale_factor=dsf)
        pg = ctx.new_page(); msgs = []
        pg.on('console', lambda m, e=msgs: e.append((m.type, m.text)) if m.type in ('error', 'warning') else None)
        pg.on('pageerror', lambda x, e=msgs: e.append(('pageerror', str(x))))
        pg.on('requestfailed', lambda r, e=msgs: e.append(('requestfailed', r.url)))
        pg.goto(BASE + '/', wait_until='networkidle'); pg.wait_for_timeout(700)
        pg.screenshot(path=f'qa/screenshots/{name}-fold.png')
        ctx.close()
        # 2) reduced motion: scroll to load lazy images, then the full page
        ctx = b.new_context(viewport=vp, device_scale_factor=dsf, reduced_motion='reduce')
        pg = ctx.new_page(); pg.goto(BASE + '/', wait_until='networkidle')
        h = pg.evaluate('document.documentElement.scrollHeight')
        for y in range(0, h, 450): pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(110)
        pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(600)
        pg.screenshot(path=f'qa/screenshots/{name}-full.png', full_page=True)
        out[name] = {'page_height': h, 'console_issues': msgs}
        ctx.close()
    b.close()
for k,v in out.items(): print(k, 'height', v['page_height'], '| console issues:', len(v['console_issues']), [m[1][:110] for m in v['console_issues']][:4])
