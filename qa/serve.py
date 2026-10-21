"""Serve ./dist locally and apply the headers from dist/_headers (so the CSP is really tested).
Usage: python3 qa/serve.py [port]"""
import http.server, socketserver, sys, os, re, functools
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4321
ROOT = os.path.join(os.path.dirname(__file__), '..', 'dist')
rules, cur = [], None
for line in open(os.path.join(ROOT, '_headers'), encoding='utf-8'):
    if not line.strip() or line.startswith('#'): continue
    if not line.startswith(' '): cur = {'pat': line.strip(), 'h': {}}; rules.append(cur)
    else:
        k, v = line.strip().split(':', 1); cur['h'][k.strip()] = v.strip()
def match(pat, path):
    return re.fullmatch(re.escape(pat).replace(r'\*', '.*'), path) is not None
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        for r in rules:
            if match(r['pat'], self.path.split('?')[0]):
                for k, v in r['h'].items(): self.send_header(k, v)
        super().end_headers()
    def log_message(self, *a): pass
    def send_error(self, code, message=None, explain=None):
        if code == 404 and os.path.exists(os.path.join(ROOT, '404.html')):
            self.send_response(404); self.send_header('Content-Type', 'text/html'); body = open(os.path.join(ROOT, '404.html'), 'rb').read()
            self.send_header('Content-Length', str(len(body))); self.end_headers(); self.wfile.write(body)
        else: super().send_error(code, message, explain)
class T(socketserver.ThreadingTCPServer): allow_reuse_address = True
with T(('127.0.0.1', PORT), functools.partial(H, directory=ROOT)) as s:
    print('serving', PORT); s.serve_forever()
