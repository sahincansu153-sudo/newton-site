"use client";

import { useMemo, useState } from "react";

const PRESETS = {
  system1: {
    id: "system1",
    short: "Örnek 1",
    name: "Çember + Üstel Denklem",
    equations: ["x² + y² - 4 = 0", "e^x + y - 1 = 0"],
    note: "Geometrik denklem ile transcendental denklem birleşiyor. Newton burada hem güçlü hem hassas davranır.",
    source:
      "Burden & Faires, Numerical Analysis; Dennis & Schnabel, Numerical Methods for Unconstrained Optimization and Nonlinear Equations",
    why: "Bu sistem, çok değişkenli Newton yönteminin klasik ama güçlü bir testidir. Çünkü lineerleştirme işe yarar, fakat başlangıç noktası kötü seçilirse adımlar dengesizleşebilir.",
    f: (x, y) => [x * x + y * y - 4, Math.exp(x) + y - 1],
    J: (x, y) => [
      [2 * x, 2 * y],
      [Math.exp(x), 1],
    ],
    recommended: [1, 1],
    altStarts: [
      [1, 1],
      [0.2, 1.5],
      [-1.5, 1.2],
    ],
    bounds: { xMin: -3, xMax: 3, yMin: -3, yMax: 3 },
    manual: [
      "F(x,y) = [x² + y² - 4, e^x + y - 1]^T yazılır.",
      "Jacobian matrisi J(x,y) = [[2x, 2y],[e^x,1]] olarak elde edilir.",
      "Başlangıç noktası (x₀,y₀) = (1,1) seçilir.",
      "J(x_k,y_k) Δ_k = -F(x_k,y_k) lineer sistemi çözülür.",
      "Yeni nokta (x_{k+1},y_{k+1}) = (x_k,y_k) + Δ_k ile bulunur.",
    ],
    matlab: `f = @(x,y) [x.^2 + y.^2 - 4; exp(x) + y - 1];
J = @(x,y) [2*x, 2*y; exp(x), 1];
x = 1; y = 1; tol = 1e-6;
for k = 1:15
    F = f(x,y);
    A = J(x,y);
    delta = -A\\F;
    x = x + delta(1);
    y = y + delta(2);
    fprintf('k=%d, x=%.8f, y=%.8f, ||F||=%.8e\\n', k, x, y, norm(F));
    if norm(delta) < tol
        break;
    end
end`,
    python: `import numpy as np

def F(x, y):
    return np.array([x**2 + y**2 - 4, np.exp(x) + y - 1], dtype=float)

def J(x, y):
    return np.array([[2*x, 2*y], [np.exp(x), 1]], dtype=float)

x, y = 1.0, 1.0
for k in range(15):
    delta = np.linalg.solve(J(x, y), -F(x, y))
    x, y = x + delta[0], y + delta[1]
    print(k+1, x, y, np.linalg.norm(F(x, y)))`,
  },
  system2: {
    id: "system2",
    short: "Örnek 2",
    name: "Sinüs + Parabolik Sistem",
    equations: ["sin(x) + y² - 1 = 0", "x² + y - 1 = 0"],
    note: "Trigonometrik yapı ve polinom aynı sahnede. Küçük başlangıç farkları davranışı değiştirebilir.",
    source: "Stoer & Bulirsch, Introduction to Numerical Analysis",
    why: "Bu örnek, Newton yönteminin her zaman pürüzsüz çalışmadığını göstermek için iyi bir deney alanıdır. Jacobian bazı bölgelerde sistemi daha kırılgan yapar.",
    f: (x, y) => [Math.sin(x) + y * y - 1, x * x + y - 1],
    J: (x, y) => [
      [Math.cos(x), 2 * y],
      [2 * x, 1],
    ],
    recommended: [0.7, 0.4],
    altStarts: [
      [0.7, 0.4],
      [-1.2, 0.3],
      [1.6, -0.8],
    ],
    bounds: { xMin: -2.5, xMax: 2.5, yMin: -2.5, yMax: 2.5 },
    manual: [
      "F(x,y) = [sin(x)+y²-1, x²+y-1]^T yazılır.",
      "Jacobian matrisi J(x,y) = [[cos(x),2y],[2x,1]] bulunur.",
      "cos(x) ve 2y terimleri Jacobianı başlangıç noktasına duyarlı yapar.",
      "Bu yüzden Newton adımı bazı başlangıçlarda hızla küçülür, bazılarında büyür.",
    ],
    matlab: `f = @(x,y) [sin(x) + y.^2 - 1; x.^2 + y - 1];
J = @(x,y) [cos(x), 2*y; 2*x, 1];`,
    python: `def F(x, y):
    return np.array([np.sin(x) + y**2 - 1, x**2 + y - 1], dtype=float)

def J(x, y):
    return np.array([[np.cos(x), 2*y], [2*x, 1]], dtype=float)`,
  },
  system3: {
    id: "system3",
    short: "Örnek 3",
    name: "Kübik ve Çoklu Kök Davranışı",
    equations: ["x³ - 3xy² - 1 = 0", "3x²y - y³ = 0"],
    note: "Birden fazla kök ve kök havzaları. Görsel olarak en etkileyici örnek bu.",
    source:
      "Ortega & Rheinboldt, Iterative Solution of Nonlinear Equations in Several Variables",
    why: "Bu sistem, Newton yönteminin dinamik karakterini göstermede çok değerlidir. Aynı denklem sistemi, farklı başlangıçlarla farklı köklere çekebilir.",
    f: (x, y) => [x ** 3 - 3 * x * y ** 2 - 1, 3 * x * x * y - y ** 3],
    J: (x, y) => [
      [3 * x * x - 3 * y * y, -6 * x * y],
      [6 * x * y, 3 * x * x - 3 * y * y],
    ],
    recommended: [0.8, 0.2],
    altStarts: [
      [0.8, 0.2],
      [-0.7, 0.9],
      [-0.9, -0.8],
    ],
    bounds: { xMin: -2, xMax: 2, yMin: -2, yMax: 2 },
    manual: [
      "Bu sistem, z = x + iy için z³ = 1 yapısının reel-imajiner ayrışımına benzer.",
      "Dolayısıyla birden fazla kök vardır.",
      "Newton iterasyonu bu köklerden hangisine gideceğini başlangıç noktasına göre belirler.",
      "Bu nedenle başlangıç haritası burada özellikle öğreticidir.",
    ],
    matlab: `f = @(x,y) [x.^3 - 3*x.*y.^2 - 1; 3*x.^2.*y - y.^3];
J = @(x,y) [3*x.^2 - 3*y.^2, -6*x.*y; 6*x.*y, 3*x.^2 - 3*y.^2];`,
    python: `def F(x, y):
    return np.array([x**3 - 3*x*y**2 - 1, 3*x**2*y - y**3], dtype=float)

def J(x, y):
    return np.array([[3*x**2 - 3*y**2, -6*x*y], [6*x*y, 3*x**2 - 3*y**2]], dtype=float)`,
  },
};

