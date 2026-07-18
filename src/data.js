export const profile = {
  name: "Aniket Kumar Jha",
  role: "Product Manager, 0-to-1 & AI-Native Products",
  tagline: "I ship 0-to-1 products, platform integrations and the AI-native workflows behind them, built and battle-tested on enterprise-scale infrastructure.",
  location: "Gurugram, India",
  email: "aniketjha646@gmail.com", 
  resumeUrl: "https://drive.google.com/file/d/1Ns-DpdNqqQ17itthKhOJl0MozoMTSHrn/view?usp=sharing", 
  socials: {
    linkedin: "https://linkedin.com/in/aniketjha646", 
    github: "https://github.com/bugbear646", 
    twitter: "https://x.com/aniketjha_2651", 
  },
};

export const about = {
  sideNote: {
    label: "outside work",
    text: "Ask my friends and they'll tell you: I'm the one who ends up planning every trip. Routes, bookings, the one backup plan nobody asked for. Somehow it's still fun every time.",
    hobbies: [
      { label: "Gym", icon: "dumbbell" },
      { label: "Sports", icon: "trophy" },
      { label: "Gaming", icon: "gamepad" },
      { label: "Trekking", icon: "mountain" },
      { label: "Travel", icon: "plane" },
    ],
  },
  paragraphs: [
    "I'm a Product Manager at Sprinklr, where I **own integrations that connect enterprise systems end-to-end**, designing the workflows that let large, complex organizations plug new capability into their stack without disruption, for clients including DHL Group, BT Group, Deutsche Telekom, and Samsung.",
    "I genuinely **love building AI-native products**. Watching a workflow go from manual and clunky to something that just anticipates what an agent or a customer needs next never gets old for me. Before product, I dabbled in data science too, an ML internship, an M.Tech project on medical imaging, and that instinct never really left. I still **write scripts, read architecture diagrams, and build my own tools** instead of waiting around.",
    "IIT Kharagpur graduate. I care about products that **hold up under real-world complexity**, and about specs precise enough that engineering doesn't have to guess.",
  ],
};
 
export const education = {
  institution: "Indian Institute of Technology Kharagpur",
  degree: "B.Tech, Mining Engineering",
  grade: "8.59",
  gradeScale: "10.00",
  period: "Jul 2019 – May 2023",
  location: "Kharagpur, West Bengal, India",
  // Headline competition wins — rendered as standout cards, not list items.
  competitions: [
    {
      title: "Inter IIT Tech Meet 11.0",
      result: "Gold",
      tag: "Paradime Product Challenge",
      period: "Feb 2023",
      description:
        "Envisioned a community-driven analytics marketplace for data sharing & discovery, among 22 other tech teams.",
    },
    {
      title: "Sprinklr APM Case Study",
      result: "National Finalist",
      tag: "Product Case Competition · India",
      period: "Oct 2022",
      description:
        "Proposed a 3-phase VR customer support and experience plan for agent-assisted customers; campus winner of IIT Kharagpur.",
    },
  ],
  // Leadership / organizing roles held during the degree — same shape as
  // an experience rung (role, period, one-line description), so this
  // reads as a mini career trace rather than a flat bullet list.
  positions: [
    {
      role: "GC Captain: Lala Lajpat Rai Hall of Residence | Short Film Making & Fine Arts",
      period: "AY 2022–23",
      description: "Ran the hall's short film and fine arts entries for the General Championship.",
    },
    {
      role: "Member, Student's Alumni Cell",
      period: "AY 2020–21",
      description: "Ran the 4th Leadership Summit and managed the ₹2.7M Class Gift Campaign.",
    },
    {
      role: "Mentor, Winter School of AI & Robotics",
      period: "Dec 2020",
      description: "Mentored 130+ sophomores through the program, run jointly by Technology Robotix Society and IEEE.",
    },
  ],
  // Honors and recognitions, separate from the roles above.
  achievements: [
    "Merit-Cum-Means Scholarship Recipient, IIT Kharagpur",
    "Best Volunteer, National Service Scheme Winter Camp 2019",
  ],
};
 
