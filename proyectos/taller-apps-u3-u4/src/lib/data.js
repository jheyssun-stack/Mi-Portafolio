export const appInfo = {
  aulora: { name: "AULORA", subtitle: "Gestión académica", icon: "A", color: "blue" },
  inventra: { name: "INVENTRA", subtitle: "Control de inventario", icon: "I", color: "green" },
  mercato: { name: "MERCATO", subtitle: "Ventas y catálogo", icon: "M", color: "gold" },
  citada: { name: "CITADA", subtitle: "Agenda de reservas", icon: "C", color: "rose" }
};

export const seeds = {
  aulora: [
    { id: "a-1001", code: "A-1001", names: "Lucía", surnames: "Soto Rojas", career: "Ingeniería de Sistemas", grades: [17, 18, 16] },
    { id: "a-1002", code: "A-1002", names: "Mateo", surnames: "Quispe León", career: "Administración", grades: [15, 16] },
    { id: "a-1003", code: "A-1003", names: "Camila", surnames: "Paredes Díaz", career: "Ingeniería de Sistemas", grades: [19, 18, 20] },
    { id: "a-1004", code: "A-1004", names: "Diego", surnames: "Huamán Ríos", career: "Contabilidad", grades: [13, 15] }
  ],
  inventra: [
    { id: "p-01", code: "TEC-001", name: "Audífonos Nova", category: "Audio", price: 89.9, stock: 14, minStock: 5, emoji: "🎧" },
    { id: "p-02", code: "TEC-002", name: "Teclado Compact", category: "Accesorios", price: 129, stock: 4, minStock: 6, emoji: "⌨️" },
    { id: "p-03", code: "TEC-003", name: "Lámpara Aura", category: "Hogar", price: 74.5, stock: 21, minStock: 5, emoji: "💡" },
    { id: "p-04", code: "TEC-004", name: "Mochila Urban", category: "Accesorios", price: 119, stock: 0, minStock: 3, emoji: "🎒" }
  ],
  mercato: [
    { id: "m-01", name: "Audífonos Nova", category: "Audio", price: 89.9, stock: 14, emoji: "🎧", color: "#e8eef8" },
    { id: "m-02", name: "Teclado Compact", category: "Accesorios", price: 129, stock: 4, emoji: "⌨️", color: "#eee8fb" },
    { id: "m-03", name: "Lámpara Aura", category: "Hogar", price: 74.5, stock: 21, emoji: "💡", color: "#fbf1dd" },
    { id: "m-04", name: "Mochila Urban", category: "Accesorios", price: 119, stock: 3, emoji: "🎒", color: "#e5f1e9" },
    { id: "m-05", name: "Cafetera Bruma", category: "Hogar", price: 249, stock: 7, emoji: "☕", color: "#f7e9e2" },
    { id: "m-06", name: "Cargador Pulse", category: "Accesorios", price: 39.9, stock: 28, emoji: "🔌", color: "#e5eef2" }
  ],
  citada: [
    { id: "c-m-01", kind: "client", name: "María Fernanda Ríos", phone: "987654321" },
    { id: "c-m-02", kind: "client", name: "Andrea Salas", phone: "912345678" },
    { id: "c-s-01", kind: "service", name: "Consulta general", price: 45, duration: 60 },
    { id: "c-s-02", kind: "service", name: "Control especializado", price: 80, duration: 60 },
    { id: "c-s-03", kind: "service", name: "Evaluación inicial", price: 60, duration: 60 },
    { id: "c-b-01", kind: "booking", clientId: "c-m-01", client: "María Fernanda Ríos", serviceId: "c-s-01", service: "Consulta general", date: new Date().toISOString().slice(0, 10), time: "10:00", price: 45, status: "confirmed" }
  ]
};

export const appointmentSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
