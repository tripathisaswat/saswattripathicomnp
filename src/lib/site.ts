export const SITE_URL = "https://www.saswattripathi.com.np";

export const PERSON = {
  name: "Saswat Tripathi",
  role: "Project Manager & ERP Software Consultant",
  email: "saswatkingtrip@gmail.com",
  phone: "+977 9861054079",
  whatsapp: "https://wa.me/9779861054079",
  city: "Lalitpur",
  region: "Bagmati",
  country: "Nepal",
  github: "https://github.com/tripathisaswat",
  linkedin: "https://www.linkedin.com/in/saswat-tripathi-95b599142/",
  instagram: "https://instagram.com/tripsaswat",
};

export type ServiceDef = {
  slug: string;
  nav: string;
  title: string;
  h1: string;
  description: string;
  intro: string[];
  bullets: { h: string; p: string }[];
  faq: { q: string; a: string }[];
};

export const SERVICES: ServiceDef[] = [
  {
    slug: "erp-development",
    nav: "ERP Development",
    title: "ERP Development in Nepal — Custom ERP Software | Saswat Tripathi",
    h1: "ERP development for Nepali businesses",
    description:
      "Custom ERP software development in Nepal — inventory, accounting, payroll and VAT-ready billing. Led by a project manager with 5+ years building home-grown ERP systems.",
    intro: [
      "I have spent the last five years building and leading teams on home-grown ERP systems used by real Nepali businesses — trading houses, manufacturers, retail chains and service companies. That includes the day-to-day reality of IRD-compliant billing, VAT returns, Nepali fiscal years and BS dates, multi-branch stock and the accounting practices local finance teams actually use.",
      "Off-the-shelf ERP rarely fits a Nepali operation without heavy compromise. A custom or heavily-configured ERP costs more up front but stops the workarounds, duplicate spreadsheets and month-end panic that eat far more money over three years.",
    ],
    bullets: [
      { h: "Inventory & warehouse", p: "Multi-location stock, batch and expiry tracking, transfers, reorder levels, physical count reconciliation." },
      { h: "Accounting & VAT", p: "Double-entry ledger, IRD-format tax invoices, VAT and TDS reporting, Nepali fiscal-year closing." },
      { h: "Sales & purchase", p: "Quotation to invoice, credit control, purchase orders, GRN, supplier ageing." },
      { h: "Payroll & HR", p: "Nepal salary slabs, SSF and CIT deductions, leave and attendance, Dashain bonus handling." },
      { h: "Reporting", p: "Role-based dashboards, ageing reports, branch-level P&L, exports finance teams trust." },
      { h: "Integration", p: "Bank statements, e-commerce, POS hardware, SMS and email gateways, existing legacy databases." },
    ],
    faq: [
      { q: "How much does ERP development cost in Nepal?", a: "A focused ERP covering inventory, billing and accounting for a single company typically starts in the mid-six-figure NPR range and scales with modules, branches and integrations. I scope in phases so you can see value before committing to the full build." },
      { q: "How long does an ERP implementation take?", a: "A first usable phase — usually billing plus inventory — normally lands in 8 to 12 weeks. Full rollout across accounting, payroll and reporting typically runs 4 to 9 months depending on data migration and how many branches are involved." },
      { q: "Can you work with our existing system?", a: "Yes. A lot of my work is extending or replacing parts of an existing system while it stays in production, with data migration handled as a separate, tested workstream." },
      { q: "Do you build ERP for companies outside Nepal?", a: "Yes, I work remotely with clients outside Nepal, though my deepest domain advantage is in Nepali tax, payroll and fiscal-year requirements." },
    ],
  },
  {
    slug: "hr-software",
    nav: "HR Software",
    title: "HR & Payroll Software Nepal — SSF, CIT, Leave & Attendance",
    h1: "HR and payroll software built for Nepal",
    description:
      "HR software solutions for Nepal: payroll with Nepal tax slabs, SSF and CIT, attendance, leave, and employee self-service. Custom-built and integrated with your ERP.",
    intro: [
      "Most HR products sold in Nepal are either generic international tools that do not understand SSF, CIT and the Nepali fiscal year, or spreadsheets held together by one very patient person in accounts. I build HR and payroll systems that handle the local rules properly and connect to the rest of your finance stack.",
      "The goal is simple: payroll runs in an afternoon instead of a week, and every deduction can be explained to an auditor.",
    ],
    bullets: [
      { h: "Payroll engine", p: "Current Nepal income tax slabs, married/single status, SSF, CIT, PF, TDS, festival bonus and gratuity." },
      { h: "Attendance", p: "Biometric and mobile check-in, shift rosters, overtime rules, late and half-day policies." },
      { h: "Leave management", p: "Home, sick, casual and unpaid leave with carry-forward, encashment and approval chains." },
      { h: "Employee self-service", p: "Payslips, tax certificates, leave requests and document access without HR being the middleman." },
      { h: "Compliance reporting", p: "Salary sheets, SSF returns, TDS statements and annual tax certificates in the formats your filings need." },
      { h: "Recruitment & records", p: "Applicant tracking, offer letters, contract expiry alerts, appraisal cycles." },
    ],
    faq: [
      { q: "Does the payroll follow current Nepal tax rules?", a: "Yes. Slabs, SSF, CIT and TDS logic are configurable rather than hard-coded, so the system is updated each year when the budget changes the rates." },
      { q: "Can it connect to our biometric attendance device?", a: "In most cases yes — the common devices used in Nepal expose either a local database or an API, and I integrate against that rather than asking staff to double-enter attendance." },
      { q: "Is a ready-made HR product cheaper than custom?", a: "For a small team with standard needs, a subscription product is usually cheaper. Custom becomes worthwhile when you have unusual shift or bonus rules, multiple companies, or a need to feed payroll straight into your own accounting." },
    ],
  },
  {
    slug: "freelance-software-development",
    nav: "Freelance Development",
    title: "Freelance Software Developer in Kathmandu, Nepal — Saswat Tripathi",
    h1: "Freelance software developer in Kathmandu",
    description:
      "Freelance full-stack software developer based in Kathmandu, Nepal. React, TypeScript, .NET, Blazor and PostgreSQL — web apps, internal tools and business systems.",
    intro: [
      "Outside my role as a project manager, I take on a small number of freelance builds each year. Because I run delivery teams full time, I scope realistically and I tell you early when something is a bad idea — which is usually the most valuable thing a freelancer can do.",
      "I work with founders, agencies and in-house teams in Nepal and abroad, on projects where a single senior person who can both design the system and write the code is faster than a whole squad.",
    ],
    bullets: [
      { h: "Web applications", p: "React, TypeScript, Next-style routing, design systems, dashboards and admin panels." },
      { h: "Backend & APIs", p: ".NET, C#, Node.js, PostgreSQL and SQL Server — schema design, performance and clean API contracts." },
      { h: "Internal tools", p: "The unglamorous systems that quietly run a business: approvals, reconciliation, reporting, data cleanup." },
      { h: "Rescue projects", p: "Taking over a stalled or inherited codebase, stabilising it, and getting it shipped." },
      { h: "Technical review", p: "Independent audit of an existing build before you spend more money on it." },
    ],
    faq: [
      { q: "What do you charge?", a: "I work either on a fixed price per phase, or on a monthly retainer for ongoing work. Fixed price suits well-defined builds; retainer suits products that are still evolving. Message me on WhatsApp with a short description and I will give you a range before any meeting." },
      { q: "Are you available full time?", a: "No — I hold a full-time project management role, so freelance work runs part time and in parallel. I only take projects where that timeline is genuinely fine for the client." },
      { q: "Do you work with clients outside Nepal?", a: "Yes. Most of my remote work overlaps with European and Gulf time zones comfortably, and partially with US mornings." },
    ],
  },
  {
    slug: "ai-agents-automation",
    nav: "AI Agents",
    title: "AI Agent Development in Nepal — Business Automation | Saswat Tripathi",
    h1: "AI agents and workflow automation",
    description:
      "AI agent development in Nepal — LLM-powered assistants, document processing, customer support automation and ERP copilots for real business workflows.",
    intro: [
      "AI agents are useful when they are pointed at a boring, repetitive, well-defined task — reading invoices, answering the same customer question for the fortieth time, drafting reports from data that already exists. They are much less useful as a general-purpose magic box.",
      "I build agents that sit on top of systems a business already runs, with clear boundaries, human approval where money or reputation is involved, and logging so you can see exactly what the agent did and why.",
    ],
    bullets: [
      { h: "Document processing", p: "Invoices, purchase orders, bank statements and scanned bills turned into structured, reviewable data." },
      { h: "Customer support agents", p: "Website and WhatsApp assistants grounded in your own documents, with clean handover to a human." },
      { h: "ERP copilots", p: "Natural-language reporting over your existing ERP data — 'show me overdue receivables above 5 lakh' instead of a report request." },
      { h: "Internal workflow bots", p: "Meeting notes to tasks, daily standup digests, alerting on data anomalies." },
      { h: "Evaluation & guardrails", p: "Test sets, cost ceilings, fallback behaviour and audit logs, so the thing is safe to leave running." },
    ],
    faq: [
      { q: "Will an AI agent replace my staff?", a: "In my experience it removes the tedious 20 to 40 percent of a role rather than the role itself. The realistic win is throughput and accuracy, not headcount reduction." },
      { q: "What does it cost to run?", a: "Beyond the build, you pay per use to the model provider. For most small-business workloads that is a modest monthly cost, and I design prompts and caching to keep it predictable." },
      { q: "Can it work in Nepali?", a: "Yes — current models handle Nepali reasonably well for support and summarisation, though accuracy on scanned Devanagari documents still needs a human review step." },
    ],
  },
];