function det2(A) {
  return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}

function solve2x2(A, b) {
  const d = det2(A);
  if (!Number.isFinite(d) || Math.abs(d) < 1e-12) {
    return { ok: false, det: d, delta: [NaN, NaN] };
  }
  const dx = (b[0] * A[1][1] - A[0][1] * b[1]) / d;
  const dy = (A[0][0] * b[1] - b[0] * A[1][0]) / d;
  return { ok: true, det: d, delta: [dx, dy] };
}

function norm2(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

function runNewton(system, x0, y0, tol, maxIter) {
  const rows = [];
  let x = x0;
  let y = y0;

  for (let k = 0; k < maxIter; k++) {
    const F = system.f(x, y);
    const J = system.J(x, y);
    const rhs = [-F[0], -F[1]];
    const solved = solve2x2(J, rhs);

    rows.push({
      iter: k,
      x,
      y,
      f1: F[0],
      f2: F[1],
      normF: norm2(F),
      detJ: solved.det,
      stepX: solved.delta[0],
      stepY: solved.delta[1],
      stepNorm: norm2(solved.delta),
      singular: !solved.ok,
    });

    if (!solved.ok) return { status: "singular", rows, root: null };

    x = x + solved.delta[0];
    y = y + solved.delta[1];

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return { status: "diverged", rows, root: null };
    }

    if (norm2(solved.delta) < tol) {
      const Fend = system.f(x, y);
      rows.push({
        iter: k + 1,
        x,
        y,
        f1: Fend[0],
        f2: Fend[1],
        normF: norm2(Fend),
        detJ: det2(system.J(x, y)),
        stepX: 0,
        stepY: 0,
        stepNorm: 0,
        singular: false,
      });
      return { status: "converged", rows, root: [x, y] };
    }
  }

  return { status: "max_iter", rows, root: [x, y] };
}

