import test from "node:test";
import assert from "node:assert/strict";
import { average, cartTotals, validateGrade, validateProduct, validateAppointment } from "./logic.js";

test("AULORA calcula el promedio y no inventa nota cuando no hay calificaciones", () => {
  assert.equal(average([17, 16, 18]), 17);
  assert.equal(average([]), null);
});

test("AULORA acepta los límites 0 y 20 y rechaza fuera del rango", () => {
  assert.equal(validateGrade("0"), null);
  assert.equal(validateGrade("20"), null);
  assert.ok(validateGrade("20.1"));
});

test("MERCATO aplica 10% desde S/ 500.00 y redondea en céntimos", () => {
  assert.deepEqual(cartTotals([{ id: "x", qty: 1 }], [{ id: "x", price: 500 }]), {
    subtotal: 500, discount: 50, total: 450, subtotalCents: 50000, discountCents: 5000
  });
  assert.equal(cartTotals([{ id: "x", qty: 1 }], [{ id: "x", price: 499.99 }]).discount, 0);
});

test("INVENTRA impide stock negativo y CITADA valida cliente y horario", () => {
  assert.ok(validateProduct({ code: "P1", name: "Caja", category: "Hogar", price: 5, stock: -1 }, []).stock);
  assert.ok(validateProduct({ code: "P2", name: "Caja", category: "Hogar", price: 5, stock: 1, minStock: -1 }, []).minStock);
  assert.deepEqual(validateAppointment({ client: "Ana", serviceId: "s1", date: "2026-11-23", time: "10:00", phone: "987654321" }), {});
  assert.ok(validateAppointment({ client: "Ana", serviceId: "s1", date: "2026-02-31", time: "10:00" }).date);
});