export const projects = [
  {
    id: "click-to-call-sdk",
    title: "Click-to-Call Web SDK",
    subtitle: "Seamless Browser-to-Agent Voice Engagement",
    problem:
      "Businesses struggle to connect website visitors with support agents in real time. Traditional voice journeys require users to manually dial numbers, leading to drop-offs, poor context and metadata sharing, and lower conversion rates.",
    build:
      "Designed and launched Click-to-Call Web SDK, a WebRTC-based browser voice solution with lightweight SDK integration, SIP-powered call routing, IVR connectivity, and seamless contact center interoperability. Enabled enterprises to embed one-click voice engagement directly into digital experiences without plugins or downloads.",
    outcome:
      "Delivered frictionless browser-to-agent voice connectivity, reducing customer effort, improving engagement and resolution efficiency, and enabling context-aware voice interactions directly from web properties",
    tags: ["WebRTC", "Voice Platform", "Contact Center", "Customer Experience", "SDK", "Product-Led Growth"],
  },
  {
    id: "external-cti-sdk",
    title: "External CTI SDK",
    subtitle: "Bring Sprinklr's  AI, and Omnichannel Capabilities to any Existing Contact Center",
    problem:
      "Enterprises heavily invested in third-party CCaaS platforms often hesitate to adopt Sprinklr due to the cost, complexity, and operational risk of replacing their existing voice infrastructure. As a result, there is no practical way for these customers to leverage Sprinklr's AI, digital engagement, automation, and omnichannel capabilities while continuing to operate on their current telephony stack.",
    build:
      "Designed the External CTI SDK to embed any third-party CCaaS softphone directly within the Sprinklr Agent Desktop through a secure iframe. The SDK enables bidirectional communication, status synchronization, case management, AI enrichment, and omnichannel workflows while allowing customers to retain their existing voice routing, IVR, and telephony stack.",
    outcome:
      "Enabled enterprises to adopt Sprinklr Service, AI, CoPilot, automation, and digital engagement capabilities without disrupting their existing contact center architecture. Customers preserve their telephony investments while layering Sprinklr's intelligence and agent experience on top, creating a low-risk path to modernization.",
    tags: ["CCaaS Integration", "Contact Center", "AI Platform", "Omnichannel", "Enterprise SaaS", "SDK", "AI Enrichment"],
  },
  {
    id: "audiohook-ingestion-layer",
    title: "Genesys AudioHook Integration",
    subtitle: "Audiohook Ingestion Layer + RTS Engine for Genesys Cloud",
    problem:
      "Customers using Genesys Cloud had no way to leverage Sprinklr's real-time transcription, agent assist, sentiment analysis, quality management, and other AI capabilities without migrating their voice infrastructure. This limited the value Sprinklr could deliver to enterprises that wanted to retain their existing telephony investments.",
    build:
      "Designed and delivered AudioHook integration between Genesys Cloud and Sprinklr, enabling real-time audio ingestion, transcript generation, participant mapping, and AI processing. The solution streams live voice interactions from Genesys into Sprinklr's conversational AI pipeline, allowing transcription, intent detection, sentiment analysis, and agent-assist experiences for External CTI deployments.",
    outcome:
      "Enabled enterprises to access Sprinklr's AI-powered voice capabilities while continuing to operate on their existing Genesys infrastructure. The integration expanded the value of Sprinklr-Genesys Cloud Integration by bringing real-time intelligence, conversation insights, and agent productivity enhancements to voice interactions without requiring a telephony migration.",
    tags: ["Conversational AI", "Real-Time Transcription", "Voice Intelligence", "Genesys Cloud", "Denoiser", "VAD", "Diarization", "Applied AI"],
  },
  {
    id: "mobile-calling-experience",
    title:"Mobile Calling Experience",
    subtitle:"Enabling seamless voice communication across digital and telephony channels",
    problem:
      "Mobile agents frequently experienced call failures and unexpected disconnections when switching between Wi-Fi and cellular networks or during transient connectivity issues. These interruptions disrupted customer conversations, reduced agent productivity, and impacted the overall mobile service experience.",
    build:
      "Led the design of a retry and fallback mechanism for the Space mobile app, introducing automatic call recovery, reconnection workflows, RE-INVITE based session restoration, configurable timeout handling, and intuitive in-app reconnection experiences for both iOS and Android users.",
    outcome:
      "Improved call reliability for mobile agents by enabling seamless recovery from temporary network disruptions, reducing failed conversations and creating a more stable voice experience across mobile environments.",
    tags: ["Mobile App", "Voice Connect", "Communications", "WebRTC", "Telephony", "User Experience", "Reliability", "iOS", "Android", "Consumer UX"],
  },
  {
    id: "siprec",
    title: "SIPREC",
    subtitle: "Bring AI-powered automation to existing enterprise contact center infrastructure",
    problem:
      "Large enterprises operating complex on-premise voice ecosystems had no practical way to leverage Sprinklr's AI capabilities without replacing their existing telephony infrastructure. As a result, agents spent significant time manually documenting interactions, creating case summaries, and updating external systems, leading to higher operational costs, inconsistent customer records, and limited scalability.",
    build:
      "Designed an enterprise voice intelligence platform that ingests real-time call streams from third-party contact center systems like CISCO, Genesys On-Premise, automatically creates customer cases, generates conversation transcripts, produces AI-powered summaries, and enables seamless integration with external CRM and business workflows.",
    outcome:
      "Enabled enterprises to unlock Sprinklr AI capabilities on top of their existing voice infrastructure, reducing manual after-call work, improving agent productivity, automating customer interaction documentation, and accelerating adoption of AI-driven customer service operations.",
    tags: ["On-Premise CCaaS", "AI Platform", "Voice Intelligence", "Workflow Automation", "Customer Service", "Conversational AI"],
  },
];
 
