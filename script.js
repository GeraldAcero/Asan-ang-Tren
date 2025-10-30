

/* -------- ENHANCED FARE CALCULATION SYSTEM -------- */

// User preferences storage
const FARE_PREFS = {
  ticketType: 'SVC',
  passengerType: 'Regular',
  showUnifiedFare: false,
  showComparison: true
};

// Load user preferences from localStorage
function loadFarePreferences() {
  const saved = localStorage.getItem('farePreferences');
  if (saved) {
    Object.assign(FARE_PREFS, JSON.parse(saved));
  }
}

// Save user preferences to localStorage
function saveFarePreferences() {
  localStorage.setItem('farePreferences', JSON.stringify(FARE_PREFS));
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
}

// Calculate unified fare (Beep 2.0 simulation)
function calculateUnifiedFare(segments) {
  let totalDistance = 0;
  
  segments.forEach(seg => {
    const fromCoords = stationCoords[seg.from];
    const toCoords = stationCoords[seg.to];
    
    if (fromCoords && toCoords) {
      const distance = calculateDistance(
        fromCoords[0], fromCoords[1],
        toCoords[0], toCoords[1]
      );
      totalDistance += distance;
    }
  });
  
  // Unified fare formula: ₱15 base + ₱1.50/km
  const baseFare = 15;
  const perKmFare = 1.50;
  return Math.round(baseFare + (totalDistance * perKmFare));
}

// Enhanced fare calculation with all features
function computeFare(segments, { ticketType = 'SVC', discounted = false } = {}) {
  let total = 0;
  const breakdown = [];
  const transfers = [];
  const warnings = [];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const line = seg.line;
    const from = seg.from;
    const to = seg.to;

    // Skip if from and to are the same
    if (from === to) {
      console.warn(`Skipping same-station segment: ${line} ${from}→${to}`);
      continue;
    }

    const bucket = discounted ? 'DISCOUNT' : ticketType;
    const table = FARE[line]?.[bucket];

    if (!table?.[from]?.[to]) {
      console.warn(`Fare not found for ${line} ${from}→${to} (${bucket})`);
      // Try to find reverse fare
      if (table?.[to]?.[from]) {
        const fare = table[to][from];
        total += fare;
        breakdown.push({ line, ticketType: bucket, from, to, fare });
        console.log(`Using reverse fare for ${line} ${from}→${to}: ₱${fare}`);
      } else {
        console.error(`No fare available for ${line} ${from}→${to} (${bucket})`);
        warnings.push(`No ${bucket} fare available for ${line} ${from}→${to}`);
        continue;
      }
    } else {
      const fare = table[from][to];
      total += fare;
      breakdown.push({ line, ticketType: bucket, from, to, fare });
    }

    // Track transfers
    if (i < segments.length - 1) {
      const nextSeg = segments[i + 1];
      if (nextSeg.line !== line) {
        transfers.push(`${to} ↔ ${nextSeg.from}`);
      }
    }
  }

  return { 
    totalFare: total, 
    currency: 'PHP', 
    breakdown, 
    transfers, 
    warnings,
    unifiedFare: calculateUnifiedFare(segments)
  };
}

// Calculate all fare variants for comparison
function calculateAllFareVariants(segments) {
  const variants = {
    SJT: computeFare(segments, { ticketType: 'SJT', discounted: false }),
    SVC: computeFare(segments, { ticketType: 'SVC', discounted: false }),
    DISCOUNT: computeFare(segments, { ticketType: 'SVC', discounted: true })
  };
  
  // Find cheapest option
  const fares = [variants.SJT.totalFare, variants.SVC.totalFare, variants.DISCOUNT.totalFare];
  const minFare = Math.min(...fares);
  
  return {
    variants,
    cheapest: minFare,
    savings: {
      SJT: variants.SJT.totalFare - minFare,
      SVC: variants.SVC.totalFare - minFare,
      DISCOUNT: variants.DISCOUNT.totalFare - minFare
    }
  };
}

// Fare History Management
function loadFareHistory() {
  const saved = localStorage.getItem('fareHistory');
  return saved ? JSON.parse(saved) : [];
}

function saveFareHistory(history) {
  localStorage.setItem('fareHistory', JSON.stringify(history));
}

