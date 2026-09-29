document.addEventListener('DOMContentLoaded',()=>{
const cursor=document.getElementById('cursor'),follower=document.getElementById('cursor-follower');
if(cursor&&follower){let mx=0,my=0,fx=0,fy=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px'});
(function af(){fx+=(mx-fx)*.12;fy+=(my-fy)*.12;follower.style.left=fx+'px';follower.style.top=fy+'px';requestAnimationFrame(af)})();
document.querySelectorAll('a,button,.pill,.service-card,.project-card,.cert-card,.contact-item').forEach(el=>{
el.addEventListener('mouseenter',()=>{cursor.style.transform='translate(-50%,-50%) scale(2)';follower.style.opacity='.2'});
el.addEventListener('mouseleave',()=>{cursor.style.transform='translate(-50%,-50%) scale(1)';follower.style.opacity='.5'})})}
const canvas=document.getElementById('particles-canvas');
if(canvas){const ctx=canvas.getContext('2d');let W,H,particles=[];
function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight}resize();
window.addEventListener('resize',resize);
function rand(a,b){return Math.random()*(b-a)+a}
class P{constructor(){this.reset()}reset(){this.x=rand(0,W);this.y=rand(0,H);this.r=rand(1,2.5);this.vx=rand(-.3,.3);this.vy=rand(-.3,.3);this.a=rand(.2,.7)}
update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset()}
draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(167,139,250,${this.a})`;ctx.fill()}}
for(let i=0;i<80;i++)particles.push(new P());
function connect(){for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);
if(d<100){ctx.strokeStyle=`rgba(124,58,237,${.12*(1-d/100)})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.stroke()}}}
(function loop(){ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.update();p.draw()});connect();requestAnimationFrame(loop)})()}
const typedEl=document.getElementById('typed-text');
if(typedEl){const words=['ML Models.','Data Pipelines.','Insights.','Dashboards.','Deep Learning.','Solutions.'];
let wi=0,ci=0,del=false;
function type(){const w=words[wi];if(del){typedEl.textContent=w.substring(0,ci--);if(ci<0){del=false;wi=(wi+1)%words.length;setTimeout(type,400);return}setTimeout(type,60)}
else{typedEl.textContent=w.substring(0,ci++);if(ci>w.length){del=true;setTimeout(type,1800);return}setTimeout(type,100)}}type()}
const navbar=document.getElementById('navbar'),navLinks=document.querySelectorAll('.nav-link'),sections=document.querySelectorAll('section[id]');
window.addEventListener('scroll',()=>{
if(window.scrollY>60)navbar.classList.add('scrolled');else navbar.classList.remove('scrolled');
let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-100)cur=s.id});
navLinks.forEach(a=>{a.classList.remove('active');if(a.getAttribute('href')==='#'+cur)a.classList.add('active')});
const btt=document.getElementById('back-to-top');if(btt){if(window.scrollY>400)btt.classList.add('visible');else btt.classList.remove('visible')}});
const hamburger=document.getElementById('hamburger'),drawer=document.getElementById('mobile-drawer');
if(hamburger&&drawer){hamburger.addEventListener('click',()=>{hamburger.classList.toggle('open');drawer.classList.toggle('open')});
document.querySelectorAll('.mob-link').forEach(l=>l.addEventListener('click',()=>{hamburger.classList.remove('open');drawer.classList.remove('open')}))}
const btt=document.getElementById('back-to-top');
if(btt)btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
function animCount(el){const target=parseInt(el.dataset.target,10),isDec=el.dataset.decimal==='true',dur=1800,step=16,inc=target/(dur/step);let cur=0;
const timer=setInterval(()=>{cur+=inc;if(cur>=target){cur=target;clearInterval(timer)}el.textContent=isDec?(cur/100).toFixed(2):Math.floor(cur)},step)}
const statsSection=document.getElementById('stats-bar');
if(statsSection){const co=new IntersectionObserver(e=>{if(e[0].isIntersecting){document.querySelectorAll('.count').forEach(animCount);co.disconnect()}},{threshold:.4});co.observe(statsSection)}
const fadeEls=document.querySelectorAll('.service-card,.project-card,.cert-card,.skill-category,.info-card,.tl-card,.contact-item,.section-header,.about-text-col,.about-cards-col,.hero-text,.hero-image-wrapper');
const fo=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('visible');fo.unobserve(en.target)}})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
fadeEls.forEach(el=>{el.classList.add('fade-in');fo.observe(el)});
const form=document.getElementById('contact-form');
if(form){
    const nameInput=document.getElementById('contact-name'),
          emailInput=document.getElementById('contact-email'),
          subjectInput=document.getElementById('contact-subject'),
          messageInput=document.getElementById('contact-message'),
          btn=document.getElementById('submit-btn'),
          statusEl=document.getElementById('form-status'),
          actionsEl=document.getElementById('form-direct-actions'),
          gmailBtn=document.getElementById('direct-gmail-btn'),
          mailtoBtn=document.getElementById('direct-mailto-btn'),
          copyBtn=document.getElementById('copy-message-btn'),
          copyBtnText=document.getElementById('copy-btn-text');

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setFieldError(field,groupId,errorId,msg){
        const g=document.getElementById(groupId),e=document.getElementById(errorId);
        if(g)g.classList.add('has-error');
        if(e){e.textContent=msg;e.style.display='block'}
    }

    function clearFieldError(groupId,errorId){
        const g=document.getElementById(groupId),e=document.getElementById(errorId);
        if(g)g.classList.remove('has-error');
        if(e)e.style.display='none';
    }

    nameInput.addEventListener('input',()=>nameInput.value.trim().length>=2&&clearFieldError('group-name','name-error'));
    emailInput.addEventListener('input',()=>emailRegex.test(emailInput.value.trim())&&clearFieldError('group-email','email-error'));
    messageInput.addEventListener('input',()=>messageInput.value.trim().length>=10&&clearFieldError('group-message','message-error'));

    let lastPayload={name:'',email:'',subject:'',message:''};

    form.addEventListener('submit',async e=>{
        e.preventDefault();
        const name=nameInput.value.trim(),
              email=emailInput.value.trim(),
              subject=subjectInput.value.trim()||'Portfolio Inquiry from '+name,
              message=messageInput.value.trim();

        let valid=true;
        let firstInvalid=null;

        if(!name||name.length<2){
            setFieldError(nameInput,'group-name','name-error','Please enter your full name (at least 2 characters).');
            valid=false;firstInvalid=firstInvalid||nameInput;
        }else clearFieldError('group-name','name-error');

        if(!email||!emailRegex.test(email)){
            setFieldError(emailInput,'group-email','email-error','Please enter a valid email address (e.g. name@domain.com).');
            valid=false;firstInvalid=firstInvalid||emailInput;
        }else clearFieldError('group-email','email-error');

        if(!message||message.length<10){
            setFieldError(messageInput,'group-message','message-error','Please enter your message (at least 10 characters).');
            valid=false;firstInvalid=firstInvalid||messageInput;
        }else clearFieldError('group-message','message-error');

        if(!valid){
            if(firstInvalid)firstInvalid.focus();
            return;
        }

        lastPayload={name,email,subject,message};

        btn.disabled=true;
        btn.innerHTML='<span class="spinner"></span> Sending Message...';
        statusEl.style.display='none';
        actionsEl.style.display='none';

        const encSubject=encodeURIComponent(subject);
        const bodyText=`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Mohamed Hussein Portfolio`;
        const encBody=encodeURIComponent(bodyText);
        const mailtoLink=`mailto:mohamed.hussein.ameer@gmail.com?subject=${encSubject}&body=${encBody}`;
        const gmailLink=`https://mail.google.com/mail/?view=cm&fs=1&to=mohamed.hussein.ameer@gmail.com&su=${encSubject}&body=${encBody}`;

        gmailBtn.href=gmailLink;
        mailtoBtn.href=mailtoLink;

        let sentSuccessfully=false;

        // Try local server API first
        try{
            const res=await fetch('/api/contact',{
                method:'POST',
                headers:{'Content-Type':'application/json','Accept':'application/json'},
                body:JSON.stringify({name,email,subject,message})
            });
            if(res.ok){
                const data=await res.json();
                if(data.success)sentSuccessfully=true;
            }
        }catch(err){
            // If local API is not available (e.g. hosted on static GitHub Pages), try FormSubmit
            try{
                const fsRes=await fetch('https://formsubmit.co/ajax/mohamed.hussein.ameer@gmail.com',{
                    method:'POST',
                    headers:{'Content-Type':'application/json','Accept':'application/json'},
                    body:JSON.stringify({name,email,_subject:subject,message})
                });
                if(fsRes.ok)sentSuccessfully=true;
            }catch(e2){}
        }

        if(sentSuccessfully){
            statusEl.className='form-status success';
            statusEl.innerHTML=`<strong>✓ Message Sent Successfully!</strong> Thank you, <strong>${escapeHtml(name)}</strong>. Your inquiry has been received. Mohamed will reply to <strong>${escapeHtml(email)}</strong> promptly.`;
            statusEl.style.display='block';
            actionsEl.style.display='block';
            btn.innerHTML='✓ Sent Successfully';
            btn.style.background='linear-gradient(135deg,#059669,#10b981)';
            form.reset();
            setTimeout(()=>{
                btn.innerHTML='<span class="btn-text">Send Message</span><span class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></span>';
                btn.style.background='';
                btn.disabled=false;
            },4000);
        }else{
            statusEl.className='form-status info';
            statusEl.innerHTML=`<strong>Message Ready!</strong> Click below to deliver your message directly via <strong>Gmail</strong> or your <strong>Default Email App</strong>:`;
            statusEl.style.display='block';
            actionsEl.style.display='block';
            btn.innerHTML='Send via Email App';
            btn.style.background='linear-gradient(135deg,#7c3aed,#4f46e5)';
            btn.disabled=false;
            window.location.href=mailtoLink;
        }
    });

    if(copyBtn){
        copyBtn.addEventListener('click',()=>{
            const textToCopy=`Sender: ${lastPayload.name} <${lastPayload.email}>\nSubject: ${lastPayload.subject}\n\nMessage:\n${lastPayload.message}`;
            navigator.clipboard.writeText(textToCopy).then(()=>{
                copyBtnText.textContent='Copied!';
                setTimeout(()=>copyBtnText.textContent='Copy Text',2000);
            }).catch(()=>{
                copyBtnText.textContent='Selected';
            });
        });
    }

    function escapeHtml(str){
        return str.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
    }
}
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}})})});
