import http from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { statSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'dist/quantsmind-web/browser');
const CH = [process.env.CHROME_PATH,'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe'].filter(Boolean);

function launchChrome(ud, port) {
  const exe = CH.find(p=>existsSync(p));
  const child = spawn(exe, ['--headless=new',`--remote-debugging-port=${port}`,`--user-data-dir=${ud}`,'--no-first-run','--disable-gpu','--hide-scrollbars','about:blank'],{stdio:'ignore'});
  return new Promise((res,rej)=>{const d=Date.now()+30000;const t=async()=>{if(child.exitCode!==null)return rej(new Error('exit'));try{const r=await fetch(`http://127.0.0.1:${port}/json/version`);if(r.ok)return res({child});}catch{}if(Date.now()>d)return rej(new Error('timeout'));setTimeout(t,250);};t();});
}
class C {constructor(ws){this.ws=ws;this.id=0;this.p=new Map();ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&this.p.has(m.id)){const{resolve:ok,reject:no}=this.p.get(m.id);this.p.delete(m.id);m.error?no(new Error(JSON.stringify(m.error))):ok(m.result);} });}send(m,p={}){const id=++this.id;return new Promise((ok,no)=>{this.p.set(id,{resolve:ok,reject:no});this.ws.send(JSON.stringify({id,method:m,params:p}));});}}
async function openPage(port){const r=await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'});const t=await r.json();const ws=new WebSocket(t.webSocketDebuggerUrl);await new Promise((ok,no)=>{ws.addEventListener('open',ok);ws.addEventListener('error',()=>no(new Error('ws')));});const s=new C(ws);await s.send('Page.enable');await s.send('Runtime.enable');return s;}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function ev(s,expr){const r=await s.send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text||JSON.stringify(r.exceptionDetails));return r.result.value;}
async function startServer(){return new Promise(res=>{const srv=http.createServer(async(req,resp)=>{const u=new URL(req.url,'http://localhost');let pn=u.pathname==='/'?'/index.html':u.pathname;const fp=join(OUT_DIR,pn);try{const st=statSync(fp);let tg=fp;if(st.isDirectory())tg=join(fp,'index.html');const d=await readFile(tg);const ext=tg.split('.').pop().toLowerCase();const mime={'html':'text/html','js':'application/javascript','css':'text/css','json':'application/json','png':'image/png','svg':'image/svg+xml','ico':'image/x-icon','woff2':'font/woff2','woff':'font/woff','ttf':'font/ttf'}[ext]||'application/octet-stream';resp.writeHead(200,{'Content-Type':mime});resp.end(d);}catch{try{const sh=await readFile(join(OUT_DIR,'index.html'));resp.writeHead(404,{'Content-Type':'text/html'});resp.end(sh);}catch{resp.writeHead(404);resp.end('nf');}}});srv.listen(0,()=>res({server:srv,port:srv.address().port}));});}

const VPS=[{w:1440,h:900,l:'1440px'},{w:1280,h:800,l:'1280px'},{w:1024,h:768,l:'1024px'},{w:768,h:1024,l:'768px'},{w:390,h:844,l:'390px'},{w:360,h:800,l:'360px'}];

async function main(){
  const {server,port}=await startServer();
  const ud=join(ROOT,'node_modules/.cache/mh-chrome');
  await mkdir(ud,{recursive:true});
  const chrome=await launchChrome(ud,port+1);
  const session=await openPage(port+1);
  try{
    for(const vp of VPS){
      await session.send('Emulation.setDeviceMetricsOverride',{width:vp.w,height:vp.h,deviceScaleFactor:1,mobile:vp.w<768});
      await session.send('Page.navigate',{url:`http://127.0.0.1:${port}/`});
      // wait for render
      for (let i = 0; i < 40; i++) {
        const ready = await ev(session, `(()=>{return !!document.querySelector('.qm-header__nav') && (document.body.innerText||'').length > 200;})()`);
        if (ready) break;
        await sleep(250);
      }
      await sleep(500);
      if(vp.w>=1200){
        const dbg=await ev(session,`(()=>{return {nav:!!document.querySelector('.qm-header__nav'),links:[...document.querySelectorAll('.qm-header__nav-link')].map(e=>e.textContent.trim()),bodyLen:(document.body.innerText||'').length,rootLen:(document.querySelector('app-root')?.innerHTML||'').length,ready:document.readyState};})()`);
        console.log(vp.l+': debug='+JSON.stringify(dbg));
        await ev(session,`(()=>{const el=[...document.querySelectorAll('.qm-header__nav-link')].find(e=>e.textContent.trim()==='Services');if(el)el.parentElement.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true,cancelable:true}));return !!el;})()`);
        await sleep(500);
        const rect=await ev(session,`(()=>{const m=document.querySelector('.qm-mega');if(!m)return null;const g=m.querySelector('.qm-mega__grid');const r=m.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height),links:m.querySelectorAll('.qm-mega__link').length,wide:g?g.classList.contains('qm-mega__grid--wide'):null,cols:g?getComputedStyle(g).gridTemplateColumns:null};})()`);
        console.log(vp.l+': mega='+JSON.stringify(rect));
      } else {
        await ev(session,`(()=>{const b=document.querySelector('.qm-header__mobile-toggle');if(b)b.click();return true;})()`);
        await sleep(300);
        await ev(session,`(()=>{const rows=[...document.querySelectorAll('.qm-mobile-nav__row')];const row=rows.find(r=>r.textContent.includes('Services'));const btn=row&&row.querySelector('.qm-mobile-nav__toggle');if(btn)btn.click();return true;})()`);
        await sleep(300);
        const info=await ev(session,`(()=>{const sub=document.querySelector('.qm-mobile-nav__sub--open');const r=sub?sub.getBoundingClientRect():null;return {h:r?Math.round(r.height):0,links:sub?sub.querySelectorAll('.qm-mobile-nav__sub-link').length:0,docW:document.documentElement.scrollWidth,win:window.innerWidth};})()`);
        console.log(vp.l+': mobile='+JSON.stringify(info));
        await ev(session,`(()=>{const b=document.querySelector('.qm-mobile-nav__close');if(b)b.click();return true;})()`);
        await sleep(200);
      }
    }
  } finally {
    if (session?.ws) session.ws.close();
    if (chrome?.child) await new Promise(res=>{if(chrome.child.exitCode!==null)return res();chrome.child.once('exit',res);setTimeout(res,5000);});
    await new Promise(res=>server.close(()=>res()));
  }
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1);});