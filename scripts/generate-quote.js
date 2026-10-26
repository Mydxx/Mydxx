const fs = require("fs");

const QUOTES = [
  "你懂得越多，你就越像这个世界的孤儿。",
  "就算全世界都背叛你，我也会站在你身后，背叛全世界。",
  "十几岁的人说出的情话不是情话，可是，那是青春啊。",
  "我们用人生最好的年华做抵押，去担保一个说出来都会被人嘲笑的梦想。",
  "美好的东西总是短暂的，就像樱花，就像烟火，就像你。",
  "每个人心里都沉睡着一头龙，等一场唤醒它的暴雨。",
  "命运负责洗牌，但是玩牌的是我们自己。",
  "孤独的人，才能看到真正的星星。",
  "铁甲依然在！",
  "命运像战车，碾过我们的时候从不会减速。",
  "这个世界有很多事是不能回头的，比如梦，比如岁月，比如爱。",
  "世上有多少心比天高的人，最后都命比纸薄。",
  "我们都会死，可有些东西不会死。",
  "天崩地裂的时候，总要有个人站在最前面。",
  "以血为誓，以铁为证。",
  "我们并肩燃烧过，就不算白活这一场。",
  "沉默的人，心里都藏着一场海啸。",
  "世界以痛吻我，我要报之以歌。"
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
const lines = [];
for (let i = 0; i < q.length; i += 24) lines.push(q.slice(i, i + 24));

const W = 620;
const H = 58 + lines.length * 30;
const body = lines
  .map((l, i) => `<text x="${W / 2}" y="${46 + i * 30}" class="q">${esc(l)}</text>`)
  .join("\n  ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="KaiTi, STKaiti, 'Noto Serif SC', 'Songti SC', serif">
  <defs>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#7dd3fc"/>
      <stop offset="1" stop-color="#f0abfc"/>
    </linearGradient>
    <style>
      .q{fill:#e6edf3;font-size:19px;letter-spacing:1.5px;text-anchor:middle}
    </style>
  </defs>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="10" fill="#0d1117" stroke="#21262d"/>
  <rect x="40" y="1" width="${W - 80}" height="1.5" fill="url(#edge)" opacity=".5"/>
  ${body}
</svg>`;

fs.writeFileSync("dist/poem.svg", svg, "utf8");
console.log("quote card generated:", q);
