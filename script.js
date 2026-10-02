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

/* ---------- แกลเลอรีรูป ----------
   images ใน data.js ใส่ได้ 2 แบบ: "path.jpg"  หรือ  { src: "path.jpg", caption: { en, th } }
   1 รูป = ภาพใหญ่ / 2 รูป = วางคู่ / 3 รูปขึ้นไป = โมเสก (รูปที่ 4+ รวมเป็นป้าย "+N") */
const galleries = []; // เก็บรายการรูปของทุกแกลเลอรี เพื่อให้ Lightbox เปิดดูต่อกันได้

// รูปที่ยังไม่มีไฟล์ → แสดงกรอบ Avatar พร้อมพิมพ์พาธที่ต้องวางไฟล์
const placeholder = (path) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><rect width='800' height='600' fill='#141c29'/>` +
    `<g fill='#1f2a3b'><circle cx='400' cy='225' r='85'/><path d='M200 600c0-120 80-200 200-200s200 80 200 200z'/></g>` +
    `<text x='400' y='560' font-family='monospace' font-size='24' fill='#7f8ea3' text-anchor='middle'>${esc(path)}</text></svg>`
  );

const normImages = (list) => list.map((x) => (typeof x === "string" ? { src: x } : x));

function registerGallery(list, name) {
  return galleries.push({ items: normImages(list), name }) - 1;
}

function galleryHtml(list, name) {
  if (!list || !list.length) return "";
  const id = registerGallery(list, name);
  const items = galleries[id].items;
  const more = items.length - 3;
  return `<div class="gallery g${Math.min(items.length, 3)}">${items
    .slice(0, 3)
    .map((it, i) => `
      <button class="gal-item" type="button" data-g="${id}" data-i="${i}" aria-label="${esc(name)} ${i + 1}/${items.length}">
        <img class="gal-img" loading="lazy" src="${esc(it.src)}" alt="${esc(it.caption ? t(it.caption) : name)}">
        ${i === 2 && more > 0 ? `<span class="gal-more">+${more}</span>` : ""}
      </button>`)
    .join("")}</div>`;
}

/* ---------- สไลด์โชว์ (ใช้กับการ์ดรางวัลเด่นที่มี 2 รูปขึ้นไป) ----------
   เลื่อนอัตโนมัติแบบวนลูป / หยุดเมื่อเอาเมาส์ชี้หรือโฟกัส / มีลูกศร, จุดบอกตำแหน่ง, ปัดนิ้วบนมือถือ
   ค่าเริ่มต้นของทุกกล่อง = เลื่อนทุก 3 วินาทีแบบสไลด์ — ตั้งค่าเฉพาะกล่องได้ที่ `slideshow` ของรางวัลนั้นใน data.js:
     slideshow: { delay: 4500, effect: "fade" }   // delay = มิลลิวินาที, effect = "slide" (ค่าเริ่มต้น) หรือ "fade" (ภาพค่อย ๆ จางเข้า-ออก) */
const CAROUSEL_DELAY = 3000;
const carouselTimers = [];

function carouselHtml(list, name, opts = {}) {
  const id = registerGallery(list, name);
  const items = galleries[id].items;
  const delay = Number(opts.delay) || CAROUSEL_DELAY;
  const fade = opts.effect === "fade";
  return `
    <div class="carousel${fade ? " fade" : ""}" data-count="${items.length}" data-delay="${delay}">
      <div class="car-track">${items
        .map((it, i) => `
          <button class="car-slide gal-item${i ? "" : " active"}" type="button" data-g="${id}" data-i="${i}" aria-label="${esc(name)} ${i + 1}/${items.length}">
            <img class="gal-img" src="${esc(it.src)}" alt="${esc(it.caption ? t(it.caption) : name)}"${i ? ' loading="lazy"' : ""}>
          </button>`)
        .join("")}</div>
      <button class="car-nav prev" type="button" aria-label="Previous">‹</button>
      <button class="car-nav next" type="button" aria-label="Next">›</button>
      <div class="car-dots">${items
        .map((_, i) => `<button class="car-dot${i ? "" : " active"}" type="button" data-dot="${i}" aria-label="${i + 1}"></button>`)
        .join("")}</div>
    </div>`;
}

function initCarousels() {
  carouselTimers.splice(0).forEach(clearInterval); // ล้างตัวจับเวลาเก่า (เช่นตอนสลับภาษา render ใหม่)
  document.querySelectorAll(".carousel").forEach((el) => {
    const n = Number(el.dataset.count);
    const track = el.querySelector(".car-track");
    const slides = el.querySelectorAll(".car-slide");
    const dots = el.querySelectorAll(".car-dot");
    const fade = el.classList.contains("fade");
    const delay = Number(el.dataset.delay) || CAROUSEL_DELAY;
    let cur = 0;
    let timer = null;
    let paused = false;

    const go = (i) => {
      cur = (i + n) % n;
      if (fade) slides.forEach((s, k) => s.classList.toggle("active", k === cur)); // เฟด: สลับรูปที่ซ้อนกัน
      else track.style.transform = `translateX(${-cur * 100}%)`;                  // สไลด์: เลื่อนแถบรูป
      dots.forEach((d, k) => d.classList.toggle("active", k === cur));
    };
    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => {
      stop();
      if (reduceMotion || paused) return;
      timer = setInterval(() => go(cur + 1), delay);
      carouselTimers.push(timer);
    };

    el.querySelector(".prev").addEventListener("click", () => { go(cur - 1); start(); });
    el.querySelector(".next").addEventListener("click", () => { go(cur + 1); start(); });
    dots.forEach((d) => d.addEventListener("click", () => { go(Number(d.dataset.dot)); start(); }));

    // หยุดเลื่อนตอนผู้ชมกำลังดู (เมาส์ชี้ / โฟกัสด้วยคีย์บอร์ด) แล้วเริ่มใหม่ตอนออก
    el.addEventListener("mouseenter", () => { paused = true; stop(); });
    el.addEventListener("mouseleave", () => { paused = false; start(); });
    el.addEventListener("focusin", () => { paused = true; stop(); });
    el.addEventListener("focusout", () => { paused = false; start(); });

    // ปัดซ้าย/ขวาบนมือถือ
    let x0 = null;
    el.addEventListener("touchstart", (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    el.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); start(); }
    });

    start();
  });
}

// รูปไหนโหลดไม่ได้ → เปลี่ยนเป็นกรอบสำรอง (error ของ <img> ไม่ bubble จึงต้องดักตอน capture)
document.addEventListener("error", (e) => {
  const img = e.target;
  if (img.tagName === "IMG" && img.classList.contains("gal-img") && !img.dataset.missing) {
    img.dataset.missing = "1";
    img.src = placeholder(img.getAttribute("src"));
  }
}, true);

/* ---------- สร้างเนื้อหาทั้งหน้า ---------- */
function render() {
  const ui = RESUME.ui[lang];
  const p = RESUME.profile[lang];
  galleries.length = 0; // สร้างรายการแกลเลอรีใหม่ทุกครั้งที่ render (เช่นตอนสลับภาษา)

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
      const title = esc(t(pr.title));
      // มีลิงก์ → ลิงก์ที่ชื่อโปรเจกต์ขยายคลุมทั้งการ์ด (รูปในแกลเลอรียังกดซูมได้ ไม่โดนลิงก์ทับ)
      const heading = pr.link
        ? `<a class="stretched" href="${esc(pr.link)}" target="_blank" rel="noopener">${title} <span class="arrow">↗</span></a>`
        : title;
      return `
        <article class="project-card${pr.link ? " linked" : ""}">
          <div class="file-tab"><span class="file-name">${esc(pr.file || "")}</span><span class="label">${esc(t(pr.label))}</span></div>
          ${galleryHtml(pr.images, t(pr.title))}
          <div class="project-body">
            <h3>${heading}</h3>
            <p>${esc(t(pr.desc))}</p>
            ${tagsHtml(pr.tags)}
          </div>
        </article>`;
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

  /* Achievements → รางวัลและกิจกรรม (รายการที่ top: true จะถูกไฮไลต์) */
  // แบบ A: รางวัลเด่น (top: true) = การ์ดใหญ่เต็มความกว้าง รูปซ้าย/ขวาสลับกัน
  //        รางวัลอื่น ๆ = แถบการ์ดเลื่อนแนวนอน (ไม่มีรูปก็แสดงเป็นไอคอนใหญ่แทน)
  const feats = RESUME.achievements.filter((a) => a.top);
  const rest = RESUME.achievements.filter((a) => !a.top);
  const hasImg = (a) => a.images && a.images.length;
  const art = (a) => `<div class="achv-art" aria-hidden="true"><span>${a.icon}</span></div>`;
  const meta = (a) =>
    `<p class="achv-meta"><span class="achv-icon" aria-hidden="true">${a.icon}</span>${a.year ? `<span class="achv-year">${esc(t(a.year))}</span>` : ""}</p>`;

  $("achvFeatured").innerHTML = feats
    .map((a, i) => `
      <article class="achv-feature${i % 2 ? " alt" : ""}">
        <div class="achv-media">${
          !hasImg(a) ? art(a)
          : a.images.length > 1 ? carouselHtml(a.images, t(a.title), a.slideshow)
          : galleryHtml(a.images, t(a.title))
        }</div>
        <div class="achv-text">
          ${meta(a)}
          <h3>${esc(t(a.title))}</h3>
          <p>${esc(t(a.desc))}</p>
        </div>
      </article>`)
    .join("");

  $("achvMore").hidden = !rest.length;
  $("achvRail").innerHTML = rest
    .map((a) => {
      let thumb = art(a);
      if (hasImg(a)) {
        const id = registerGallery(a.images, t(a.title));
        const items = galleries[id].items;
        thumb = `
          <button class="gal-item" type="button" data-g="${id}" data-i="0" aria-label="${esc(t(a.title))}">
            <img class="gal-img" loading="lazy" src="${esc(items[0].src)}" alt="${esc(t(a.title))}">
            ${items.length > 1 ? `<span class="gal-count">+${items.length - 1}</span>` : ""}
          </button>`;
      }
      return `
        <article class="achv-card">
          <div class="achv-thumb">${thumb}</div>
          <div class="achv-card-body">
            ${meta(a)}
            <h3>${esc(t(a.title))}</h3>
            <p>${esc(t(a.desc))}</p>
          </div>
        </article>`;
    })
    .join("");

  /* Certificates → ตารางรูปใบเกียรติบัตร (ทั้งหมดอยู่ในแกลเลอรีเดียว กดแล้วไล่ดูต่อกันได้) */
  const certs = RESUME.certificates || [];
  $("certificates").hidden = !certs.length;
  document.querySelector('.nav a[href="#certificates"]').hidden = !certs.length;
  if (certs.length) {
    const cid = registerGallery(certs, ui.navCerts);
    $("certGrid").innerHTML = galleries[cid].items
      .map((c, i) => `
        <button class="gal-item cert" type="button" data-g="${cid}" data-i="${i}">
          <img class="gal-img" loading="lazy" src="${esc(c.src)}" alt="${esc(c.caption ? t(c.caption) : "Certificate " + (i + 1))}">
          <span class="cert-name">${esc(c.caption ? t(c.caption) : "cert-" + String(i + 1).padStart(2, "0"))}</span>
        </button>`)
      .join("");
  }

  /* Contact → รายการช่องทางติดต่อในหน้าต่าง "ติดต่อฉัน" */
  $("contactList").innerHTML = RESUME.contact
    .map((c, i) => `
      <li style="--i:${i}">
        <span class="c-key">${esc(c.key)}</span>
        <span class="c-val">${c.copy ? `<a href="${esc(c.href)}">${esc(c.value)}</a>` : esc(c.value)}</span>
        ${c.copy
          ? `<button class="c-btn" type="button" data-copy="${esc(c.value)}" data-href="${esc(c.href)}">${esc(ui.copy)}</button>`
          : `<a class="c-btn" href="${esc(c.href)}" target="_blank" rel="noopener">${esc(ui.open)} ↗</a>`}
      </li>`)
    .join("");
  $("contactClose").setAttribute("aria-label", ui.close);

  initCarousels();

  /* หน้าต่าง "ดาวน์โหลดเรซูเม": ไม่ปล่อยไฟล์ตรง ๆ → ข้อความขำ ๆ + ให้ขอทางอีเมล (ดึงอีเมลจาก RESUME.contact) */
  const emailItem = RESUME.contact.find((c) => c.key === "email");
  const mail = emailItem ? emailItem.value : "";
  const mailHref = `mailto:${mail}?subject=${encodeURIComponent(ui.resumeSubject)}&body=${encodeURIComponent(ui.resumeBody)}`;
  $("resumeBtn").href = mailHref; // กรณี JavaScript ทำงานผิดพลาด ปุ่มยังเปิดอีเมลขอเรซูเมได้
  $("resumeDeny").textContent = ui.resumeDeny;
  $("resumeMsg").textContent = ui.resumeMsg;
  $("resumeSend").textContent = ui.resumeSend;
  $("resumeSend").href = mailHref;
  $("resumeClose").setAttribute("aria-label", ui.close);
  $("resumeList").innerHTML = emailItem
    ? `<li style="--i:0">
         <span class="c-key">email</span>
         <span class="c-val"><a href="${esc(mailHref)}">${esc(mail)}</a></span>
         <button class="c-btn" type="button" data-copy="${esc(mail)}" data-href="${esc(mailHref)}">${esc(ui.copy)}</button>
       </li>`
    : "";

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

/* ---------- ปุ่ม ‹ › เลื่อนแถบรางวัลอื่น ๆ ---------- */
$("railPrev").addEventListener("click", () => $("achvRail").scrollBy({ left: -320, behavior: "smooth" }));
$("railNext").addEventListener("click", () => $("achvRail").scrollBy({ left: 320, behavior: "smooth" }));

/* ---------- Lightbox: ดูรูปเต็มจอ ไล่ดูต่อกันได้ (ปุ่ม ‹ ›, ลูกศรคีย์บอร์ด, ปัดบนมือถือ) ---------- */
const lightbox = $("lightbox");
let lbList = [];
let lbIndex = 0;

function showLightbox() {
  const item = lbList[lbIndex];
  const img = $("lightboxImg");
  img.onerror = () => { img.onerror = null; img.src = placeholder(item.src); }; // ไม่มีไฟล์ → กรอบสำรอง
  img.src = item.src;
  img.alt = item.caption ? t(item.caption) : "";
  $("lightboxCap").textContent = item.caption ? t(item.caption) : "";
  const many = lbList.length > 1;
  $("lightboxPrev").hidden = $("lightboxNext").hidden = $("lightboxCount").hidden = !many;
  $("lightboxCount").textContent = `${lbIndex + 1} / ${lbList.length}`;
}
function openLightbox(list, index = 0) {
  lbList = list;
  lbIndex = index;
  showLightbox();
  if (!lightbox.open) lightbox.showModal();
}
function stepLightbox(d) {
  if (lbList.length < 2) return;
  lbIndex = (lbIndex + d + lbList.length) % lbList.length;
  showLightbox();
}

$("avatarBtn").addEventListener("click", () => openLightbox([{ src: $("avatarBtn").querySelector("img").src }]));
// กดรูปในแกลเลอรี (การ์ดโปรเจกต์ / รางวัล / เกียรติบัตร) → เปิดชุดรูปนั้นตั้งแต่รูปที่กด
document.addEventListener("click", (e) => {
  const b = e.target.closest(".gal-item");
  if (b) openLightbox(galleries[b.dataset.g].items, Number(b.dataset.i));
});
$("lightboxPrev").addEventListener("click", () => stepLightbox(-1));
$("lightboxNext").addEventListener("click", () => stepLightbox(1));
$("lightboxClose").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); }); // กดพื้นที่ว่างเพื่อปิด
lightbox.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});
let touchX = null;
lightbox.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  touchX = null;
  if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
});

// เอาเมาส์ชี้ที่รูปแล้วซูมเข้า โดยจุดที่ซูมจะเลื่อนตามเมาส์
const avatarBtn = $("avatarBtn");
avatarBtn.addEventListener("mousemove", (e) => {
  const r = avatarBtn.getBoundingClientRect();
  avatarBtn.style.setProperty("--zx", ((e.clientX - r.left) / r.width) * 100 + "%");
  avatarBtn.style.setProperty("--zy", ((e.clientY - r.top) / r.height) * 100 + "%");
  avatarBtn.classList.add("tracking");
});
avatarBtn.addEventListener("mouseleave", () => {
  avatarBtn.classList.remove("tracking");
  avatarBtn.style.removeProperty("--zx");
  avatarBtn.style.removeProperty("--zy");
});

/* ---------- ปุ่ม "ติดต่อฉัน" → เปิดหน้าต่างช่องทางติดต่อ ---------- */
const contactDialog = $("contactDialog");
$("contactBtn").addEventListener("click", (e) => {
  e.preventDefault(); // ถ้า JS ไม่ทำงาน ปุ่มจะยังเปิดโปรแกรมอีเมลตามปกติ (mailto)
  contactDialog.showModal();
});
$("contactClose").addEventListener("click", () => contactDialog.close());
contactDialog.addEventListener("click", (e) => { if (e.target === contactDialog) contactDialog.close(); }); // กดพื้นหลังเพื่อปิด

// ปุ่มคัดลอก (ใช้ event delegation เพราะรายการถูกสร้างใหม่ทุกครั้งที่สลับภาษา) — ใช้ร่วมกันทั้งหน้าต่างติดต่อและหน้าต่างเรซูเม
const bindCopy = (listEl) => listEl.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-copy]");
  if (!btn) return;
  try {
    await navigator.clipboard.writeText(btn.dataset.copy);
    btn.textContent = RESUME.ui[lang].copied;
    btn.classList.add("done");
    setTimeout(() => { btn.textContent = RESUME.ui[lang].copy; btn.classList.remove("done"); }, 1600);
  } catch {
    location.href = btn.dataset.href; // คัดลอกไม่ได้ → เปิดโปรแกรมอีเมล/โทรศัพท์แทน
  }
});
bindCopy($("contactList"));
bindCopy($("resumeList"));

/* ---------- ปุ่ม "ดาวน์โหลดเรซูเม" → หน้าต่างขอเรซูเมทางอีเมล ---------- */
const resumeDialog = $("resumeDialog");
$("resumeBtn").addEventListener("click", (e) => {
  e.preventDefault();
  resumeDialog.showModal();
});
$("resumeClose").addEventListener("click", () => resumeDialog.close());
resumeDialog.addEventListener("click", (e) => { if (e.target === resumeDialog) resumeDialog.close(); });

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
lang = store.get("lang") || "th"; // เริ่มที่ภาษาไทย (ถ้าผู้ชมเคยกดสลับภาษา จะจำค่าที่เลือกไว้)
document.documentElement.dataset.theme = store.get("theme") || "dark"; // ธีม Terminal เริ่มที่โหมดมืด
$("year").textContent = new Date().getFullYear();
render();
