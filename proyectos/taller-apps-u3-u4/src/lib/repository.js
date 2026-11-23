import { createClient } from "@supabase/supabase-js";
import "../config.js";

const cfg = window.JHEYVX_CONFIG || {};
const cloudClient = /^https:\/\//.test(cfg.supabaseUrl || "") && cfg.supabaseKey
  ? createClient(cfg.supabaseUrl, cfg.supabaseKey, { auth: { persistSession: false } })
  : null;
const STORAGE_KEY = "jheyvx.apps.u3-u4.v1";
export const hasCloudConfig = Boolean(cloudClient);
let cloudReady = Boolean(cloudClient);

function readLocal(app) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return Array.isArray(all[app]) ? all[app] : null;
  } catch { return null; }
}

function writeLocal(app, rows) {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  all[app] = rows;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export async function loadRecords(app, seeds) {
  if (cloudReady) {
    const { data, error } = await cloudClient.from("taller_apps_records")
      .select("record_id,payload").eq("app_key", app).order("record_id");
    if (!error) {
      if (data.length === 0 && seeds.length) {
        const initial = seeds.map((record) => ({ app_key: app, record_id: String(record.id), payload: record }));
        const seeded = await cloudClient.from("taller_apps_records").upsert(initial, { onConflict: "app_key,record_id" });
        if (seeded.error) {
          cloudReady = false;
        } else {
          return { rows: structuredClone(seeds), mode: "cloud", note: "Datos de demostración inicializados en Supabase" };
        }
      } else {
        return { rows: data.map((row) => ({ ...row.payload, id: row.record_id })), mode: "cloud", note: "Datos guardados en Supabase" };
      }
    }
    cloudReady = false;
    const cached = readLocal(app);
    return { rows: cached ?? structuredClone(seeds), mode: "local", note: "Falta instalar la base de datos; ejecuta el SQL del ZIP. La app sigue funcionando en este navegador." };
  }
  return { rows: readLocal(app) ?? structuredClone(seeds), mode: "local", note: "Modo local en este navegador; configura Supabase para compartir los datos." };
}

export async function saveRecord(app, record, baseRows = []) {
  if (cloudReady) {
    const { error } = await cloudClient.from("taller_apps_records").upsert({
      app_key: app, record_id: String(record.id), payload: record, updated_at: new Date().toISOString()
    }, { onConflict: "app_key,record_id" });
    if (!error) return "cloud";
    cloudReady = false;
  }
  const rows = readLocal(app) ?? baseRows;
  writeLocal(app, [...rows.filter((row) => row.id !== record.id), record]);
  return "local";
}

export async function deleteRecord(app, id, baseRows = []) {
  if (cloudReady) {
    const { error } = await cloudClient.from("taller_apps_records").delete().eq("app_key", app).eq("record_id", String(id));
    if (!error) return "cloud";
    cloudReady = false;
  }
  writeLocal(app, (readLocal(app) ?? baseRows).filter((row) => row.id !== id));
  return "local";
}

export async function checkout(lines, saleId, products, sales) {
  if (cloudReady) {
    const { data, error } = await cloudClient.rpc("taller_apps_checkout", { p_lines: lines, p_sale_id: saleId });
    if (!error) return { mode: "cloud", sale: data };
    cloudReady = false;
  }
  const updated = products.map((product) => {
    const line = lines.find((item) => item.id === product.id);
    if (!line) return product;
    if (!Number.isSafeInteger(line.qty) || line.qty < 1 || product.stock < line.qty) throw new Error(`Stock insuficiente para ${product.name}.`);
    return { ...product, stock: product.stock - line.qty };
  });
  const sale = { id: saleId, lines: lines.map((line) => ({ ...line })), createdAt: new Date().toISOString() };
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  all.mercato = updated;
  all["mercato-sales"] = [...(all["mercato-sales"] || []), sale];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return { mode: "local", sale, products: updated };
}

export async function bookAppointment(booking, records = []) {
  if (cloudReady) {
    const { data, error } = await cloudClient.rpc("taller_apps_book_appointment", { p_booking: booking });
    if (!error) return { mode: "cloud", booking: data };
    cloudReady = false;
  }
  const taken = records.some((row) => row.kind === "booking" && row.status === "confirmed" && row.date === booking.date && row.time === booking.time);
  if (taken) throw new Error("Ese horario ya está reservado. Selecciona otro.");
  return { mode: "local", booking: { ...booking, kind: "booking", status: "confirmed" } };
}

export async function cancelAppointment(id, records = []) {
  if (cloudReady) {
    const { data, error } = await cloudClient.rpc("taller_apps_cancel_appointment", { p_appointment_id: id });
    if (!error) return { mode: "cloud", booking: data };
    cloudReady = false;
  }
  return { mode: "local", records: records.map((row) => row.id === id ? { ...row, status: "cancelled" } : row) };
}
