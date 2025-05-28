/* -------- FULL STATION LIST -------- */
const stationData=[
  /* LRT-1 */
  {id:'Baclaran',line:'LRT-1',n:['EDSA']},
  {id:'EDSA',line:'LRT-1',n:['Baclaran','Libertad'],t:[{to:'Taft Avenue',line:'MRT-3'}]},
  {id:'Libertad',line:'LRT-1',n:['EDSA','Gil Puyat']},
  {id:'Gil Puyat',line:'LRT-1',n:['Libertad','Vito Cruz']},
  {id:'Vito Cruz',line:'LRT-1',n:['Gil Puyat','Quirino']},
  {id:'Quirino',line:'LRT-1',n:['Vito Cruz','Pedro Gil']},
  {id:'Pedro Gil',line:'LRT-1',n:['Quirino','UN Avenue']},
  {id:'UN Avenue',line:'LRT-1',n:['Pedro Gil','Central Terminal']},
  {id:'Central Terminal',line:'LRT-1',n:['UN Avenue','Carriedo']},
  {id:'Carriedo',line:'LRT-1',n:['Central Terminal','Doroteo Jose']},
  {id:'Doroteo Jose',line:'LRT-1',n:['Carriedo','Bambang'],t:[{to:'Recto',line:'LRT-2'}]},
  {id:'Bambang',line:'LRT-1',n:['Doroteo Jose','Tayuman']},
  {id:'Tayuman',line:'LRT-1',n:['Bambang','Blumentritt']},
  {id:'Blumentritt',line:'LRT-1',n:['Tayuman','Abad Santos']},
  {id:'Abad Santos',line:'LRT-1',n:['Blumentritt','R. Papa']},
  {id:'R. Papa',line:'LRT-1',n:['Abad Santos','5th Avenue']},
  {id:'5th Avenue',line:'LRT-1',n:['R. Papa','Monumento']},
  {id:'Monumento',line:'LRT-1',n:['5th Avenue','Balintawak']},
  {id:'Balintawak',line:'LRT-1',n:['Monumento','Fernando Poe Jr.']},
  {id:'Fernando Poe Jr.',line:'LRT-1',n:['Balintawak']},

  /* LRT-2 */
  {id:'Recto',line:'LRT-2',n:['Legarda'],t:[{to:'Doroteo Jose',line:'LRT-1'}]},
  {id:'Legarda',line:'LRT-2',n:['Recto','Pureza']},
  {id:'Pureza',line:'LRT-2',n:['Legarda','V. Mapa']},
  {id:'V. Mapa',line:'LRT-2',n:['Pureza','J. Ruiz']},
  {id:'J. Ruiz',line:'LRT-2',n:['V. Mapa','Gilmore']},
  {id:'Gilmore',line:'LRT-2',n:['J. Ruiz','Betty Go-Belmonte']},
  {id:'Betty Go-Belmonte',line:'LRT-2',n:['Gilmore','Araneta-Cubao']},
  {id:'Araneta-Cubao',line:'LRT-2',n:['Betty Go-Belmonte','Anonas'],t:[{to:'Araneta Center-Cubao',line:'MRT-3'}]},
  {id:'Anonas',line:'LRT-2',n:['Araneta-Cubao','Katipunan']},
  {id:'Katipunan',line:'LRT-2',n:['Anonas','Santolan']},
  {id:'Santolan',line:'LRT-2',n:['Katipunan','Marikina-Pasig']},
  {id:'Marikina-Pasig',line:'LRT-2',n:['Santolan','Antipolo']},
  {id:'Antipolo',line:'LRT-2',n:['Marikina-Pasig']},

  /* MRT-3 */
  {id:'North Avenue',line:'MRT-3',n:['Quezon Avenue']},
  {id:'Quezon Avenue',line:'MRT-3',n:['North Avenue','Kamuning']},
  {id:'Kamuning',line:'MRT-3',n:['Quezon Avenue','Araneta Center-Cubao']},
  {id:'Araneta Center-Cubao',line:'MRT-3',n:['Kamuning','Santolan-Annapolis'],t:[{to:'Araneta-Cubao',line:'LRT-2'}]},
  {id:'Santolan-Annapolis',line:'MRT-3',n:['Araneta Center-Cubao','Ortigas']},
  {id:'Ortigas',line:'MRT-3',n:['Santolan-Annapolis','Shaw Boulevard']},
  {id:'Shaw Boulevard',line:'MRT-3',n:['Ortigas','Boni']},
  {id:'Boni',line:'MRT-3',n:['Shaw Boulevard','Guadalupe']},
  {id:'Guadalupe',line:'MRT-3',n:['Boni','Buendia']},
  {id:'Buendia',line:'MRT-3',n:['Guadalupe','Ayala']},
  {id:'Ayala',line:'MRT-3',n:['Buendia','Magallanes']},
  {id:'Magallanes',line:'MRT-3',n:['Ayala','Taft Avenue']},
  {id:'Taft Avenue',line:'MRT-3',n:['Magallanes'],t:[{to:'EDSA',line:'LRT-1'}]}
];

