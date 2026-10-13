import sqlite3,tempfile,uuid,hashlib,hmac,secrets,time,json
from pathlib import Path
def setup(db):
 with sqlite3.connect(db) as c:
  c.executescript("PRAGMA foreign_keys=ON; CREATE TABLE sessions (id TEXT PRIMARY KEY,tenant TEXT NOT NULL,secret_hash TEXT NOT NULL,revoked INT NOT NULL DEFAULT 0,expiry INTEGER NOT NULL); CREATE TABLE events (tenant TEXT NOT NULL, event_id TEXT NOT NULL,subject TEXT NOT NULL, payload TEXT NOT NULL,PRIMARY KEY(tenant,event_id));")
def issue(db,tenant):
 sid=str(uuid.uuid4()); secret=secrets.token_urlsafe(32)
 with sqlite3.connect(db) as c:c.execute("INSERT INTO sessions VALUES(?,?,?,?,?)",(sid,tenant,hashlib.sha256(secret.encode()).hexdigest(),0,int(time.time())+1800))
 return (sid,secret)
def auth(c,tenant,session):
 sid,secret=session
 row=c.execute("SELECT tenant,secret_hash,revoked,expiry FROM sessions WHERE id=?",(sid,)).fetchone()
 if not row or row[0]!=tenant or row[2] or row[3]<=time.time() or not hmac.compare_digest(row[1],hashlib.sha256(secret.encode()).hexdigest()):raise PermissionError("DENIED")
def write(db,tenant,session,event_id,subject,payload):
 with sqlite3.connect(db) as c:
  auth(c,tenant,session)
  c.execute("INSERT INTO events VALUES(?,?,?,?)",(tenant,event_id,subject,payload))
def read(db,tenant,session):
 with sqlite3.connect(db) as c:
  auth(c,tenant,session);return c.execute("SELECT event_id,subject,payload FROM events WHERE tenant=? ORDER BY event_id",(tenant,)).fetchall()
def revoke(db,sid):
 with sqlite3.connect(db) as c:c.execute("UPDATE sessions SET revoked=1 WHERE id=?",(sid,))
def run():
 with tempfile.TemporaryDirectory() as tmp:
  db=Path(tmp)/"persistent.sqlite";setup(db);a=issue(db,"A");b=issue(db,"B")
  write(db,"A",a,"1","aluno","A_PRIVATE");write(db,"B",b,"1","aluno","B_PRIVATE")
  assert read(db,"A",a)==[("1","aluno","A_PRIVATE")]
  assert read(db,"B",b)==[("1","aluno","B_PRIVATE")]
  rejected=0
  for task in [lambda:read(db,"B",a),lambda:write(db,"B",a,"2","x","x")]:
   try:task()
   except PermissionError:rejected+=1
  assert rejected==2
  revoke(db,a[0])
  try:read(db,"A",a)
  except PermissionError:rejected+=1
  assert rejected==3
  # Reabrir DB persistido em disco
  assert len(read(db,"B",b))==1
  bad=issue(db,"B")
  with sqlite3.connect(db) as c:c.execute("UPDATE sessions SET expiry=0 WHERE id=?",(bad[0],))
  try:read(db,"B",bad)
  except PermissionError:rejected+=1
  assert rejected==4
  start=time.perf_counter()
  for i in range(100):write(db,"B",b,str(i+100),"aluno","test")
  elapsed=time.perf_counter()-start
  result=dict(passed=True,tenant_isolation=True,revocation_immediate=True,expiration=True,persistence_reopen=True,unauthorized_rejections=rejected,benchmark_operations=100,elapsed_seconds=round(elapsed,4),sqlite_bytes=db.stat().st_size,scope="PC local apenas; staging remoto bloqueado",remote_staging_verified=False)
  print(json.dumps(result))
if __name__=="__main__":run()
