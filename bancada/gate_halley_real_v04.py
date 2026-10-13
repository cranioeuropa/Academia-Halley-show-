import json,sqlite3,tempfile,time,hmac,hashlib,os
from pathlib import Path
from oficina13.controller import WorkshopController
ROOT=Path(__file__).resolve().parent
def token(tenant,key): return hmac.new(key,tenant.encode(),hashlib.sha256).hexdigest()
def append(db,tenant,auth,key,subject,body):
    if not hmac.compare_digest(auth,token(tenant,key)): raise PermissionError("AUTH_DENIED")
    with sqlite3.connect(db) as conn:
        conn.execute("INSERT INTO events(tenant,subject,body) VALUES(?,?,?)",(tenant,subject,body))
def read(db,tenant,auth,key):
    if not hmac.compare_digest(auth,token(tenant,key)): raise PermissionError("AUTH_DENIED")
    with sqlite3.connect(db) as conn: return conn.execute("SELECT subject,body FROM events WHERE tenant=?",(tenant,)).fetchall()
def run():
    t=time.perf_counter(); key=os.urandom(32)
    with tempfile.TemporaryDirectory(prefix="halley_gate_") as d:
        base=Path(d)
        import shutil
        for name in ("config",): shutil.copytree(ROOT/name,base/name)
        controller=WorkshopController(base)
        outputs=[]
        for ident,nome in [("HALLEY_A","Halley Sintetica A"),("HALLEY_B","Halley Sintetica B")]:
            mission=json.loads((ROOT/"examples/academia_movimento_vivo.json").read_text())
            mission.update(id=ident,nome=nome,autorizado_por="OPERADOR_SINTETICO")
            outputs.append(controller.fabricate_payload(mission))
        assert all(o["estado_tecnico"]=="PROVADA_EM_LAB" and not o["homologada"] and not o["ativacao_externa"] for o in outputs)
        db=base/"events.sqlite"
        with sqlite3.connect(db) as conn: conn.execute("CREATE TABLE events(tenant TEXT NOT NULL,subject TEXT NOT NULL,body TEXT NOT NULL)")
        for ten in ("HALLEY_A","HALLEY_B"):
            append(db,ten,token(ten,key),key,"ALUNO-01",ten+"_SEGREDO")
        assert read(db,"HALLEY_A",token("HALLEY_A",key),key)==[("ALUNO-01","HALLEY_A_SEGREDO")]
        assert read(db,"HALLEY_B",token("HALLEY_B",key),key)==[("ALUNO-01","HALLEY_B_SEGREDO")]
        denied=0
        for op in (lambda:read(db,"HALLEY_B",token("HALLEY_A",key),key),lambda:append(db,"HALLEY_B","alterado",key,"x","y")):
            try:op()
            except PermissionError:denied+=1
        assert denied==2
        # Persistencia: fecha e reabre a conexao.
        assert len(read(db,"HALLEY_A",token("HALLEY_A",key),key))==1
        n=1000;s=time.perf_counter()
        for i in range(n): append(db,"HALLEY_A",token("HALLEY_A",key),key,f"ALUNO-{i+2}", "registro")
        elapsed=time.perf_counter()-s
        size=db.stat().st_size
        result=dict(factory="OFICINA-13/codigo_real_em_copia",instances=len(outputs),lab_pass=True,external_activation=False,auth_negative=denied,persistence=True,tenant_isolation=True,operations=n,benchmark_seconds=round(elapsed,4),sqlite_bytes=size,python_wall_seconds=round(time.perf_counter()-t,4),staging_scope="SQLite local temporario; sem rede, sem IdP, sem RLS",commercial_ready=False)
        (ROOT/"EVIDENCIA_HALLEY_GATE_V04.json").write_text(json.dumps(result,indent=2))
        print(json.dumps(result))
if __name__=="__main__":run()
