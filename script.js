/* =========================================================
   script.js — นำข้อมูลจาก data.js มาสร้างหน้าเว็บ
   + ปุ่มสลับภาษา TH/EN + ปุ่มโหมดมืด/สว่าง
   + เอฟเฟกต์พิมพ์ข้อความ (typing) และ animation ตอนเลื่อนจอ
   ========================================================= */

let lang = "en";
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- ฟังก์ชันช่วย ---------- */

// ถ้าค่าเป็น { en, th } ให้เลือกตามภาษาปัจจุบัน ถ้าเป็นข้อความธรรมดาก็คืนค่าเดิม
const t = (value) =>
  value && typeof value === "object" && !Array.isArray(value) ? value[lang] : value;

// กันไม่ให้ข้อความถูกตีความเป็น HTML (ป้องกัน XSS)
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const $ = (id) => document.getElementById(id);
const tagsHtml = (tags) => `<ul class="tags">${tags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;

// สร้างเลข commit ปลอม ๆ 7 หลักจากชื่อบริษัท (ได้ค่าเดิมทุกครั้ง)
const fakeHash = (str) => {
  let h = 2166136261;
  for (const ch of str) h = Math.imul(h ^ ch.codePointAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
};

// localStorage ใช้จำภาษา/ธีมที่ผู้ชมเลือกไว้
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ไม่เป็นไร */ } },
};

/* ---------- ตัวช่วยสร้างบรรทัดโค้ดแบบมีสี ---------- */
const S = {
  kw: (x) => `<span class="tk-kw">${x}</span>`,
  key: (x) => `<span class="tk-key">${esc(x)}</span>`,
  str: (x) => `<span class="tk-str">"${esc(x)}"</span>`,
  num: (x) => `<span class="tk-num">${esc(x)}</span>`,
  com: (x) => `<span class="tk-com">// ${esc(x)}</span>`,
  p: (x) => `<span class="tk-p">${x}</span>`,
};
// แปลง array ของบรรทัด → HTML พร้อมเลขบรรทัด
const codeLines = (lines) =>
  lines.map((l, i) => `<div class="ln"><span class="ln-no">${i + 1}</span><span class="ln-code">${l}</span></div>`).join("");

/* ---------- Typing effect ---------- */
let typingTimer;
function typeText(el, text) {
  clearTimeout(typingTimer);
  if (reduceMotion) { el.textContent = text; return; }
  // แยกตัวอักษรแบบไม่ตัดสระ/วรรณยุกต์ภาษาไทยออกจากกัน
  const chars = window.Intl && Intl.Segmenter
    ? [...new Intl.Segmenter(lang, { granularity: "grapheme" }).segment(text)].map((s) => s.segment)
    : Array.from(text);
  let i = 0;
  el.textContent = "";
  const step = () => {
    el.textContent += chars[i++] || "";
    if (i < chars.length) typingTimer = setTimeout(step, 22);
  };
  step();
}

