import { useState } from "react";

// ── Formato inteligente: sin ceros innecesarios ───────────────────────────────
function fmt(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  const s = parseFloat(n.toPrecision(10)).toString();
  return s;
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#0f0e2e]/60 backdrop-blur-md" />
      <div className="relative bg-white w-full max-w-md shadow-2xl overflow-hidden" style={{ borderRadius: "20px" }} onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #4f35e8 0%, #7c5cff 100%)" }}>
          <span className="text-white font-bold text-sm tracking-wide">{title}</span>
          <button onClick={onClose} className="text-white/70 hover:text-white cursor-pointer transition-colors w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

// ── Sistema de medidas ────────────────────────────────────────────────────────
const UNITS = [
  { id: "mm", label: "Milímetros", short: "mm", area: "mm²" },
  { id: "cm", label: "Centímetros", short: "cm", area: "cm²" },
  { id: "dm", label: "Decímetros", short: "dm", area: "dm²" },
  { id: "m",  label: "Metros",     short: "m",  area: "m²"  },
  { id: "km", label: "Kilómetros", short: "km", area: "km²" },
  { id: "in", label: "Pulgadas",   short: "in", area: "in²" },
  { id: "ft", label: "Pies",       short: "ft", area: "ft²" },
];

// ── Figuras disponibles ───────────────────────────────────────────────────────
const SHAPES = [
  { id: "rectangle", label: "Rectángulo", icon: "▭" },
  { id: "triangle",  label: "Triángulo",  icon: "△" },
  { id: "circle",    label: "Círculo",    icon: "○" },
  { id: "square",    label: "Cuadrado",   icon: "□" },
  { id: "trapezoid", label: "Trapecio",   icon: "⏢" },
  { id: "rhombus",   label: "Rombo",      icon: "◇" },
];

type ResultRow = { label: string; value: number; unit: string; color: string };

// ── Tarjeta de resultado ──────────────────────────────────────────────────────
function ResultCard({ label, value, unit, color }: ResultRow) {
  return (
    <div className="px-4 py-5 text-center relative overflow-hidden flex-1" style={{ background: color, borderRadius: "14px", minWidth: "120px" }}>
      <div className="absolute top-0 right-0 w-14 h-14 rounded-full bg-white/10 -translate-y-4 translate-x-4" />
      <div className="text-white/70 text-[10px] uppercase tracking-widest mb-1 font-semibold">{label}</div>
      <div className="text-2xl font-bold text-white leading-tight">{fmt(value)}</div>
      <div className="text-white/60 text-[10px] mt-1">{unit}</div>
    </div>
  );
}

// ── Calculadora principal ─────────────────────────────────────────────────────
function Calculator() {
  const [shape, setShape] = useState("rectangle");
  const [unit, setUnit]   = useState("cm");
  const [vals, setVals]   = useState<Record<string, string>>({});
  const [results, setResults] = useState<ResultRow[] | null>(null);
  const [formula, setFormula] = useState("");
  const [modal, setModal] = useState(false);

  const u = UNITS.find((x) => x.id === unit)!;

  function set(key: string, value: string) {
    setVals((prev) => ({ ...prev, [key]: value }));
  }

  function n(key: string) { return parseFloat(vals[key] ?? ""); }
  function valid(...keys: string[]) { return keys.every((k) => !isNaN(n(k)) && n(k) > 0); }

  function reset() { setVals({}); setResults(null); }

  function calculate(e: React.FormEvent) {
    e.preventDefault();
    let rows: ResultRow[] = [];
    let f = "";

    if (shape === "rectangle") {
      const a = n("a"), b = n("b");
      if (!valid("a", "b")) return;
      const area = a * b;
      const perim = 2 * (a + b);
      rows = [
        { label: "Área",      value: area,  unit: u.area,  color: "linear-gradient(135deg,#4f35e8,#7c5cff)" },
        { label: "Perímetro", value: perim, unit: u.short, color: "linear-gradient(135deg,#ff3d6b,#ff7c5c)" },
      ];
      f = `A = a × b = ${fmt(a)} × ${fmt(b)} = ${fmt(area)} ${u.area}\nP = 2(a + b) = 2(${fmt(a)} + ${fmt(b)}) = ${fmt(perim)} ${u.short}`;
    }

    if (shape === "square") {
      const a = n("a");
      if (!valid("a")) return;
      const area = a * a;
      const perim = 4 * a;
      rows = [
        { label: "Área",      value: area,  unit: u.area,  color: "linear-gradient(135deg,#4f35e8,#7c5cff)" },
        { label: "Perímetro", value: perim, unit: u.short, color: "linear-gradient(135deg,#ff3d6b,#ff7c5c)" },
      ];
      f = `A = a² = ${fmt(a)}² = ${fmt(area)} ${u.area}\nP = 4a = 4 × ${fmt(a)} = ${fmt(perim)} ${u.short}`;
    }

    if (shape === "triangle") {
      const a = n("a"), b = n("b"), c = n("c"), h = n("h");
      if (!valid("a", "b", "c", "h")) return;
      const area = (b * h) / 2;
      const perim = a + b + c;
      rows = [
        { label: "Área",      value: area,  unit: u.area,  color: "linear-gradient(135deg,#4f35e8,#7c5cff)" },
        { label: "Perímetro", value: perim, unit: u.short, color: "linear-gradient(135deg,#ff3d6b,#ff7c5c)" },
      ];
      f = `A = (b × h) / 2 = (${fmt(b)} × ${fmt(h)}) / 2 = ${fmt(area)} ${u.area}\nP = a + b + c = ${fmt(a)} + ${fmt(b)} + ${fmt(c)} = ${fmt(perim)} ${u.short}`;
    }

    if (shape === "circle") {
      const r = n("r");
      if (!valid("r")) return;
      const area = Math.PI * r * r;
      const circ = 2 * Math.PI * r;
      rows = [
        { label: "Área",           value: area, unit: u.area,  color: "linear-gradient(135deg,#4f35e8,#7c5cff)" },
        { label: "Circunferencia", value: circ, unit: u.short, color: "linear-gradient(135deg,#ff3d6b,#ff7c5c)" },
      ];
      f = `A = π × r² = π × ${fmt(r)}² = ${fmt(area)} ${u.area}\nC = 2π × r = 2π × ${fmt(r)} = ${fmt(circ)} ${u.short}`;
    }

    if (shape === "trapezoid") {
      const a = n("a"), b = n("b"), c = n("c"), d = n("d"), h = n("h");
      if (!valid("a", "b", "c", "d", "h")) return;
      const area = ((a + b) / 2) * h;
      const perim = a + b + c + d;
      rows = [
        { label: "Área",      value: area,  unit: u.area,  color: "linear-gradient(135deg,#4f35e8,#7c5cff)" },
        { label: "Perímetro", value: perim, unit: u.short, color: "linear-gradient(135deg,#ff3d6b,#ff7c5c)" },
      ];
      f = `A = ((B + b) / 2) × h = ((${fmt(a)} + ${fmt(b)}) / 2) × ${fmt(h)} = ${fmt(area)} ${u.area}\nP = B + b + c + d = ${fmt(a)} + ${fmt(b)} + ${fmt(c)} + ${fmt(d)} = ${fmt(perim)} ${u.short}`;
    }

    if (shape === "rhombus") {
      const d1 = n("d1"), d2 = n("d2"), l = n("l");
      if (!valid("d1", "d2", "l")) return;
      const area = (d1 * d2) / 2;
      const perim = 4 * l;
      rows = [
        { label: "Área",      value: area,  unit: u.area,  color: "linear-gradient(135deg,#4f35e8,#7c5cff)" },
        { label: "Perímetro", value: perim, unit: u.short, color: "linear-gradient(135deg,#ff3d6b,#ff7c5c)" },
      ];
      f = `A = (D × d) / 2 = (${fmt(d1)} × ${fmt(d2)}) / 2 = ${fmt(area)} ${u.area}\nP = 4 × L = 4 × ${fmt(l)} = ${fmt(perim)} ${u.short}`;
    }

    setResults(rows);
    setFormula(f);
    setModal(true);
  }

  // ── Campos por figura ───────────────────────────────────────────────────────
  type Field = { key: string; label: string; color: string };
  const fields: Record<string, Field[]> = {
    rectangle: [
      { key: "a", label: "Ancho (a)", color: "#4f35e8" },
      { key: "b", label: "Alto (b)",  color: "#ff3d6b" },
    ],
    square: [
      { key: "a", label: "Lado (a)", color: "#4f35e8" },
    ],
    triangle: [
      { key: "a", label: "Lado a",        color: "#4f35e8" },
      { key: "b", label: "Base (b)",       color: "#ff3d6b" },
      { key: "c", label: "Lado c",         color: "#7c5cff" },
      { key: "h", label: "Altura (h)",     color: "#ff7c5c" },
    ],
    circle: [
      { key: "r", label: "Radio (r)", color: "#4f35e8" },
    ],
    trapezoid: [
      { key: "a", label: "Base mayor (B)", color: "#4f35e8" },
      { key: "b", label: "Base menor (b)", color: "#ff3d6b" },
      { key: "c", label: "Lado c",         color: "#7c5cff" },
      { key: "d", label: "Lado d",         color: "#ff7c5c" },
      { key: "h", label: "Altura (h)",     color: "#22c55e" },
    ],
    rhombus: [
      { key: "d1", label: "Diag. mayor (D)", color: "#4f35e8" },
      { key: "d2", label: "Diag. menor (d)", color: "#ff3d6b" },
      { key: "l",  label: "Lado (L)",        color: "#7c5cff" },
    ],
  };

  const activeFields = fields[shape] ?? [];
  const shapeInfo = SHAPES.find((s) => s.id === shape)!;

  // ── Diagramas SVG por figura ────────────────────────────────────────────────
  function Diagram() {
    const sv = (k: string) => vals[k] ? `${k}=${vals[k]}` : `${k}=?`;
    if (shape === "rectangle") return (
      <svg viewBox="0 0 300 130" className="w-full max-w-xs mx-auto block">
        <rect x="26" y="21" width="248" height="88" rx="4" fill="#4f35e8" opacity="0.12" />
        <rect x="22" y="17" width="248" height="88" rx="4" fill="url(#rg)" opacity="0.25" />
        <rect x="22" y="17" width="248" height="88" rx="4" fill="none" stroke="#4f35e8" strokeWidth="2.5" />
        <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c5cff"/><stop offset="100%" stopColor="#ff3d6b"/></linearGradient></defs>
        <text x="146" y="122" textAnchor="middle" fontSize="11" fill="#4f35e8" fontFamily="Space Mono" fontWeight="700">{sv("a")}</text>
        <text x="9" y="62" textAnchor="middle" fontSize="11" fill="#ff3d6b" fontFamily="Space Mono" fontWeight="700" transform="rotate(-90 9 62)">{sv("b")}</text>
        <path d="M22 27 L32 27 L32 17" fill="none" stroke="#4f35e8" strokeWidth="1.5"/>
      </svg>
    );
    if (shape === "square") return (
      <svg viewBox="0 0 200 150" className="w-full max-w-[200px] mx-auto block">
        <rect x="26" y="21" width="148" height="108" rx="4" fill="#4f35e8" opacity="0.12" />
        <rect x="22" y="17" width="148" height="108" rx="4" fill="url(#sg)" opacity="0.25" />
        <rect x="22" y="17" width="148" height="108" rx="4" fill="none" stroke="#4f35e8" strokeWidth="2.5" />
        <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c5cff"/><stop offset="100%" stopColor="#4f35e8"/></linearGradient></defs>
        <text x="96" y="142" textAnchor="middle" fontSize="11" fill="#4f35e8" fontFamily="Space Mono" fontWeight="700">{sv("a")}</text>
        <path d="M22 27 L32 27 L32 17" fill="none" stroke="#4f35e8" strokeWidth="1.5"/>
      </svg>
    );
    if (shape === "triangle") return (
      <svg viewBox="0 0 300 160" className="w-full max-w-xs mx-auto block">
        <polygon points="150,15 280,145 20,145" fill="url(#tg)" opacity="0.25"/>
        <polygon points="150,15 280,145 20,145" fill="none" stroke="#4f35e8" strokeWidth="2.5"/>
        <defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c5cff"/><stop offset="100%" stopColor="#ff3d6b"/></linearGradient></defs>
        <line x1="150" y1="15" x2="150" y2="145" stroke="#ff7c5c" strokeWidth="1.5" strokeDasharray="5 3"/>
        <text x="150" y="158" textAnchor="middle" fontSize="10" fill="#ff3d6b" fontFamily="Space Mono" fontWeight="700">{sv("b")}</text>
        <text x="162" y="85" textAnchor="start" fontSize="10" fill="#ff7c5c" fontFamily="Space Mono" fontWeight="700">{sv("h")}</text>
        <text x="94" y="90" textAnchor="middle" fontSize="10" fill="#4f35e8" fontFamily="Space Mono" fontWeight="700">{sv("a")}</text>
        <text x="218" y="90" textAnchor="middle" fontSize="10" fill="#7c5cff" fontFamily="Space Mono" fontWeight="700">{sv("c")}</text>
        <rect x="145" y="140" width="10" height="5" fill="none" stroke="#ff7c5c" strokeWidth="1.5"/>
      </svg>
    );
    if (shape === "circle") return (
      <svg viewBox="0 0 200 180" className="w-full max-w-[200px] mx-auto block">
        <circle cx="100" cy="90" r="75" fill="url(#cg)" opacity="0.25"/>
        <circle cx="100" cy="90" r="75" fill="none" stroke="#4f35e8" strokeWidth="2.5"/>
        <defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c5cff"/><stop offset="100%" stopColor="#ff3d6b"/></linearGradient></defs>
        <line x1="100" y1="90" x2="175" y2="90" stroke="#ff3d6b" strokeWidth="2" strokeDasharray="5 3"/>
        <circle cx="100" cy="90" r="3" fill="#4f35e8"/>
        <text x="137" y="85" textAnchor="middle" fontSize="11" fill="#ff3d6b" fontFamily="Space Mono" fontWeight="700">{sv("r")}</text>
      </svg>
    );
    if (shape === "trapezoid") return (
      <svg viewBox="0 0 300 160" className="w-full max-w-xs mx-auto block">
        <polygon points="70,20 230,20 280,140 20,140" fill="url(#tpg)" opacity="0.25"/>
        <polygon points="70,20 230,20 280,140 20,140" fill="none" stroke="#4f35e8" strokeWidth="2.5"/>
        <defs><linearGradient id="tpg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c5cff"/><stop offset="100%" stopColor="#ff3d6b"/></linearGradient></defs>
        <line x1="150" y1="20" x2="150" y2="140" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5 3"/>
        <text x="150" y="14" textAnchor="middle" fontSize="10" fill="#4f35e8" fontFamily="Space Mono" fontWeight="700">{sv("a")}</text>
        <text x="150" y="155" textAnchor="middle" fontSize="10" fill="#ff3d6b" fontFamily="Space Mono" fontWeight="700">{sv("b")}</text>
        <text x="160" y="85" textAnchor="start" fontSize="10" fill="#22c55e" fontFamily="Space Mono" fontWeight="700">{sv("h")}</text>
        <text x="38" y="90" textAnchor="middle" fontSize="10" fill="#7c5cff" fontFamily="Space Mono" fontWeight="700">{sv("c")}</text>
        <text x="267" y="90" textAnchor="middle" fontSize="10" fill="#ff7c5c" fontFamily="Space Mono" fontWeight="700">{sv("d")}</text>
      </svg>
    );
    if (shape === "rhombus") return (
      <svg viewBox="0 0 260 180" className="w-full max-w-[260px] mx-auto block">
        <polygon points="130,10 250,90 130,170 10,90" fill="url(#rhg)" opacity="0.25"/>
        <polygon points="130,10 250,90 130,170 10,90" fill="none" stroke="#4f35e8" strokeWidth="2.5"/>
        <defs><linearGradient id="rhg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c5cff"/><stop offset="100%" stopColor="#ff3d6b"/></linearGradient></defs>
        <line x1="10" y1="90" x2="250" y2="90" stroke="#4f35e8" strokeWidth="1.5" strokeDasharray="5 3"/>
        <line x1="130" y1="10" x2="130" y2="170" stroke="#ff3d6b" strokeWidth="1.5" strokeDasharray="5 3"/>
        <text x="130" y="105" textAnchor="middle" fontSize="10" fill="#4f35e8" fontFamily="Space Mono" fontWeight="700">{sv("d1")}</text>
        <text x="145" y="50" textAnchor="start" fontSize="10" fill="#ff3d6b" fontFamily="Space Mono" fontWeight="700">{sv("d2")}</text>
        <text x="75" y="45" textAnchor="middle" fontSize="10" fill="#7c5cff" fontFamily="Space Mono" fontWeight="700">{sv("l")}</text>
      </svg>
    );
    return null;
  }

  return (
    <>
      <Modal open={modal} onClose={() => setModal(false)} title={`✦ Resultados — ${shapeInfo.label}`}>
        {results && (
          <div className="space-y-4">
            <div className="flex gap-3">
              {results.map((r) => (
                <ResultCard key={r.label} {...r} />
              ))}
            </div>
            <div className="px-4 py-3 font-mono text-xs text-[var(--muted-foreground)] leading-6 whitespace-pre-line" style={{ background: "#f5f3ff", borderRadius: "10px" }}>
              {formula}
            </div>
            <button onClick={() => setModal(false)} className="w-full py-3 text-white text-sm font-bold tracking-wider uppercase cursor-pointer transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #4f35e8 0%, #7c5cff 100%)", borderRadius: "12px" }}>
              ¡Entendido!
            </button>
          </div>
        )}
      </Modal>

      <div className="space-y-6">
        {/* Título */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] mb-3" style={{ background: "#ede9ff", borderRadius: "99px" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] inline-block" />
            Actividad 01
          </div>
          <h3 className="text-2xl font-extrabold text-[var(--foreground)] leading-tight">
            Área y Perímetro —{" "}
            <span style={{ background: "linear-gradient(90deg, #4f35e8, #ff3d6b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {shapeInfo.label}
            </span>
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] mt-1.5">Selecciona una figura y el sistema de medida</p>
        </div>

        {/* Selector de figura */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: "#4f35e8" }}>Figura geométrica</label>
          <div className="grid grid-cols-3 gap-2">
            {SHAPES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => { setShape(s.id); reset(); }}
                className="flex flex-col items-center gap-1 px-3 py-3 text-xs font-bold transition-all cursor-pointer"
                style={{
                  borderRadius: "12px",
                  border: shape === s.id ? "2px solid #4f35e8" : "2px solid #e8e4fc",
                  background: shape === s.id ? "linear-gradient(135deg, #4f35e8, #7c5cff)" : "white",
                  color: shape === s.id ? "white" : "#7268a6",
                  boxShadow: shape === s.id ? "0 4px 14px #4f35e840" : "none",
                  transform: shape === s.id ? "scale(1.04)" : "scale(1)",
                }}
              >
                <span className="text-xl leading-none">{s.icon}</span>
                <span className="text-[10px] font-semibold">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Diagrama */}
        <div className="py-4 px-2 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ede9ff 100%)", borderRadius: "16px", border: "1px solid #d9d4f5" }}>
          <div className="absolute top-2 right-2 w-16 h-16 rounded-full opacity-25 pointer-events-none" style={{ background: "linear-gradient(135deg, #4f35e8, #7c5cff)" }} />
          <Diagram />
        </div>

        {/* Selector de unidades */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#7268a6" }}>Sistema de medida</label>
          <div className="flex flex-wrap gap-2">
            {UNITS.map((un) => (
              <button
                key={un.id}
                type="button"
                onClick={() => setUnit(un.id)}
                className="flex flex-col items-center px-3 py-2 text-xs font-bold transition-all cursor-pointer"
                style={{
                  borderRadius: "10px",
                  border: unit === un.id ? "2px solid #4f35e8" : "2px solid #e8e4fc",
                  background: unit === un.id ? "linear-gradient(135deg, #4f35e8, #7c5cff)" : "white",
                  color: unit === un.id ? "white" : "#7268a6",
                  boxShadow: unit === un.id ? "0 4px 12px #4f35e840" : "none",
                  transform: unit === un.id ? "scale(1.08)" : "scale(1)",
                  minWidth: "52px",
                }}
              >
                <span className="text-base leading-none mb-0.5">{un.short}</span>
                <span className="text-[9px] font-medium opacity-80 leading-none">{un.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Campos de entrada */}
        <form onSubmit={calculate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {activeFields.map(({ key, label, color }) => (
              <div key={key}>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color }}>
                  {label}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={vals[key] ?? ""}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder="0"
                    required
                    min="0.000001"
                    step="any"
                    className="w-full pl-4 pr-12 py-3 bg-white font-mono text-sm font-bold text-[var(--foreground)] focus:outline-none transition-all"
                    style={{
                      borderRadius: "12px",
                      border: `2px solid ${vals[key] ? color : "#d9d4f5"}`,
                      boxShadow: vals[key] ? `0 0 0 4px ${color}18` : "none",
                    }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none" style={{ color }}>
                    {u.short}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              className="flex-1 py-3 text-white text-sm font-bold tracking-wider uppercase cursor-pointer transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #4f35e8 0%, #7c5cff 50%, #ff3d6b 100%)", borderRadius: "12px" }}
            >
              ⚡ Calcular
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-5 py-3 text-sm font-bold uppercase tracking-wider cursor-pointer transition-all hover:opacity-80 active:scale-95"
              style={{ borderRadius: "12px", border: "2px solid #d9d4f5", color: "#7268a6", background: "white" }}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// ── Teorema de Pitágoras ──────────────────────────────────────────────────────
type PythMode = "hyp" | "leg";

function PythagorasCalculator() {
  const [unit, setUnit] = useState("cm");
  const [mode, setMode] = useState<PythMode>("hyp");
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [result, setResult] = useState<{ label: string; value: number; formula: string } | null>(null);
  const [modal, setModal] = useState(false);

  const u = UNITS.find((x) => x.id === unit)!;

  function calculate(e: React.FormEvent) {
    e.preventDefault();
    const a = parseFloat(v1), b = parseFloat(v2);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return;
    if (mode === "hyp") {
      const c = Math.sqrt(a * a + b * b);
      setResult({ label: "Hipotenusa (c)", value: c, formula: `c = √(a² + b²) = √(${fmt(a)}² + ${fmt(b)}²) = √${fmt(a*a + b*b)} = ${fmt(c)} ${u.short}` });
    } else {
      if (b >= a) { alert("La hipotenusa debe ser mayor que el cateto."); return; }
      const leg = Math.sqrt(a * a - b * b);
      setResult({ label: "Cateto desconocido", value: leg, formula: `cateto = √(c² − b²) = √(${fmt(a)}² − ${fmt(b)}²) = √${fmt(a*a - b*b)} = ${fmt(leg)} ${u.short}` });
    }
    setModal(true);
  }

  function reset() { setV1(""); setV2(""); setResult(null); }

  const fields = mode === "hyp"
    ? [{ key: "v1", label: "Cateto a", color: "#4f35e8" }, { key: "v2", label: "Cateto b", color: "#ff3d6b" }]
    : [{ key: "v1", label: "Hipotenusa (c)", color: "#4f35e8" }, { key: "v2", label: "Cateto conocido", color: "#ff3d6b" }];

  return (
    <>
      <Modal open={modal} onClose={() => setModal(false)} title="✦ Teorema de Pitágoras">
        {result && (
          <div className="space-y-4">
            <div className="px-4 py-5 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4f35e8, #7c5cff)", borderRadius: "14px" }}>
              <div className="absolute top-0 right-0 w-14 h-14 rounded-full bg-white/10 -translate-y-4 translate-x-4" />
              <div className="text-white/70 text-[10px] uppercase tracking-widest mb-1 font-semibold">{result.label}</div>
              <div className="text-4xl font-bold text-white">{fmt(result.value)}</div>
              <div className="text-white/60 text-[10px] mt-1">{u.short}</div>
            </div>
            <div className="px-4 py-3 font-mono text-xs text-[var(--muted-foreground)] leading-6" style={{ background: "#f5f3ff", borderRadius: "10px" }}>
              {result.formula}
            </div>
            <button onClick={() => setModal(false)} className="w-full py-3 text-white text-sm font-bold tracking-wider uppercase cursor-pointer transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #4f35e8 0%, #7c5cff 100%)", borderRadius: "12px" }}>
              ¡Entendido!
            </button>
          </div>
        )}
      </Modal>

      <div className="space-y-6">
        {/* Título */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ background: "#fff0f3", borderRadius: "99px", color: "#ff3d6b" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#ff3d6b" }} />
            Teorema de Pitágoras
          </div>
          <h3 className="text-2xl font-extrabold text-[var(--foreground)] leading-tight">
            <span style={{ background: "linear-gradient(90deg, #ff3d6b, #7c5cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              c² = a² + b²
            </span>
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] mt-1.5">Halla la hipotenusa o un cateto desconocido</p>
        </div>

        {/* Modo */}
        <div className="grid grid-cols-2 gap-3">
          {([
            { id: "hyp", label: "Hallar hipotenusa", desc: "Conoces los 2 catetos", icon: "📐" },
            { id: "leg", label: "Hallar cateto", desc: "Conoces hipotenusa y un cateto", icon: "🔍" },
          ] as { id: PythMode; label: string; desc: string; icon: string }[]).map((m) => (
            <button key={m.id} type="button" onClick={() => { setMode(m.id); reset(); }}
              className="flex flex-col items-start gap-1 px-4 py-3 transition-all cursor-pointer text-left"
              style={{
                borderRadius: "12px",
                border: mode === m.id ? "2px solid #ff3d6b" : "2px solid #e8e4fc",
                background: mode === m.id ? "linear-gradient(135deg, #ff3d6b, #ff7c5c)" : "white",
                boxShadow: mode === m.id ? "0 4px 14px #ff3d6b40" : "none",
                transform: mode === m.id ? "scale(1.02)" : "scale(1)",
              }}>
              <span className="text-lg">{m.icon}</span>
              <span className="text-xs font-bold" style={{ color: mode === m.id ? "white" : "#0f0e2e" }}>{m.label}</span>
              <span className="text-[10px]" style={{ color: mode === m.id ? "rgba(255,255,255,0.7)" : "#7268a6" }}>{m.desc}</span>
            </button>
          ))}
        </div>

        {/* Diagrama */}
        <div className="py-4 px-2" style={{ background: "linear-gradient(135deg, #fff0f3 0%, #f5f3ff 100%)", borderRadius: "16px", border: "1px solid #ffd4de" }}>
          <svg viewBox="0 0 280 160" className="w-full max-w-xs mx-auto block">
            <polygon points="20,140 240,140 20,20" fill="url(#pyg)" opacity="0.2"/>
            <polygon points="20,140 240,140 20,20" fill="none" stroke="#4f35e8" strokeWidth="2.5"/>
            <defs>
              <linearGradient id="pyg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c5cff"/>
                <stop offset="100%" stopColor="#ff3d6b"/>
              </linearGradient>
            </defs>
            <rect x="20" y="120" width="20" height="20" fill="none" stroke="#4f35e8" strokeWidth="1.5"/>
            {/* lado a (base) */}
            <text x="130" y="157" textAnchor="middle" fontSize="11" fill="#4f35e8" fontFamily="Space Mono" fontWeight="700">
              {mode === "hyp" ? (v1 ? `a=${v1}` : "a=?") : (v2 ? `b=${v2}` : "b=?")}
            </text>
            {/* lado b (altura) */}
            <text x="8" y="80" textAnchor="middle" fontSize="11" fill="#ff3d6b" fontFamily="Space Mono" fontWeight="700" transform="rotate(-90 8 80)">
              {mode === "hyp" ? (v2 ? `b=${v2}` : "b=?") : (v2 ? `b=${v2}` : "b=?")}
            </text>
            {/* hipotenusa */}
            <text x="148" y="72" textAnchor="middle" fontSize="11" fill="#7c5cff" fontFamily="Space Mono" fontWeight="700" transform="rotate(-50 148 72)">
              {result ? `c=${fmt(result.value)}` : (mode === "leg" && v1 ? `c=${v1}` : "c=?")}
            </text>
          </svg>
        </div>

        {/* Unidades */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#7268a6" }}>Sistema de medida</label>
          <div className="flex flex-wrap gap-2">
            {UNITS.map((un) => (
              <button key={un.id} type="button" onClick={() => setUnit(un.id)}
                className="flex flex-col items-center px-3 py-2 text-xs font-bold transition-all cursor-pointer"
                style={{
                  borderRadius: "10px",
                  border: unit === un.id ? "2px solid #ff3d6b" : "2px solid #e8e4fc",
                  background: unit === un.id ? "linear-gradient(135deg, #ff3d6b, #ff7c5c)" : "white",
                  color: unit === un.id ? "white" : "#7268a6",
                  boxShadow: unit === un.id ? "0 4px 12px #ff3d6b40" : "none",
                  transform: unit === un.id ? "scale(1.08)" : "scale(1)",
                  minWidth: "52px",
                }}>
                <span className="text-base leading-none mb-0.5">{un.short}</span>
                <span className="text-[9px] font-medium opacity-80 leading-none">{un.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Campos */}
        <form onSubmit={calculate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {fields.map(({ key, label, color }, i) => (
              <div key={key}>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color }}>{label}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={i === 0 ? v1 : v2}
                    onChange={(e) => i === 0 ? setV1(e.target.value) : setV2(e.target.value)}
                    placeholder="0"
                    required
                    min="0.000001"
                    step="any"
                    className="w-full pl-4 pr-12 py-3 bg-white font-mono text-sm font-bold focus:outline-none transition-all"
                    style={{
                      borderRadius: "12px",
                      border: `2px solid ${(i === 0 ? v1 : v2) ? color : "#d9d4f5"}`,
                      boxShadow: (i === 0 ? v1 : v2) ? `0 0 0 4px ${color}18` : "none",
                    }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold pointer-events-none" style={{ color }}>{u.short}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="submit" className="flex-1 py-3 text-white text-sm font-bold tracking-wider uppercase cursor-pointer transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #ff3d6b 0%, #7c5cff 100%)", borderRadius: "12px" }}>
              ⚡ Calcular
            </button>
            <button type="button" onClick={reset} className="px-5 py-3 text-sm font-bold uppercase tracking-wider cursor-pointer transition-all hover:opacity-80 active:scale-95"
              style={{ borderRadius: "12px", border: "2px solid #d9d4f5", color: "#7268a6", background: "white" }}>
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// ── App Shell ─────────────────────────────────────────────────────────────────
export default function App() {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = ["Inicio", "Actividades", "Servicios", "Contacto"];

  return (
    <div className="min-h-full flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f0f2ff" }}>

      {/* ══ HEADER ══ */}
      <header className="sticky top-0 z-20" style={{ background: "linear-gradient(135deg, #1a0b5e 0%, #4f35e8 60%, #7c5cff 100%)" }}>
        <div className="absolute top-0 right-0 w-48 h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-4 right-8 w-32 h-32 rounded-full opacity-20" style={{ background: "#ff3d6b" }} />
          <div className="absolute -top-2 right-0 w-20 h-20 rounded-full opacity-15" style={{ background: "#fff" }} />
        </div>

        <div className="relative px-4 md:px-6 py-3 flex items-center gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-11 h-11 flex-shrink-0 bg-white overflow-hidden shadow-lg" style={{ borderRadius: "10px" }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Logo_upla_vertical.jpg/250px-Logo_upla_vertical.jpg" alt="Logo UPLA" className="w-full h-full object-contain p-0.5" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-extrabold text-sm leading-tight tracking-wider">UPLA</div>
              <div className="text-white/60 text-[10px] leading-tight">Universidad Peruana Los Andes</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map((link, i) => (
              <button key={link} className="px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer"
                style={{ borderRadius: "8px", color: i === 0 ? "white" : "rgba(255,255,255,0.55)", background: i === 0 ? "rgba(255,255,255,0.18)" : "transparent" }}>
                {link}
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSearchOpen(e.target.value.length > 0); }}
              onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
              placeholder="Buscar…"
              className="w-36 sm:w-44 pl-8 pr-3 py-1.5 text-white placeholder-white/40 text-xs focus:outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "99px" }}
            />
            <svg className="w-3.5 h-3.5 text-white/50 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchOpen && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-white shadow-2xl z-30 overflow-hidden" style={{ borderRadius: "14px" }}>
                {SHAPES.filter(s => s.label.toLowerCase().includes(search.toLowerCase())).map(s => (
                  <button key={s.id} onMouseDown={() => setSearchOpen(false)}
                    className="w-full text-left px-4 py-2.5 text-xs hover:bg-[#f5f3ff] cursor-pointer transition-colors flex items-center gap-2">
                    <span className="text-base">{s.icon}</span>
                    <span className="font-bold text-[var(--foreground)]">{s.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 flex items-center justify-center text-white text-xs font-bold shadow-lg"
              style={{ background: "linear-gradient(135deg, #ff3d6b, #ff7c5c)", borderRadius: "50%" }}>
              ES
            </div>
            <span className="hidden sm:block text-white/70 text-xs group-hover:text-white transition-colors font-medium">Est. Silva</span>
          </div>
        </div>

        <div className="flex md:hidden border-t border-white/10">
          {navLinks.map((link, i) => (
            <button key={link} className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
              style={{ color: i === 0 ? "white" : "rgba(255,255,255,0.45)" }}>
              {link}
            </button>
          ))}
        </div>
      </header>

      {/* ══ BODY ══ */}
      <div className="flex flex-1 min-h-0">

        {/* ══ SIDEBAR ══ */}
        <aside className="hidden lg:flex flex-col w-60 bg-white flex-shrink-0" style={{ borderRight: "1px solid #e8e4fc" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid #ede9ff" }}>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">Geometría Plana</div>
          </div>
          <nav className="flex-1 py-3 px-3 space-y-1">
            {SHAPES.map((s, i) => (
              <div key={s.id}
                className="flex items-center gap-3 px-3 py-2.5"
                style={{ borderRadius: "10px", background: i === 0 ? "linear-gradient(135deg, #f0edff 0%, #ede9ff 100%)" : "transparent", borderLeft: i === 0 ? "3px solid #4f35e8" : "3px solid transparent" }}>
                <div className="w-8 h-8 flex items-center justify-center text-sm flex-shrink-0"
                  style={{ borderRadius: "8px", background: i === 0 ? "linear-gradient(135deg, #4f35e8, #7c5cff)" : "#f5f3ff", color: i === 0 ? "white" : "#7268a6" }}>
                  {s.icon}
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: i === 0 ? "#4f35e8" : "#0f0e2e" }}>{s.label}</div>
                  <div className="text-[10px] text-[var(--muted-foreground)]">Área y Perímetro</div>
                </div>
              </div>
            ))}
          </nav>
          <div className="mx-3 mb-4 px-4 py-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4f35e8, #7c5cff)", borderRadius: "14px" }}>
            <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-white/10" />
            <div className="text-white/70 text-[10px] font-semibold uppercase tracking-wider mb-1">Semestre</div>
            <div className="text-white font-extrabold text-sm">2026 —2</div>
            <div className="text-white/60 text-[10px] mt-1">Ing. de Sistemas</div>
          </div>
        </aside>

        {/* ══ MAIN ══ */}
        <main className="flex-1 overflow-auto">
          <div className="relative overflow-hidden px-6 pt-8 pb-6" style={{ background: "linear-gradient(135deg, #ede9ff 0%, #f0f2ff 60%, #fff0f3 100%)" }}>
            <div className="absolute top-0 right-10 w-40 h-40 rounded-full opacity-20 pointer-events-none" style={{ background: "linear-gradient(135deg, #7c5cff, #ff3d6b)" }} />
            <div className="max-w-xl mx-auto">
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--muted-foreground)] mb-1 font-mono font-bold">
                <span>UPLA</span>
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                <span>Actividades</span>
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                <span style={{ color: "#4f35e8" }}>Geometría Plana</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 max-w-xl mx-auto">
            <div className="bg-white px-6 py-8 shadow-sm" style={{ borderRadius: "20px", border: "1px solid #e8e4fc" }}>
              <Calculator />
            </div>

            {/* Pitágoras */}
            <div className="bg-white px-6 py-8 shadow-sm mt-6" style={{ borderRadius: "20px", border: "1px solid #ffd4de" }}>
              <PythagorasCalculator />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="px-4 py-4 bg-white" style={{ borderRadius: "14px", border: "1px solid #e8e4fc" }}>
                <div className="text-2xl mb-2">💡</div>
                <div className="text-xs font-bold text-[var(--foreground)] mb-1">¿Sabías que?</div>
                <p className="text-[11px] text-[var(--muted-foreground)] leading-4">Un cuadrado es un rectángulo especial donde todos sus lados son iguales.</p>
              </div>
              <div className="px-4 py-4 bg-white" style={{ borderRadius: "14px", border: "1px solid #e8e4fc" }}>
                <div className="text-2xl mb-2">📘</div>
                <div className="text-xs font-bold text-[var(--foreground)] mb-1">Unidades</div>
                <p className="text-[11px] text-[var(--muted-foreground)] leading-4">El área se expresa en unidades cuadradas (u²) y el perímetro en unidades lineales (u).</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "linear-gradient(135deg, #1a0b5e 0%, #4f35e8 100%)" }}>
        <div className="px-6 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white overflow-hidden shadow-lg flex-shrink-0" style={{ borderRadius: "10px" }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Logo_upla_vertical.jpg/250px-Logo_upla_vertical.jpg" alt="Logo UPLA" className="w-full h-full object-contain p-0.5" />
              </div>
              <div>
                <div className="text-white text-xs font-extrabold tracking-wide">Universidad Peruana Los Andes</div>
                <div className="text-white/50 text-[10px]">Facultad de Ingeniería — Ingeniería de Sistemas</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[{ n: "Facebook", i: "f" }, { n: "YouTube", i: "▶" }, { n: "Instagram", i: "◎" }].map((r) => (
                <button key={r.n} title={r.n} className="w-8 h-8 flex items-center justify-center text-xs text-white/60 hover:text-white transition-all cursor-pointer hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.1)", borderRadius: "8px", fontStyle: "normal", fontWeight: 700 }}>
                  {r.i}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-white/40 text-[10px] font-medium">© 2026 UPLA — Todos los derechos reservados</p>
            <div className="flex gap-4">
              {["Privacidad", "Términos de uso", "Mapa del sitio"].map((l) => (
                <button key={l} className="text-white/40 hover:text-white/80 text-[10px] font-medium transition-colors cursor-pointer">{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
