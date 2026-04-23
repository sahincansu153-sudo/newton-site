"use client";

import React, { useMemo, useState } from "react";

const FONT_STACK = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const MONO_STACK = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace";

const PRESETS = {
  system1: {
    id: "system1",
    short: "Örnek 1",
    name: "Çember + Üstel Denklem",
    equations: ["x² + y² - 4 = 0", "eˣ + y - 1 = 0"],
    source:
      "Burden & Faires, Numerical Analysis; Dennis & Schnabel, Numerical Methods for Unconstrained Optimization and Nonlinear Equations",
    note:
      "Bu örnekte çözüm, çember ile üstel eğrinin kesişim noktalarıdır. Newton yöntemi uygun başlangıçta bu kesişimlerden birine hızla yaklaşır.",
    why:
      "Stabil yakınsama davranışını, geometrik yorumu ve başlangıç hassasiyetini aynı anda göstermek için seçilmiştir.",
    f: (x, y) => [x * x + y * y - 4, Math.exp(x) + y - 1],
    J: (x, y) => [[2 * x, 2 * y], [Math.exp(x), 1]],
    recommended: [1, 1],
    quickStarts: [
      { point: [1, 1], label: "Önerilen başlangıç", singular: false },
      { point: [-1.2, 1.0], label: "Alternatif başlangıç", singular: false },
      {
        point: [0, 0],
        label: "det(J)=0 • Jacobian tekil • Newton çalışmaz",
        singular: true,
      },
    ],
    roots: [
      [-1.816264, 0.837368],
      [1.004169, -1.729637],
    ],
    bounds: { xMin: -2.5, xMax: 1.8, yMin: -2.3, yMax: 2.3 },
    graphType: "circle_exp",
    manual: {
      title: "Elle çözüm akışı",
      paragraphs: [
        "Sistem vektörel biçimde F(x,y) = [x² + y² - 4, eˣ + y - 1]ᵀ olarak yazılır.",
        "Jacobian matrisi J(x,y) = [[2x, 2y], [eˣ, 1]] şeklindedir.",
        "Başlangıç noktası (x₀, y₀) = (1, 1) seçildiğinde F(1,1) ve J(1,1) hesaplanır.",
        "Ardından J(x₀,y₀) · [Δx, Δy]ᵀ = -F(x₀,y₀) lineer sistemi çözülür.",
        "Bulunan düzeltme vektörü yeni tahmine eklenir: x₁ = x₀ + Δx, y₁ = y₀ + Δy.",
        "Aynı işlem ardışık olarak tekrarlandığında yöntem kesişim noktasına yakınsar.",
      ],
      math: [
        "F(x,y)=\\begin{bmatrix}x^2+y^2-4\\ e^x+y-1\\end{bmatrix}",
        "J(x,y)=\\begin{bmatrix}2x & 2y\\ e^x & 1\\end{bmatrix}",
        "J(x_k,y_k)\\begin{bmatrix}\\Delta x\\ \\Delta y\\end{bmatrix}=-F(x_k,y_k)",
        "\\begin{aligned}x_{k+1}&=x_k+\\Delta x\\\\ y_{k+1}&=y_k+\\Delta y\\end{aligned}",
      ],
    },
    matlab: `%% =========================================================
%   ÖRNEK 1: ÇEMBER + ÜSTEL DENKLEM (Klasik Newton)
% =========================================================
clear; clc; close all;
fprintf('--- ÖRNEK 1: Çember + Üstel Denklem ---\\n\\n');

% Parametreler
tol    = 1e-6;  
max_it = 50;     
x0     = [1.0; 1.0]; % Arayüzdeki başlangıç noktası

% 1. Sistem: f1(x,y) = x^2 + y^2 - 4 = 0
%            f2(x,y) = e^x + y - 1 = 0
F = @(x) [x(1)^2 + x(2)^2 - 4; 
          exp(x(1)) + x(2) - 1];

% 2. Analitik Jacobian Matrisi
J_anl = @(x) [2*x(1),    2*x(2); 
              exp(x(1)), 1];

% 3. Newton Döngüsü
fprintf('%-5s  %-12s  %-12s  %-12s\\n','k','x','y','||F||');
fprintf('%s\\n', repmat('-',1,45));
x = x0; hata = [];
for k = 1:max_it
    delta = -J_anl(x) \\ F(x);
    x = x + delta;
    hk = norm(F(x)); hata(end+1) = hk;
    fprintf('%-5d  %-12.6f  %-12.6f  %-12.3e\\n', k, x(1), x(2), hk);
    if hk < tol, break; end
end

fprintf('\\n-> ÇÖZÜM: (%.6f, %.6f) | İterasyon: %d\\n', x(1), x(2), k);

% 4. Yakınsama Grafiği (Beyaz Tema)
figure('Name', 'Örnek 1 Yakınsama', 'Color', 'w');
semilogy(1:k, hata, 'o-', 'Color', [0.1 0.5 0.8], 'LineWidth', 2.5, 'MarkerSize', 8, 'MarkerFaceColor', [0.1 0.5 0.8]);
set(gca, 'Color', 'w', 'XColor', 'k', 'YColor', 'k', 'GridColor', [.85 .85 .85]);
grid on; yline(tol, 'k--', 'Tolerans', 'LineWidth', 1.5);
xlabel('İterasyon'); ylabel('||F(x,y)|| (Log)'); title('Örnek 1: Yakınsama Hızı');`,
    pythonLabel: "Örnek 1 Colab Not Defteri",
    pythonUrl:
      "https://colab.research.google.com/drive/1-gUFNUNjpb0MQBib2Kyva93UP9NrgVwW?usp=sharing",
    animationLabel: "MATLAB animasyonu",
    animationUrl: "/animations/system1.gif",
  },
  system2: {
    id: "system2",
    short: "Örnek 2",
    name: "Sinüs + Parabolik Sistem",
    equations: ["sin(x) + y² - 1 = 0", "x² + y - 1 = 0"],
    source: "Stoer & Bulirsch, Introduction to Numerical Analysis",
    note:
      "Bu örnekte trigonometrik yapı ile parabolik yapı birleşir. Türev davranışı bazı bölgelerde daha hassas olduğu için Newton yöntemi daha kırılgan bir karakter sergileyebilir.",
    why:
      "Her sistemin aynı kararlılıkla çalışmadığını, Jacobian yapısının yöntem davranışını etkilediğini göstermek için seçilmiştir.",
    f: (x, y) => [Math.sin(x) + y * y - 1, x * x + y - 1],
    J: (x, y) => [[Math.cos(x), 2 * y], [2 * x, 1]],
    recommended: [0.7, 0.4],
    quickStarts: [
      { point: [0.7, 0.4], label: "Önerilen başlangıç", singular: false },
      { point: [1.2, -0.4], label: "Alternatif başlangıç", singular: false },
      {
        point: [0.5, 0.4388],
        label: "det(J)=0 • Jacobian tekil • Newton çalışmaz",
        singular: true,
      },
    ],
    roots: [
      [0.0, 1.0],
      [0.563371, 0.682613],
      [1.140898, -0.301649],
    ],
    bounds: { xMin: -1.4, xMax: 1.8, yMin: -0.8, yMax: 1.3 },
    graphType: "sin_parabola",
    manual: {
      title: "Elle çözüm akışı",
      paragraphs: [
        "Sistem F(x,y) = [sin(x) + y² - 1, x² + y - 1]ᵀ biçiminde yazılır.",
        "Jacobian matrisi J(x,y) = [[cos(x), 2y], [2x, 1]] olarak hesaplanır.",
        "Başlangıç noktası (x₀, y₀) = (0.7, 0.4) seçildiğinde fonksiyon ve Jacobian değerlendirilir.",
        "Newton adımı için J(x₀,y₀) · [Δx, Δy]ᵀ = -F(x₀,y₀) lineer sistemi çözülür.",
        "Yeni tahmin x₁ = x₀ + Δx, y₁ = y₀ + Δy biçiminde elde edilir.",
        "Bu örnek, türevlerin dalgalı yapısı nedeniyle bazı başlangıç noktalarında daha hassas davranış gösterebilir.",
      ],
      math: [
        "F(x,y)=\\begin{bmatrix}\\sin(x)+y^2-1\\ x^2+y-1\\end{bmatrix}",
        "J(x,y)=\\begin{bmatrix}\\cos(x) & 2y\\ 2x & 1\\end{bmatrix}",
        "J(x_k,y_k)\\begin{bmatrix}\\Delta x\\ \\Delta y\\end{bmatrix}=-F(x_k,y_k)",
        "(x,y)\\approx(0.5634,0.6826)",
      ],
    },
    matlab: `%% =========================================================
%   ÖRNEK 2: SİNÜS + PARABOLİK SİSTEM (Klasik Newton)
% =========================================================
clear; clc; close all;
fprintf('--- ÖRNEK 2: Sinüs + Parabolik Sistem ---\\n\\n');

% Parametreler
tol    = 1e-6;  
max_it = 50;     
x0     = [0.7; 0.4]; % Arayüzdeki başlangıç noktası

% 1. Sistem: f1(x,y) = sin(x) + y^2 - 1 = 0
%            f2(x,y) = x^2 + y - 1 = 0
F = @(x) [sin(x(1)) + x(2)^2 - 1; 
          x(1)^2 + x(2) - 1];

% 2. Analitik Jacobian Matrisi
J_anl = @(x) [cos(x(1)), 2*x(2); 
              2*x(1),    1];

% 3. Newton Döngüsü
fprintf('%-5s  %-12s  %-12s  %-12s\\n','k','x','y','||F||');
fprintf('%s\\n', repmat('-',1,45));
x = x0; hata = [];
for k = 1:max_it
    delta = -J_anl(x) \\ F(x);
    x = x + delta;
    hk = norm(F(x)); hata(end+1) = hk;
    fprintf('%-5d  %-12.6f  %-12.6f  %-12.3e\\n', k, x(1), x(2), hk);
    if hk < tol, break; end
end

fprintf('\\n-> ÇÖZÜM: (%.6f, %.6f) | İterasyon: %d\\n', x(1), x(2), k);

% 4. Yakınsama Grafiği (Beyaz Tema)
figure('Name', 'Örnek 2 Yakınsama', 'Color', 'w');
semilogy(1:k, hata, 'o-', 'Color', [0.8 0.4 0.1], 'LineWidth', 2.5, 'MarkerSize', 8, 'MarkerFaceColor', [0.8 0.4 0.1]);
set(gca, 'Color', 'w', 'XColor', 'k', 'YColor', 'k', 'GridColor', [.85 .85 .85]);
grid on; yline(tol, 'k--', 'Tolerans', 'LineWidth', 1.5);
xlabel('İterasyon'); ylabel('||F(x,y)|| (Log)'); title('Örnek 2: Yakınsama Hızı');`,
    pythonLabel: "Örnek 2 Colab Not Defteri",
    pythonUrl:
      "https://colab.research.google.com/drive/1wWyuywc99n99K4jjzBZJ5_ZGyhNd2c-O?usp=sharing",
    animationLabel: "MATLAB animasyonu",
    animationUrl: "/animations/system2.gif",
  },
  system3: {
    id: "system3",
    short: "Örnek 3",
    name: "Kübik ve Çoklu Kök Davranışı",
    equations: ["x³ - 3xy² - 1 = 0", "3x²y - y³ = 0"],
    source:
      "Ortega & Rheinboldt, Iterative Solution of Nonlinear Equations in Several Variables",
    note:
      "Bu sistem çoklu kök içerir. Başlangıç noktasına göre Newton iterasyonu farklı köklere yönelir veya Jacobian tekilliği nedeniyle durabilir.",
    why:
      "Başlangıç noktasına duyarlılığı, farklı çekim bölgelerini ve başarısızlık durumlarını en net gösteren örnektir.",
    f: (x, y) => [x ** 3 - 3 * x * y ** 2 - 1, 3 * x * x * y - y ** 3],
    J: (x, y) => [
      [3 * x * x - 3 * y * y, -6 * x * y],
      [6 * x * y, 3 * x * x - 3 * y * y],
    ],
    recommended: [0.8, 0.2],
    quickStarts: [
      { point: [0.8, 0.2], label: "Önerilen başlangıç", singular: false },
      { point: [-0.7, 0.9], label: "Farklı köke yönelim", singular: false },
      {
        point: [0, 0],
        label: "det(J)=0 • Jacobian tekil • Newton çalışmaz",
        singular: true,
      },
    ],
    roots: [
      [1, 0],
      [-0.5, 0.866025],
      [-0.5, -0.866025],
    ],
    bounds: { xMin: -1.4, xMax: 1.4, yMin: -1.2, yMax: 1.2 },
    graphType: "cubic_roots",
    manual: {
      title: "Elle çözüm akışı",
      paragraphs: [
        "Sistem F(x,y) = [x³ - 3xy² - 1, 3x²y - y³]ᵀ biçimindedir.",
        "Jacobian matrisi J(x,y) = [[3x² - 3y², -6xy], [6xy, 3x² - 3y²]] olarak hesaplanır.",
        "Başlangıç noktası (x₀, y₀) = (0.8, 0.2) seçildiğinde Newton adımı kurulabilir.",
        "J(x₀,y₀) · [Δx, Δy]ᵀ = -F(x₀,y₀) lineer sistemi çözülerek yeni tahmin elde edilir.",
        "Fakat (0,0) noktasında determinant sıfır olduğu için Jacobian tekildir ve yöntem burada başlayamaz.",
        "Bu örnek, Newton yönteminin yalnızca algoritmik değil, başlangıç koşullarına duyarlı dinamik bir süreç olduğunu gösterir.",
      ],
      math: [
        "F(x,y)=\\begin{bmatrix}x^3-3xy^2-1\\ 3x^2y-y^3\\end{bmatrix}",
        "J(x,y)=\\begin{bmatrix}3x^2-3y^2 & -6xy\\ 6xy & 3x^2-3y^2\\end{bmatrix}",
        "J(x_k,y_k)\\begin{bmatrix}\\Delta x\\ \\Delta y\\end{bmatrix}=-F(x_k,y_k)",
        "(0,0) \\Rightarrow det(J)=0",
      ],
    },
    matlab: `%% =========================================================
%   ÖRNEK 3: KÜBİK VE ÇOKLU KÖK DAVRANIŞI (Klasik Newton)
% =========================================================
clear; clc; close all;
fprintf('--- ÖRNEK 3: Kübik ve Çoklu Kök Davranışı ---\\n\\n');

% Parametreler
tol    = 1e-6;  
max_it = 50;     
x0     = [0.8; 0.2]; % Arayüzdeki başlangıç noktası

% 1. Sistem: f1(x,y) = x^3 - 3xy^2 - 1 = 0
%            f2(x,y) = 3x^2y - y^3 = 0
F = @(x) [x(1)^3 - 3*x(1)*x(2)^2 - 1; 
          3*x(1)^2*x(2) - x(2)^3];

% 2. Analitik Jacobian Matrisi
J_anl = @(x) [3*x(1)^2 - 3*x(2)^2, -6*x(1)*x(2); 
              6*x(1)*x(2),          3*x(1)^2 - 3*x(2)^2];

% 3. Newton Döngüsü
fprintf('%-5s  %-12s  %-12s  %-12s\\n','k','x','y','||F||');
fprintf('%s\\n', repmat('-',1,45));
x = x0; hata = [];
for k = 1:max_it
    delta = -J_anl(x) \\ F(x);
    x = x + delta;
    hk = norm(F(x)); hata(end+1) = hk;
    fprintf('%-5d  %-12.6f  %-12.6f  %-12.3e\\n', k, x(1), x(2), hk);
    if hk < tol, break; end
end

fprintf('\\n-> ÇÖZÜM: (%.6f, %.6f) | İterasyon: %d\\n', x(1), x(2), k);

% 4. Yakınsama Grafiği (Beyaz Tema)
figure('Name', 'Örnek 3 Yakınsama', 'Color', 'w');
semilogy(1:k, hata, 'o-', 'Color', [0.2 0.7 0.3], 'LineWidth', 2.5, 'MarkerSize', 8, 'MarkerFaceColor', [0.2 0.7 0.3]);
set(gca, 'Color', 'w', 'XColor', 'k', 'YColor', 'k', 'GridColor', [.85 .85 .85]);
grid on; yline(tol, 'k--', 'Tolerans', 'LineWidth', 1.5);
xlabel('İterasyon'); ylabel('||F(x,y)|| (Log)'); title('Örnek 3: Yakınsama Hızı');`,
    pythonLabel: "Örnek 3 Colab Not Defteri",
    pythonUrl:
      "https://colab.research.google.com/drive/1DwKoNZGShjg3AdJL7ELS31h029jtbUFN?usp=sharing",
    animationLabel: "MATLAB animasyonu",
    animationUrl: "/animations/system3.gif",
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

    x += solved.delta[0];
    y += solved.delta[1];

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

function format(n, digits = 6) {
  if (!Number.isFinite(n)) return "-";
  return Number(n).toFixed(digits);
}

function pathFromPoints(points, sx, sy) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p[0])} ${sy(p[1])}`)
    .join(" ");
}

function makeExpPoints(xMin, xMax, step = 0.02) {
  const pts = [];
  for (let x = xMin; x <= xMax; x += step) pts.push([x, 1 - Math.exp(x)]);
  return pts;
}

function makeCirclePoints(r = 2, step = 0.03) {
  const pts = [];
  for (let t = 0; t <= Math.PI * 2 + 0.001; t += step) pts.push([r * Math.cos(t), r * Math.sin(t)]);
  return pts;
}

function makeParabolaPoints(xMin, xMax, step = 0.02) {
  const pts = [];
  for (let x = xMin; x <= xMax; x += step) pts.push([x, 1 - x * x]);
  return pts;
}

function makeSinBranches(xMin, xMax, step = 0.02) {
  const upper = [];
  const lower = [];
  for (let x = xMin; x <= xMax; x += step) {
    const v = 1 - Math.sin(x);
    if (v >= 0) {
      upper.push([x, Math.sqrt(v)]);
      lower.push([x, -Math.sqrt(v)]);
    }
  }
  return { upper, lower };
}

function makeCubicRays(rMax = 1.35, step = 0.02) {
  const a = [];
  const b = [];
  const c = [];
  for (let r = 0; r <= rMax; r += step) {
    a.push([r, 0]);
    b.push([-0.5 * r, (Math.sqrt(3) / 2) * r]);
    c.push([-0.5 * r, -(Math.sqrt(3) / 2) * r]);
  }
  return { a, b, c };
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.9)",
        borderRadius: 28,
        border: "1px solid rgba(15,23,42,0.05)",
        boxShadow: "0 12px 28px rgba(15,23,42,0.05)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Badge({ children, danger = false }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        border: danger ? "1px solid #fca5a5" : "1px solid #e2e8f0",
        background: danger ? "#fff1f2" : "#f8fafc",
        color: danger ? "#b91c1c" : "#334155",
      }}
    >
      {children}
    </span>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          display: "inline-block",
          padding: "10px 16px",
          borderRadius: 999,
          border: "1px solid #e7e5df",
          background: "rgba(255,255,255,0.82)",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <p
          style={{
            marginTop: 12,
            maxWidth: 920,
            color: "#475569",
            lineHeight: 1.8,
            fontSize: 15,
          }}
        >
          {subtitle}
        </p>
      ) : null}
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
        background: active ? "#0f172a" : "rgba(255,255,255,0.85)",
        color: active ? "#fff" : "#0f172a",
        cursor: "pointer",
        fontWeight: 700,
        transition: "all .18s ease",
      }}
    >
      {children}
    </button>
  );
}

function CodeBlock({ code }) {
  return (
    <pre
      style={{
        margin: 0,
        padding: 20,
        borderRadius: 22,
        background: "#0b1220",
        color: "#dbeafe",
        fontSize: 12,
        lineHeight: 1.6,
        overflowX: "auto",
        fontFamily: MONO_STACK,
      }}
    >
      <code>{code}</code>
    </pre>
  );
}

function QuickStartChip({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "11px 12px",
        borderRadius: 18,
        border: item.singular ? "1.5px solid #ef4444" : "1px solid #d9e1ea",
        background: item.singular ? "#fff1f2" : "#ffffff",
        color: item.singular ? "#991b1b" : "#0f172a",
        cursor: "pointer",
        textAlign: "left",
        minWidth: 172,
        boxShadow: item.singular
          ? "0 8px 18px rgba(239,68,68,0.08)"
          : "0 6px 14px rgba(15,23,42,0.04)",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 13 }}>
        ({item.point[0]}, {item.point[1]})
      </div>
      <div style={{ marginTop: 6, fontSize: 11, lineHeight: 1.45 }}>{item.label}</div>
    </button>
  );
}

function MetricCard({ label, value }) {
  return (
    <Card style={{ padding: 18 }}>
      <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: MONO_STACK, fontSize: 14 }}>{value}</div>
    </Card>
  );
}

function MatrixCard({ system, x, y }) {
  const J = system.J(Number(x), Number(y));
  const F = system.f(Number(x), Number(y));
  const det = det2(J);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
      <Card style={{ padding: 20 }}>
        <div style={{ marginBottom: 10, fontWeight: 700 }}>Jacobian matrisi</div>
        <div style={softFormulaBox}>
          <div>[ {format(J[0][0])} , {format(J[0][1])} ]</div>
          <div>[ {format(J[1][0])} , {format(J[1][1])} ]</div>
        </div>
      </Card>
      <Card style={{ padding: 20 }}>
        <div style={{ marginBottom: 10, fontWeight: 700 }}>F(x,y) ve determinant</div>
        <div style={softFormulaBox}>
          <div>F₁ = {format(F[0])}</div>
          <div>F₂ = {format(F[1])}</div>
          <div style={{ marginTop: 8 }}>det(J) = {format(det)}</div>
        </div>
      </Card>
    </div>
  );
}

function RootLabel({ x, y, text }) {
  return (
    <foreignObject x={x + 8} y={y - 18} width="122" height="42">
      <div
        style={{
          fontSize: 11,
          background: "rgba(255,255,255,0.96)",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: "4px 6px",
          color: "#334155",
          fontFamily: FONT_STACK,
          boxShadow: "0 3px 10px rgba(15,23,42,0.06)",
        }}
      >
        {text}
      </div>
    </foreignObject>
  );
}

function GraphView({ system, result, x0, y0 }) {
  const { xMin, xMax, yMin, yMax } = system.bounds;
  const width = 760;
  const height = 430;
  const pad = 36;
  const sx = (x) => pad + ((x - xMin) / (xMax - xMin)) * (width - 2 * pad);
  const sy = (y) => height - pad - ((y - yMin) / (yMax - yMin)) * (height - 2 * pad);

  const colors = {
    blue: "#60a5fa",
    orange: "#fb923c",
    green: "#34d399",
    purple: "#a78bfa",
    red: "#ef4444",
    slate: "#94a3b8",
  };

  const axes = (
    <>
      <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke="#cbd5e1" strokeWidth="1.2" />
      <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke="#cbd5e1" strokeWidth="1.2" />
    </>
  );

  let content = null;
  let legend = null;

  if (system.graphType === "circle_exp") {
    const circlePath = pathFromPoints(makeCirclePoints(2), sx, sy);
    const expPath = pathFromPoints(makeExpPoints(xMin, xMax), sx, sy);
    content = (
      <>
        <path d={circlePath} fill="none" stroke={colors.blue} strokeWidth="2.8" />
        <path d={expPath} fill="none" stroke={colors.orange} strokeWidth="2.8" />
      </>
    );
    legend = [
      { c: colors.blue, t: "x² + y² = 4" },
      { c: colors.orange, t: "y = 1 - eˣ" },
    ];
  }

  if (system.graphType === "sin_parabola") {
    const parabola = pathFromPoints(makeParabolaPoints(xMin, xMax), sx, sy);
    const branches = makeSinBranches(xMin, xMax);
    const upperPath = pathFromPoints(branches.upper, sx, sy);
    const lowerPath = pathFromPoints(branches.lower, sx, sy);
    content = (
      <>
        <path d={parabola} fill="none" stroke={colors.green} strokeWidth="2.8" />
        <path d={upperPath} fill="none" stroke={colors.purple} strokeWidth="2.8" />
        <path d={lowerPath} fill="none" stroke={colors.purple} strokeWidth="2.4" strokeDasharray="8 6" />
      </>
    );
    legend = [
      { c: colors.green, t: "y = 1 - x²" },
      { c: colors.purple, t: "y = ±√(1 - sin(x))" },
    ];
  }

  if (system.graphType === "cubic_roots") {
    const rays = makeCubicRays();
    content = (
      <>
        <path d={pathFromPoints(rays.a, sx, sy)} fill="none" stroke={colors.blue} strokeWidth="2.8" />
        <path d={pathFromPoints(rays.b, sx, sy)} fill="none" stroke={colors.orange} strokeWidth="2.8" />
        <path d={pathFromPoints(rays.c, sx, sy)} fill="none" stroke={colors.green} strokeWidth="2.8" />
      </>
    );
    legend = [
      { c: colors.blue, t: "Kök kolu 1" },
      { c: colors.orange, t: "Kök kolu 2" },
      { c: colors.green, t: "Kök kolu 3" },
    ];
  }

  const iterPathPoints = result.rows
    .filter((r) => Number.isFinite(r.x) && Number.isFinite(r.y))
    .map((r) => [r.x, r.y]);

  const iterPath = iterPathPoints.length > 1 ? pathFromPoints(iterPathPoints, sx, sy) : null;

  return (
    <Card style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Sistemin grafiği</div>
          <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.55 }}>
            Çözüm, denklemlerin ortak sağlandığı noktadır. Newton iterasyonu başlangıç noktasından bu çözüm noktalarından birine doğru hareket eder.
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {legend?.map((item) => (
            <div key={item.t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#475569", background: "#fff", border: "1px solid #e5e7eb", padding: "6px 10px", borderRadius: 999 }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: item.c, display: "inline-block" }} />
              {item.t}
            </div>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", borderRadius: 22, background: "#fcfcfb", border: "1px solid #edf2f7" }}>
        <rect x="0" y="0" width={width} height={height} rx="22" fill="#fcfcfb" />
        {axes}
        {content}

        {iterPath ? <path d={iterPath} fill="none" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="7 6" opacity="0.65" /> : null}

        {iterPathPoints.map((p, idx) => (
          <g key={idx}>
            <circle cx={sx(p[0])} cy={sy(p[1])} r={idx === 0 ? 4.8 : 3.4} fill={idx === 0 ? "#111827" : "#334155"} opacity={0.8} />
          </g>
        ))}

        <circle cx={sx(Number(x0))} cy={sy(Number(y0))} r="5.3" fill="#111827" />
        <RootLabel x={sx(Number(x0))} y={sy(Number(y0))} text={`start (${format(Number(x0), 3)}, ${format(Number(y0), 3)})`} />

        {system.roots.map((r, idx) => (
          <g key={idx}>
            <circle cx={sx(r[0])} cy={sy(r[1])} r="5.4" fill="#ef4444" stroke="#fff" strokeWidth="2" />
            <RootLabel x={sx(r[0])} y={sy(r[1])} text={`solution (${format(r[0], 3)}, ${format(r[1], 3)})`} />
          </g>
        ))}

        <text x={width - 42} y={sy(0) - 8} fontSize="12" fill="#64748b">x</text>
        <text x={sx(0) + 10} y={18} fontSize="12" fill="#64748b">y</text>
      </svg>
    </Card>
  );
}

function ManualSection({ system }) {
  return (
    <Card style={{ padding: 22 }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{system.manual.title}</div>
        <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
          Bu bölüm, yöntemin mantığını sade bir ders notu formatında özetler.
        </div>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        <div style={manualBox}>
          <div style={manualTitle}>Sistem</div>
          <div style={manualText}>{system.manual.paragraphs[0]}</div>
        </div>

        <div style={manualBox}>
          <div style={manualTitle}>Jacobian</div>
          <div style={manualText}>{system.manual.paragraphs[1]}</div>
        </div>

        <div style={manualBox}>
          <div style={manualTitle}>Başlangıç noktası</div>
          <div style={manualText}>{system.manual.paragraphs[2]}</div>
        </div>

        <div style={manualBox}>
          <div style={manualTitle}>Lineer sistem</div>
          <div style={manualText}>{system.manual.paragraphs[3]}</div>
        </div>

        <div style={manualBox}>
          <div style={manualTitle}>Güncelleme</div>
          <div style={manualText}>{system.manual.paragraphs[4]}</div>
        </div>

        {system.manual.paragraphs[5] ? (
          <div style={manualBox}>
            <div style={manualTitle}>Yorum</div>
            <div style={manualText}>{system.manual.paragraphs[5]}</div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

function AnimationSection({ system }) {
  return (
    <Card style={{ padding: 22 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Animasyon</div>
      <div style={{ color: "#475569", lineHeight: 1.65, fontSize: 14, marginBottom: 16 }}>
        MATLAB çıktısından üretilen iteratif yaklaşım animasyonu. Dosyayı <span style={{ fontFamily: MONO_STACK }}>{system.animationUrl}</span> yoluna yerleştirirsen otomatik gösterilir.
      </div>
      <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid #e2e8f0", background: "#fff" }}>
        <img
          src={system.animationUrl}
          alt={system.animationLabel}
          style={{ width: "100%", display: "block", minHeight: 240, objectFit: "cover", background: "#f8fafc" }}
        />
      </div>
    </Card>
  );
}

function ColabCard({ label, url }) {
  return (
    <Card style={{ padding: 22 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Python / Colab</div>
      <div style={{ color: "#475569", lineHeight: 1.65, fontSize: 14, marginBottom: 14 }}>
        Örneğe ait Python uygulamasını Colab ortamında açmak için aşağıdaki karta tıklayabilirsiniz.
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          textDecoration: "none",
          padding: 16,
          borderRadius: 20,
          border: "1px solid #dbe5ef",
          background: "linear-gradient(180deg, #ffffff, #f8fafc)",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center", background: "#eff6ff", color: "#2563eb", fontWeight: 800 }}>
            π
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{label}</div>
            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>Open in Colab</div>
          </div>
        </div>
        <div style={{ fontWeight: 700, color: "#2563eb" }}>↗</div>
      </a>
    </Card>
  );
}

function PurposeSection() {
  return (
    <section style={{ marginTop: 40 }}>
      <SectionHeader
        title="Bu site neyi amaçlıyor?"
        subtitle="Bu yapı, çok değişkenli Newton yöntemini hem ilk kez öğrenen öğrenciler hem de sınıfta örnek göstermek isteyen öğreticiler için etkileşimli bir öğrenme alanına dönüştürmek amacıyla tasarlanmıştır."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
        <Card style={{ padding: 22 }}>
          <h3 style={purposeTitle}>Yakınsamayı görünür kılmak</h3>
          <p style={purposeText}>
            Newton yönteminin bazı başlangıç noktalarında çok hızlı çalıştığını, art arda gelen iterasyonlar ve son kök değerleri üzerinden görünür hale getirir.
          </p>
        </Card>
        <Card style={{ padding: 22 }}>
          <h3 style={purposeTitle}>Farklı köklere yönelmeyi göstermek</h3>
          <p style={purposeText}>
            Aynı denklem sisteminin, başlangıç noktası değiştiğinde farklı çözümlere gidebildiğini grafikler ve hızlı başlangıçlar üzerinden öğretir.
          </p>
        </Card>
        <Card style={{ padding: 22 }}>
          <h3 style={purposeTitle}>Başarısızlığı açıklamak</h3>
          <p style={purposeText}>
            det(J)=0 olduğunda Jacobian’ın tekil hale geldiğini ve Newton adımının neden kurulamadığını somut örnekler üzerinden açıklar.
          </p>
        </Card>
      </div>
    </section>
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
          "radial-gradient(circle at top left,#f8f5ef,transparent 30%), radial-gradient(circle at top right,#f4efe6,transparent 28%), linear-gradient(to bottom,#faf8f4,#ffffff,#faf8f4)",
        color: "#0f172a",
        fontFamily: FONT_STACK,
      }}
    >
      <section
        style={{
          borderBottom: "1px solid #ece7de",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "68px 24px 58px",
            display: "grid",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "inline-block",
              width: "fit-content",
              padding: "10px 16px",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              background: "#fff",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Altıgen Zeka • Çok Değişkenli Newton Yöntemi
          </div>

          <h1 style={{ fontSize: 58, lineHeight: 1.02, margin: 0, maxWidth: 980, letterSpacing: "-0.025em", fontWeight: 900 }}>
            Aynı denklem sistemi, <span style={{ color: "#475569" }}>farklı başlangıç noktalarında farklı davranır.</span>
          </h1>

          <p style={{ maxWidth: 920, color: "#475569", fontSize: 18, lineHeight: 1.85, margin: 0 }}>
            Bu öğretim aracı; çok değişkenli Newton yönteminin başarılı yakınsama, farklı köklere yönelme ve Jacobian tekilliği nedeniyle başarısız olma durumlarını karşılaştırmalı olarak gösterir. Her örnek için grafiksel temsil, elle çözüm, MATLAB kodu, Python / Colab bağlantısı ve isteğe bağlı animasyon alanı birlikte sunulmuştur.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              ["3", "Kaynaklı özgün örnek"],
              ["Canlı", "Jakobien ve yakınsama tahmini"],
              ["İnteraktif", "Grafik + kod ile teori ve deney aynı arayüzde"],
            ].map(([big, text]) => (
              <Card key={big} style={{ padding: 20 }}>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{big}</div>
                <div style={{ color: "#475569", marginTop: 8 }}>{text}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1240, margin: "0 auto", padding: "46px 24px 64px" }}>
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="Örnekler"
            subtitle="Her örnek, Newton yönteminin farklı bir yönünü vurgular: stabil yakınsama, kırılgan davranış ve çoklu kök yapısı."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {Object.values(PRESETS).map((p) => (
              <Card key={p.id} style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <Badge>{p.short}</Badge>
                  <button
                    onClick={() => applyPreset(p.id)}
                    style={{
                      border: "1px solid #dbe5ef",
                      background: "#fff",
                      padding: "10px 14px",
                      borderRadius: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Laboratuvarda aç
                  </button>
                </div>

                <h3 style={{ marginTop: 0, fontSize: 24 }}>{p.name}</h3>
                <div style={equationBox}>{p.equations.map((eq, idx) => <div key={idx}>{eq}</div>)}</div>
                <p style={{ color: "#475569", lineHeight: 1.75 }}>{p.why}</p>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: 16, padding: 14, color: "#475569", fontSize: 14, lineHeight: 1.7 }}>
                  <strong style={{ color: "#0f172a" }}>Kaynak:</strong> {p.source}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="İnteraktif Newton laboratuvarı"
            subtitle="Başlangıç noktasını değiştirerek yöntem davranışını test edebilir, Jacobian determinantını ve iterasyon sürecini izleyebilirsin."
          />

          <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 24 }}>
            <Card style={{ padding: 24, alignSelf: "start" }}>
              <h3 style={{ marginTop: 0 }}>Kontrol paneli</h3>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Sistem seç</label>
                <select value={presetId} onChange={(e) => applyPreset(e.target.value)} style={inputStyle}>
                  {Object.values(PRESETS).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.short}: {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <Card style={{ padding: 16, background: "#fbfaf7", boxShadow: "none", border: "1px solid #ece7de", marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Seçili denklem sistemi</div>
                <div style={equationBox}>{preset.equations.map((eq, idx) => <div key={idx}>{eq}</div>)}</div>
                <p style={{ margin: "12px 0 0", fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{preset.note}</p>
              </Card>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>x₀</label>
                  <input style={inputStyle} value={x0} onChange={(e) => setX0(e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>y₀</label>
                  <input style={inputStyle} value={y0} onChange={(e) => setY0(e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Tolerans</label>
                  <input style={inputStyle} value={tol} onChange={(e) => setTol(e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Maks. iterasyon</label>
                  <input style={inputStyle} value={maxIter} onChange={(e) => setMaxIter(e.target.value)} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Hızlı başlangıçlar</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {preset.quickStarts.map((item, idx) => (
                    <QuickStartChip
                      key={idx}
                      item={item}
                      onClick={() => {
                        setX0(String(item.point[0]));
                        setY0(String(item.point[1]));
                        setResult(runNewton(preset, item.point[0], item.point[1], Number(tol), Number(maxIter)));
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <button onClick={handleRun} style={primaryBtn}>Çalıştır</button>
                <button onClick={handleReset} style={secondaryBtn}>Sıfırla</button>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  padding: 14,
                  marginBottom: 16,
                  background:
                    result.status === "converged"
                      ? "#ecfdf5"
                      : result.status === "singular"
                      ? "#fff1f2"
                      : "#fffbeb",
                  border:
                    result.status === "converged"
                      ? "1px solid #a7f3d0"
                      : result.status === "singular"
                      ? "1px solid #fda4af"
                      : "1px solid #fde68a",
                  color: "#334155",
                }}
              >
                {result.status === "converged" ? (
                  <div>
                    <strong>Yakınsadı.</strong> Yaklaşık kök: ({format(result.root?.[0])}, {format(result.root?.[1])})
                  </div>
                ) : result.status === "singular" ? (
                  <div>
                    <strong>Jacobian tekil.</strong> Bu başlangıç noktasında Newton adımı kurulamadı.
                  </div>
                ) : (
                  <div>
                    <strong>Durum:</strong> {result.status}
                  </div>
                )}
              </div>

              <div style={{ borderRadius: 20, border: "1px solid #e2e8f0", padding: 16, color: "#475569", lineHeight: 1.7, fontSize: 14 }}>
                <strong style={{ color: "#0f172a" }}>Kaynak:</strong> {preset.source}
              </div>
            </Card>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 16 }}>
                <MetricCard label="Son nokta" value={`x = ${format(last?.x)}\ny = ${format(last?.y)}`} />
                <MetricCard label="Artık normu" value={format(last?.normF)} />
                <MetricCard label="det(J)" value={format(last?.detJ)} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <MatrixCard system={preset} x={x0} y={y0} />
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                <TabButton active={tab === "graph"} onClick={() => setTab("graph")}>Grafik</TabButton>
                <TabButton active={tab === "animation"} onClick={() => setTab("animation")}>Animasyon</TabButton>
                <TabButton active={tab === "table"} onClick={() => setTab("table")}>Tablo</TabButton>
                <TabButton active={tab === "manual"} onClick={() => setTab("manual")}>Elle çözüm</TabButton>
                <TabButton active={tab === "matlab"} onClick={() => setTab("matlab")}>MATLAB</TabButton>
                <TabButton active={tab === "python"} onClick={() => setTab("python")}>Python</TabButton>
              </div>

              {tab === "graph" && <GraphView system={preset} result={result} x0={x0} y0={y0} />}
              {tab === "animation" && <AnimationSection system={preset} />}

              {tab === "table" && (
                <Card style={{ padding: 20 }}>
                  <div style={{ fontWeight: 700, marginBottom: 12 }}>İterasyon tablosu</div>
                  <div style={{ overflowX: "auto", borderRadius: 20, border: "1px solid #e2e8f0" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead style={{ background: "#f8fafc" }}>
                        <tr>
                          {["k", "x_k", "y_k", "||F||", "det(J)", "Δx", "Δy", "||Δ||"].map((h) => (
                            <th key={h} style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #e2e8f0" }}>{h}</th>
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

              {tab === "manual" && <ManualSection system={preset} />}
              {tab === "matlab" && (
                <Card style={{ padding: 20 }}>
                  <div style={{ fontWeight: 700, marginBottom: 12 }}>MATLAB kodu</div>
                  <CodeBlock code={preset.matlab} />
                </Card>
              )}
              {tab === "python" && <ColabCard label={preset.pythonLabel} url={preset.pythonUrl} />}
            </div>
          </div>
        </section>

        <PurposeSection />
      </main>

      <footer style={{ marginTop: 10, borderTop: "1px solid #ece7de", background: "rgba(255,255,255,0.66)", textAlign: "center", padding: "22px 16px", color: "#475569", fontSize: 14 }}>
        Altıgen Zeka | İstanbul Medeniyet Üniversitesi | 2026
      </footer>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontWeight: 700,
  color: "#0f172a",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid #dbe5ef",
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
  fontFamily: FONT_STACK,
};

const primaryBtn = {
  flex: 1,
  padding: "12px 16px",
  borderRadius: 14,
  border: "none",
  background: "#0f172a",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "12px 16px",
  borderRadius: 14,
  border: "1px solid #dbe5ef",
  background: "#fff",
  color: "#0f172a",
  fontWeight: 700,
  cursor: "pointer",
};

const tdStyle = {
  padding: 12,
  borderBottom: "1px solid #e2e8f0",
  fontFamily: MONO_STACK,
};

const equationBox = {
  padding: "14px 16px",
  borderRadius: 18,
  background: "#fbfcfd",
  border: "1px solid #e2e8f0",
  fontFamily: MONO_STACK,
  fontSize: 14,
  color: "#0f172a",
  lineHeight: 1.8,
  marginBottom: 16,
};

const softFormulaBox = {
  padding: "14px 16px",
  borderRadius: 18,
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  fontFamily: MONO_STACK,
  fontSize: 14,
  color: "#0f172a",
  lineHeight: 1.8,
};

const manualBox = {
  padding: 16,
  borderRadius: 20,
  background: "#fff",
  border: "1px solid #e2e8f0",
};

const manualTitle = {
  fontWeight: 700,
  marginBottom: 8,
};

const manualText = {
  color: "#475569",
  lineHeight: 1.75,
  fontSize: 14,
};

const manualFormula = {
  marginTop: 10,
  padding: "12px 14px",
  borderRadius: 14,
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  fontFamily: MONO_STACK,
  fontSize: 13,
  lineHeight: 1.7,
  color: "#0f172a",
};

const purposeTitle = {
  marginTop: 0,
  marginBottom: 8,
  fontSize: 19,
};

const purposeText = {
  color: "#475569",
  lineHeight: 1.75,
  marginBottom: 0,
};
