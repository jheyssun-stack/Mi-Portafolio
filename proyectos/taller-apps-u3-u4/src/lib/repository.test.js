import test from "node:test";
import assert from "node:assert/strict";

const storage = new Map();
globalThis.window = {};
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: {
    getItem: (key) => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key)
  }
});

const { checkout, bookAppointment, cancelAppointment } = await import("./repository.js");

test("MERCATO descuenta stock y conserva una venta en modo local", async () => {
  const result = await checkout([{ id: "m-01", qty: 2 }], "sale-test-1", [{ id: "m-01", name: "Auriculares", price: 10, stock: 4 }], []);
  assert.equal(result.products[0].stock, 2);
  const saved = JSON.parse(localStorage.getItem("jheyvx.apps.u3-u4.v1"));
  assert.equal(saved.mercato[0].stock, 2);
  assert.equal(saved["mercato-sales"][0].id, "sale-test-1");
});

test("MERCATO cancela por completo una compra si el inventario no alcanza", async () => {
  const before = localStorage.getItem("jheyvx.apps.u3-u4.v1");
  await assert.rejects(() => checkout([{ id: "m-01", qty: 99 }], "sale-test-2", [{ id: "m-01", name: "Auriculares", price: 10, stock: 1 }], []), /Stock insuficiente/);
  assert.equal(localStorage.getItem("jheyvx.apps.u3-u4.v1"), before);
});

test("CITADA bloquea una hora repetida y cancelar la deja libre", async () => {
  const existing = [{ id: "b1", kind: "booking", date: "2026-12-01", time: "10:00", status: "confirmed" }];
  const appointment = { id: "b2", date: "2026-12-01", time: "10:00", client: "Persona ficticia" };
  await assert.rejects(() => bookAppointment(appointment, existing), /ya está reservado/);
  const cancelled = await cancelAppointment("b1", existing);
  assert.equal(cancelled.records[0].status, "cancelled");
  const booked = await bookAppointment(appointment, cancelled.records);
  assert.equal(booked.booking.status, "confirmed");
});