/* lat-lon for each station (approx.) */
const stationCoords = {
  "Baclaran":[14.534,120.997], "EDSA":[14.537,120.994], "Libertad":[14.545,120.997],
  "Gil Puyat":[14.554,120.999], "Vito Cruz":[14.563,120.996], "Quirino":[14.571,120.993],
  "Pedro Gil":[14.579,120.991], "UN Avenue":[14.586,120.986], "Central Terminal":[14.594,120.982],
  "Carriedo":[14.599,120.979], "Doroteo Jose":[14.606,120.979], "Bambang":[14.614,120.978],
  "Tayuman":[14.620,120.979], "Blumentritt":[14.628,120.979], "Abad Santos":[14.635,120.979],
  "R. Papa":[14.642,120.979], "5th Avenue":[14.650,120.979], "Monumento":[14.657,120.979],
  "Balintawak":[14.660,120.998], "Fernando Poe Jr.":[14.669,121.013],

  "Recto":[14.603,120.981], "Legarda":[14.605,120.993], "Pureza":[14.603,121.003],
  "V. Mapa":[14.604,121.015], "J. Ruiz":[14.603,121.024], "Gilmore":[14.610,121.039],
  "Betty Go-Belmonte":[14.615,121.048], "Araneta-Cubao":[14.619,121.055],
  "Anonas":[14.623,121.062], "Katipunan":[14.629,121.072], "Santolan":[14.635,121.081],
  "Marikina-Pasig":[14.640,121.093], "Antipolo":[14.623,121.116],

  "North Avenue":[14.653,121.038], "Quezon Avenue":[14.642,121.032], "Kamuning":[14.632,121.036],
  "Araneta Center-Cubao":[14.619,121.053], "Santolan-Annapolis":[14.612,121.057],
  "Ortigas":[14.587,121.056], "Shaw Boulevard":[14.580,121.053], "Boni":[14.568,121.046],
  "Guadalupe":[14.563,121.047], "Buendia":[14.554,121.044], "Ayala":[14.551,121.033],
  "Magallanes":[14.541,121.019], "Taft Avenue":[14.536,121.002]
};