export const companies = [
  {
    name: "Sprinklr",
    logo: "/logos/sprinklr.svg", 
    url: "https://www.sprinklr.com",
  },
  {
    name: "Merlin by Foyer",
    logo: "/logos/merlin.svg", 
    url: "https://www.getmerlin.in/",
  },
  {
    name: "Mercedes-Benz R&D India",
    logo: "/logos/mbrdi.png", // TODO: add real logo file
    url: "https://www.mercedes-benz-rndindia.com",
  },
]
 
export const experience = [
  {
    company: "Sprinklr",
    logo: "/logos/sprinklr.svg",
    location: "Gurugram, Haryana, India",
    roles: [
      {
        role: "Product Manager",
        period: "May 2025 – Present",
        points: [
          "Own integrations end-to-end, leading 0-to-1 builds across multiple enterprise-grade product lines",
          "Embedded AI workflows into the core agent experience, shipping real-time Co-Pilot assistance",
          "Onboard strategic partners like MiraTech, negotiating SOWs, driving sign-off across legal, security, and engineering",
          "Driving GTM enablement across 0-to-1 launches, partnering with sales on early adoption and deal shaping",
          "Run discovery directly with enterprise customers, translating fragmented feedback into a sequenced build plan",
        ],
      },
      {
        role: "Associate Product Manager",
        period: "Jul 2023 – May 2025",
        points: [
          "First PM owner for a fragmented, undocumented mobile product area, bringing it structure and a clear roadmap",
          "Built a prioritization framework separating must-build from nice-to-have, focusing engineering on high-impact work",
          "Drove a 44% cut in critical bugs, unblocking 10+ enterprise customers and a 2,800+ active user base",
          "Led analyst submissions across Forrester, ISG, Frost & Sullivan, Everest Group, and IDC, securing leader recognition",
          "Worked directly with 20+ enterprise customers, including DHL Group, BT Group, Deutsche Telekom, and Samsung",
        ],
      },
    ],
  },
  {
    company: "Merlin AI by Foyer",
    role: "Product Strategy Intern",
    logo: "/logos/merlin.svg",
    period: "Apr – Jun 2023",
    points: [
      "Launched an SEO-led listing strategy across 50+ backlinking websites, lifting daily active users by 9%",
      "Positioned Merlin's API as the go-to alternative in geographies where ChatGPT, Claude, and OpenAI weren't accessible",
      "Shipped Website Chat and PDF Chat, high-leverage ROI+ features that drove 12.5% increase in daily active users",
      "Introduced a freemium pricing model with tiered usage limits, balancing monetization against early acquisition",
      "Fed product and market research directly into investor decks shaping the company's expansion strategy",
    ],
    location: "Bengaluru, Karnataka, India",
  },
  {
    company: "Mercedes-Benz Research and Development India",
    role: "Data Scientist",
    logo: "/logos/mbrdi.svg",
    period: "Apr – Jul 2022",
    points: [
      "Built a ResNet-50 FPN backbone RCNN model achieving 0.86 AP to annotate 24+ human skeletal keypoints",
      "Aggregated ground truth data via pyodbc and streamlined deployment on the Ira platform with a 6+ developer team",
      "Cut 60+ daily working man-hours through model automation, turningan estimated ₹2.2M annual profit impact",
    ],
    location: "Bengaluru, Karnataka, India",
  },
];
 
