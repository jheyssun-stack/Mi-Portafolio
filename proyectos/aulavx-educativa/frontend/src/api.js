import {validateStudent,validateCourse,formatGrade} from './logic.js';
const DEMO_KEY='aulavx-demo-v1',TOKEN='aulavx-token',USER='aulavx-user';
const seed=()=>({students:[{id:1,code:'2026001',firstName:'Luis',lastName:'Quispe',email:'luis.quispe@aulavx.edu',program:'Ingeniería de Sistemas',active:true},{id:2,code:'2026002',firstName:'Camila',lastName:'Rojas',email:'camila.rojas@aulavx.edu',program:'Ingeniería de Sistemas',active:true},{id:3,code:'2026003',firstName:'Mateo',lastName:'Huamán',email:'mateo.huaman@aulavx.edu',program:'Administración',active:true}],courses:[{id:1,code:'SIS101',name:'Fundamentos de programación',description:'Algoritmos y Java',credits:4,active:true},{id:2,code:'SIS204',name:'Base de datos I',description:'Modelo relacional y SQL',credits:4,active:true},{id:3,code:'SIS221',name:'Desarrollo web',description:'React y API REST',credits:3,active:true}],enrollments:[{id:1,studentId:1,studentName:'Luis Quispe',studentCode:'2026001',courseId:1,courseName:'Fundamentos de programación',courseCode:'SIS101',term:'2026-1',status:'ACTIVE',createdAt:'2026-03-15'}],grades:[{id:1,enrollmentId:1,studentName:'Luis Quispe',studentCode:'2026001',courseName:'Fundamentos de programación',title:'Práctica 1',score:17.5,maxScore:20,gradedAt:'2026-04-10'}],nextId:{students:4,courses:4,enrollments:2,grades:2}});
function getDemo(){try{return JSON.parse(localStorage.getItem(DEMO_KEY))||seed()}catch{return seed()}}
function saveDemo(db){localStorage.setItem(DEMO_KEY,JSON.stringify(db));}
function demoRequest(path,options={}){
 const db=getDemo(),url=new URL(path,'http://demo.local'),parts=url.pathname.replace(/^\/api\/?/,'').split('/').filter(Boolean),method=(options.method||'GET').toUpperCase();
 if(parts[0]==='dashboard')return Promise.resolve({students:db.students.length,activeStudents:db.students.filter(x=>x.active).length,courses:db.courses.length,enrollments:db.enrollments.length,grades:db.grades.length,average:db.grades.length?Math.round(db.grades.reduce((a,g)=>a+formatGrade(g.score,g.maxScore),0)/db.grades.length*100)/100:0});
 const key=parts[0];if(!['students','courses','enrollments','grades'].includes(key))return Promise.reject(new Error('Ruta no disponible en la demostración.'));
 if(method==='GET'){let rows=db[key];const q=(url.searchParams.get('q')||'').toLowerCase();if(q)rows=rows.filter(r=>JSON.stringify(r).toLowerCase().includes(q));return Promise.resolve(rows);}
 const body=options.body?JSON.parse(options.body):{};let id=parts[1]?Number(parts[1]):null;
 if(method==='POST'||method==='PUT'){
   if(key==='students')validateStudent(body);if(key==='courses')validateCourse(body);
   if(key==='grades'&&Number(body.score)>Number(body.maxScore))return Promise.reject(new Error('La nota no puede superar la nota máxima.'));
   if(key==='enrollments'){
     const student=db.students.find(x=>x.id===Number(body.studentId)),course=db.courses.find(x=>x.id===Number(body.courseId));if(!student||!course)return Promise.reject(new Error('Selecciona un estudiante y un curso existentes.'));
     if(method==='POST'&&db.enrollments.some(x=>x.studentId===student.id&&x.courseId===course.id&&x.term===body.term))return Promise.reject(new Error('Ya existe esa matrícula para el periodo.'));
     Object.assign(body,{studentId:student.id,studentName:`${student.firstName} ${student.lastName}`,studentCode:student.code,courseId:course.id,courseName:course.name,courseCode:course.code,status:body.status||'ACTIVE'});
   }
   if(key==='grades'){
     const enrollment=db.enrollments.find(x=>x.id===Number(body.enrollmentId));if(!enrollment)return Promise.reject(new Error('Selecciona una matrícula existente.'));Object.assign(body,{enrollmentId:enrollment.id,studentName:enrollment.studentName,studentCode:enrollment.studentCode,courseName:enrollment.courseName,score:Number(body.score),maxScore:Number(body.maxScore),gradedAt:body.gradedAt||new Date().toISOString().slice(0,10)});
   }
   let row={...body,id:id||db.nextId[key]++};if(method==='PUT'&&id){const at=db[key].findIndex(x=>x.id===id);if(at<0)return Promise.reject(new Error('Registro no encontrado.'));db[key][at]=row;}else db[key].push(row);saveDemo(db);return Promise.resolve(row);
 }
 if(method==='DELETE'){
   if(key==='students'||key==='courses'){const row=db[key].find(x=>x.id===id);if(!row)return Promise.reject(new Error('Registro no encontrado.'));row.active=false;}
   else if(key==='enrollments'){const row=db.enrollments.find(x=>x.id===id);if(!row)return Promise.reject(new Error('Matrícula no encontrada.'));row.status='CANCELLED';}
   else db.grades=db.grades.filter(x=>x.id!==id);saveDemo(db);return Promise.resolve(null);
 }
 return Promise.reject(new Error('Operación no admitida.'));
}
async function request(path,options={}){
 const token=localStorage.getItem(TOKEN)||'';if(token.startsWith('demo-'))return demoRequest(path,options);
 let response;try{response=await fetch(path,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})}});}catch{if(token.startsWith('demo-'))return demoRequest(path,options);throw new Error('No pude conectar con el servidor. Inicia Docker Compose o usa el acceso de demostración.');}
 const type=response.headers.get('content-type')||'';if(!type.includes('application/json')){if(response.status===404||response.status===405)return demoRequest(path,options);throw new Error('El servidor respondió algo inesperado. Revisa que API y frontend estén iniciados.');}
 const data=response.status===204?null:await response.json();if(!response.ok)throw new Error(data?.message||`Error ${response.status}`);return data;
}
export async function login(email,password){
 try{const response=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});const type=response.headers.get('content-type')||'';if(type.includes('application/json')){const data=await response.json();if(!response.ok)throw new Error(data.message||'Correo o contraseña incorrectos.');localStorage.setItem(TOKEN,data.token);localStorage.setItem(USER,JSON.stringify(data.user));return data.user;} }
 catch(e){if(e.message.includes('incorrectos'))throw e;}
 if(email.trim().toLowerCase()==='admin@aulavx.edu'&&password==='AulaVX2026!'){const u={email:'admin@aulavx.edu',fullName:'Jheyssun Vargas',role:'ADMIN',demo:true};localStorage.setItem(TOKEN,'demo-admin');localStorage.setItem(USER,JSON.stringify(u));getDemo();return u;}
 throw new Error('No se pudo conectar. En la web usa admin@aulavx.edu / AulaVX2026! para abrir la demostración.');
}
export function currentUser(){try{return JSON.parse(localStorage.getItem(USER)||'null')}catch{return null}}
export function logout(){localStorage.removeItem(TOKEN);localStorage.removeItem(USER);}
export const api={get:(path)=>request(path),post:(path,body)=>request(path,{method:'POST',body:JSON.stringify(body)}),put:(path,body)=>request(path,{method:'PUT',body:JSON.stringify(body)}),delete:(path)=>request(path,{method:'DELETE'})};