function haversine(lat1,lon1,lat2,lon2){
  const R = 6371; // km
  const dLat = (lat2-lat1)*Math.PI/180;
  const dLon = (lon2-lon1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*
            Math.sin(dLon/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}
function nearestStation(lat,lon){
  let best=null,min=1e9;
  for(const [st,[slat,slon]] of Object.entries(stationCoords)){
    const d=haversine(lat,lon,slat,slon);
    if(d<min){min=d;best=st;}
  }
  return best;
}

/* -------- FULL LANDMARK MAP -------- */
const landmarks={
  /* LRT-1 */
  "Baclaran Market":"Baclaran","SM Mall of Asia":"Baclaran","NAIA":"Baclaran",
  "World Trade Center":"Gil Puyat","De La Salle University":"Vito Cruz","Cultural Center of the Philippines":"Vito Cruz","Rizal Memorial":"Vito Cruz",
  "Manila Zoo":"Quirino","Manila Baywalk":"Quirino","Robinsons Place Manila":"Pedro Gil","UP Manila":"Pedro Gil",
  "Luneta Park":"UN Avenue","National Museum":"UN Avenue","Intramuros":"Central Terminal","Rizal Park":"Central Terminal",
  "Binondo":"Carriedo","Quiapo Church":"Carriedo","Raon Shopping":"Carriedo",
  "University of Santo Tomas":"Doroteo Jose","SM Manila":"Doroteo Jose","Jose Reyes Medical Center":"Bambang",
  "Dangwa Flower Market":"Tayuman","SM City San Lazaro":"Tayuman","Manila North Cemetery":"Blumentritt",
  "Chinese General Hospital":"Abad Santos","La Loma Cemetery":"R. Papa",
  "Thai To Taoist Temple":"5th Avenue","SM City Grand Central":"Monumento","Bonifacio Monument":"Monumento",
  "Ayala Malls Cloverleaf":"Balintawak","Landers Superstore":"Balintawak","Muñoz Market":"Fernando Poe Jr.",

  /* LRT-2 */
  "Isetann Cinerama":"Recto","Raon Shopping Center":"Recto","QQ Mall":"Recto","Cartimar":"Recto","Arranque Market":"Recto",
  "San Beda University":"Legarda","Polytechnic University of the Philippines":"Pureza","EARIST":"Pureza","Puregold Jr.":"Pureza",
  "SM City Santa Mesa":"V. Mapa","UERM Medical Center":"V. Mapa",
  "San Juan City Hall":"J. Ruiz","Pinaglabanan Shrine":"J. Ruiz",
  "Robinsons Magnolia":"Gilmore","St. Paul University QC":"Gilmore","Gilmore IT Center":"Gilmore",
  "Kalayaan College":"Betty Go-Belmonte","Cubao Cathedral":"Betty Go-Belmonte",
  "Gateway Mall":"Araneta-Cubao","Smart Araneta Coliseum":"Araneta-Cubao","Farmers Plaza":"Araneta-Cubao","SM Cubao":"Araneta-Cubao",
  "TIP":"Anonas","Anonas City Center":"Anonas","World Citi Medical Center":"Anonas",
  "Ateneo de Manila University":"Katipunan","Miriam College":"Katipunan","UP Diliman":"Katipunan",
  "SM City Marikina":"Santolan","Riverbanks Center":"Santolan",
  "Robinsons Metro East":"Marikina-Pasig","Sta. Lucia East Grand Mall":"Marikina-Pasig",
  "SM City Masinag":"Antipolo","Cornel Medical Center":"Antipolo",

  /* MRT-3 */
  "Trinoma":"North Avenue","Vertis North":"North Avenue","SM City North EDSA":"North Avenue","Quezon Memorial Circle":"North Avenue","Ninoy Aquino Parks and Wildlife":"North Avenue","Veterans Memorial Medical Center":"North Avenue",
  "ABS-CBN":"Quezon Avenue","Philippine Science High School":"Quezon Avenue","PAGASA Complex":"Quezon Avenue","Eton Centris":"Quezon Avenue","Lung Center of the Philippines":"Quezon Avenue","UP Technohub":"Quezon Avenue",
  "GMA Network":"Kamuning","Land Transportation Office":"Kamuning","Philippine Statistics Authority":"Kamuning","Philippine Heart Center":"Kamuning","DPWH":"Kamuning",
  "Araneta Coliseum":"Araneta Center-Cubao","Ali Mall":"Araneta Center-Cubao","Cubao Expo":"Araneta Center-Cubao",
  "Camp Aguinaldo":"Santolan-Annapolis","Camp Crame":"Santolan-Annapolis","Greenhills Shopping Center":"Santolan-Annapolis","AFP Headquarters":"Santolan-Annapolis","PNP Headquarters":"Santolan-Annapolis",
  "SM Megamall":"Ortigas","The Podium":"Ortigas","Asian Development Bank":"Ortigas","St. Francis Square":"Ortigas","EDSA Shrine":"Ortigas","The Medical City":"Ortigas",
  "Shangri-La Plaza":"Shaw Boulevard","Greenfield District":"Shaw Boulevard","UA&P":"Shaw Boulevard","Capitol Commons":"Shaw Boulevard","PhilSports Arena":"Shaw Boulevard","DepEd":"Shaw Boulevard",
  "SM Light Residences":"Boni","Rizal Technological University":"Boni","VRP Medical Center":"Boni","TV5 Media Center":"Boni",
  "Power Plant Mall":"Guadalupe","Rockwell Center":"Guadalupe","Makati City Hall":"Guadalupe","University of Makati":"Guadalupe",
  "Makati CBD":"Buendia",
  "Glorietta":"Ayala","Greenbelt":"Ayala","Ayala Triangle Gardens":"Ayala","SM Makati":"Ayala","PSE":"Ayala",
  "Alphaland Southgate Mall":"Magallanes","Don Bosco Technical Institute":"Magallanes","Assumption College":"Magallanes","Asia Pacific College":"Magallanes",
  "World Trade Center":"Taft Avenue","SMX Convention Center":"Taft Avenue","San Juan de Dios Hospital":"Taft Avenue","Manila Tytana College":"Taft Avenue"
};

/* -------- BUILD GRAPH -------- */
const id2=Object.fromEntries(stationData.map(s=>[s.id,s]));
const graph={};stationData.forEach(s=>{graph[s.id]=[...s.n];if(s.t)s.t.forEach(tr=>graph[s.id].push(tr.to));});
function shortestPath(a,b){
  const q=[[a]],seen=new Set([a]);
  while(q.length){
    const p=q.shift(),cur=p.at(-1);
    if(cur===b)return p;
    for(const nb of graph[cur]||[]){
      if(!seen.has(nb)){seen.add(nb);q.push([...p,nb]);}
    }
  }
  return null;
}

/* -------- UI HELPERS -------- */
function fill(type){
  startOptions.innerHTML=endOptions.innerHTML='';
  const list=type==='station'?stationData.map(s=>s.id):Object.keys(landmarks);
  list.sort().forEach(v=>{
    startOptions.insertAdjacentHTML('beforeend',`<option value="${v}">`);
    endOptions.insertAdjacentHTML('beforeend',`<option value="${v}">`);
  });
  startLabel.textContent=type==='station'?'Start Station':'Start Landmark';
  endLabel.textContent  =type==='station'?'End Station'  :'End Landmark';
}
function setTheme(mode){
  document.documentElement.dataset.bsTheme = mode;
  localStorage.theme = mode;

  // navbar stays #333 so no toggle needed
  const footer = document.querySelector('footer');
  footer.classList.toggle('bg-dark',  mode==='dark');
  footer.classList.toggle('bg-light', mode==='light');

  // change toggle text
  themeLabel.textContent = mode==='dark' ? 'Light Mode' : 'Dark Mode';
}

/* -------- INIT -------- */
setTheme(localStorage.theme||'light');
themeToggle.checked=localStorage.theme==='dark';
themeToggle.onchange=e=>setTheme(e.target.checked?'dark':'light');
fill('station');
document.querySelectorAll('input[name="searchType"]').forEach(r=>r.onchange=e=>fill(e.target.value));

/* -------- TIPS ROTATION -------- */
const tips=[
  "Hold the handrail and keep clear of train doors.",
  "Arrive a few minutes early to avoid long queues.",
  "Keep valuables secure and be mindful of surroundings.",
  "Eating and drinking are not allowed on trains or platforms.",
  "Avoid blocking the doors while boarding or alighting.",
  "Let passengers exit before you enter the train.",
  "Use Beep™ cards to speed up boarding.",
  "Stand on the right side of escalators; walk on the left.",
  "Stay behind the yellow line until the train stops.",
  "Report unattended items or suspicious activity to staff.",
  "Click a station in the list to see its nearby landmarks.",
  "Click 📍 to auto-detect the nearest station.",
  "Click 🔖 to bookmark any trip for quick reuse.",



];
let tipIdx=0;function rotateTip(){commuterTip.textContent="🚉 Tip: "+tips[tipIdx];tipIdx=(tipIdx+1)%tips.length;}
setInterval(rotateTip,5000);

/* -------- FORM SUBMIT -------- */
tripForm.onsubmit=e=>{
  e.preventDefault();
  const mode=document.querySelector('input[name="searchType"]:checked').value;
  let s=startInput.value.trim(),d=endInput.value.trim();
  if(mode==='landmark'){s=landmarks[s];d=landmarks[d];}
  if(!id2[s]||!id2[d]) return alert('Pick valid inputs.');
  const path=shortestPath(s,d);
  if(!path) return alert('No route found.');

  timeline.innerHTML='';
  let prev=id2[path[0]].line,prevLi=null,transfers=0;
  path.forEach((st,i)=>{
   // add this line
    const o=id2[st],li=document.createElement('li');
    li.dataset.station = st;  
    li.className='list-group-item timeline-item d-flex justify-content-between align-items-center';
    if(i===0)li.classList.add('start-step');
    if(i===path.length-1)li.classList.add('end-step');
    const change=o.line!==prev;
    if(change){transfers++;li.classList.add('transfer-step');if(prevLi)prevLi.classList.add('transfer-step');}
    li.innerHTML=`<span><strong>${st}</strong> <span class="badge line-badge line-${o.line}">${o.line}</span> ${i===0?'🚩':i===path.length-1?'🏁':change?'🔁':''}</span><span class="badge rounded-pill">${i}</span>`;
    timeline.appendChild(li);
    prev=o.line;prevLi=li;
  });
  
  let lastRoute = {start:s, end:d};               // keep for bookmark

saveBtn.onclick = () => {
  const list = loadBookmarks();
  const exists = list.some(r => r.start === lastRoute.start && r.end === lastRoute.end);
  if (exists) {
    // show tooltip once
    const tt = bootstrap.Tooltip.getOrCreateInstance(saveBtn, {title:'Route already in bookmarks', trigger:'manual'});
    tt.show();
    setTimeout(()=>tt.hide(),1500);
    return;
  }
  const name = prompt('Bookmark name:', `${lastRoute.start} ➜ ${lastRoute.end}`);
  if(!name) return;
  list.push({...lastRoute, name});
  saveBookmarks(list);
  alert('Saved!');
};



  // enable landmark pop-up on each list item
timeline.querySelectorAll('.timeline-item').forEach(it=>{
  it.addEventListener('click',()=>showLandmarks(it.dataset.station));
});

  totalStops.textContent=path.length-1;
  totalTransfers.textContent=transfers;
  result.classList.remove('d-none');
  rotateTip();
  result.scrollIntoView({behavior:'smooth'});
};

function showLandmarks(station){
  const list = landmarkList;
  list.innerHTML = '';
  const nearby = Object.entries(landmarks)
                       .filter(([,st])=>st===station)
                       .map(([name])=>name);

  if(!nearby.length){
    list.innerHTML = '<li class="list-group-item">No landmarks recorded.</li>';
  }else{
    nearby.forEach(name=>{
      list.insertAdjacentHTML('beforeend',`<li class="list-group-item">${name}</li>`);
    });
  }

  landmarkModalLabel.textContent = `Landmarks near ${station}`;
  bootstrap.Modal.getOrCreateInstance(document.getElementById('landmarkModal')).show();
}

locBtn.addEventListener('click',()=>{
  if(!navigator.geolocation){
    alert('Geolocation not supported by your browser');
    return;
  }
  locBtn.disabled=true;
  navigator.geolocation.getCurrentPosition(
    pos=>{
      const {latitude,longitude}=pos.coords;
      const st = nearestStation(latitude,longitude);
      startInput.value = st;
      alert(`Nearest station detected: ${st}`);
      locBtn.disabled=false;
    },
    err=>{
      alert('Unable to retrieve location.');
      locBtn.disabled=false;
    },
    {enableHighAccuracy:true,timeout:8000}
  );
});

showBm.onclick = ()=>{
  renderBookmarks();
  bootstrap.Modal.getOrCreateInstance(bmModal).show();
};



function loadBookmarks(){
  return JSON.parse(localStorage.getItem('bookmarks') || '[]');
}
function saveBookmarks(arr){
  localStorage.setItem('bookmarks', JSON.stringify(arr));
}
function renderBookmarks(){
  const ul = bmList;
  ul.innerHTML = '';
  const bms = loadBookmarks();
  if(!bms.length){
    ul.innerHTML = '<li class="list-group-item">No saved routes yet.</li>';
    return;
  }
  bms.forEach((b,i)=>{
    ul.insertAdjacentHTML('beforeend',
      `<li class="list-group-item d-flex justify-content-between align-items-center">
         <button class="btn btn-link p-0 bm-load" data-start="${b.start}" data-end="${b.end}">
           ${b.name}<br><small class="text-muted">${b.start} ➜ ${b.end}</small>
         </button>
         <button class="btn btn-sm btn-danger bm-del" data-idx="${i}">✖</button>
       </li>`);
  });

  // load route
  ul.querySelectorAll('.bm-load').forEach(btn=>{
    btn.onclick = ()=>{
      startInput.value = btn.dataset.start;
      endInput.value   = btn.dataset.end;
      bootstrap.Modal.getInstance(bmModal).hide();
      tripForm.requestSubmit();        // reuse existing logic
    };
  });
  // delete route
  ul.querySelectorAll('.bm-del').forEach(btn=>{
    btn.onclick = ()=>{
      const arr = loadBookmarks();
      arr.splice(+btn.dataset.idx,1);
      saveBookmarks(arr);
      renderBookmarks();
    };
  });
}