function format(n) {
  if (!Number.isFinite(n)) return "-";
  return Number(n).toFixed(6);
}

function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "inline-block",
          padding: "10px 16px",
          borderRadius: 999,
          border: "1px solid #dbe4ee",
          background: "#fff",
          fontWeight: 600,
          fontSize: 14,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <p
          style={{
            maxWidth: 900,
            color: "#475569",
            lineHeight: 1.8,
            marginTop: 12,
            fontSize: 16,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 28,
        boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 14px",
        borderRadius: 14,
        border: active ? "1px solid #0f172a" : "1px solid #e2e8f0",
        background: active ? "#0f172a" : "#fff",
        color: active ? "#fff" : "#0f172a",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
}

function MatrixCard({ system, x, y }) {
  const J = system.J(Number(x), Number(y));
  const F = system.f(Number(x), Number(y));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
      }}
    >
      <Card style={{ padding: 20 }}>
        <div style={{ marginBottom: 12, fontWeight: 600 }}>Jacobian matrisi</div>
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 16,
            padding: 16,
            fontFamily: "Courier New, monospace",
            lineHeight: 1.8,
          }}
        >
          [{format(J[0][0])}, {format(J[0][1])}]
          <br />
          [{format(J[1][0])}, {format(J[1][1])}]
        </div>
      </Card>

      <Card style={{ padding: 20 }}>
        <div style={{ marginBottom: 12, fontWeight: 600 }}>F(x,y) vektörü</div>
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 16,
            padding: 16,
            fontFamily: "Courier New, monospace",
            lineHeight: 1.8,
          }}
        >
          [{format(F[0])}]
          <br />
          [{format(F[1])}]
        </div>
      </Card>
    </div>
  );
}

