#!/usr/bin/env python3
"""Rabbit Company Intelligence Agent: bounded, standard-library website research."""
import argparse, ipaddress, json, socket, time, uuid, re
from pathlib import Path
from datetime import datetime, timezone
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, urljoin, urldefrag
from urllib.request import Request, build_opener, HTTPRedirectHandler
from urllib.error import URLError, HTTPError

MAX_PAGES, MAX_BYTES, TIMEOUT = 6, 700000, 6
PATH_HINTS = ('about','product','feature','pricing','use-case','customer','docs')
ROOT=Path(__file__).resolve().parent
def stamp(): return datetime.now(timezone.utc).isoformat()
def owner(value, name):
    try: return str(uuid.UUID(value))
    except (ValueError,TypeError,AttributeError): raise ValueError(f'{name} must be a non-empty UUID.')
def safe_url(value):
    p=urlparse(value)
    if p.scheme not in ('http','https') or not p.hostname or p.username or p.password: raise ValueError('Only public HTTP(S) website URLs are allowed.')
    if p.port not in (None,80,443): raise ValueError('Only standard HTTP(S) ports are allowed.')
    host=p.hostname.lower()
    if host=='localhost' or host.endswith('.localhost'): raise ValueError('Local and private addresses are not allowed.')
    try:
        for item in socket.getaddrinfo(host, p.port or (443 if p.scheme=='https' else 80), type=socket.SOCK_STREAM):
            ip=ipaddress.ip_address(item[4][0])
            if not ip.is_global: raise ValueError('This website resolves to a non-public address and was blocked.')
    except socket.gaierror: raise ValueError('Website hostname could not be resolved.')
    return p._replace(fragment='').geturl()
class Text(HTMLParser):
    def __init__(self): super().__init__(); self.bits=[]; self.links=[]; self.skip=0; self.title=[]; self.description=''; self.headings=[]; self.capture=[]
    def handle_starttag(self,t,a):
        if t in ('script','style','noscript'): self.skip+=1
        if t in ('title','h1','h2'): self.capture.append(t)
        if t=='a':
            h=dict(a).get('href',''); self.links.append(h)
        if t=='meta' and dict(a).get('name','').lower()=='description': self.description=dict(a).get('content','')
    def handle_endtag(self,t):
        if t in ('script','style','noscript') and self.skip:self.skip-=1
        if self.capture and self.capture[-1]==t:self.capture.pop()
    def handle_data(self,d):
        if not self.skip:
            self.bits.append(d)
            if self.capture and self.capture[-1]=='title':self.title.append(d)
            if self.capture and self.capture[-1] in ('h1','h2'):self.headings.append(d)
def extract_html(data):
    p=Text(); p.feed(data.decode('utf-8','replace')); clean=lambda x:re.sub(r'\s+',' ',x).strip()[:280]; heads=list(dict.fromkeys(clean(x) for x in p.headings if clean(x)))[:6]; return {'text':clean(' '.join(p.bits)),'links':list(dict.fromkeys(p.links)),'title':clean(' '.join(p.title)),'description':clean(p.description),'headings':heads}
class SafeRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl): safe_url(newurl); return super().redirect_request(req,fp,code,msg,headers,newurl)
def fetch(url):
    url=safe_url(url); r=Request(url,headers={'User-Agent':'RabbitCompanyIntelligence/1.0'})
    try:
        with build_opener(SafeRedirect()).open(r,timeout=TIMEOUT) as res:
            final=safe_url(res.geturl()); typ=res.headers.get_content_type()
            if typ not in ('text/html','application/xhtml+xml'): raise ValueError('Only HTML pages are used for research.')
            data=res.read(MAX_BYTES+1)
            if len(data)>MAX_BYTES: raise ValueError('Page exceeded the safe size limit.')
            return final,extract_html(data)
    except (HTTPError,URLError,TimeoutError) as e: raise ValueError(f'Retrieval failed safely: {getattr(e,"reason",e)}')
def knowledge(doc,url,workspace_id,company_id):
    out=[]
    for label,value in [('title',doc['title']),('homepage description',doc['description'])]+[('page heading',h) for h in doc['headings'][:3]]:
        topic='pricing' if 'pricing' in value.lower() else ('customers' if 'customer' in value.lower() else ('docs' if 'doc' in value.lower() else ('about' if label=='title' else 'product')))
        if value: out.append({'id':str(uuid.uuid4()),'workspace_id':workspace_id,'company_id':company_id,'kind':'FACT','topic':topic,'statement':f'The website {label} states “{value}”.','source_url':url,'evidence_excerpt':value,'learned_at':stamp(),'confidence':'medium','verification_status':'website statement','provenance':'company website'})
    return out