// ── Side projects ───────────────────────────────────────────────
// "Things I'm building" — in-progress / personal repos, shown as a
// separate strip below the main Projects section.
//
// HOW TO EDIT:
// - `title`       → project name
// - `description` → one or two lines
// - `tags`        → tech stack pills
// - `status`      → "in progress" | "ideation" | "shipped" | "paused" (shown as a ribbon)
// - `repoUrl`      → GitHub repo link for the VIEW button
export const sideProjects = [
  {
    id: "jobpilotai",
    title: "JobPilotAI",
    description:
      "AI-powered job application assistant that automates job discovery, personalizes cover letters, submits applications across job portals, and tracks progress to streamline the end-to-end search process.",
    tags: ["Python", "AI Agents", "Automation"],
    status: "in progress",
    repoUrl: "https://github.com/bugbear646/JobPilotAI",
  },
    {
    id: "academic-intelligence-engine",
    title: "Academic Intelligence Engine",
    description:
      "AI-powered academic crawler that discovers professors across top universities, extracts emails, CVs, and research metadata, and ranks faculty for research collaboration and outreach.",
    tags: ["Python", "OpenAI", "Playwright", "SQLite"],
    status: "in progress",
    repoUrl: "https://github.com/BugBear646/Academic-Intelligence-Engine",
  },
  {
    id: "collab-ai",
    title: "Collab AI",
    description:
      "AI-native collaborative workspace where humans and specialized AI agents work together using shared context, persistent memory, and organizational intelligence to improve team execution.",
    tags: ["Product Strategy", "0-to-1", "Multi-Agent AI"],
    status: "ideation",
    repoUrl: "https://web-entry-158.preview.emergentagent.com/",
  },
  {
    id: "applymate",
    title: "ApplyMate",
    description:
      "AI-powered Chrome extension that streamlines job applications by tailoring resumes, tracking applications, optimizing ATS scores, and automating repetitive tasks directly on LinkedIn Easy Apply.",
    tags: ["JavaScript", "Chrome Extension", "Job Automation"],
    status: "in progress",
    repoUrl: "https://github.com/bugbear646/ApplyMate",
  },
];
 
 
export const skills = {
  Product: [
    "Product Strategy",
    "0→1 Products",
    "AI Product Design",
    "PRD → GTM",
    "Roadmapping",
    "Customer Discovery",
    "Stakeholder Mgmt",
    "Product-Led Growth",
    "Platform Integrations",
    "Enterprise SaaS",
    "KPIs & OKRs",
    "Product Analytics",
  ],

  Technical: [
    "Python",
    "JavaScript",
    "C/C++",
    "HTML / CSS",
    "SQL / BigQuery",
    "API Design",
    "REST APIs",
    "Git / GitHub",
    "Postman",
    "Prompt Engineering",
    "Agentic Workflows",
    "AI Evals",
    "PyTorch",
    "Enterprise Voice",
  ],

  Analytical: [
    "A/B Testing",
    "Experimentation",
    "Data Prioritization",
    "Funnel Analysis",
    "Retention Analysis",
    "Dashboarding",
    "Market Analysis",
    "Competitive Research",
    "Google Analytics",
    "CleverTap",
    "Snowflake",
    "Tableau",
    "Looker",
  ],
};