function addToFareHistory(start, end, fare, ticketType, discounted, segments) {
  const history = loadFareHistory();
  const newEntry = {
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    start,
    end,
    fare,
    ticketType,
    discounted,
    segments: segments.length,
    transfers: segments.length - 1
  };
  
  // Add to beginning and limit to 10 entries
  history.unshift(newEntry);
  if (history.length > 10) {
    history.splice(10);
  }
  
  saveFareHistory(history);
  return history;
}

function getFareHistoryStats(history) {
  if (history.length === 0) return null;
  
  const totalSpent = history.reduce((sum, entry) => sum + entry.fare, 0);
  const avgFare = Math.round(totalSpent / history.length);
  const thisMonth = history.filter(entry => {
    const entryDate = new Date(entry.date);
    const now = new Date();
    return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
  });
  const monthlySpent = thisMonth.reduce((sum, entry) => sum + entry.fare, 0);
  
  return {
    totalSpent,
    avgFare,
    monthlySpent,
    totalTrips: history.length,
    monthlyTrips: thisMonth.length
  };
}

function buildFareSegments(path) {
  const segments = [];
  
  if (path.length < 2) {
    console.warn('Path too short for fare calculation:', path);
    return segments;
  }

  // Group consecutive stations by line
  const lineGroups = [];
  let currentGroup = null;

  for (let i = 0; i < path.length; i++) {
    const station = path[i];
    const stationInfo = id2[station];
    
    if (!stationInfo) {
      console.warn('Station info not found for:', station);
      continue;
    }

    if (!currentGroup || currentGroup.line !== stationInfo.line) {
      // Start new line group
      if (currentGroup) {
        lineGroups.push(currentGroup);
      }
      currentGroup = {
        line: stationInfo.line,
        stations: [station]
      };
    } else {
      // Add to current group
      currentGroup.stations.push(station);
    }
  }

  // Add the last group
  if (currentGroup) {
    lineGroups.push(currentGroup);
  }

  console.log('Line groups:', lineGroups);

  // Create segments from line groups
  lineGroups.forEach(group => {
    if (group.stations.length >= 2) {
      // Multiple stations on same line - create segment from first to last
      segments.push({
        line: group.line,
        from: group.stations[0],
        to: group.stations[group.stations.length - 1]
      });
      console.log(`Added segment: ${group.line} ${group.stations[0]} → ${group.stations[group.stations.length - 1]}`);
    } else if (group.stations.length === 1 && lineGroups.length === 2) {
      // Direct transfer between two different lines - no train fare
      console.log(`Direct transfer detected: ${group.line} ${group.stations[0]} - no train fare`);
    } else if (group.stations.length === 1) {
      // Single station - this might be a transfer point, skip for now
      console.log(`Skipping single station group: ${group.line} ${group.stations[0]}`);
    }
  });

  console.log('Total segments created:', segments.length);
  return segments;
}

