const words=["Software Developer","Web Developer","Java Developer","AI Enthusiast"];
let wi=0,ci=0,del=false;
const typing=document.getElementById("typing");
function type(){const w=words[wi];typing.textContent=w.slice(0,ci);if(!del){ci++;if(ci>w.length){del=true;setTimeout(type,1200);return}}else{ci--;if(ci===0){del=false;wi=(wi+1)%words.length}}setTimeout(type,del?45:90)}type();

const nav=document.getElementById("navLinks");
document.getElementById("menuBtn").addEventListener("click",()=>nav.classList.toggle("active"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("active")));

const themeBtn=document.getElementById("themeBtn");
const saved=localStorage.getItem("portfolio-theme");
if(saved==="light"){document.body.classList.add("light");themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>'}
themeBtn.addEventListener("click",()=>{document.body.classList.toggle("light");const light=document.body.classList.contains("light");localStorage.setItem("portfolio-theme",light?"light":"dark");themeBtn.innerHTML=light?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>'});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const topBtn=document.getElementById("topBtn");
window.addEventListener("scroll",()=>topBtn.style.display=scrollY>500?"grid":"none");
topBtn.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

document.addEventListener("mousemove",e=>{const g=document.querySelector(".cursor-glow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});

const particles=document.getElementById("particles");
for(let i=0;i<35;i++){const p=document.createElement("span");p.className="particle";p.style.left=Math.random()*100+"%";p.style.top=Math.random()*100+"%";p.style.opacity=(.15+Math.random()*.4);p.style.transform=`scale(${.5+Math.random()*1.5})`;particles.appendChild(p)}

document.getElementById("contactForm").addEventListener("submit",e=>{
 e.preventDefault();
 const name=document.getElementById("name").value.trim();
 const email=document.getElementById("email").value.trim();
 const msg=document.getElementById("message").value.trim();
 const body=`Hello Akarsh,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(msg)}`;
 location.href=`mailto:askarsh32@gmail.com?subject=Portfolio Contact&body=${body}`;
});