def run_research(company_url, workspace_id, company_id):
    workspace_id,company_id=owner(workspace_id,'workspace_id'),owner(company_id,'company_id'); started=stamp(); root=safe_url(company_url); origin=None; queue=[root]; seen=[]; evidence=[]; failures=[]
    while queue and len(seen)<MAX_PAGES:
        candidate=queue.pop(0)
        if candidate in seen: continue
        try:
            final,doc=fetch(candidate)
            if final in seen: continue
            if origin is None: origin=(urlparse(final).scheme,urlparse(final).hostname,urlparse(final).port)
            seen.append(final); evidence.extend(knowledge(doc,final,workspace_id,company_id))
            for href in doc['links']:
                link=urldefrag(urljoin(final,href))[0]; p=urlparse(link)
                if (p.scheme,p.hostname,p.port)==origin and any(x in p.path.lower() for x in PATH_HINTS) and link not in queue and link not in seen: queue.append(link)
        except ValueError as e: failures.append({'url':candidate,'message':str(e)})
    topics={x['topic'] for x in evidence}; unknowns=[{'id':str(uuid.uuid4()),'workspace_id':workspace_id,'company_id':company_id,'kind':'UNKNOWN','topic':t,'question':q,'reason':'The public pages did not establish this reliably.','provenance':'agent uncertainty','learned_at':stamp(),'confidence':'low','verification_status':'unverified'} for t,q in [('customers','Which customer segment should win first?'),('pricing','Is pricing or business model publicly stated?'),('product','What product outcome matters most to customers?')] if t not in topics]
    seen_statements=set(); evidence=[x for x in evidence if not (x['statement'] in seen_statements or seen_statements.add(x['statement']))]
    return {'id':str(uuid.uuid4()),'workspace_id':workspace_id,'company_id':company_id,'goal':'Build a bounded public company understanding','status':'complete' if evidence else 'failed','started_at':started,'ended_at':stamp(),'pages_used':seen,'tools_used':['public website retrieval','HTML text extraction'],'evidence_count':len(evidence),'decision_summary':f'Recorded {len(evidence)} website statement(s) from {len(seen)} bounded public page(s).','failures':failures,'memory_changes':len(evidence),'knowledge':evidence+unknowns}
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*a,**k): super().__init__(*a,directory=str(ROOT),**k)
    def end_headers(self): self.send_header('Cache-Control','no-store'); self.send_header('X-Content-Type-Options','nosniff');self.send_header('X-Frame-Options','DENY');self.send_header('Referrer-Policy','no-referrer');self.send_header('Content-Security-Policy',"default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self'; font-src https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'");super().end_headers()
    def do_POST(self):
        if self.path!='/api/research': self.send_error(404); return
        try:
            raw=self.headers.get('Content-Length');
            if raw is None: raise ValueError('Content-Length is required.')
            length=int(raw)
            if length<=0: raise ValueError('Content-Length must be positive.')
            if length>20000: self.send_response(413);self.end_headers();self.wfile.write(b'{"error":"Request too large."}');return
            body=json.loads(self.rfile.read(length));
            if not isinstance(body,dict) or not all(isinstance(body.get(k),str) for k in ('company_url','workspace_id','company_id')): raise ValueError('A JSON object with string URL and ownership IDs is required.')
            result=run_research(body['company_url'],body['workspace_id'],body['company_id'])
            self.send_response(200); self.send_header('Content-Type','application/json'); self.end_headers(); self.wfile.write(json.dumps(result).encode())
        except (ValueError,json.JSONDecodeError) as e:
            self.send_response(400); self.send_header('Content-Type','application/json'); self.end_headers(); self.wfile.write(json.dumps({'error':str(e)}).encode())
def main():
    p=argparse.ArgumentParser(); p.add_argument('--serve',action='store_true'); p.add_argument('--port',type=int,default=3000); a=p.parse_args()
    if not a.serve: p.error('Use --serve --port 3000 to run the local Company Intelligence service.')
    server=ThreadingHTTPServer(('127.0.0.1',a.port),Handler); print(f'Rabbit local service: http://127.0.0.1:{a.port}'); server.serve_forever()
if __name__=='__main__': main()
