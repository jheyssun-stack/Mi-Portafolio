export const clean = (value) => String(value ?? "").trim().replace(/\s+/g, " ");
export const normalize = (value) => clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export const money = (value) => `S/ ${Number(value || 0).toFixed(2)}`;
export const average = (values = []) => values.length ? values.reduce((a, b) => a + Number(b), 0) / values.length : null;

export function validateStudent(form, rows) {
  const errors = {};
  if (!clean(form.code)) errors.code = "Ingresa el código del estudiante.";
  if (!clean(form.names)) errors.names = "Ingresa los nombres.";
  if (!clean(form.surnames)) errors.surnames = "Ingresa los apellidos.";
  if (!clean(form.career)) errors.career = "Elige una carrera.";
  if (rows.some((row) => row.id !== form.id && normalize(row.code) === normalize(form.code))) errors.code = "Ese código ya está registrado.";
  return errors;
}

export function validateGrade(value) {
  const grade = Number(value);
  return Number.isFinite(grade) && grade >= 0 && grade <= 20 ? null : "La nota debe estar entre 0 y 20.";
}

export function cartTotals(lines, products) {
  const subtotalCents = lines.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.id);
    return sum + (product ? Math.round(Number(product.price) * 100) * line.qty : 0);
  }, 0);
  const discountCents = subtotalCents >= 50000 ? Math.round(subtotalCents * 0.1) : 0;
  return { subtotal: subtotalCents / 100, discount: discountCents / 100, total: (subtotalCents - discountCents) / 100, subtotalCents, discountCents };
}

export function validateProduct(form, rows) {
  const errors = {};
  if (!clean(form.code)) errors.code = "Ingresa el código.";
  if (!clean(form.name)) errors.name = "Ingresa el nombre del producto.";
  if (!clean(form.category)) errors.category = "Ingresa la categoría.";
  if (!Number.isFinite(Number(form.price)) || Number(form.price) < 0) errors.price = "El precio debe ser cero o mayor.";
  if (!Number.isSafeInteger(Number(form.stock)) || Number(form.stock) < 0) errors.stock = "El stock debe ser un entero no negativo.";
  if (!Number.isSafeInteger(Number(form.minStock)) || Number(form.minStock) < 0) errors.minStock = "El stock mínimo debe ser un entero no negativo.";
  if (rows.some((row) => row.id !== form.id && normalize(row.code) === normalize(form.code))) errors.code = "El código ya existe.";
  return errors;
}

export function validateAppointment(form) {
  const errors = {};
  if (!clean(form.client)) errors.client = "Selecciona o registra un cliente.";
  if (!form.serviceId) errors.serviceId = "Elige un servicio.";
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(form.date || "");
  const date = parts ? new Date(Number(parts[1]), Number(parts[2])-1, Number(parts[3])) : null;
  if (!date || date.getFullYear() !== Number(parts?.[1]) || date.getMonth() !== Number(parts?.[2])-1 || date.getDate() !== Number(parts?.[3])) errors.date = "Elige una fecha válida.";
  if (!/^(09|1[0-2]|1[4-7]):00$/.test(form.time || "")) errors.time = "Elige uno de los horarios disponibles.";
  if (form.phone && !/^\d{9}$/.test(form.phone.replace(/\s/g, ""))) errors.phone = "El teléfono debe tener 9 dígitos o quedar vacío.";
  return errors;
}
