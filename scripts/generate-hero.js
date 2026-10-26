const fs = require("fs");

// 像素剑 7x26，符号即颜色
const PAL = {
  ".": null,
  C: "#22d3ee", // 剑刃
  W: "#e0f2fe", // 剑刃高光
  d: "#0891b2", // 剑刃暗部
  M: "#e879f9", // 剑格
  m: "#a21caf", // 剑格暗部
  D: "#334155", // 剑柄
  G: "#e2e8f0"  // 剑柄高光
};

const SWORD = [
  "...C...",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  "..dWd..",
  ".MMMMM.",
  "..mmm..",
  "...D...",
  "...D...",
  "...D...",
  "...D...",
  "..MMM..",
  "...M...",
  "..M.M.."
];

const SCALE = 5;
const SW = 7 * SCALE;   // 35
const SH = 26 * SCALE;  // 130
const W = 900;
const H = 240;
const FLOOR = 190;

// 生成剑的 rect
let swordRect = "";
for (let r = 0; r < SWORD.length; r++) {
  const row = SWORD[r];
  for (let c = 0; c < row.length; c++) {
    const k = row[c];
    const color = PAL[k];
    if (!color) continue;
    swordRect += `<rect x="${c * SCALE}" y="${r * SCALE}" width="${SCALE}" height="${SCALE}" fill="${color}"/>`;
  }
}

// 星空
let stars = "";
for (let i = 0; i < 26; i++) {
  const x = (i * 137) % 900;
  const y = (i * 53) % 120;
  stars += `<rect x="${x}" y="${y}" width="2" height="2" fill="#e0f2fe" opacity="${i % 3 ? 0.5 : 0.9}"/>`;
}

const swordX = W / 2 - SW / 2;
const swordY = FLOOR - SH;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#070b1a"/>
      <stop offset="1" stop-color="#171233"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#22d3ee" stop-opacity=".5"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </linearGradient>
    <style>
      .blink{animation:blink 1.2s steps(1) infinite}
      @keyframes blink{0%,60%{opacity:1}61%,100%{opacity:0}}
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  ${stars}

  <!-- 远景山 -->
  <polygon points="0,190 90,120 180,190" fill="#141033"/>
  <polygon points="120,190 260,100 400,190" fill="#0e0a26"/>
  <polygon points="500,190 620,110 740,190" fill="#141033"/>
  <polygon points="660,190 810,130 900,190" fill="#0e0a26"/>

  <!-- 地面 -->
  <rect x="0" y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="#0a0618"/>
  <line x1="0" y1="${FLOOR}" x2="${W}" y2="${FLOOR}" stroke="#22d3ee" stroke-width="2" opacity=".6"/>
  <g stroke="#22d3ee" stroke-opacity=".25">
    <line x1="150" y1="${FLOOR}" x2="60" y2="${H}"/><line x1="300" y1="${FLOOR}" x2="260" y2="${H}"/>
    <line x1="450" y1="${FLOOR}" x2="450" y2="${H}"/><line x1="600" y1="${FLOOR}" x2="640" y2="${H}"/>
    <line x1="750" y1="${FLOOR}" x2="840" y2="${H}"/>
  </g>

  <!-- 标题 -->
  <text x="${W / 2 + 3}" y="53" text-anchor="middle" font-family="'Courier New',monospace" font-weight="bold" font-size="42" letter-spacing="8" fill="#e879f9" opacity=".9">MYDXX</text>
  <text x="${W / 2}" y="50" text-anchor="middle" font-family="'Courier New',monospace" font-weight="bold" font-size="42" letter-spacing="8" fill="#22d3ee">MYDXX</text>

  <!-- 剑身辉光 -->
  <rect x="${swordX - 14}" y="${swordY - 6}" width="${SW + 28}" height="${SH + 10}" fill="url(#glow)"/>

  <!-- 剑 -->
  <g transform="translate(${swordX},${swordY})">${swordRect}</g>

  <!-- 开始游戏 -->
  <text x="${W / 2}" y="224" text-anchor="middle" font-family="'Courier New',monospace" font-size="18" letter-spacing="3" fill="#e879f9" class="blink">▶ 开始游戏</text>
</svg>`;

fs.writeFileSync("assets/hero.svg", svg, "utf8");
console.log("hero.svg generated, sword:", SW + "x" + SH, "at", swordX + "," + swordY);