/* ---------- สร้างเนื้อหาทั้งหน้า ---------- */
function render() {
  const ui = RESUME.ui[lang];
  const p = RESUME.profile[lang];

  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = ui[el.dataset.i18n];
  });

  /* Hero + About */
  $("name").textContent = p.name;
  $("role").textContent = p.role;
  typeText($("tagline"), p.tagline);
  $("location").textContent = p.location;
  $("aboutText").textContent = p.about;
  $("stats").innerHTML = p.stats
    .map((s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`)
    .join("");

  /* Skills → แสดงเป็นโค้ด JavaScript */
  const skillLines = [`${S.kw("const")} ${S.key("skills")} ${S.p("=")} ${S.p("{")}`];
  RESUME.skills.forEach((g) => {
    skillLines.push(`  ${S.com(t(g.group))}`);
    skillLines.push(
      `  ${S.key(g.key)}${S.p(":")} ${S.p("[")}<span class="wrap-items">${g.items
        .map((x) => `<span class="item">${S.str(x)}${S.p(",")}</span>`)
        .join(" ")}</span>${S.p("],")}`
    );
  });
  skillLines.push(`${S.p("};")}`);
  $("skillCode").innerHTML = codeLines(skillLines);

  /* Experience → แสดงแบบ git log */
  $("expList").innerHTML = RESUME.experience
    .map((e, i) => {
      const end = e.end ? t(e.end) : ui.present;
      const period = t(e.start) === end ? end : `${t(e.start)} – ${end}`;
      const head = i === 0 ? ` <span class="ref">(HEAD → main)</span>` : "";
      return `
        <article class="commit${e.end ? "" : " current"}">
          <span class="commit-dot"></span>
          <p class="commit-hash">commit ${fakeHash(t(e.company))}${head}</p>
          <div class="commit-head">
            <h3>${esc(t(e.role))}</h3>
            <span class="period">${esc(period)}</span>
          </div>
          <p class="company">@ ${esc(t(e.company))}</p>
          <ul class="diff">${t(e.bullets).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          ${tagsHtml(e.tags)}
        </article>`;
    })
    .join("");

  /* Projects */
  $("projList").innerHTML = RESUME.projects
    .map((pr) => {
      const inner = `
        <div class="file-tab"><span class="file-name">${esc(pr.file || "")}</span><span class="label">${esc(t(pr.label))}</span></div>
        <div class="project-body">
          <h3>${esc(t(pr.title))}${pr.link ? ' <span class="arrow">↗</span>' : ""}</h3>
          <p>${esc(t(pr.desc))}</p>
          ${tagsHtml(pr.tags)}
        </div>`;
      return pr.link
        ? `<a class="project-card" href="${esc(pr.link)}" target="_blank" rel="noopener">${inner}</a>`
        : `<article class="project-card">${inner}</article>`;
    })
    .join("");

  /* Expectations → แสดงเป็นผลลัพธ์ SQL */
  const ex = RESUME.expectations;
  $("expectations").hidden = !ex || !ex.show;
  document.querySelector('.nav a[href="#expectations"]').hidden = !ex || !ex.show;
  if (ex && ex.show) {
    const fmt = (n) => Number(n).toLocaleString("en-US");
    let salary = ui.tbd;
    if (ex.salaryMin || ex.salaryMax) {
      const range = ex.salaryMin && ex.salaryMax
        ? `${fmt(ex.salaryMin)} – ${fmt(ex.salaryMax)}`
        : fmt(ex.salaryMin || ex.salaryMax);
      salary = lang === "en" ? `฿${range} ${ui.perMonth}` : `${range} ${ui.perMonth}`;
    }
    const cell = (v) => (v == null || v === "" ? `<span class="null">${esc(ui.tbd)}</span>` : esc(v));
    const rows = [
      [ui.salary, `<span class="money">${esc(salary)}</span>${ex.negotiable ? ` <span class="badge">${esc(ui.negotiable)}</span>` : ""}`],
      [ui.workType, cell(t(ex.workType))],
      [ui.availableFrom, cell(t(ex.availableFrom))],
      [ui.roles, ex.roles && ex.roles.length ? tagsHtml(ex.roles) : cell(null)],
    ];
    if (ex.note) rows.push([ui.note, cell(t(ex.note))]);
    $("expectRows").innerHTML = rows.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${v}</td></tr>`).join("");
    $("rowsNote").textContent = ui.rowsAffected(rows.length);
  }

  /* Education → แสดงเป็น JSON */
  const eduLines = [S.p("[")];
  RESUME.education.forEach((ed, i) => {
    eduLines.push(`  ${S.p("{")}`);
    eduLines.push(`    ${S.key('"school"')}${S.p(":")} ${S.str(t(ed.school))}${S.p(",")}`);
    eduLines.push(`    ${S.key('"degree"')}${S.p(":")} ${S.str(t(ed.degree))}${S.p(",")}`);
    eduLines.push(`    ${S.key('"period"')}${S.p(":")} ${S.str(t(ed.period))}${S.p(",")}`);
    eduLines.push(`    ${S.key('"gpax"')}${S.p(":")} ${S.num(ed.gpa.replace(/[^\d.]/g, ""))}`);
    eduLines.push(`  ${S.p(i < RESUME.education.length - 1 ? "}," : "}")}`);
  });
  eduLines.push(S.p("]"));
  $("eduCode").innerHTML = codeLines(eduLines);

  $("langBtn").textContent = lang === "en" ? "ไทย" : "EN";
}

/* ---------- ปุ่มสลับภาษา ---------- */
$("langBtn").addEventListener("click", () => {
  lang = lang === "en" ? "th" : "en";
  store.set("lang", lang);
  render();
});

/* ---------- ปุ่มโหมดมืด/สว่าง ---------- */
$("themeBtn").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  store.set("theme", next);
});

/* ---------- Animation ตอนเลื่อนจอ ---------- */
if (!reduceMotion && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
}

/* ---------- เริ่มทำงานเมื่อเปิดหน้า ---------- */
lang = store.get("lang") || (navigator.language.startsWith("th") ? "th" : "en");
document.documentElement.dataset.theme = store.get("theme") || "dark"; // ธีม Terminal เริ่มที่โหมดมืด
$("year").textContent = new Date().getFullYear();
render();
