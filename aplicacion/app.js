const SHAPES=[
{id:"rectangle",label:"Rectángulo",icon:"▭",fields:[["a","Base","#4f35e8"],["b","Altura","#ff3d6b"]]},
{id:"triangle",label:"Triángulo",icon:"△",fields:[["b","Base","#4f35e8"],["h","Altura","#ff3d6b"],["a","Lado a","#7c5cff"],["c","Lado c","#ff7c5c"]]},
{id:"circle",label:"Círculo",icon:"○",fields:[["r","Radio","#ff3d6b"]]},
{id:"square",label:"Cuadrado",icon:"□",fields:[["a","Lado","#4f35e8"]]},
{id:"trapezoid",label:"Trapecio",icon:"⏢",fields:[["a","Base mayor","#4f35e8"],["b","Base menor","#ff3d6b"],["h","Altura","#22c55e"],["c","Lado c","#7c5cff"],["d","Lado d","#ff7c5c"]]},
{id:"rhombus",label:"Rombo",icon:"◇",fields:[["d1","Diagonal 1","#4f35e8"],["d2","Diagonal 2","#ff3d6b"],["l","Lado","#7c5cff"]]}
];
const UNITS=[["mm","Milímetros"],["cm","Centímetros"],["dm","Decímetros"],["m","Metros"],["km","Kilómetros"],["in","Pulgadas"],["ft","Pies"]];
let shape="rectangle",unit="cm",pythMode="hyp";
const $=id=>document.getElementById(id);
const fmt=n=>Number(n).toFixed(6).replace(/\.?0+$/,"");
function unitShort(){return unit}
function renderShapeMenu(){
 $("shapeMenu").innerHTML=SHAPES.map((s,i)=>`<div class="shape-item ${i===0?'active':''}" data-id="${s.id}"><div class="shape-icon">${s.icon}</div><div><b>${s.label}</b><small>Área y Perímetro</small></div></div>`).join("");
 $("shapeButtons").innerHTML=SHAPES.map(s=>`<button data-shape="${s.id}" class="${s.id===shape?'active':''}"><span>${s.icon}</span><small>${s.label}</small></button>`).join("");
 document.querySelectorAll("[data-shape]").forEach(b=>b.onclick=()=>{shape=b.dataset.shape;renderShape();});
}
function renderUnits(target,accent="purple"){
 $(target).innerHTML=UNITS.map(u=>`<button class="${u[0]===unit?'active':''}" data-unit="${u[0]}"><b>${u[0]}</b><small>${u[1].split(" ")[0]}</small></button>`).join("");
 document.querySelectorAll(`#${target} [data-unit]`).forEach(b=>b.onclick=()=>{unit=b.dataset.unit;renderUnits("unitButtons");renderUnits("pythUnits");renderFields();renderPythFields();});
}
function renderShape(){
 const s=SHAPES.find(x=>x.id===shape);
 $("shapeTitle").textContent=s.label;
 $("fields").innerHTML=s.fields.map(f=>`<div class="field"><label style="color:${f[2]}">${f[1]}</label><input id="g_${f[0]}" type="number" min="0.000001" step="any" placeholder="0" required><span class="suffix" style="color:${f[2]}">${unitShort()}</span></div>`).join("");
 $("diagram").textContent=s.icon;
 document.querySelectorAll("[data-shape]").forEach(b=>b.classList.toggle("active",b.dataset.shape===shape));
 document.querySelectorAll(".shape-item").forEach((b,i)=>b.classList.toggle("active",SHAPES[i].id===shape));
}
function renderFields(){renderShape()}
function calculateGeometry(e){
 e.preventDefault();
 const s=SHAPES.find(x=>x.id===shape), v={};
 for(const f of s.fields){v[f[0]]=parseFloat($("g_"+f[0]).value);if(!v[f[0]]||v[f[0]]<=0)return;}
 let area=0,per=0,formula="";
 if(shape==="rectangle"){area=v.a*v.b;per=2*(v.a+v.b);formula=`Área = a × b = ${fmt(v.a)} × ${fmt(v.b)} = ${fmt(area)} ${unit}²\\nPerímetro = 2(a+b) = ${fmt(per)} ${unit}`;}
 if(shape==="triangle"){area=v.b*v.h/2;per=v.a+v.b+v.c;formula=`Área = (b × h) / 2 = ${fmt(area)} ${unit}²\\nPerímetro = a + b + c = ${fmt(per)} ${unit}`;}
 if(shape==="circle"){area=Math.PI*v.r*v.r;per=2*Math.PI*v.r;formula=`Área = πr² = ${fmt(area)} ${unit}²\\nCircunferencia = 2πr = ${fmt(per)} ${unit}`;}
 if(shape==="square"){area=v.a*v.a;per=4*v.a;formula=`Área = a² = ${fmt(area)} ${unit}²\\nPerímetro = 4a = ${fmt(per)} ${unit}`;}
 if(shape==="trapezoid"){area=((v.a+v.b)/2)*v.h;per=v.a+v.b+v.c+v.d;formula=`Área = ((a+b) × h) / 2 = ${fmt(area)} ${unit}²\\nPerímetro = a+b+c+d = ${fmt(per)} ${unit}`;}
 if(shape==="rhombus"){area=v.d1*v.d2/2;per=4*v.l;formula=`Área = (d1 × d2) / 2 = ${fmt(area)} ${unit}²\\nPerímetro = 4l = ${fmt(per)} ${unit}`;}
 showModal(`✦ Resultados — ${s.label}`,`<div class="result"><div>ÁREA</div><div class="value">${fmt(area)}</div><div>${unit}²</div></div><div class="formula">${formula}</div><button class="modal-ok" onclick="closeModal()">¡Entendido!</button>`);
}
function renderPythFields(){
 const fields=pythMode==="hyp"?[["p1","Cateto a","#4f35e8"],["p2","Cateto b","#ff3d6b"]]:[["p1","Hipotenusa (c)","#4f35e8"],["p2","Cateto conocido","#ff3d6b"]];
 $("pythFields").innerHTML=fields.map(f=>`<div class="field"><label style="color:${f[2]}">${f[1]}</label><input id="${f[0]}" type="number" min="0.000001" step="any" placeholder="0" required><span class="suffix" style="color:${f[2]}">${unit}</span></div>`).join("");
 $("modeHyp").classList.toggle("active",pythMode==="hyp");$("modeLeg").classList.toggle("active",pythMode==="leg");
}
function calculatePyth(e){
 e.preventDefault();const a=parseFloat($("p1").value),b=parseFloat($("p2").value);if(!a||!b||a<=0||b<=0)return;
 if(pythMode==="hyp"){const c=Math.sqrt(a*a+b*b);showModal("✦ Teorema de Pitágoras",`<div class="result"><div>HIPOTENUSA (c)</div><div class="value">${fmt(c)}</div><div>${unit}</div></div><div class="formula">c = √(a² + b²) = √(${fmt(a)}² + ${fmt(b)}²) = ${fmt(c)} ${unit}</div><button class="modal-ok" onclick="closeModal()">¡Entendido!</button>`);}
 else {if(b>=a){showModal("Dato no válido",`<div class="formula">La hipotenusa debe ser mayor que el cateto conocido.</div><button class="modal-ok" onclick="closeModal()">Entendido</button>`);return;}const leg=Math.sqrt(a*a-b*b);showModal("✦ Teorema de Pitágoras",`<div class="result"><div>CATETO DESCONOCIDO</div><div class="value">${fmt(leg)}</div><div>${unit}</div></div><div class="formula">cateto = √(c² − b²) = ${fmt(leg)} ${unit}</div><button class="modal-ok" onclick="closeModal()">¡Entendido!</button>`);}
}
function showModal(title,body){$("modalTitle").textContent=title;$("modalBody").innerHTML=body;$("modal").classList.add("show")}
function closeModal(){$("modal").classList.remove("show")}
renderShapeMenu();renderUnits("unitButtons");renderUnits("pythUnits");renderPythFields();
$("geometryForm").onsubmit=calculateGeometry;$("clearGeo").onclick=()=>{ $("geometryForm").reset();renderShape();};
$("pythForm").onsubmit=calculatePyth;$("clearPyth").onclick=()=>{$("pythForm").reset();renderPythFields()};
$("modeHyp").onclick=()=>{pythMode="hyp";renderPythFields()};$("modeLeg").onclick=()=>{pythMode="leg";renderPythFields()};
$("closeModal").onclick=closeModal;$("modal").onclick=e=>{if(e.target===$("modal"))closeModal()};
const search=$("search"),sr=$("searchResults");
search.oninput=()=>{const q=search.value.toLowerCase().trim();if(!q){sr.style.display="none";return}const found=SHAPES.filter(s=>s.label.toLowerCase().includes(q));sr.innerHTML=found.map(s=>`<button onclick="shape='${s.id}';renderShape();sr.style.display='none';document.querySelector('#actividades').scrollIntoView()">${s.icon}　${s.label}</button>`).join("")||"<button>Sin resultados</button>";sr.style.display="block"};
document.addEventListener("click",e=>{if(!e.target.closest(".search-wrap"))sr.style.display="none"});
