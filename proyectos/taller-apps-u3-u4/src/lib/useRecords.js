import { useCallback, useEffect, useState } from "react";
import { deleteRecord, loadRecords, saveRecord } from "./repository.js";

export function useRecords(app, seeds) {
  const [rows, setRows] = useState(seeds);
  const [mode, setMode] = useState("loading");
  const [note, setNote] = useState("Cargando información…");
  const [busy, setBusy] = useState(false);
  const [metrics, setMetrics] = useState({});

  const refresh = useCallback(async () => {
    const result = await loadRecords(app, seeds);
    setRows(result.rows);
    setMode(result.mode);
    setNote(result.note);
  }, [app, seeds]);

  useEffect(() => { refresh().catch((error) => { setMode("local"); setNote(error.message); }); }, [refresh]);

  useEffect(() => {
    const worker = new Worker(new URL("../workers/metrics.worker.js", import.meta.url), { type: "module" });
    worker.onmessage = (event) => setMetrics(event.data);
    worker.postMessage({ app, rows });
    return () => worker.terminate();
  }, [app, rows]);

  const save = useCallback(async (record) => {
    setBusy(true);
    try {
      const nextMode = await saveRecord(app, record, rows);
      setRows((current) => [...current.filter((row) => row.id !== record.id), record]);
      setMode(nextMode);
      setNote(nextMode === "cloud" ? "Guardado en Supabase" : "Guardado en este navegador");
      return true;
    } catch (error) { setNote(`No se guardó: ${error.message}`); return false; }
    finally { setBusy(false); }
  }, [app, rows]);

  const remove = useCallback(async (id) => {
    setBusy(true);
    try {
      const nextMode = await deleteRecord(app, id, rows);
      setRows((current) => current.filter((row) => row.id !== id));
      setMode(nextMode);
      setNote(nextMode === "cloud" ? "Registro eliminado" : "Eliminado de este navegador");
      return true;
    } catch (error) { setNote(`No se eliminó: ${error.message}`); return false; }
    finally { setBusy(false); }
  }, [app, rows]);

  return { rows, setRows, mode, note, busy, metrics, setNote, save, remove, refresh };
}