/* -------- FULL STATION LIST -------- */
const stationData=[
  /* LRT-1 */
  {id:'Dr. Santos',line:'LRT-1',n:['MIA Road']},
  {id:'MIA Road',line:'LRT-1',n:['Dr. Santos','PITX']},
  {id:'PITX',line:'LRT-1',n:['MIA Road','Ninoy Aquino Avenue']},
  {id:'Ninoy Aquino Avenue',line:'LRT-1',n:['PITX','Redemptorist-Aseana']},
  {id:'Redemptorist-Aseana',line:'LRT-1',n:['Ninoy Aquino Avenue','Baclaran']},
  {id:'Baclaran',line:'LRT-1',n:['Redemptorist-Aseana','EDSA']},
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
  "Dr. Santos":[14.520,120.985], "MIA Road":[14.525,120.990], "PITX":[14.530,120.992], 
  "Ninoy Aquino Avenue":[14.532,120.994], "Redemptorist-Aseana":[14.533,120.996],
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
  "SM City Sucat":"Dr. Santos","Olivarez College":"Dr. Santos","Olivarez General Hospital":"Dr. Santos","Premier Medical Center":"Dr. Santos","San Dionisio Barangay Hall":"Dr. Santos",
  "Ayala Malls Manila Bay":"MIA Road","Palacio de Memoria":"MIA Road","Martyrs' Memorial United Methodist Church":"MIA Road","SM MoA Arena":"MIA Road",
  "PITX Terminal":"PITX","Asia World":"PITX","Hotel Sogo Macapagal":"PITX","Parañaque Cathedral":"PITX",
  "Global Airport Business Park":"Ninoy Aquino Avenue","F2 Logistics":"Ninoy Aquino Avenue","NAIA Terminal 1":"Ninoy Aquino Avenue","Duty Free Philippines":"Ninoy Aquino Avenue","Fiestamall":"Ninoy Aquino Avenue","S&R Membership Shopping Parañaque":"Ninoy Aquino Avenue","Parañaque Science High School":"Ninoy Aquino Avenue","Santo Niño National High School":"Ninoy Aquino Avenue","La Huerta Elementary":"Ninoy Aquino Avenue","PUP Parañaque":"Ninoy Aquino Avenue",
  "Baclaran Church":"Redemptorist-Aseana","Redemptorist Church":"Redemptorist-Aseana","S&R Membership Shopping Aseana":"Redemptorist-Aseana","Seaside Market Baclaran":"Redemptorist-Aseana","DFA Consular Offices":"Redemptorist-Aseana",
  "Baclaran Market":"Baclaran","SM Mall of Asia":"Baclaran","NAIA":"Baclaran",
  "World Trade Center":"Gil Puyat","De La Salle University":"Vito Cruz","Cultural Center of the Philippines":"Vito Cruz","Rizal Memorial":"Vito Cruz",
  "Manila Zoo":"Quirino","Manila Baywalk":"Quirino","Robinsons Place Manila":"Pedro Gil","UP Manila":"Pedro Gil",
  "Luneta Park":"UN Avenue","National Museum":"UN Avenue","Intramuros":"Central Terminal","Rizal Park":"Central Terminal",
  "Binondo":"Carriedo","Quiapo Church":"Carriedo","Raon Shopping":"Carriedo",
  "University of Santo Tomas":"Doroteo Jose","SM Manila":"Doroteo Jose","Jose Reyes Medical Center":"Bambang",
  "Dangwa Flower Market":"Tayuman","SM City San Lazaro":"Tayuman","Manila North Cemetery":"Blumentritt",
  "Chinese General Hospital":"Abad Santos","La Loma Cemetery":"R. Papa",
  "Thai To Taoist Temple":"5th Avenue","SM City Grand Central":"Monumento","Bonifacio Monument":"Monumento",
  "Ayala Malls Cloverleaf":"Balintawak","Landers Superstore":"Balintawak","Muñoz Market":"Fernando Poe Jr.","WalterMart North EDSA":"Fernando Poe Jr.","SM North EDSA":"Fernando Poe Jr.","TriNoma":"Fernando Poe Jr.","S&R Congressional":"Fernando Poe Jr.",
  "Metro Point Mall":"EDSA","Adventist Medical Center Manila":"Gil Puyat","Padre Burgos Elementary School":"Libertad","Pasay City General Hospital":"Libertad",

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

  // footer color handling
  const footer = document.querySelector('footer');
  footer.classList.toggle('bg-dark',  mode==='dark');
  footer.classList.toggle('bg-light', mode==='light');

  // swap icon & tooltip
  themeIcon.src   = mode==='dark' ? 'sun.svg'  : 'moon_black.svg';
  themeIcon.title = mode==='dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

themeIcon.onclick = () => {
  const next = document.documentElement.dataset.bsTheme === 'dark' ? 'light' : 'dark';
  setTheme(next);
};

let lastRoute = { start:null, end:null }; 

function refreshSaveIcon(){
  const exists = loadBookmarks().some(r => r.start===lastRoute.start && r.end===lastRoute.end);
  saveIcon.src   = exists ? 'bookmark_filled.svg'   : 'bookmark_outline.svg';
  saveIcon.title = exists ? 'Route already saved'   : 'Save this route';
  return exists;
}
const shareIcon = document.getElementById('shareIcon');
// ---- update popup version control ----
const whatsNewModal = document.getElementById('whatsNewModal');
const hideUpdateModal = document.getElementById('hideUpdateModal');
const CURRENT_VERSION = '2.0';

// --- share-route elements ---
const shareNameModal = document.getElementById('shareNameModal');
const shareYourName  = document.getElementById('shareYourName');
const shareCopyBtn   = document.getElementById('shareCopyBtn');
const sharedByModal  = document.getElementById('sharedByModal');
const sharedByTitle  = document.getElementById('sharedByTitle');
const sharedByBody   = document.getElementById('sharedByBody');

let sharedByShown = false;
let pendingSharedBy = false;
let pendingDelIdx = null;
// --- delete confirmation ---
const confirmDelModal = document.getElementById('confirmDelModal');
const confirmDelBtn   = document.getElementById('confirmDelBtn');


const addBmModal   = document.getElementById('addBmModal');
const bmNameInput  = document.getElementById('bmNameInput');
const bmSaveBtn    = document.getElementById('bmSaveBtn');


/* -------- INIT -------- */
const qs = new URLSearchParams(location.search);
const shareSender = qs.get('n');   // name of friend

fill('station');
(()=>{
  const qs          = new URLSearchParams(location.search);
const shareSender = qs.get('n');          // friend’s name if any
const seenVersion = localStorage.getItem('seenVersion');

if(seenVersion !== CURRENT_VERSION){      // show 📣 update first
  pendingSharedBy = !!shareSender;        // defer friend popup
  const upd = bootstrap.Modal.getOrCreateInstance(whatsNewModal);
  upd.show();
  whatsNewModal.addEventListener('hidden.bs.modal', () => {
    if(hideUpdateModal.checked){
      localStorage.setItem('seenVersion', CURRENT_VERSION);
    }
    if(pendingSharedBy) showSharedBy(shareSender);
  }, { once:true });
}else if(shareSender){
  showSharedBy(shareSender);              // show immediately
}

})();
document.querySelectorAll('input[name="searchType"]').forEach(r=>r.onchange=e=>fill(e.target.value));
// ---- show popup only once per version ----

function showSharedBy(name){
  if(sharedByShown) return;          // never show twice
  sharedByTitle.textContent = `${name} shared this route with you`;
  sharedByBody.innerHTML    = `<p class="mb-0">Happy commuting!</p>`;
  bootstrap.Modal.getOrCreateInstance(sharedByModal).show();
  sharedByShown = true;

  /* drop &n=... from the URL so future actions don’t trigger again */
  const url = new URL(location);
  url.searchParams.delete('n');
  history.replaceState(null, '', url.pathname + url.search);
}



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
  "Click 🔗 to copy a link you can share with friends.",



];
let tipIdx=0;function rotateTip(){commuterTip.textContent="🚉 Tip: "+tips[tipIdx];tipIdx=(tipIdx+1)%tips.length;}
setInterval(rotateTip,5000);


