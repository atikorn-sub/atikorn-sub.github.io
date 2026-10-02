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
      navProjects: "Projects", navEducation: "Education", navExpect: "Expectations",
      contactMe: "Contact me", openToWork: "Open to new opportunities",
      present: "Present",
      footer: "Built with HTML, CSS & JavaScript · Hosted on GitHub Pages",
      // ตาราง Expectations
      salary: "expected_salary", workType: "work_type", availableFrom: "available_from",
      roles: "interested_roles", note: "note",
      perMonth: "/ month", negotiable: "negotiable", tbd: "TBD",
      rowsAffected: (n) => `(${n} rows affected)`,
    },
    th: {
      navAbout: "เกี่ยวกับฉัน", navSkills: "ทักษะ", navExperience: "ประสบการณ์",
      navProjects: "ผลงาน", navEducation: "การศึกษา", navExpect: "สิ่งที่คาดหวัง",
      contactMe: "ติดต่อฉัน", openToWork: "พร้อมรับโอกาสใหม่ ๆ",
      present: "ปัจจุบัน",
      footer: "พัฒนาด้วย HTML, CSS และ JavaScript · เผยแพร่ด้วย GitHub Pages",
      // ตาราง Expectations
      salary: "เงินเดือนที่คาดหวัง", workType: "รูปแบบการทำงาน", availableFrom: "เริ่มงานได้",
      roles: "ตำแหน่งที่สนใจ", note: "หมายเหตุ",
      perMonth: "บาท / เดือน", negotiable: "ต่อรองได้", tbd: "แจ้งภายหลัง",
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
      tagline: "พัฒนาระบบ Workflow Automation และระบบการเงินที่มีข้อมูลขนาดใหญ่ และกำลังพัฒนาตัวเองสู่ Full-stack Developer",
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
          "Develop and implement business solutions on the K2 platform with BPA & RPA automation workflows.",
          "Create, optimize and maintain complex SQL Server stored procedures, views and queries for large-scale financial operations.",
          "Contributed to a car auction system and the NGERN HAI JAI lending & litigation project.",
        ],
        th: [
          "พัฒนาและนำโซลูชันไปใช้งานบนแพลตฟอร์ม K2 ด้วย BPA และ RPA Automation Workflow",
          "สร้าง ปรับปรุงประสิทธิภาพ และดูแล Stored Procedure, View และ Query บน SQL Server สำหรับงานการเงินที่มีข้อมูลขนาดใหญ่",
          "ร่วมพัฒนาระบบประมูลรถยนต์ และโครงการสินเชื่อ/ติดตามหนี้ NGERN HAI JAI",
        ],
      },
      tags: ["K2", "SQL Server", "BPA", "RPA"],
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
      start: { en: "2021", th: "2564" }, end: { en: "2024", th: "2567" },
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
      file: "ecommerce.jsx",
      title: { en: "IT E-Commerce Website", th: "เว็บไซต์ E-Commerce สินค้า IT" },
      label: { en: "Capstone · 2024", th: "โครงงานจบ · 2567" },
      desc: {
        en: "Full-stack online store for IT products. RESTful API for authentication, products, orders and users, backed by MySQL through Prisma ORM.",
        th: "ร้านค้าออนไลน์สินค้า IT แบบ Full-stack มี RESTful API สำหรับ Authentication, สินค้า, คำสั่งซื้อ และผู้ใช้ เชื่อมต่อ MySQL ผ่าน Prisma ORM",
      },
      tags: ["React", "REST API", "Prisma", "MySQL"],
      link: null, // ถ้าเอาโค้ดขึ้น GitHub แล้ว ใส่ลิงก์ตรงนี้ เช่น "https://github.com/atikorn-sub/ecommerce"
    },
    {
      file: "helpdesk.app",
      title: { en: "IT Helpdesk System", th: "ระบบ IT Helpdesk" },
      label: { en: "Internship · F-TECH", th: "ฝึกงาน · F-TECH" },
      desc: {
        en: "Internal ticketing app for reporting and tracking IT issues, built as a custom Power Apps application.",
        th: "แอปแจ้งและติดตามปัญหา IT ภายในองค์กร พัฒนาเป็น Custom Application ด้วย Power Apps",
      },
      tags: ["Power Apps", "Power Fx"],
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
      tags: ["Power BI", "Dashboard"],
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
    note: null,             // เช่น { en: "Bangkok or nearby", th: "กรุงเทพฯ และปริมณฑล" }
  },

  /* ---------- การศึกษา ---------- */
  education: [
    {
      school: { en: "Rajamangala University of Technology Suvarnabhumi", th: "มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ" },
      degree: {
        en: "Bachelor's Degree in Information Systems · Faculty of Business Administration and Information Technology",
        th: "ปริญญาตรี สาขาระบบสารสนเทศ · คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ",
      },
      period: { en: "2021 – 2024", th: "2564 – 2567" },
      gpa: "GPAX 3.96",
    },
  ],
};
