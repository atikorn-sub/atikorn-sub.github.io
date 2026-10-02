/* =========================================================
   script.js — นำข้อมูลจาก data.js มาสร้างหน้าเว็บ
   + ปุ่มสลับภาษา TH/EN + ปุ่มโหมดมืด/สว่าง
   ========================================================= */

let lang = "en";

/* ---------- ฟังก์ชันช่วย ---------- */

// ถ้าค่าเป็น { en, th } ให้เลือกตามภาษาปัจจุบัน ถ้าเป็นข้อความธรรมดาก็คืนค่าเดิม
const t = (value) =>
  value && typeof value === "object" && !Array.isArray(value) ? value[lang] : value;

// กันไม่ให้ข้อความถูกตีความเป็น HTML (ป้องกัน XSS — นิสัยดีที่ควรติดตัวไว้)
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const $ = (id) => document.getElementById(id);
const tagsHtml = (tags) => `<ul class="tags">${tags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;

// localStorage ใช้จำภาษา/ธีมที่ผู้ชมเลือกไว้ (ห่อ try/catch เผื่อเบราว์เซอร์ปิดไว้)
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ไม่เป็นไร */ } },
};

/* ---------- สร้างเนื้อหาทั้งหน้า ---------- */
function render() {
  const ui = RESUME.ui[lang];
  const p = RESUME.profile[lang];

  document.documentElement.lang = lang;

  // ข้อความที่มี data-i18n ใน HTML
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = ui[el.dataset.i18n];
  });

  // Hero + About
  $("name").textContent = p.name;
  $("role").textContent = p.role;
  $("tagline").textContent = p.tagline;
  $("location").textContent = p.location;
  $("aboutText").textContent = p.about;
  $("stats").innerHTML = p.stats
    .map((s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`)
    .join("");

  // Skills
  $("skillList").innerHTML = RESUME.skills
    .map((g) => `<div class="card skill-card"><h3>${esc(t(g.group))}</h3>${tagsHtml(g.items)}</div>`)
    .join("");

  // Experience
  $("expList").innerHTML = RESUME.experience
    .map((e) => {
      const end = e.end ? t(e.end) : ui.present;
      const period = t(e.start) === end ? end : `${t(e.start)} – ${end}`;
      return `
        <li class="tl-item${e.end ? "" : " current"}">
          <span class="tl-dot"></span>
          <div class="tl-head">
            <h3>${esc(t(e.role))}</h3>
            <span class="mono period">${esc(period)}</span>
          </div>
          <p class="company">${esc(t(e.company))}</p>
          <ul class="bullets">${t(e.bullets).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          ${tagsHtml(e.tags)}
        </li>`;
    })
    .join("");

  // Projects
  $("projList").innerHTML = RESUME.projects
    .map((pr) => {
      const inner = `
        <span class="mono label">${esc(t(pr.label))}</span>
        <h3>${esc(t(pr.title))}${pr.link ? ' <span class="arrow">↗</span>' : ""}</h3>
        <p>${esc(t(pr.desc))}</p>
        ${tagsHtml(pr.tags)}`;
      return pr.link
        ? `<a class="card project-card" href="${esc(pr.link)}" target="_blank" rel="noopener">${inner}</a>`
        : `<article class="card project-card">${inner}</article>`;
    })
    .join("");

  // Education
  $("eduList").innerHTML = RESUME.education
    .map((ed) => `
      <div class="card edu-card">
        <div>
          <h3>${esc(t(ed.school))}</h3>
          <p>${esc(t(ed.degree))}</p>
        </div>
        <div class="edu-side">
          <span class="mono period">${esc(t(ed.period))}</span>
          <span class="gpa">${esc(ed.gpa)}</span>
        </div>
      </div>`)
    .join("");

  // ปุ่มภาษาแสดงภาษา "ที่จะเปลี่ยนไป"
  $("langBtn").textContent = lang === "en" ? "ไทย" : "EN";
}

/* ---------- ปุ่มสลับภาษา ---------- */
$("langBtn").addEventListener("click", () => {
  lang = lang === "en" ? "th" : "en";
  store.set("lang", lang);
  render();
});

/* ---------- ปุ่มโหมดมืด/สว่าง ---------- */
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  store.set("theme", theme);
}
$("themeBtn").addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

/* ---------- เริ่มทำงานเมื่อเปิดหน้า ---------- */
// ภาษา: ใช้ที่เคยเลือกไว้ หรือถ้าเบราว์เซอร์เป็นภาษาไทยก็เปิดเป็นไทย
lang = store.get("lang") || (navigator.language.startsWith("th") ? "th" : "en");
// ธีม: ใช้ที่เคยเลือกไว้ หรือตามการตั้งค่าเครื่องของผู้ชม
document.documentElement.dataset.theme =
  store.get("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

$("year").textContent = new Date().getFullYear();
render();