/* -------- FORM SUBMIT -------- */
tripForm.onsubmit=e=>{
  e.preventDefault();
  
  // Hide fare display card when starting new search
  const fareDisplayCard = document.getElementById('fareDisplayCard');
  fareDisplayCard.style.display = 'none';
  
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

  // Calculate fare with enhanced system
  console.log('Calculating fare for path:', path);
  const fareSegments = buildFareSegments(path);
  console.log('Fare segments:', fareSegments);
  
  // Load user preferences
  loadFarePreferences();
  
  // Calculate fare based on user preferences
  const discounted = FARE_PREFS.passengerType !== 'Regular';
  const fareResult = computeFare(fareSegments, { 
    ticketType: FARE_PREFS.ticketType, 
    discounted: discounted 
  });
  console.log('Fare result:', fareResult);
  
  // Calculate all variants for comparison
  const allVariants = calculateAllFareVariants(fareSegments);
  
  // Add to fare history
  addToFareHistory(s, d, fareResult.totalFare, FARE_PREFS.ticketType, discounted, fareSegments);
  
  // Show fare display card and populate content
  const fareDisplayContent = document.getElementById('fareDisplayContent');
  
  if (fareResult.totalFare > 0) {
    const passengerTypeLabel = FARE_PREFS.passengerType !== 'Regular' ? ` (${FARE_PREFS.passengerType})` : '';
    const ticketTypeLabel = FARE_PREFS.ticketType === 'SVC' ? 'Beep Card' : 'Single Journey';
    
    fareDisplayContent.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div>
          <strong>💰 Estimated Fare:</strong> ₱${fareResult.totalFare} (${ticketTypeLabel}${passengerTypeLabel})
          ${fareResult.transfers.length > 0 ? `<br><small>Transfers: ${fareResult.transfers.join(', ')}</small>` : ''}
        </div>
        <div>
          <button class="btn btn-sm btn-outline-primary me-2" onclick="showFareBreakdown()">View Breakdown</button>
          <button class="btn btn-sm btn-outline-secondary" onclick="showFareHistory()">📊 History</button>
        </div>
      </div>
      
      ${FARE_PREFS.showComparison ? `
        <div class="mt-3">
          <h6 class="mb-2">💳 Fare Comparison</h6>
          <div class="table-responsive">
            <table class="table table-sm table-borderless mb-0">
              <tbody>
                <tr class="${allVariants.savings.SVC === 0 ? 'table-success' : ''}">
                  <td>💳 Stored Value (Beep)</td>
                  <td class="text-end">₱${allVariants.variants.SVC.totalFare}</td>
                  <td class="text-end">${allVariants.savings.SVC === 0 ? '✅ Cheapest' : `+₱${allVariants.savings.SVC}`}</td>
                </tr>
                <tr class="${allVariants.savings.SJT === 0 ? 'table-success' : ''}">
                  <td>🎟️ Single Journey</td>
                  <td class="text-end">₱${allVariants.variants.SJT.totalFare}</td>
                  <td class="text-end">${allVariants.savings.SJT === 0 ? '✅ Cheapest' : `+₱${allVariants.savings.SJT}`}</td>
                </tr>
                <tr class="${allVariants.savings.DISCOUNT === 0 ? 'table-success' : ''}">
                  <td>🧓 Discounted</td>
                  <td class="text-end">₱${allVariants.variants.DISCOUNT.totalFare}</td>
                  <td class="text-end">${allVariants.savings.DISCOUNT === 0 ? '✅ Cheapest' : `+₱${allVariants.savings.DISCOUNT}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
      
      ${FARE_PREFS.showUnifiedFare ? `
        <div class="mt-3">
          <h6 class="mb-2">🔄 Beep 2.0 Simulation</h6>
          <div class="d-flex justify-content-between align-items-center">
            <span>Unified Fare Estimate:</span>
            <span class="fw-bold">₱${fareResult.unifiedFare}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <span>Current Separate Fare:</span>
            <span>₱${fareResult.totalFare}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <span>Potential Savings:</span>
            <span class="${fareResult.unifiedFare < fareResult.totalFare ? 'text-success' : 'text-warning'}">
              ₱${Math.abs(fareResult.unifiedFare - fareResult.totalFare)} ${fareResult.unifiedFare < fareResult.totalFare ? 'saved' : 'more'}
            </span>
          </div>
          <small class="text-muted">Simulation only – actual unified fare TBD</small>
        </div>
      ` : ''}
      
      <div class="mt-2">
        <button class="btn btn-sm btn-outline-info me-2" onclick="showFareSettings()">⚙️ Settings</button>
        <button class="btn btn-sm btn-outline-secondary" onclick="toggleFareComparison()">
          ${FARE_PREFS.showComparison ? 'Hide' : 'Show'} Comparison
        </button>
        ${FARE_PREFS.passengerType === 'Regular' ? `
          <button class="btn btn-sm btn-outline-warning ms-2" onclick="toggleUnifiedFare()">
            ${FARE_PREFS.showUnifiedFare ? 'Hide' : 'Show'} Beep 2.0
          </button>
        ` : ''}
      </div>
      
      <small class="text-muted">Fares based on official matrices; actual fare may vary due to operator updates.</small>
    `;
  } else if (fareSegments.length === 0) {
    // Direct transfer - no train fare
    fareDisplayContent.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>🚶 Direct Transfer:</strong> <span class="text-info">No train fare</span>
          <br><small>Walk between stations - no train required</small>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-secondary" disabled>View Breakdown</button>
        </div>
      </div>
      <small class="text-muted">This route involves walking between stations without taking a train.</small>
    `;
  } else {
    fareDisplayContent.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>💰 Fare Calculation:</strong> <span class="text-warning">Unable to calculate fare</span>
          <br><small>Please check console for details</small>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-secondary" disabled>View Breakdown</button>
        </div>
      </div>
      <small class="text-muted">Fare calculation encountered an error. Please try a different route.</small>
    `;
  }
  
  // Show the fare display card
  fareDisplayCard.style.display = 'block';

  // Store fare data for breakdown modal
  window.currentFareSegments = fareSegments;
  window.currentFareResult = fareResult;

  lastRoute.start = s;   // update global
  lastRoute.end   = d;
  refreshSaveIcon();   // sync icon for this route
  // --- share-link setup ---
const shareUrl =
  `${location.origin}${location.pathname}?s=${encodeURIComponent(lastRoute.start)}&e=${encodeURIComponent(lastRoute.end)}`;

shareIcon.classList.remove('d-none');   // reveal the button
shareIcon.title = "Copy shareable link";
shareIcon.onclick = ()=>{
  shareYourName.value = localStorage.getItem('shareName') || '';
  bootstrap.Modal.getOrCreateInstance(shareNameModal).show();
};

shareCopyBtn.onclick = ()=>{
  const raw = shareYourName.value.trim();
const name = raw || 'a commuter';
localStorage.setItem('shareName', raw);   // store only what user typed

const shareUrl =
  `${location.origin}${location.pathname}?s=${encodeURIComponent(lastRoute.start)}&e=${encodeURIComponent(lastRoute.end)}&n=${encodeURIComponent(name)}`;

navigator.clipboard.writeText(shareUrl).then(()=>{
  bootstrap.Modal.getInstance(shareNameModal).hide();
});

};




saveIcon.onclick = ()=>{
  if(refreshSaveIcon()){              // already exists
    const tt = bootstrap.Tooltip.getOrCreateInstance(saveIcon,{title:'Already in bookmarks',trigger:'manual'});
    tt.show(); setTimeout(()=>tt.hide(),1500);
    return;
  }
  bmNameInput.value = `${lastRoute.start} ➜ ${lastRoute.end}`;
  bootstrap.Modal.getOrCreateInstance(addBmModal).show();
};

/* save-button inside modal */
bmSaveBtn.onclick = ()=>{
  const name = bmNameInput.value.trim() || `${lastRoute.start} ➜ ${lastRoute.end}`;
  const list = loadBookmarks();
  list.push({...lastRoute,name});
  saveBookmarks(list);
  bootstrap.Modal.getInstance(addBmModal).hide();
  refreshSaveIcon();
  alert('Saved!');
};

   // sync icon for this route




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

// --- auto-load ?s=Start&e=End links ---
(()=>{
  const p = new URLSearchParams(location.search);
  const qsStart = p.get('s'), qsEnd = p.get('e');
  if(qsStart && qsEnd){
    startInput.value = qsStart;
    endInput.value   = qsEnd;
    byStation.checked = true;         // ensure correct mode
    tripForm.requestSubmit();         // draw timeline automatically
  }
})();

/* -------- AUTO-LOAD FROM URL AFTER HANDLERS ARE READY -------- */
(()=>{
  const p = new URLSearchParams(location.search);
  const qsStart = p.get('s'), qsEnd = p.get('e');
  if(!(qsStart && qsEnd)) return;    // nothing to do

  // Pre-fill inputs with values from the URL
  startInput.value = qsStart;
  endInput.value   = qsEnd;

  // Decide which search mode matches the parameters
  const isStation = id2[qsStart] && id2[qsEnd];
  byStation.checked  = isStation;
  byLandmark.checked = !isStation;

  // Update datalist to match the chosen mode
  fill(isStation ? 'station' : 'landmark');

  // Now that onsubmit is wired, trigger a fake submit to draw the route
  tripForm.requestSubmit();
})();


function showLandmarks(station){
  const list = landmarkList;
  list.innerHTML = '';
  const nearby = Object.entries(landmarks)
                       .filter(([,st])=>st===station)
                       .map(([name])=>name);

  if(!nearby.length){
    list.innerHTML = '<li class="list-group-item">No landmarks recorded.</li>';
  }else{
    nearby.forEach((name, idx)=>{
  const info  = landmarkInfo[station]?.[name] || {};
  const walk  = info.walk ? `<br><small class="text-muted">${info.walk}</small>` : '';

  const hasMap = !!info.map;
 const mapBtn = hasMap ? `
    <button class="btn btn-sm btn-outline-secondary map-btn"
            data-bs-toggle="collapse" data-bs-target="#map-${idx}">
      See map
    </button>` : '';


  const mapDiv = hasMap ? `
      <div id="map-${idx}" class="collapse mt-2">
        <div class="ratio ratio-4x3 landmark-map-wrap">
          ${info.map}
        </div>
      </div>` : '';

  list.insertAdjacentHTML('beforeend', `
    <li class="list-group-item">
      <div class="landmark-row">
        <span>${name}${walk}</span>
        ${mapBtn}
      </div>
      ${mapDiv}
    </li>`);
});



  }

  landmarkModalLabel.textContent = `Landmarks near ${station}`;
  const modalEl = document.getElementById('landmarkModal');

/* move modal to <body> the first time it’s shown */
if (modalEl.parentNode !== document.body) {
  document.body.appendChild(modalEl);
}

bootstrap.Modal.getOrCreateInstance(modalEl).show();


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
    tripForm.requestSubmit();   // redraw timeline
    refreshSaveIcon();          // <<< NEW: update bookmark icon state
  };
});

  // delete route
  // delete route
ul.querySelectorAll('.bm-del').forEach(btn=>{
  btn.onclick = ()=>{
    pendingDelIdx = +btn.dataset.idx;
    bootstrap.Modal.getOrCreateInstance(confirmDelModal).show();
  };
});

}

confirmDelBtn.onclick = ()=>{
  if(pendingDelIdx===null) return;
  const arr = loadBookmarks();
  arr.splice(pendingDelIdx,1);
  saveBookmarks(arr);
  pendingDelIdx = null;
  bootstrap.Modal.getInstance(confirmDelModal).hide();
  renderBookmarks();                 // refresh list
};

/* -------- FARE BREAKDOWN FUNCTIONS -------- */
function showFareBreakdown() {
  if (!window.currentFareSegments) return;
  
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('fareBreakdownModal'));
  updateFareBreakdown();
  modal.show();
}

function updateFareBreakdown() {
  if (!window.currentFareSegments) return;
  
  const ticketType = document.querySelector('input[name="ticketType"]:checked').value;
  const discounted = document.getElementById('discountToggle').checked;
  
  const fareResult = computeFare(window.currentFareSegments, { ticketType, discounted });
  const content = document.getElementById('fareBreakdownContent');
  
  let html = `
    <div class="alert alert-success">
      <h6 class="mb-0">💰 Total Fare: ₱${fareResult.totalFare} ${fareResult.currency}</h6>
      <small>Ticket Type: ${ticketType}${discounted ? ' (Discounted)' : ''}</small>
    </div>
    <h6>Fare Breakdown:</h6>
    <div class="table-responsive">
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Line</th>
            <th>From</th>
            <th>To</th>
            <th>Fare</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  fareResult.breakdown.forEach(segment => {
    html += `
      <tr>
        <td><span class="badge line-badge line-${segment.line}">${segment.line}</span></td>
        <td>${segment.from}</td>
        <td>${segment.to}</td>
        <td>₱${segment.fare}</td>
      </tr>
    `;
  });
  
  html += `
        </tbody>
      </table>
    </div>
  `;
  
  if (fareResult.transfers.length > 0) {
    html += `
      <div class="alert alert-warning">
        <strong>Transfers:</strong> ${fareResult.transfers.join(', ')}
      </div>
    `;
  }
  
  content.innerHTML = html;
}

// Enhanced fare system functions
function showFareSettings() {
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('fareSettingsModal'));
  
  // Load current settings
  loadFarePreferences();
  document.getElementById('passengerTypeSelect').value = FARE_PREFS.passengerType;
  document.querySelector(`input[name="defaultTicketType"][value="${FARE_PREFS.ticketType}"]`).checked = true;
  document.getElementById('showComparisonToggle').checked = FARE_PREFS.showComparison;
  document.getElementById('showUnifiedFareToggle').checked = FARE_PREFS.showUnifiedFare;
  
  modal.show();
}

function saveFareSettings() {
  FARE_PREFS.passengerType = document.getElementById('passengerTypeSelect').value;
  FARE_PREFS.ticketType = document.querySelector('input[name="defaultTicketType"]:checked').value;
  FARE_PREFS.showComparison = document.getElementById('showComparisonToggle').checked;
  FARE_PREFS.showUnifiedFare = document.getElementById('showUnifiedFareToggle').checked;
  
  saveFarePreferences();
  bootstrap.Modal.getInstance(document.getElementById('fareSettingsModal')).hide();
  
  // Refresh current route if available
  if (window.currentFareSegments) {
    // Trigger form submission to recalculate
    document.getElementById('tripForm').dispatchEvent(new Event('submit'));
  }
}

function showFareHistory() {
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('fareHistoryModal'));
  const history = loadFareHistory();
  const stats = getFareHistoryStats(history);
  
  // Display stats
  const statsDiv = document.getElementById('fareHistoryStats');
  if (stats) {
    statsDiv.innerHTML = `
      <div class="row text-center">
        <div class="col-3">
          <div class="h5 mb-0">₱${stats.totalSpent}</div>
          <small class="text-muted">Total Spent</small>
        </div>
        <div class="col-3">
          <div class="h5 mb-0">₱${stats.avgFare}</div>
          <small class="text-muted">Avg Fare</small>
        </div>
        <div class="col-3">
          <div class="h5 mb-0">₱${stats.monthlySpent}</div>
          <small class="text-muted">This Month</small>
        </div>
        <div class="col-3">
          <div class="h5 mb-0">${stats.totalTrips}</div>
          <small class="text-muted">Total Trips</small>
        </div>
      </div>
    `;
  } else {
    statsDiv.innerHTML = '<p class="text-muted text-center">No fare history yet</p>';
  }
  
  // Display history
  const contentDiv = document.getElementById('fareHistoryContent');
  if (history.length === 0) {
    contentDiv.innerHTML = '<p class="text-muted text-center">No trips recorded yet</p>';
  } else {
    let html = '<div class="list-group">';
    history.forEach((entry, index) => {
      const discountLabel = entry.discounted ? ` (${entry.ticketType === 'SVC' ? 'Discounted' : 'Student/Senior/PWD'})` : '';
      const transferLabel = entry.transfers > 0 ? ` • ${entry.transfers} transfer${entry.transfers > 1 ? 's' : ''}` : '';
      html += `
        <div class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>${entry.start} → ${entry.end}</strong>
            <br><small class="text-muted">${entry.date} at ${entry.time}${transferLabel}</small>
          </div>
          <div class="text-end">
            <span class="h6 mb-0">₱${entry.fare}</span>
            <br><small class="text-muted">${entry.ticketType}${discountLabel}</small>
          </div>
        </div>
      `;
    });
    html += '</div>';
    contentDiv.innerHTML = html;
  }
  
  modal.show();
}

