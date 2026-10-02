/* =========================================================
   data.js — ข้อมูล Resume ทั้งหมดอยู่ที่ไฟล์นี้ไฟล์เดียว
   อยากแก้ข้อความ / เพิ่มงานใหม่ → แก้ที่นี่ ไม่ต้องแตะ HTML
   (โครงสร้างแบบนี้คล้าย JSON ที่ได้จาก API ในงาน Full-stack)
   ========================================================= */

const RESUME = {
  /* ---------- ข้อความบนปุ่ม/หัวข้อ (UI) ---------- */
  ui: {
    en: {
      navAbout: "About", navSkills: "Skills", navExperience: "Experience",
      navProjects: "Projects", navEducation: "Education", navExpect: "Expectations", navAchieve: "Achievements", navCerts: "Certificates", moreAchv: "More achievements & activities", downloadResume: "Download Resume",
      resumeDeny: "403 Forbidden — this file contains personal data 🔒",
      resumeMsg: "My full resume has some personal details, so I don't leave it lying around the internet 😄 Drop me an email, tell me a little about what you're looking for, and I'll send it right over.",
      resumeSend: "✉ Email me for it",
      resumeSubject: "Resume request",
      resumeBody: "Hi Atikorn,\n\nI'd like to request your resume.\n\nName / Company:\nPosition:\n\nThank you!",
      contactMe: "Contact me", openToWork: "Open to new opportunities",
      present: "Present",
      footer: "Built with HTML, CSS & JavaScript · Hosted on GitHub Pages",
      // ตาราง Expectations
      salary: "expected_salary", workType: "work_type", availableFrom: "available_from",
      roles: "interested_roles", note: "note",
      perMonth: "/ month", negotiable: "negotiable", tbd: "TBD",
      copy: "Copy", copied: "Copied ✓", open: "Open", close: "Close",
      rowsAffected: (n) => `(${n} rows affected)`,
    },
    th: {
      navAbout: "เกี่ยวกับฉัน", navSkills: "ทักษะ", navExperience: "ประสบการณ์",
      navProjects: "ผลงาน", navEducation: "การศึกษา", navExpect: "สิ่งที่คาดหวัง", navAchieve: "รางวัลและกิจกรรม", navCerts: "เกียรติบัตร", moreAchv: "รางวัลและกิจกรรมอื่น ๆ", downloadResume: "ดาวน์โหลดเรซูเม",
      resumeDeny: "403 Forbidden — ไฟล์นี้มีข้อมูลส่วนบุคคล 🔒",
      resumeMsg: "เรซูเมฉบับเต็มของผมมีข้อมูลส่วนตัวอยู่ เลยไม่สามารถปล่อยให้โหลดได้😄 โปรดติดต่อผมผ่านอีเมล์ จากนั้นผมจะส่งให้ครับ😄",
      resumeSend: "✉ ส่งอีเมลขอเรซูเม",
      resumeSubject: "ขอรับเรซูเม",
      resumeBody: "สวัสดีครับ คุณอธิกร\n\nผมสนใจขอรับเรซูเมของคุณ\n\nชื่อ / บริษัท:\nตำแหน่งที่สนใจ:\n\nขอบคุณครับ",
      contactMe: "ติดต่อฉัน", openToWork: "พร้อมรับโอกาสใหม่ ๆ",
      present: "ปัจจุบัน",
      footer: "พัฒนาด้วย HTML, CSS และ JavaScript · เผยแพร่ด้วย GitHub Pages",
      // ตาราง Expectations
      salary: "เงินเดือนที่คาดหวัง", workType: "รูปแบบการทำงาน", availableFrom: "เริ่มงานได้",
      roles: "ตำแหน่งที่สนใจ", note: "หมายเหตุ",
      perMonth: "บาท / เดือน", negotiable: "ต่อรองได้", tbd: "แจ้งภายหลัง",
      copy: "คัดลอก", copied: "คัดลอกแล้ว ✓", open: "เปิด", close: "ปิด",
      rowsAffected: (n) => `(${n} rows affected)`,
    },
  },

  /* ---------- ข้อมูลส่วนตัว ---------- */
  profile: {
    en: {
      name: "Atikorn Subsuieng",
      role: "Software Developer · K2 & SQL",
      tagline: "I build workflow automation and data-heavy financial systems — and I'm growing into a full-stack developer.",
      location: "Ayutthaya, Thailand",
      about:
        "I'm a developer who loves turning complex business processes into reliable systems. " +
        "Day to day I work on the K2 platform (BPA/RPA) and write SQL Server stored procedures, views and queries " +
        "for large-scale financial operations. I've also built a full-stack e-commerce site with React, a REST API " +
        "and MySQL, plus internal apps with Microsoft Power Platform. I learn fast, enjoy teamwork and presenting, " +
        "and I'm now leveling up toward full-stack development.",
      stats: [
        { value: "2024", label: "Started as a developer" },
        { value: "3.96", label: "GPAX, Information Systems" },
        { value: "SQL", label: "Strongest skill" },
      ],
    },
    th: {
      name: "อธิกร สืบซึ้ง",
      role: "Software Developer · K2 & SQL",
      tagline: "พัฒนาระบบ Workflow Automation และระบบการเงินที่มีข้อมูลขนาดใหญ่ และกำลังพัฒนาตัวเองสู่ Full-stack Developer/Back-end Developer/System Analyst",
      location: "พระนครศรีอยุธยา, ประเทศไทย",
      about:
        "เป็นนักพัฒนาที่ชอบเปลี่ยนกระบวนการทางธุรกิจที่ซับซ้อนให้กลายเป็นระบบที่ใช้งานได้จริง " +
        "งานประจำคือพัฒนาบนแพลตฟอร์ม K2 (BPA/RPA) และเขียน Stored Procedure, View และ Query บน SQL Server " +
        "สำหรับงานการเงินที่มีข้อมูลขนาดใหญ่ นอกจากนี้ยังเคยพัฒนาเว็บ E-Commerce แบบ Full-stack ด้วย React, REST API " +
        "และ MySQL รวมถึงแอปภายในองค์กรด้วย Microsoft Power Platform เรียนรู้เร็ว ทำงานเป็นทีมได้ดี ชอบการนำเสนอ " +
        "และกำลังต่อยอดตัวเองสู่การเป็น Full-stack Developer",
      stats: [
        { value: "2567", label: "เริ่มทำงานสาย Developer" },
        { value: "3.96", label: "เกรดเฉลี่ย ระบบสารสนเทศ" },
        { value: "SQL", label: "ทักษะที่ถนัดที่สุด" },
      ],
    },
  },

  /* ---------- ทักษะ (ชื่อเทคโนโลยีใช้ภาษาอังกฤษทั้งสองภาษา) ---------- */
  skills: [
    { key: "database", group: { en: "Database", th: "ฐานข้อมูล" },
      items: ["Microsoft SQL Server", "T-SQL", "Stored Procedures", "Views", "Query Optimization", "MySQL"] },
    { key: "workflow", group: { en: "Workflow & Low-code", th: "Workflow & Low-code" },
      items: ["K2", "BPA / RPA", "Power Apps (Power Fx)", "Power BI", "Microsoft Power Platform"] },
    { key: "web", group: { en: "Web Development", th: "พัฒนาเว็บ" },
      items: ["HTML", "CSS", "JavaScript", "React", "REST API", "Prisma ORM"] },
    { key: "other", group: { en: "Other", th: "อื่น ๆ" },
      items: ["Microsoft 365", "Active Directory", "Graphic Design", "Video Editing", "Presenting"] },
  ],

  /* ---------- ประสบการณ์ทำงาน (ใหม่สุดอยู่บน) ---------- */
  experience: [
    {
      start: { en: "2024", th: "2567" }, end: null, // null = ปัจจุบัน
      company: { en: "I-Design Solution Co., Ltd.", th: "บริษัท ไอ-ดีไซน์ โซลูชั่น" },
      role: "Junior Software Developer (K2)",
      bullets: {
        en: [
          "Build enterprise systems for NGERN HAI JAI Co., Ltd. (เงินให้ใจ), a lending company in the Kasikornbank (KBank) group — software that supports real loan and debt-collection operations.",
          "Design and deliver end-to-end workflow automation on the K2 platform (BPA), turning multi-step lending and litigation processes into streamlined, trackable digital workflows.",
          "Automate repetitive back-office tasks with K2 RPA, freeing teams from manual, error-prone work.",
          "Write and tune complex SQL Server stored procedures, views and queries that keep large-scale financial data fast, accurate and reliable.",
          "Contributed to a car auction system and the NGERN HAI JAI lending & litigation project, working with business teams from requirements through delivery.",
        ],
        th: [
          "พัฒนาระบบระดับองค์กรให้บริษัท เงินให้ใจ จำกัด (NGERN HAI JAI) บริษัทสินเชื่อในเครือธนาคารกสิกรไทย เป็นซอฟต์แวร์ที่รองรับงานสินเชื่อและงานติดตามหนี้จริง",
          "ออกแบบและพัฒนา Workflow Automation แบบ End-to-end บนแพลตฟอร์ม K2 (BPA) เปลี่ยนกระบวนการสินเชื่อและงานดำเนินคดีที่มีหลายขั้นตอนให้เป็นระบบดิจิทัลที่ติดตามสถานะได้",
          "ใช้ K2 RPA ทำงานซ้ำ ๆ ในหลังบ้านแบบอัตโนมัติ ลดงานมือที่เสี่ยงต่อความผิดพลาด",
          "เขียนและปรับจูน Stored Procedure, View และ Query บน SQL Server ที่ซับซ้อน ให้ข้อมูลการเงินปริมาณมากทำงานได้เร็ว ถูกต้อง และเชื่อถือได้",
          "ร่วมพัฒนาระบบประมูลรถยนต์ และโครงการสินเชื่อ/ติดตามหนี้ NGERN HAI JAI ทำงานร่วมกับฝ่ายธุรกิจตั้งแต่เก็บความต้องการจนส่งมอบ",
        ],
      },
      tags: ["K2", "SQL Server", "BPA", "RPA", "Financial Systems", "Stored Procedures"],
    },
    {
      start: { en: "2025", th: "2568" }, end: { en: "2025", th: "2568" },
      company: { en: "Rajamangala University of Technology Suvarnabhumi", th: "มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ" },
      role: { en: "Full-stack Developer · Capstone Project", th: "Full-stack Developer · โครงงานจบ" },
      bullets: {
        en: [
          "Co-developed AP Ecommerce, a full-stack online store for IT products, in a two-person team.",
          "Built the React (Vite) storefront with product search, category and price-range filters, pagination, a shopping cart and sign-up / login.",
          "Designed the RESTful API for authentication, products, orders and users, with a MySQL database managed through Prisma ORM.",
          "Deployed the application to production on Vercel.",
        ],
        th: [
          "ร่วมพัฒนา AP Ecommerce ร้านค้าออนไลน์สินค้า IT แบบ Full-stack ในทีม 2 คน",
          "พัฒนาหน้าร้านด้วย React (Vite) มีค้นหาสินค้า กรองตามหมวดหมู่และช่วงราคา แบ่งหน้า ตะกร้าสินค้า และสมัครสมาชิก/เข้าสู่ระบบ",
          "ออกแบบ RESTful API สำหรับ Authentication, สินค้า, คำสั่งซื้อ และผู้ใช้ พร้อมฐานข้อมูล MySQL ที่จัดการผ่าน Prisma ORM",
          "นำแอปพลิเคชันขึ้นใช้งานจริงบน Vercel",
        ],
      },
      tags: ["React", "Vite", "REST API", "Prisma", "MySQL", "Vercel"],
    },
    {
      start: { en: "2024", th: "2567" }, end: { en: "2024", th: "2567" },
      company: { en: "F-TECH MFG. (Thailand) Ltd.", th: "F-TECH MFG. (Thailand) Ltd." },
      role: "Software Development Intern · IT Department",
      bullets: {
        en: [
          "Built an IT Helpdesk ticketing system with Power Apps and Power Fx.",
          "Designed a Server Room Control System with real-time Power BI dashboards.",
          "Created an internal web portal with access permissions managed through Active Directory.",
        ],
        th: [
          "พัฒนาระบบแจ้งปัญหา IT Helpdesk (Ticket) ด้วย Power Apps และภาษา Power Fx",
          "ออกแบบระบบ Server Room Control System พร้อม Power BI Dashboard แสดงผลแบบ Real-time",
          "สร้าง Web Portal ภายในองค์กร และจัดการสิทธิ์การเข้าถึงผ่าน Active Directory",
        ],
      },
      tags: ["Power Apps", "Power BI", "Active Directory"],
    },
    {
      start: { en: "2021", th: "2564" }, end: { en: "2025", th: "2568" },
      company: { en: "Bannkruann Tutorial School", th: "โรงเรียนกวดวิชาบ้านครูแอน" },
      role: { en: "Assistant Teacher (Part-time)", th: "ผู้ช่วยครู (Part-time)" },
      bullets: {
        en: [
          "Prepared and printed student documents, tests and exam materials using Microsoft Office.",
          "Coordinated between parents and teachers and kept classrooms in good order.",
        ],
        th: [
          "จัดเตรียมและจัดพิมพ์เอกสาร แบบทดสอบ และข้อสอบสำหรับนักเรียนด้วย Microsoft Office",
          "ประสานงานระหว่างผู้ปกครองและครู และดูแลความเรียบร้อยของห้องเรียน",
        ],
      },
      tags: ["Microsoft Office", "Communication"],
    },
  ],

  /* ---------- ผลงาน / โปรเจค ---------- */
  projects: [
    {
      file: "ngern-hai-jai.k2",
      title: { en: "Car Auction & Litigation Systems", th: "ระบบประมูลรถยนต์และดำเนินคดี" },
      label: { en: "Production · NGERN HAI JAI · 2026", th: "ใช้งานจริง · เงินให้ใจ · 2569" },
      desc: {
        en: "Production enterprise software built for NGERN HAI JAI Co., Ltd., a lending company in the Kasikornbank (KBank) group. It covers a car auction system and a litigation system, automated with K2 BPA / RPA workflows and backed by SQL Server stored procedures that process transaction-level financial data where accuracy matters.",
        th: "ซอฟต์แวร์ระดับองค์กรที่ใช้งานจริงของบริษัท เงินให้ใจ จำกัด (NGERN HAI JAI) บริษัทสินเชื่อในเครือธนาคารกสิกรไทย ครอบคลุมระบบประมูลรถยนต์และระบบดำเนินคดี (ฟ้องคดี) ขับเคลื่อนด้วย Workflow อัตโนมัติ K2 BPA / RPA และ Stored Procedure บน SQL Server ที่ประมวลผลข้อมูลระดับ Transaction ซึ่งต้องการความแม่นยำสูงในมาตรฐานการเงินระดับธนาคาร",
      },
      tags: ["K2", "BPA", "RPA", "SQL Server", "Stored Procedures", "Financial Systems", "Banking"],
      // รูปผลงาน: 1 รูป = ภาพใหญ่ / 2 รูป = วางคู่ / 3 รูปขึ้นไป = โมเสก (รูปที่ 4+ ขึ้นเป็นป้าย +N)
      // วางไฟล์ไว้ที่ images/projects/ แล้วลบบรรทัดที่ไม่ใช้ออก — รูปที่ยังไม่มีไฟล์จะแสดงเป็นกรอบ Avatar บอกพาธ
      images: [
        "images/projects/ngern-hai-jai-1.jpg",
        "images/projects/ngern-hai-jai-2.jpg",
        "images/projects/ngern-hai-jai-3.jpg",
        "images/projects/ngern-hai-jai-4.jpg",
        "images/projects/ngern-hai-jai-5.jpg"
      ],
    },
    {
      file: "ecommerce.jsx",
      title: { en: "IT E-Commerce Website", th: "เว็บไซต์ E-Commerce สินค้า IT" },
      label: { en: "Capstone · 2025", th: "โครงงานจบ · 2568" },
      desc: {
        en: "Capstone built as a two-person team: a full-stack online store for IT products. A React (Vite) storefront with product search, category and price-range filters, pagination, a shopping cart and sign-up / login, backed by a RESTful API for authentication, products, orders and users on MySQL via Prisma ORM. Deployed on Vercel.",
        th: "โครงงานจบที่พัฒนาร่วมกันเป็นทีม 2 คน: ร้านค้าออนไลน์สินค้า IT แบบ Full-stack หน้าร้านด้วย React (Vite) มีค้นหาสินค้า กรองตามหมวดหมู่และช่วงราคา แบ่งหน้า ตะกร้าสินค้า และสมัครสมาชิก/เข้าสู่ระบบ เชื่อมกับ RESTful API สำหรับ Authentication, สินค้า, คำสั่งซื้อ และผู้ใช้ บน MySQL ผ่าน Prisma ORM เผยแพร่บน Vercel",
      },
      tags: ["React", "Vite", "REST API", "Prisma", "MySQL", "Vercel"],
      // รูปผลงาน: 1 รูป = ภาพใหญ่ / 2 รูป = วางคู่ / 3 รูปขึ้นไป = โมเสก (รูปที่ 4+ ขึ้นเป็นป้าย +N)
      // วางไฟล์ไว้ที่ images/projects/ แล้วลบบรรทัดที่ไม่ใช้ออก — รูปที่ยังไม่มีไฟล์จะแสดงเป็นกรอบ Avatar บอกพาธ
      images: [
        "images/projects/ap-ecommerce-1.jpg",
        "images/projects/ap-ecommerce-2.jpg",
        "images/projects/ap-ecommerce-3.jpg",
        "images/projects/ap-ecommerce-4.jpg",
        "images/projects/ap-ecommerce-5.jpg",
        "images/projects/ap-ecommerce-6.jpg",
        "images/projects/ap-ecommerce-7.jpg",
        "images/projects/ap-ecommerce-8.jpg",
      ],
      link: "https://ap-ecommerce.vercel.app/",
    },
    {
      file: "helpdesk.app",
      title: { en: "IT Helpdesk System", th: "ระบบ IT Helpdesk" },
      label: { en: "Internship · F-TECH", th: "ฝึกงาน · F-TECH" },
      desc: {
        en: "Internal ticketing app for reporting and tracking IT issues, built as a custom Power Apps application.",
        th: "แอปแจ้งและติดตามปัญหา IT ภายในองค์กร พัฒนาเป็น Custom Application ด้วย Power Apps",
      },
      tags: ["Power Platform","Power Apps","Power Automate", "Power Fx","Power BI", "Dashboard"],
      images: [
        "images/projects/helpdesk-1.jpg",
        "images/projects/helpdesk-2.jpg",
        "images/projects/helpdesk-3.jpg",
        "images/projects/helpdesk-3N.jpg"
      ],
      link: null,
    },
    {
      file: "server-room.pbix",
      title: { en: "Server Room Monitoring", th: "ระบบตรวจสอบห้อง Server" },
      label: { en: "Internship · F-TECH", th: "ฝึกงาน · F-TECH" },
      desc: {
        en: "Monitors the server room environment and visualizes it on real-time Power BI dashboards.",
        th: "ตรวจสอบสภาพแวดล้อมห้อง Server และแสดงผลผ่าน Power BI Dashboard แบบ Real-time",
      },
      tags: ["Power Platform","Power Apps","Power Automate", "Power Fx","Power BI", "Dashboard"],
      images: [
        "images/projects/server-room-1.jpg",
        "images/projects/server-room-2.jpg",
        "images/projects/server-room-3.jpg"
      ], // ตัวอย่างโชว์รูปเดียว
      link: null,
    },
    {
      file: "index.html",
      title: { en: "This Resume Website", th: "เว็บไซต์ Resume นี้" },
      label: { en: "Personal · 2026", th: "ส่วนตัว · 2569" },
      desc: {
        en: "My first step toward full-stack: a bilingual, responsive resume with dark mode, hosted on GitHub Pages.",
        th: "ก้าวแรกสู่ Full-stack: เว็บ Resume สองภาษา รองรับมือถือและโหมดมืด เผยแพร่บน GitHub Pages",
      },
      tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      link: "https://github.com/atikorn-sub/atikorn-sub.github.io",
    },
  ],

  /* ---------- สิ่งที่คาดหวัง (Expectations) ----------
     ✏️ กรอกข้อมูลเองตรงนี้
     - show: false  = ซ่อนทั้ง section นี้ (ไม่ต้องลบโค้ด)
     - salaryMin / salaryMax ใส่เป็นตัวเลขไม่ต้องมี , เช่น 35000
       ถ้าใส่ null = แสดงว่า "แจ้งภายหลัง"
     - ช่องไหนใส่ null จะแสดงว่า "แจ้งภายหลัง"
  -------------------------------------------------------- */
  expectations: {
    show: true,
    salaryMin: 20000,        // เช่น 35000
    salaryMax: 30000,        // เช่น 45000
    negotiable: true,       // true = แสดงป้าย "ต่อรองได้"
    workType: { en: "Hybrid / Work from home", th: "Hybrid / ทำงานที่บ้าน" },         // เช่น { en: "Hybrid / Onsite", th: "Hybrid / Onsite" }
    availableFrom: { en: "Within 30 days", th: "ภายใน 30 วัน" },    // เช่น { en: "Within 30 days", th: "ภายใน 30 วัน" }
    roles: ["Full-stack Developer", "Backend Developer", "SQL / K2 Developer"],
    note: {en: "Bangkok or nearby", th: "กรุงเทพฯ และปริมณฑล"},             // เช่น { en: "Bangkok or nearby", th: "กรุงเทพฯ และปริมณฑล" }
  },

  /* ---------- รางวัลและกิจกรรม ----------
     icon: อีโมจิหน้ารายการ / year: ปี (ใส่ได้ทั้ง { en, th } หรือเว้นว่างถ้าไม่ทราบปี)
     top: true = ไฮไลต์เป็นรางวัลเด่น (ขอบสีทอง) */
  achievements: [
    {
      icon: "🏆", top: true, year: { en: "2025", th: "2568" },
      title: { en: "1st Place — CWIE Project Competition 2025", th: "รางวัลชนะเลิศอันดับ 1 — ประกวดโครงงาน CWIE 2025" },
      desc: {
        en: "Won first place for the IT Helpdesk System, recognized for excellence in Science and Technology at Matching JOB & CWIE Day.",
        th: "ได้รับรางวัลชนะเลิศอันดับ 1 จากระบบ IT Helpdesk ด้านวิทยาศาสตร์และเทคโนโลยี ในงาน Matching JOB & CWIE Day",
      },
      // รางวัลเด่น: ใส่ 2 รูปขึ้นไป = สไลด์โชว์เลื่อนอัตโนมัติ (ค่าเริ่มต้นทุก 3 วิ) / 1 รูป = รูปนิ่ง / ไม่ใส่ = ไอคอน
      images: [
        "images/achievements/cwie-1st-1.jpg",
        "images/achievements/cwie-1st-2.jpg",
        "images/achievements/cwie-1st-3.jpg",
      ],
      // ตั้งค่าสไลด์โชว์เฉพาะกล่องนี้: delay = เวลาต่อรูป (มิลลิวินาที, 4500 = 4.5 วิ)
      // effect: "fade" = ภาพค่อย ๆ จางเข้า-ออกแบบซูมนิด ๆ / "slide" = เลื่อนซ้าย-ขวา (ค่าเริ่มต้น)
      slideshow: { delay: 4500, effect: "fade" },
    },
    {
      icon: "🎖️", top: true, year: { en: "2025", th: "2568" },
      title: { en: "Honorable Mention — CWIE Outstanding Project Competition", th: "รางวัลชมเชย — ประกวดโครงงานดีเด่น CWIE" },
      desc: {
        en: "Honorable Mention Award for the IT Helpdesk System in the competition for the Central and Upper Central Regions.",
        th: "ได้รับรางวัลชมเชยจากระบบ IT Helpdesk ในการประกวดระดับภาคกลางและภาคกลางตอนบน ประจำปี 2568",
      },
      images: [
        "images/achievements/cwie-honorable-1.jpg",
        "images/achievements/cwie-honorable-2.jpg",
        "images/achievements/cwie-honorable-3.jpg",
      ],
    },
    {
      icon: "🏅",
      title: { en: "National Award in Business Management", th: "รางวัลระดับชาติ ด้านการบริหารจัดการธุรกิจ" },
      desc: {
        en: "Received a national award in business management and a 10,000 THB scholarship for academic excellence.",
        th: "ได้รับรางวัลระดับชาติด้านการบริหารจัดการธุรกิจ พร้อมทุนการศึกษาเรียนดี 10,000 บาท",
      },
      images: [
        "images/achievements/national-1.jpg",
        "images/achievements/national-2.jpg",
        "images/achievements/national-3.jpg",
      ],
    },
    {
      icon: "🎓", year: { en: "2022", th: "2565" },
      title: { en: "Academic Excellence Medal", th: "เหรียญเรียนดี" },
      desc: {
        en: "Received the Academic Excellence Medal for the highest GPA at the \"Nhom Chit Wanta\" ceremony.",
        th: "รับเหรียญเรียนดี สำหรับนักศึกษาที่ได้เกรดเฉลี่ยสูงสุด ในพิธีน้อมจิตวันทา",
      },
      images: [
        "images/achievements/academic-excellence-medal-1.jpg",
        "images/achievements/academic-excellence-medal-2.jpg",
        "images/achievements/academic-excellence-medal-3.jpg",
      ],
    },
    {
      icon: "🎓", year: { en: "2021", th: "2564" },
      title: { en: "Academic Excellence Medal", th: "เหรียญเรียนดี" },
      desc: {
        en: "Received the Academic Excellence Medal for the highest GPA at the Teacher Appreciation Ceremony.",
        th: "รับเหรียญเรียนดี สำหรับนักศึกษาที่ได้เกรดเฉลี่ยสูงสุด ในพิธีไหว้ครู",
      },
      images: [
        "images/achievements/academic-excellence-medal-4.jpg",
        "images/achievements/academic-excellence-medal-5.jpg"
      ],
    },
    {
      icon: "📊",
      title: { en: "Training — Power BI & ChatGPT for Work", th: "อบรม — Power BI และ ChatGPT เพื่อการทำงาน" },
      desc: {
        en: "Attended training on using Power BI and ChatGPT to improve workplace efficiency.",
        th: "เข้าอบรมการใช้ Power BI และ ChatGPT เพื่อเพิ่มประสิทธิภาพการทำงาน",
      },
      images: [
        "images/achievements/training-1.jpg",
        "images/achievements/training-2.jpg",
        "images/achievements/training-3.jpg",
      ],
    },
    {
      icon: "🥽",
      title: { en: "Staff — VR & Educational Technology, University EXPO", th: "สตาฟ — ส่วน VR และเทคโนโลยีการศึกษา งาน EXPO ของมหาวิทยาลัย" },
      desc: {
        en: "Took part as a staff member in the VR and Educational Technology section of the university EXPO.",
        th: "ร่วมเป็นสตาฟในส่วน VR และเทคโนโลยีการศึกษา ในงาน EXPO ของมหาวิทยาลัย",
      },
      images: [
        "images/achievements/staff-1.jpg",
        "images/achievements/staff-2.jpg",
        "images/achievements/staff-3.jpg",
      ],
    },
    {
      icon: "🎤",
      title: { en: "Guest Speaker — Arduino & IoT Workshop", th: "วิทยากร — อบรม Arduino และ IoT" },
      desc: {
        en: "Guest speaker and instructor on Arduino circuit assembly in the \"Exploring IoT Experiences\" hands-on training at Bang Ban School.",
        th: "เป็นวิทยากรและผู้สอนการต่อวงจร Arduino ในโครงการ \"Exploring IoT Experiences\" ที่โรงเรียนบางบาล",
      },
      images: [
        "images/achievements/guest-speaker-1.jpg",
        "images/achievements/guest-speaker-2.jpg"
      ],
    }
    
    
  ],

  /* ---------- เกียรติบัตร ----------
     วางไฟล์ไว้ที่ images/certificates/ แล้วเพิ่ม/ลบบรรทัดได้ตามจำนวนใบจริง
     ใส่ชื่อใต้รูปได้ (ไม่ใส่ก็ได้): { src: "images/certificates/cert-01.jpg", caption: { en: "…", th: "…" } } */
  certificates: [
    // ตอนนี้ปิดไว้ (ส่วนเกียรติบัตรจะซ่อนทั้งส่วนจนกว่าจะมีรายการ) — วางรูปแล้วเอา // ออกเพื่อเปิดใช้
    // "images/certificates/cert-01.jpg",
    // "images/certificates/cert-02.jpg",
    // "images/certificates/cert-03.jpg",
    // "images/certificates/cert-04.jpg",
    // "images/certificates/cert-05.jpg",
    // "images/certificates/cert-06.jpg",
  ],

  /* ---------- ช่องทางติดต่อ (แสดงในหน้าต่างที่เด้งขึ้นเมื่อกดปุ่ม "ติดต่อฉัน") ----------
     copy: true = มีปุ่ม "คัดลอก" / ไม่ใส่ copy = มีปุ่ม "เปิด" (เปิดลิงก์ในแท็บใหม่)
     อยากเพิ่ม LinkedIn / LINE → เพิ่มบรรทัดใหม่ในรูปแบบเดียวกัน เช่น
     { key: "linkedin", value: "linkedin.com/in/ชื่อคุณ", href: "https://www.linkedin.com/in/ชื่อคุณ" }, */
  contact: [
    { key: "email", value: "atikorn.sub@gmail.com", href: "mailto:atikorn.sub@gmail.com", copy: true },
    { key: "phone", value: "064-696-3328", href: "tel:+66646963328", copy: true },
    { key: "github", value: "github.com/atikorn-sub", href: "https://github.com/atikorn-sub" },
  ],

  /* ---------- การศึกษา ---------- */
  education: [
    {
      school: { en: "Rajamangala University of Technology Suvarnabhumi", th: "มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ" },
      degree: {
        en: "Bachelor's Degree in Information Systems · Faculty of Business Administration and Information Technology",
        th: "ปริญญาตรี สาขาระบบสารสนเทศ · คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ",
      },
      period: { en: "2021 – 2025", th: "2564 – 2568" },
      gpa: "GPAX 3.96",
    },
  ],
};
