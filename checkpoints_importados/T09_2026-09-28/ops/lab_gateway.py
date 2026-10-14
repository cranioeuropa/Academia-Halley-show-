from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
import json, os

ROOT=Path(r"C:\Users\Cranio\MCP_CAIXA\NAVE\ACADEMIA\HALLEY_SHOW_JORNADA_VIVA_BASE\01_WEB_APPDEPLOY_SNAPSHOT\dist")
ROUTES={
    "/nave/treinos": "http://127.0.0.1:8789/api",
    "/nave/evolucao": "http://127.0.0.1:8791/api",
    "/nave/sofia": "http://127.0.0.1:8792/api/sofia",
}
class Handler(SimpleHTTPRequestHandler):
    def translate_path(self,path):
        raw=super().translate_path(path)
        rel=os.path.relpath(raw,os.getcwd())
        return str(ROOT/rel)
    def _proxy(self):
        for prefix,target in ROUTES.items():
            if self.path.startswith(prefix):
                suffix=self.path[len(prefix):]
                url=target+suffix
                body=None
                if self.command in ("POST","PATCH","PUT","DELETE"):
                    n=int(self.headers.get("Content-Length","0") or 0)
                    body=self.rfile.read(n) if n else None
                headers={}
                if self.headers.get("Content-Type"): headers["Content-Type"]=self.headers["Content-Type"]
                req=Request(url,data=body,headers=headers,method=self.command)
                try:
                    with urlopen(req,timeout=8) as resp:
                        data=resp.read()
                        self.send_response(resp.status)
                        self.send_header("Content-Type",resp.headers.get("Content-Type","application/json"))
                        self.send_header("Cache-Control","no-store")
                        self.end_headers()
                        self.wfile.write(data)
                except HTTPError as e:
                    data=e.read()
                    self.send_response(e.code)
                    self.send_header("Content-Type",e.headers.get("Content-Type","application/json"))
                    self.end_headers()
                    self.wfile.write(data)
                except URLError as e:
                    data=json.dumps({"detail":"upstream_unavailable","reason":str(e)}).encode()
                    self.send_response(503); self.send_header("Content-Type","application/json"); self.end_headers(); self.wfile.write(data)
                return True
        return False
    def do_GET(self):
        if self._proxy(): return
        path=self.translate_path(self.path.split("?",1)[0])
        if not Path(path).exists() or Path(path).is_dir():
            self.path="/index.html"
        return super().do_GET()
    def do_POST(self):
        if self._proxy(): return
        self.send_error(404)
    def do_PATCH(self):
        if self._proxy(): return
        self.send_error(404)

if __name__=="__main__":
    os.chdir(ROOT)
    ThreadingHTTPServer(("0.0.0.0",8799),Handler).serve_forever()
