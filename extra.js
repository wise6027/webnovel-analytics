/* ══ 보조 필터 ══ */
let subFilterType='',subFilterVals=[];
const SUB_OPTS={
  genreParent:['판타지','로맨스','로맨스판타지','BL','기타장르'],
  genre:['현대 로맨스','역사/시대물','동양풍 로판','서양풍 로판','가상세계 로판','BL 현대물','BL 판타지물','BL 역사/시대물','정통 판타지','현대 판타지','역사/시대물 판타지','전문직 판타지','헌터','아포칼립스','무협/선협']
};
function onSubFilterType(t){
  subFilterType=t;subFilterVals=[];
  const checks=document.getElementById('sub-filter-checks');
  const tags=document.getElementById('sub-filter-tags');
  if(tags)tags.innerHTML='';
  if(!t){if(checks)checks.style.display='none';return;}
  const opts=SUB_OPTS[t]||[];
  if(checks){
    checks.innerHTML=opts.map(o=>`<label style="display:inline-flex;align-items:center;gap:5px;padding:4px 9px;border-radius:20px;cursor:pointer;font-size:12px;user-select:none;border:1px solid var(--bd);background:#fff;white-space:nowrap"><input type="checkbox" value="${o}" onchange="togSubFilter('${o}',this)" style="accent-color:var(--ac);width:12px;height:12px"> ${o}</label>`).join('');
    checks.style.display='flex';
  }
}
function togSubFilter(val,cb){
  if(cb.checked){if(!subFilterVals.includes(val))subFilterVals.push(val);}
  else{subFilterVals=subFilterVals.filter(v=>v!==val);}
  renderSubTags();
}
function renderSubTags(){
  const tags=document.getElementById('sub-filter-tags');
  if(!tags)return;
  tags.innerHTML=subFilterVals.map(v=>`<span style="background:#ede9ff;color:var(--ac);border-radius:20px;padding:2px 9px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:4px">${v}<span onclick="removeSubTag('${v}')" style="cursor:pointer;font-size:13px;opacity:.6">×</span></span>`).join('');
}
function removeSubTag(val){
  subFilterVals=subFilterVals.filter(v=>v!==val);
  const cb=document.querySelector(`#sub-filter-checks input[value="${val}"]`);
  if(cb)cb.checked=false;
  renderSubTags();
}
function clearSubFilter(){
  subFilterType='';subFilterVals=[];
  const t=document.getElementById('sub-filter-type');if(t)t.value='';
  const c=document.getElementById('sub-filter-checks');if(c){c.style.display='none';c.innerHTML='';}
  const tg=document.getElementById('sub-filter-tags');if(tg)tg.innerHTML='';
}
function applySubFilter(data){
  if(!subFilterType||!subFilterVals.length)return data;
  return data.filter(w=>{
    if(subFilterType==='genreParent')return subFilterVals.includes(w.genreParent);
    if(subFilterType==='genre')return subFilterVals.includes(w.genreSub||w.genre);
    return true;
  });
}

/* ══ 통계 차트 타입 ══ */
function setSpType(t,el){
  spType=t;
  document.querySelectorAll('.ctb').forEach(b=>b.classList.remove('on'));
  el.classList.add('on');
  const isPie=['pie','doughnut','radar'].includes(spType);
  const yr=document.getElementById('ax-y-row');
  if(yr)yr.style.display=isPie?'none':'flex';
  const xl=document.getElementById('ax-x-lbl');
  if(xl)xl.textContent=isPie?'🍕 분할 기준':'📌 X축';
}