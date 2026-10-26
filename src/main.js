// VUE 02 — real interaction: parallax, drawn lines, scroll progress, stage tabs,
// swipe/drag gallery, live consultation composer, responsive navigation.
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, scope=document) => scope.querySelector(s);
  const $$ = (s, scope=document) => [...scope.querySelectorAll(s)];
  const ready = () => document.body.classList.add('loaded');
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(ready), {once:true}); else requestAnimationFrame(ready);
  // Site navigation
  const menu = $('#menuToggle'), nav = $('#mainNav');
  const setMenu = open => {menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');nav.classList.toggle('open',open)};
  menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
  $$('#mainNav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!nav.contains(e.target))setMenu(false)});
  // Scroll position has information value (global reading progress).
  const progress = $('#progress'); let ticking=false;
  const updateScroll = () => {const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;ticking=false};
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});updateScroll();
  // Progressive section entry. Everything is visible with JS disabled.
  const reveals = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduced.matches) {
    const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.06,rootMargin:'0px 0px -20px 0px'});
    reveals.forEach(el=>io.observe(el));
    // backup for browsers with delayed intersection callback.
    const check =()=>reveals.forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*.98&&r.bottom>0){el.classList.add('visible');io.unobserve(el)}});
    addEventListener('load',check,{once:true});addEventListener('scroll',check,{passive:true});requestAnimationFrame(check);
  } else reveals.forEach(el=>el.classList.add('visible'));
  reduced.addEventListener?.('change',evt=>{if(evt.matches)reveals.forEach(el=>el.classList.add('visible'))});
  // Main signature contour follows movement, only on precise pointers.
  const hero=$('#hero'), contours=$('#heroContours');
  if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced.matches){
    hero.addEventListener('pointermove',e=>{
      const r=hero.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width-.5)*27;
      const y=((e.clientY-r.top)/r.height-.5)*22;
      contours.style.setProperty('--pointer-x',x.toFixed(1)+'px');contours.style.setProperty('--pointer-y',y.toFixed(1)+'px');
    },{passive:true});
    hero.addEventListener('pointerleave',()=>{contours.style.setProperty('--pointer-x','0px');contours.style.setProperty('--pointer-y','0px')});
  }
  // Three-state service story. User action changes visual and descriptive text.
  const steps=[
    {key:'LISTEN FIRST',title:'먼저, 살피는 시간',body:'원하는 시술과 피부 컨디션을 충분히 이야기하는 것에서 시작합니다. 내 피부의 차이를 이해하는 일이 먼저라고 생각합니다.'},
    {key:'PERSONAL BY DESIGN',title:'한 사람에게 맞춘 선택',body:'피부결과 컨디션, 원하는 관리에 관해 나눈 내용을 바탕으로 개인에게 어울리는 방향을 함께 생각합니다.'},
    {key:'ATTENTION TO DETAIL',title:'마지막까지 섬세하게',body:'관리가 끝난 뒤의 궁금증까지 차분히 나눌 수 있도록, 처음부터 마지막까지 한 사람에게 집중하는 경험을 지향합니다.'}
  ];
  const stepBtns=$$('[data-step]'); const frameEls=$$('[data-frame]');
  const stepText=$('#stepText'),stepHeading=$('#stepHeading'),stepKey=$('#stepKey'),visualCount=$('#visualCount');
  function chooseStep(i,focus=false){const val=steps[i];stepBtns.forEach((b,n)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1});frameEls.forEach((f,n)=>f.dataset.active=String(i===n));stepKey.textContent=val.key;stepHeading.textContent=val.title;stepText.textContent=val.body;visualCount.textContent=String(i+1).padStart(2,'0');stepText.style.animation='none';void stepText.offsetWidth;stepText.style.animation='';if(focus)stepBtns[i].focus()}
  stepBtns.forEach((btn,i)=>{btn.addEventListener('click',()=>chooseStep(i));btn.addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();let next=e.key==='Home'?0:e.key==='End'?steps.length-1:(i+(e.key==='ArrowRight'||e.key==='ArrowDown'?1:-1)+steps.length)%steps.length;chooseStep(next,true)}})});
  chooseStep(0);
  // Native touch swipe + button + mouse drag editorial image gallery.
  const windowEl=$('#galleryWindow'),cards=$$('.gallery-item'),meter=$('#galleryMeter');
  const currentIndex=()=>{const left=windowEl.scrollLeft;return cards.reduce((best,card,i)=>Math.abs(card.offsetLeft-left)<Math.abs(cards[best].offsetLeft-left)?i:best,0)};
  const goGallery=(direction)=>{const i=Math.max(0,Math.min(cards.length-1,currentIndex()+direction));windowEl.scrollTo({left:cards[i].offsetLeft,behavior:reduced.matches?'instant':'smooth'})};
  $('#prevGallery').addEventListener('click',()=>goGallery(-1));$('#nextGallery').addEventListener('click',()=>goGallery(1));
  let galleryRaf=false;
  windowEl.addEventListener('scroll',()=>{if(galleryRaf)return;galleryRaf=true;requestAnimationFrame(()=>{galleryRaf=false;const range=windowEl.scrollWidth-windowEl.clientWidth;const p=range?windowEl.scrollLeft/range:0;meter.style.transform=`translateX(${p*200}%)`})},{passive:true});
  let pointerX=0,leftAtDown=0,down=false,dragged=false;
  windowEl.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||e.button!==0)return;down=true;dragged=false;pointerX=e.clientX;leftAtDown=windowEl.scrollLeft;windowEl.classList.add('dragging')});
  windowEl.addEventListener('pointermove',e=>{if(!down)return;const moved=e.clientX-pointerX;if(Math.abs(moved)>5)dragged=true;windowEl.scrollLeft=leftAtDown-moved});
  ['pointerup','pointercancel','pointerleave'].forEach(ev=>windowEl.addEventListener(ev,()=>{down=false;windowEl.classList.remove('dragging')}));
  windowEl.addEventListener('click',e=>{if(dragged){e.preventDefault();dragged=false}},true);
  // Consultation text updates immediately; no backend, no invented booking URL.
  const topicBtns=$$('[data-topic]'), skinBtns=$$('[data-skin]'), note=$('#questionNote'), message=$('#messagePreview'),feedback=$('#copyFeedback');
  let topic='첫 방문',skin='일반적인 문의';
  const buildText=()=>`안녕하세요, 신림 뷰왁싱에 문의드립니다.\n\n문의 주제: ${topic}\n피부 관련 참고사항: ${skin}${note.value.trim()?`\n추가 질문: ${note.value.trim()}`:''}\n\n상담 가능 여부와 안내 부탁드립니다.`;
  const updateMessage=()=>{message.textContent=buildText();feedback.textContent=''};
  function select(btns,val,attr){btns.forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute(attr)===val)))}
  topicBtns.forEach(b=>b.addEventListener('click',()=>{topic=b.dataset.topic;select(topicBtns,topic,'data-topic');updateMessage()}));
  skinBtns.forEach(b=>b.addEventListener('click',()=>{skin=b.dataset.skin;select(skinBtns,skin,'data-skin');updateMessage()}));
  note.addEventListener('input',updateMessage);updateMessage();
  $('#copyMessage').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(buildText());feedback.textContent='문구가 복사되었습니다. 공식 문의 채널에 직접 전달해 주세요.'}catch{const ta=document.createElement('textarea');ta.value=buildText();ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand('copy')}catch{}ta.remove();feedback.textContent=ok?'문구가 복사되었습니다.':'복사가 제한되었습니다. 위 문구를 길게 눌러 직접 복사해 주세요.'}});
})();