function clearFareHistory() {
  if (confirm('Are you sure you want to clear all fare history?')) {
    localStorage.removeItem('fareHistory');
    showFareHistory(); // Refresh the modal
  }
}

function toggleFareComparison() {
  FARE_PREFS.showComparison = !FARE_PREFS.showComparison;
  saveFarePreferences();
  
  // Refresh current route if available
  if (window.currentFareSegments) {
    document.getElementById('tripForm').dispatchEvent(new Event('submit'));
  }
}

function toggleUnifiedFare() {
  FARE_PREFS.showUnifiedFare = !FARE_PREFS.showUnifiedFare;
  saveFarePreferences();
  
  // Refresh current route if available
  if (window.currentFareSegments) {
    document.getElementById('tripForm').dispatchEvent(new Event('submit'));
  }
}

function closeFareDisplay() {
  const fareDisplayCard = document.getElementById('fareDisplayCard');
  fareDisplayCard.style.display = 'none';
}

// Add event listeners for fare breakdown modal
document.addEventListener('DOMContentLoaded', function() {
  const ticketTypeRadios = document.querySelectorAll('input[name="ticketType"]');
  const discountToggle = document.getElementById('discountToggle');
  
  ticketTypeRadios.forEach(radio => {
    radio.addEventListener('change', updateFareBreakdown);
  });
  
  if (discountToggle) {
    discountToggle.addEventListener('change', updateFareBreakdown);
  }
  
  // Load preferences on page load
  loadFarePreferences();
});