function BasinPreview({ system, tol = 1e-6, maxIter = 30 }) {
  const { xMin, xMax, yMin, yMax } = system.bounds;
  const size = 24;

  const cells = useMemo(() => {
    const list = [];
    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        const x0 = xMin + (i / (size - 1)) * (xMax - xMin);
        const y0 = yMax - (j / (size - 1)) * (yMax - yMin);
        const res = runNewton(system, x0, y0, tol, maxIter);

        let color = "#e5e7eb";
        if (res.status === "singular") color = "#020617";
        else if (res.status === "diverged") color = "#f59e0b";
        else if (res.status === "max_iter") color = "#94a3b8";
        else if (res.root) {
          const [xr, yr] = res.root;
          const angle = Math.atan2(yr, xr);
          if (angle < -1) color = "#60a5fa";
          else if (angle < 1) color = "#34d399";
          else color = "#f472b6";
        }

        list.push({ x0, y0, color });
      }
    }
    return list;
  }, [system, tol, maxIter, xMin, xMax, yMin, yMax]);

  return (
    <div>
      <p style={{ color: "#475569", lineHeight: 1.7, marginTop: 0 }}>
        Her küçük kare bir başlangıç noktasıdır. Aynı renk, benzer kök davranışını
        gösterir.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gap: 2,
          background: "#f1f5f9",
          padding: 14,
          borderRadius: 24,
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {cells.map((c, idx) => (
          <div
            key={idx}
            title={`(${c.x0.toFixed(2)}, ${c.y0.toFixed(2)})`}
            style={{
              aspectRatio: "1 / 1",
              borderRadius: 3,
              background: c.color,
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginTop: 14,
          fontSize: 12,
          color: "#475569",
        }}
      >
        <span style={legendStyle("#34d399")}>Kök bölgesi A</span>
        <span style={legendStyle("#60a5fa")}>Kök bölgesi B</span>
        <span style={legendStyle("#f472b6")}>Kök bölgesi C</span>
        <span style={legendStyle("#f59e0b", "#111")}>Divergence</span>
        <span style={legendStyle("#020617")}>Singular Jacobian</span>
      </div>
    </div>
  );
}

function legendStyle(bg, color = "#fff") {
  return {
    background: bg,
    color,
    padding: "6px 10px",
    borderRadius: 999,
    fontWeight: 600,
  };
}

function CodeBlock({ code }) {
  return (
    <pre
      style={{
        overflowX: "auto",
        borderRadius: 24,
        background: "#020617",
        color: "#e2e8f0",
        padding: 20,
        fontSize: 13,
        lineHeight: 1.6,
        margin: 0,
      }}
    >
      <code>{code}</code>
    </pre>
  );
}

function MiniChart({ rows }) {
  const width = 760;
  const height = 280;
  const padding = 40;

  const values = rows.map((r) => Math.max(r.normF, r.stepNorm, 1e-12));
  const maxVal = Math.max(...values, 1);
  const plotW = width - padding * 2;
  const plotH = height - padding * 2;
  const n = Math.max(rows.length - 1, 1);

  const buildPath = (key) =>
    rows
      .map((r, i) => {
        const x = padding + (i / n) * plotW;
        const y = padding + plotH - (Math.max(r[key], 1e-12) / maxVal) * plotH;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

  const pathF = buildPath("normF");
  const pathS = buildPath("stepNorm");

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: "100%",
          height: "auto",
          background: "#fff",
          borderRadius: 20,
        }}
      >
        <rect x="0" y="0" width={width} height={height} fill="#fff" rx="20" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#cbd5e1" />
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#cbd5e1"
        />

        {rows.map((r, i) => {
          const x = padding + (i / n) * plotW;
          return (
            <g key={i}>
              <line
                x1={x}
                y1={padding}
                x2={x}
                y2={height - padding}
                stroke="#f1f5f9"
              />
              <text
                x={x}
                y={height - padding + 18}
                fontSize="11"
                textAnchor="middle"
                fill="#64748b"
              >
                {r.iter}
              </text>
            </g>
          );
        })}

        <path d={pathF} fill="none" stroke="#0f172a" strokeWidth="3" />
        <path d={pathS} fill="none" stroke="#0ea5e9" strokeWidth="3" />

        <text x={padding} y={20} fontSize="12" fill="#0f172a">
          ● ||F(x,y)||
        </text>
        <text x={padding + 110} y={20} fontSize="12" fill="#0ea5e9">
          ● Adım normu
        </text>
      </svg>
    </div>
  );
}

export default function NewtonProjectWebsite() {
  const [presetId, setPresetId] = useState("system1");
  const preset = PRESETS[presetId];

  const [x0, setX0] = useState(String(preset.recommended[0]));
  const [y0, setY0] = useState(String(preset.recommended[1]));
  const [tol, setTol] = useState("0.000001");
  const [maxIter, setMaxIter] = useState("15");
  const [tab, setTab] = useState("graph");
  const [result, setResult] = useState(() =>
    runNewton(preset, preset.recommended[0], preset.recommended[1], 1e-6, 15)
  );

  const applyPreset = (id) => {
    const p = PRESETS[id];
    setPresetId(id);
    setX0(String(p.recommended[0]));
    setY0(String(p.recommended[1]));
    setResult(runNewton(p, p.recommended[0], p.recommended[1], Number(tol), Number(maxIter)));
    setTab("graph");
  };

  const handleRun = () => {
    setResult(runNewton(preset, Number(x0), Number(y0), Number(tol), Number(maxIter)));
  };

  const handleReset = () => {
    setX0(String(preset.recommended[0]));
    setY0(String(preset.recommended[1]));
    setTol("0.000001");
    setMaxIter("15");
    setResult(runNewton(preset, preset.recommended[0], preset.recommended[1], 1e-6, 15));
    setTab("graph");
  };

  const last = result.rows[result.rows.length - 1];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left,#ecfeff,transparent 30%), radial-gradient(circle at top right,#dbeafe,transparent 28%), linear-gradient(to bottom,#f8fafc,#ffffff,#f8fafc)",
        color: "#0f172a",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          borderBottom: "1px solid #e2e8f0",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "70px 24px 60px 24px",
            display: "grid",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "10px 16px",
              borderRadius: 999,
              border: "1px solid #dbe4ee",
              background: "#fff",
              fontSize: 14,
              fontWeight: 600,
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              width: "fit-content",
            }}
          >
            Altıgen Zeka • Çok Değişkenli Newton Yöntemi
          </div>

          <h1
            style={{
              fontSize: 56,
              lineHeight: 1.08,
              margin: 0,
              maxWidth: 980,
            }}
          >
            Denklemler sadece çözülmüyor.
            <span style={{ color: "#475569" }}> Başlangıç noktasına göre karakter değiştiriyor.</span>
          </h1>

          <p
            style={{
              maxWidth: 900,
              color: "#475569",
              fontSize: 18,
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            İstanbul Medeniyet Üniversitesi / Üretken Yapay Zeka Uygulamaları kapsamında geliştirilen bu öğretim aracı, çok değişkenli Newton yöntemini etkileşimli örnekler, yakınsama davranışı, Jacobian analizi ve başlangıç noktası haritalarıyla keşfetmeye olanak tanır.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {[
              ["3", "kaynaklı özgün örnek"],
              ["Canlı", "Jacobian ve yakınsama takibi"],
              ["İnteraktif", "başlangıç noktası haritası"],
            ].map(([big, text]) => (
              <Card key={big} style={{ padding: 20 }}>
                <div style={{ fontSize: 28, fontWeight: 700 }}>{big}</div>
                <div style={{ color: "#475569", marginTop: 8 }}>{text}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        <section style={{ marginBottom: 56 }}>
          <SectionTitle
            title="Projede seçilen örnekler"
            subtitle="Her örnek farklı bir davranış penceresi açıyor. Biri istikrarlı ama hassas, biri kırılgan, biri ise kök havzalarıyla görsel olarak çok güçlü."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {Object.values(PRESETS).map((p) => (
              <Card key={p.id} style={{ padding: 24 }}>
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "#f1f5f9",
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  {p.short}
                </div>

                <h3 style={{ marginTop: 0, fontSize: 24 }}>{p.name}</h3>

                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 16,
                    padding: 16,
                    fontFamily: "Courier New, monospace",
                    color: "#334155",
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  {p.equations.map((eq) => (
                    <div key={eq}>{eq}</div>
                  ))}
                </div>

                <p style={{ color: "#475569", lineHeight: 1.8 }}>{p.why}</p>

                <div
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 16,
                    padding: 14,
                    color: "#475569",
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  <strong style={{ color: "#0f172a" }}>Kaynak:</strong> {p.source}
                </div>

                <button
                  onClick={() => applyPreset(p.id)}
                  style={{
                    marginTop: 16,
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 14,
                    border: "1px solid #cbd5e1",
                    background: "#fff",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Bu örneği laboratuvarda aç
                </button>
              </Card>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 56 }}>
          <SectionTitle
            title="İnteraktif Newton laboratuvarı"
            subtitle="Başlangıç noktasını değiştir, sistemi çalıştır, grafiği ve tabloyu izle. Burası sitenin yaşayan kısmı."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "360px 1fr",
              gap: 24,
            }}
          >
            <Card style={{ padding: 24, alignSelf: "start" }}>
              <h3 style={{ marginTop: 0 }}>Kontrol paneli</h3>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
                  Sistem seç
                </label>
                <select
                  value={presetId}
                  onChange={(e) => applyPreset(e.target.value)}
                  style={inputStyle}
                >
                  {Object.values(PRESETS).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.short}: {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: 24,
                  padding: 16,
                  marginBottom: 16,
                  color: "#334155",
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Seçili sistem</div>
                <div
                  style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}
                >
                  {preset.equations.map((eq) => (
                    <div key={eq}>{eq}</div>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginTop: 12 }}>
                  {preset.note}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label style={labelStyle}>x₀</label>
                  <input value={x0} onChange={(e) => setX0(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>y₀</label>
                  <input value={y0} onChange={(e) => setY0(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Tolerans</label>
                  <input value={tol} onChange={(e) => setTol(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Maks. iterasyon</label>
                  <input
                    value={maxIter}
                    onChange={(e) => setMaxIter(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Hızlı başlangıçlar</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {preset.altStarts.map((pt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setX0(String(pt[0]));
                        setY0(String(pt[1]));
                        setResult(runNewton(preset, pt[0], pt[1], Number(tol), Number(maxIter)));
                      }}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 999,
                        border: "1px solid #cbd5e1",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      ({pt[0]}, {pt[1]})
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <button onClick={handleRun} style={primaryBtn}>
                  Çalıştır
                </button>
                <button onClick={handleReset} style={secondaryBtn}>
                  Sıfırla
                </button>
              </div>

              <div
                style={{
                  borderRadius: 16,
                  padding: 14,
                  marginBottom: 16,
                  background: result.status === "converged" ? "#ecfdf5" : "#fffbeb",
                  border:
                    result.status === "converged"
                      ? "1px solid #a7f3d0"
                      : "1px solid #fde68a",
                  color: "#334155",
                }}
              >
                {result.status === "converged" ? (
                  <div>
                    <strong>Yakınsadı.</strong> Yaklaşık kök: ({format(result.root?.[0])},{" "}
                    {format(result.root?.[1])})
                  </div>
                ) : (
                  <div>
                    <strong>Durum:</strong> {result.status}
                  </div>
                )}
              </div>

              <div
                style={{
                  borderRadius: 20,
                  border: "1px solid #e2e8f0",
                  padding: 16,
                  color: "#475569",
                  lineHeight: 1.7,
                  fontSize: 14,
                }}
              >
                <strong style={{ color: "#0f172a" }}>Kaynak:</strong> {preset.source}
              </div>
            </Card>

            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 14,
                  marginBottom: 16,
                }}
              >
                <Card style={{ padding: 18 }}>
                  <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>Son nokta</div>
                  <div style={{ fontFamily: "Courier New, monospace", fontSize: 14 }}>
                    x = {format(last?.x)}
                  </div>
                  <div style={{ fontFamily: "Courier New, monospace", fontSize: 14 }}>
                    y = {format(last?.y)}
                  </div>
                </Card>

                <Card style={{ padding: 18 }}>
                  <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>Artık normu</div>
                  <div style={{ fontFamily: "Courier New, monospace", fontSize: 14 }}>
                    {format(last?.normF)}
                  </div>
                </Card>

                <Card style={{ padding: 18 }}>
                  <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>det(J)</div>
                  <div style={{ fontFamily: "Courier New, monospace", fontSize: 14 }}>
                    {format(last?.detJ)}
                  </div>
                </Card>
              </div>

              <div style={{ marginBottom: 16 }}>
                <MatrixCard system={preset} x={x0} y={y0} />
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                <TabButton active={tab === "graph"} onClick={() => setTab("graph")}>
                  Grafik
                </TabButton>
                <TabButton active={tab === "table"} onClick={() => setTab("table")}>
                  Tablo
                </TabButton>
                <TabButton active={tab === "basin"} onClick={() => setTab("basin")}>
                  Harita
                </TabButton>
                <TabButton active={tab === "manual"} onClick={() => setTab("manual")}>
                  Manuel
                </TabButton>
                <TabButton active={tab === "matlab"} onClick={() => setTab("matlab")}>
                  MATLAB
                </TabButton>
                <TabButton active={tab === "python"} onClick={() => setTab("python")}>
                  Python
                </TabButton>
              </div>

              {tab === "graph" && (
                <Card style={{ padding: 20 }}>
                  <h3 style={{ marginTop: 0 }}>Yakınsama grafiği</h3>
                  <MiniChart rows={result.rows} />
                </Card>
              )}

              {tab === "table" && (
                <Card style={{ padding: 20 }}>
                  <h3 style={{ marginTop: 0 }}>İterasyon tablosu</h3>
                  <div style={{ overflowX: "auto", borderRadius: 20, border: "1px solid #e2e8f0" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead style={{ background: "#f8fafc" }}>
                        <tr>
                          {["k", "x_k", "y_k", "||F||", "det(J)", "Δx", "Δy", "||Δ||"].map((h) => (
                            <th
                              key={h}
                              style={{
                                textAlign: "left",
                                padding: 12,
                                borderBottom: "1px solid #e2e8f0",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.rows.map((r, idx) => (
                          <tr key={idx}>
                            <td style={tdStyle}>{r.iter}</td>
                            <td style={tdStyle}>{format(r.x)}</td>
                            <td style={tdStyle}>{format(r.y)}</td>
                            <td style={tdStyle}>{format(r.normF)}</td>
                            <td style={tdStyle}>{format(r.detJ)}</td>
                            <td style={tdStyle}>{format(r.stepX)}</td>
                            <td style={tdStyle}>{format(r.stepY)}</td>
                            <td style={tdStyle}>{format(r.stepNorm)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}

              {tab === "basin" && (
                <Card style={{ padding: 20 }}>
                  <h3 style={{ marginTop: 0 }}>Başlangıç noktası haritası</h3>
                  <BasinPreview system={preset} tol={Number(tol)} maxIter={Number(maxIter)} />
                </Card>
              )}

              {tab === "manual" && (
                <Card style={{ padding: 20 }}>
                  <h3 style={{ marginTop: 0 }}>Elle çözüm mantığı</h3>
                  <div style={{ display: "grid", gap: 12 }}>
                    {preset.manual.map((step, i) => (
                      <div
                        key={i}
                        style={{
                          background: "#f8fafc",
                          borderRadius: 16,
                          padding: 16,
                          color: "#334155",
                          lineHeight: 1.7,
                        }}
                      >
                        <strong>Adım {i + 1}.</strong> {step}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {tab === "matlab" && (
                <Card style={{ padding: 20 }}>
                  <h3 style={{ marginTop: 0 }}>MATLAB kodu</h3>
                  <CodeBlock code={preset.matlab} />
                </Card>
              )}

              {tab === "python" && (
                <Card style={{ padding: 20 }}>
                  <h3 style={{ marginTop: 0 }}>Python kodu</h3>
                  <CodeBlock code={preset.python} />
                </Card>
              )}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 56 }}>
          <SectionTitle
            title="Kaynakça"
            subtitle="Bu web sitesinde kullanılan örnekler ve yöntem anlatımı, numerik analiz literatüründeki temel kaynaklar dikkate alınarak hazırlanmıştır."
          />

          <Card style={{ padding: 24, color: "#475569", lineHeight: 1.9 }}>
            <div>1. Richard L. Burden, J. Douglas Faires, <em>Numerical Analysis</em>.</div>
            <div>2. J. E. Dennis Jr., Robert B. Schnabel, <em>Numerical Methods for Unconstrained Optimization and Nonlinear Equations</em>.</div>
            <div>3. Josef Stoer, Roland Bulirsch, <em>Introduction to Numerical Analysis</em>.</div>
            <div>4. James M. Ortega, Werner C. Rheinboldt, <em>Iterative Solution of Nonlinear Equations in Several Variables</em>.</div>
          </Card>
        </section>

        <section style={{ marginBottom: 24 }}>
          <SectionTitle
            title="Bu web sitesi neyi amaçlıyor?"
            subtitle="Bu yapı, çok değişkenli Newton yöntemini hem ilk kez öğrenen öğrenciler hem de sınıfta örnek göstermek isteyen öğreticiler için etkileşimli bir öğrenme alanına dönüştürmek amacıyla tasarlanmıştır."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {[
              [
                "Kavramı görünür kılmak",
                "Newton iterasyonunun yalnızca formülden ibaret olmadığını, başlangıç noktasına ve Jacobian yapısına bağlı olarak farklı davranışlar sergilediğini görünür hale getirir.",
              ],
              [
                "Deneyi erişilebilir yapmak",
                "Öğrenci, başlangıç noktalarını değiştirerek yöntemin yakınsama, yavaşlama, tekillik ve farklı köklere yönelme gibi davranışlarını doğrudan inceleyebilir.",
              ],
              [
                "Öğretimi desteklemek",
                "Bu site; anlatım, gösterim ve sınıf içi tartışma için kullanılabilecek, teoriyi kod ve görselle birleştiren yeniden kullanılabilir bir öğretim materyali sunar.",
              ],
            ].map(([title, text]) => (
              <Card key={title} style={{ padding: 22 }}>
                <h3 style={{ marginTop: 0 }}>{title}</h3>
                <p style={{ color: "#475569", lineHeight: 1.75, marginBottom: 0 }}>{text}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer
        style={{
          marginTop: 16,
          borderTop: "1px solid #e2e8f0",
          background: "rgba(255,255,255,0.6)",
          textAlign: "center",
          padding: "22px 16px",
          color: "#475569",
          fontSize: 14,
        }}
      >
        Altıgen Zeka | İstanbul Medeniyet Üniversitesi | 2026
      </footer>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  outline: "none",
  boxSizing: "border-box",
};

const primaryBtn = {
  flex: 1,
  padding: "12px 16px",
  borderRadius: 14,
  border: "none",
  background: "#0f172a",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "12px 16px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  background: "#fff",
  color: "#0f172a",
  fontWeight: 600,
  cursor: "pointer",
};

const tdStyle = {
  padding: 12,
  borderBottom: "1px solid #e2e8f0",
  fontFamily: "Courier New, monospace",
};