export type PostDef = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string;
  readMins: number;
  tags: string[];
  body: { h?: string; p?: string[]; ul?: string[] }[];
  faq?: { q: string; a: string }[];
};

export const POSTS: PostDef[] = [
  {
    slug: "erp-buyers-guide-nepal",
    title: "ERP buyer's guide for Nepali SMEs (2026)",
    metaTitle: "ERP Buyer's Guide for Nepali SMEs 2026 — What to Actually Ask",
    description:
      "How to choose ERP software in Nepal: what to ask vendors, what local compliance really requires, realistic budgets, and the mistakes that kill implementations.",
    date: "2026-01-18",
    readMins: 9,
    tags: ["ERP", "Nepal", "Buying guide"],
    body: [
      { p: [
        "Most failed ERP projects in Nepal do not fail because the software was bad. They fail because the business bought a demo, not a system — and nobody agreed in advance what 'done' looked like.",
        "This is the checklist I would use if I were buying ERP for my own company here.",
      ] },
      { h: "1. Start from your worst month, not your best", p: [
        "Vendors demo the happy path. Ask them to run your actual month-end: the branch that transfers stock late, the customer who pays three invoices with one cheque, the return that crosses a fiscal year. If the demo cannot survive your messiest real week, the implementation will not either.",
      ] },
      { h: "2. Nail the compliance questions early", ul: [
        "Does it produce IRD-compliant tax invoices with correct numbering that cannot be silently edited?",
        "Does it handle the Nepali fiscal year (Shrawan to Ashad) natively, or is it bolted on?",
        "Can it show BS and AD dates side by side everywhere, including reports?",
        "Does payroll handle SSF, CIT and current income tax slabs, and who updates them each year?",
        "Can you export exactly what your auditor asks for without a developer?",
      ] },
      { h: "3. Ask who owns the data", p: [
        "Get it in writing: can you take a full database export at any time, in a documented format, without paying a fee? If the answer is vague, you are not buying software, you are renting a hostage situation.",
      ] },
      { h: "4. Budget honestly", p: [
        "Licence or build cost is rarely more than half the real number. Add data migration, training, the internal time of your own staff, one year of changes after go-live, and the productivity dip in the first two months. A build quoted at X usually costs about 1.6X in total business cost.",
      ] },
      { h: "5. Insist on phases", p: [
        "Any implementation that only delivers value at the very end is a project you cannot cancel. Phase one should be a single painful process — usually billing plus stock — live in production within about three months. If a vendor resists phasing, that is information.",
      ] },
      { h: "6. Ready-made vs custom", p: [
        "Ready-made products are the right answer more often than consultants admit. Choose custom when your process is genuinely a competitive advantage, when you run several companies with different rules, or when you have repeatedly hit hard walls in an off-the-shelf product. Choose ready-made when your needs are ordinary and your team is small.",
      ] },
      { h: "7. The questions that predict failure", ul: [
        "Who inside our company owns this project, and is that in their job description?",
        "Which existing reports will be retired on go-live day?",
        "What happens if the vendor's lead developer leaves?",
        "What is our rollback plan in week one?",
      ] },
    ],
    faq: [
      { q: "How much should an SME in Nepal budget for ERP?", a: "For a small to mid-sized company, plan a total first-year cost in the mid to high six-figure NPR range for a configured or custom system, including migration and training. Subscription products can start much lower but grow with users and modules." },
      { q: "Is cloud ERP safe for a Nepali business?", a: "Yes, with two conditions: you hold your own admin credentials, and you have a tested, regularly restored database export. Connectivity is far less of an obstacle than it was five years ago." },
    ],
  },
  {
    slug: "hr-payroll-software-nepal-comparison",
    title: "Choosing HR and payroll software in Nepal",
    metaTitle: "HR & Payroll Software in Nepal — How to Choose (2026 Guide)",
    description:
      "A practical comparison framework for HR and payroll software in Nepal: SSF and CIT handling, attendance devices, self-service, and when custom beats subscription.",
    date: "2026-02-09",
    readMins: 7,
    tags: ["HR", "Payroll", "Nepal"],
    body: [
      { p: [
        "Payroll in Nepal is not hard because of the maths. It is hard because the rules change annually, the deductions stack in a specific order, and one mistake affects every employee at once.",
      ] },
      { h: "The four questions that separate real products from brochures", ul: [
        "Show me a payslip with SSF, CIT and TDS on the same employee, and explain the calculation order.",
        "What happens when the budget changes tax slabs in the middle of a fiscal year?",
        "How does a mid-month joiner, a mid-month leaver and an unpaid leave overlap get prorated?",
        "Can an employee download their own annual tax certificate without emailing HR?",
      ] },
      { h: "Attendance is where most implementations stall", p: [
        "Biometric devices in Nepal vary enormously. Before signing anything, confirm the exact device model and whether the software reads it directly, via export file, or not at all. 'We can integrate' is not the same as 'we have integrated this model'.",
      ] },
      { h: "Subscription vs custom", p: [
        "Under roughly 50 employees with conventional shifts, a subscription product almost always wins on cost and time. Custom starts to pay off with multiple legal entities, unusual overtime or bonus schemes, factory shift patterns, or when payroll output must flow directly into your own ERP ledger without re-keying.",
      ] },
      { h: "The migration nobody plans for", p: [
        "Opening balances. Leave carried forward, year-to-date tax already deducted, CIT contributions to date, gratuity accruals. Budget real time for this, and run one full month in parallel with your old process before switching off.",
      ] },
    ],
    faq: [
      { q: "Can HR software handle SSF and CIT together?", a: "It should. SSF and CIT are treated differently for tax relief, so the system must apply them in the correct order before computing taxable income — ask the vendor to demonstrate this on a real payslip." },
      { q: "Should payroll live inside the ERP or separately?", a: "Inside, if your finance team wants salary journals posted automatically. Separately is acceptable when HR is fully independent and volumes are low." },
    ],
  },
  {
    slug: "cost-of-custom-software-nepal",
    title: "What custom software actually costs in Nepal",
    metaTitle: "Cost of Custom Software Development in Nepal (2026 Breakdown)",
    description:
      "Realistic price ranges for custom software development in Nepal, what drives cost up, and how to structure a contract so you are not surprised at the end.",
    date: "2026-03-04",
    readMins: 6,
    tags: ["Pricing", "Nepal", "Freelance"],
    body: [
      { p: [
        "Nobody publishes prices, so every buyer in Nepal negotiates blind. Here is a rough map, based on projects I have run or reviewed.",
      ] },
      { h: "Rough ranges", ul: [
        "Simple internal tool or single-purpose web app: a few lakh NPR, 3 to 6 weeks.",
        "Business web application with roles, reporting and integrations: mid six figures NPR, 2 to 4 months.",
        "ERP module set (billing, inventory, accounting): high six to seven figures NPR, 4 to 9 months.",
        "AI agent on top of existing systems: a few lakh NPR to build, plus ongoing model usage cost.",
      ] },
      { h: "What actually drives the number up", ul: [
        "Integrations with systems you do not control.",
        "Data migration from a messy legacy database — routinely 20 percent of total effort.",
        "Undecided requirements. Every week of indecision is paid for twice.",
        "Multi-branch, multi-company or multi-currency, added late.",
        "A stakeholder who reviews only after go-live.",
      ] },
      { h: "How to structure the contract", p: [
        "Pay per phase, with each phase ending in something that runs in production. Keep a written change log with a price attached to each change, agreed as it happens rather than argued at the end. Hold roughly 10 percent until a defined stabilisation period after go-live — not longer, because unfair retention gets priced into the next quote.",
      ] },
      { h: "The cheapest quote", p: [
        "The lowest bid is usually the one that understood the least. If a quote is dramatically under the others, ask what they assumed — they are often quoting a smaller system than you described, and the difference reappears as change requests.",
      ] },
    ],
    faq: [
      { q: "Is hiring a freelancer cheaper than an agency in Nepal?", a: "Per hour, usually yes. Per outcome, it depends: a freelancer is cheaper for a well-defined build, while an agency absorbs risk better on long projects where continuity matters." },
      { q: "Do developers in Nepal charge hourly or fixed?", a: "Both are common. Fixed price suits clear scope; hourly or monthly retainer suits evolving products. Fixed price with vague scope is where disputes come from." },
    ],
  },
  {
    slug: "ai-agents-for-nepali-businesses",
    title: "AI agents for Nepali businesses: where they actually work",
    metaTitle: "AI Agents for Nepali Businesses — Practical Use Cases (2026)",
    description:
      "Where AI agents genuinely pay off for businesses in Nepal — document processing, support, reporting — and where they quietly waste money.",
    date: "2026-04-12",
    readMins: 7,
    tags: ["AI", "Automation", "Nepal"],
    body: [
      { p: [
        "There is a lot of noise about AI in Nepal right now and very little published about what has actually worked. These are the patterns I have seen deliver, and the ones I have seen burn budget.",
      ] },
      { h: "What works", ul: [
        "Reading supplier invoices and bills into structured data with a human approving anything above a threshold.",
        "A WhatsApp or website support agent grounded strictly in your own product documents, escalating to a person on anything it is unsure about.",
        "Turning existing ERP data into plain-language answers for managers who will never learn the report builder.",
        "Drafting first versions of repetitive documents — quotations, job descriptions, meeting summaries.",
      ] },
      { h: "What usually fails", ul: [
        "An agent given write access to financial records without approval steps.",
        "Chatbots trained on nothing in particular, expected to 'know the business'.",
        "Automating a process that is broken. Automation makes a bad process fail faster.",
        "Projects with no measurement — if you cannot state the baseline, you cannot claim the win.",
      ] },
      { h: "The Nepali-language question", p: [
        "Current models handle conversational Nepali well enough for support and summarisation. Scanned Devanagari documents are still unreliable enough that a human verification step is mandatory, not optional.",
      ] },
      { h: "How to start without wasting money", p: [
        "Pick one task, measure how long it takes today, build the narrowest possible agent for it, and run it alongside the human process for a month. If it does not clearly win on that one task, do not scale it.",
      ] },
    ],
    faq: [
      { q: "How long does it take to build a useful AI agent?", a: "A narrow, well-scoped agent — one task, one data source — is typically 2 to 4 weeks including evaluation. Broad 'assistant for everything' projects take much longer and usually deliver less." },
      { q: "Is customer data safe with AI agents?", a: "It depends on the provider and configuration. Use providers with no-training guarantees on business tiers, redact identifiers before they leave your systems, and log every call." },
    ],
  },
  {
    slug: "freelancer-vs-agency-nepal",
    title: "Freelance developer or software company? Choosing in Nepal",
    metaTitle: "Freelance Developer vs Software Company in Nepal — Which to Hire",
    description:
      "An honest comparison of hiring a freelance software developer versus a software company in Nepal: cost, risk, speed, continuity and when each is the right call.",
    date: "2026-05-20",
    readMins: 6,
    tags: ["Hiring", "Freelance", "Nepal"],
    body: [
      { p: [
        "I sit on both sides of this. I run delivery teams inside a software company, and I take freelance projects. Here is how I would advise a buyer choosing between the two in Nepal.",
      ] },
      { h: "Hire a freelancer when", ul: [
        "The scope is clear and fits roughly three months of one person's work.",
        "You have someone internally who can make decisions quickly.",
        "You value direct access to the person writing the code.",
        "Budget is tight and you can accept a single point of failure.",
      ] },
      { h: "Hire a company when", ul: [
        "The system will be business-critical for years and must survive staff turnover.",
        "You need parallel workstreams — backend, mobile, QA — running at once.",
        "You need a contract with real recourse and a support SLA.",
        "Internal decision-making is slow, and you need someone to manage the process for you.",
      ] },
      { h: "The hybrid that often works best", p: [
        "A senior freelancer for architecture, scoping and technical review, plus a company for volume delivery. The independent reviewer is inexpensive and catches expensive mistakes early.",
      ] },
      { h: "Questions to ask either one", ul: [
        "Who exactly will write this, and can I speak to them?",
        "What happens to the code if we stop working together next month?",
        "Show me something you built two years ago that is still running.",
        "What in my request do you think is a bad idea?",
      ] },
    ],
    faq: [
      { q: "Are freelance developers in Nepal reliable?", a: "The good ones are, and the market is small enough that references are easy to check. Insist on seeing a live system they built that is still in use, and start with a small paid phase before committing." },
      { q: "Who owns the code?", a: "Put it in writing before work starts. The default should be that you own the delivered code outright, with the developer retaining reusable generic libraries." },
    ],
  },
];
