export const formatGrade = (score, max) => {
  const s = Number(score), m = Number(max);
  if (!Number.isFinite(s) || !Number.isFinite(m) || m <= 0 || s < 0 || s > m) throw new Error('La nota debe estar entre cero y su máximo.');
  return Math.round((s / m * 20) * 100) / 100;
};
export const validateStudent = s => {
  if (!/^\d{5,20}$/.test(String(s.code || '').trim())) throw new Error('El código debe tener entre 5 y 20 dígitos.');
  if (!String(s.firstName || '').trim() || !String(s.lastName || '').trim()) throw new Error('Completa el nombre y apellido.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s.email || '').trim())) throw new Error('Escribe un correo válido.');
  if (!String(s.program || '').trim()) throw new Error('Indica el programa académico.');
  return true;
};
export const validateCourse = c => {
  if (!String(c.code || '').trim() || !String(c.name || '').trim()) throw new Error('Completa el código y el nombre del curso.');
  if (!Number.isInteger(Number(c.credits)) || Number(c.credits) < 1 || Number(c.credits) > 20) throw new Error('Los créditos deben ser de 1 a 20.');
  return true;
};
