const fs = require("fs");

const QUOTES = [
  { t: "你懂得越多，你就越像这个世界的孤儿。", s: "龙族" },
  { t: "就算全世界都背叛你，我也会站在你身后，背叛全世界。", s: "龙族" },
  { t: "十几岁的人说出的情话不是情话，可是，那是青春啊。", s: "龙族" },
  { t: "我们用人生最好的年华做抵押，去担保一个说出来都会被人嘲笑的梦想。", s: "龙族" },
  { t: "美好的东西总是短暂的，就像樱花，就像烟火，就像你。", s: "龙族" },
  { t: "每个人心里都沉睡着一头龙，等一场唤醒它的暴雨。", s: "龙族" },
  { t: "命运负责洗牌，但是玩牌的是我们自己。", s: "龙族" },
  { t: "孤独的人，才能看到真正的星星。", s: "龙族" },
  { t: "铁甲依然在！", s: "九州缥缈录" },
  { t: "命运像战车，碾过我们的时候从不会减速。", s: "九州缥缈录" },
  { t: "这个世界有很多事是不能回头的，比如梦，比如岁月，比如爱。", s: "九州缥缈录" },
  { t: "世上有多少心比天高的人，最后都命比纸薄。", s: "九州缥缈录" },
  { t: "我们都会死，可有些东西不会死。", s: "九州缥缈录" },
  { t: "天崩地裂的时候，总要有个人站在最前面。", s: "九州缥缈录" },
  { t: "以血为誓，以铁为证。", s: "天之炽" },
  { t: "我们并肩燃烧过，就不算白活这一场。", s: "天之炽" },
  { t: "沉默的人，心里都藏着一场海啸。", s: "天之炽" },
  { t: "世界以痛吻我，我要报之以歌。", s: "天之炽" }
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
const lines = [];
for (let i = 0; i < q.t.length; i += 21) lines.push(q.t.slice(i, i + 21));

const W = 720;
const H = 92 + lines.length * 36;
const body = lines
  .map((l, i) => `<text x="76" y="${88 + i * 36}" class="q">${esc(l)}</text>`)
  .join("\n  ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="KaiTi, STKaiti, 'Noto Serif SC', 'Songti SC', serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b0e16"/>
      <stop offset="1" stop-color="#101625"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#00fff7"/>
      <stop offset="1" stop-color="#ff00d4"/>
    </linearGradient>
    <style>
      .q{fill:#e9edf5;font-size:23px;letter-spacing:2px}
      .src{fill:#8be9ff;font-size:14px;letter-spacing:4px}
      .mark{fill:#00fff7;opacity:.16;font-size:96px;font-family:Georgia,serif}
    </style>
  </defs>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="12" fill="url(#bg)" stroke="#2a3350" stroke-width="1"/>
  <rect x="16" y="16" width="3" height="${H - 32}" rx="1.5" fill="url(#edge)" opacity=".85"/>
  <rect x="12" y="1" width="${W - 24}" height="2" rx="1" fill="url(#edge)" opacity=".55"/>
  <text x="40" y="76" class="mark">“</text>
  ${body}
  <text x="76" y="${H - 26}" class="src">◆ ${esc(q.s)}</text>
</svg>`;

fs.writeFileSync("dist/poem.svg", svg, "utf8");
console.log("quote card generated:", q.s);
