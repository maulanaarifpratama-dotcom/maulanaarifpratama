/**
 * Single source of truth for both the portfolio site (/) and the CV (/cv).
 *
 * EVIDENCE POLICY
 * ---------------
 * Every number carries an `evidence` marker:
 *   "dashboard" - read directly off a platform screenshot bundled in src/assets/ads.
 *                 These are quotable verbatim and safe to put in front of a recruiter.
 *   "stated"    - asserted by Maulana, no artefact in this repo. Fine to publish,
 *                 but never presented as verified.
 * Claims that had neither were rewritten as qualitative copy. Do not add a number
 * here without deciding which bucket it belongs to.
 */

import adMetaActBm from "@/assets/ads/meta-act-business-manager.jpg";
import adMetaPalestina from "@/assets/ads/meta-palestinaid-bukitasam-bisabaik.jpg";
import adMetaCpasVariants from "@/assets/ads/meta-cpas-creative-variants.jpg";
import adMetaUgc from "@/assets/ads/meta-ugc-creatives-roas.jpg";
import adLinkedin from "@/assets/ads/linkedin-act-campaign-manager.jpg";
import adCpasShopee from "@/assets/ads/cpas-shopee-halalpro-musclefirst.jpg";
import adGoogleAct from "@/assets/ads/google-ads-act-sem-youtube-gdn.jpg";
import adGoogleWellspaces from "@/assets/ads/google-ads-wellspaces.jpg";
import adGoogleLittlechamp from "@/assets/ads/google-ads-littlechamp.jpg";
import adWellspacesKw from "@/assets/ads/wellspaces-keyword-structure.jpg";
import adTokopediaAct from "@/assets/ads/tokopedia-topads-act.jpg";
import adShopeeMf from "@/assets/ads/shopee-ads-musclefirst.jpg";
import adTiktokTrends from "@/assets/ads/tiktok-performance-trends.jpg";
import adTiktok76 from "@/assets/ads/tiktok-76-campaigns.jpg";

// Live brand creatives, pulled from the clients' own storefronts 2026-09-08.
import skuIsolate from "@/assets/brands/musclefirst-pro-isolate.jpg";
import skuWhey from "@/assets/brands/musclefirst-pro-whey.jpg";
import skuCreatine from "@/assets/brands/musclefirst-pro-creatine.jpg";
import skuGainer from "@/assets/brands/musclefirst-pro-gainer.jpg";

export type Evidence = "dashboard" | "stated";

export type Metric = {
  v: string;
  l: string;
  evidence: Evidence;
  /** Exact in-platform reading, for the tooltip / print footnote. */
  note?: string;
};

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Maulana Arif Pratama",
  title: "Digital Growth & Performance Marketing Leader",
  subtitle: "AI Systems & SaaS Builder",
  location: "Depok, Jawa Barat, Indonesia",
  email: "maulana.arif.pratama@gmail.com",
  phone: "+62 821-1245-5705",
  site: "arif.impactory.id",
  siteUrl: "https://arif.impactory.id",
  linkedin: "linkedin.com/in/maulana-arif-pratama",
  linkedinUrl: "https://www.linkedin.com/in/maulana-arif-pratama",
  github: "https://github.com/maulanaarifpratama-dotcom",
  instagram: "https://www.instagram.com/arifpratamadigital/",
  facebook: "https://www.facebook.com/maulana.pratama/",
  whatsapp: "https://wa.me/6282112455705",
} as const;

export const summary =
  "Digital business leader with 8+ years scaling NGOs, startups and consumer brands, with hands-on ownership of IDR 20B+ in managed advertising spend across Meta, Google, TikTok, LinkedIn and marketplace ecosystems. IDR 16.8B of it evidenced dashboard-by-dashboard in the portfolio that follows. Proven at turning ad budgets into measurable revenue: IDR 3.2B in marketplace sales from IDR 282M of spend, an 11.4x blended return. Equally at home building the systems behind the growth: SOPs, WhatsApp Business API integrations, CRM/ERP rollouts and measurement infrastructure. Since 2024, expanded into hands-on AI product delivery as Founder of Impactory, shipping a production 12-module AI SaaS platform with an end-to-end RAG pipeline (Supabase Edge Functions + Azure OpenAI + pgvector) via a structured multi-agent development workflow. A rare hybrid of performance-marketing operator, brand and growth strategist, and AI-native systems builder.";

/** Screening-length version of `summary`, for the two-page CV. Same claims, no elaboration. */
export const summaryShort =
  "Digital business leader with 8+ years scaling NGOs, startups and consumer brands, with hands-on ownership of IDR 20B+ in managed ad spend across Meta, Google, TikTok, LinkedIn and marketplaces - IDR 16.8B of it evidenced dashboard-by-dashboard, including IDR 3.2B in marketplace revenue at an 11.4x blended return. Since 2024, also shipping AI product: a production 12-module SaaS platform for the impact sector on an end-to-end RAG pipeline (Supabase Edge Functions + Azure OpenAI + pgvector). A hybrid of performance-marketing operator, growth strategist and AI-native systems builder.";

/* ------------------------------------------------------------------ */
/* Headline metrics                                                    */
/* ------------------------------------------------------------------ */

export const headlineStats: Metric[] = [
  {
    v: "IDR 20B+",
    l: "Career ad spend managed",
    evidence: "stated",
    note: "IDR 16.83B of this is itemised from platform dashboards in the Ads Portfolio below.",
  },
  {
    v: "IDR 16.8B",
    l: "Evidenced in-platform",
    evidence: "dashboard",
    note: "Sum of every spend figure legible in the 14 dashboard screenshots in this portfolio.",
  },
  {
    v: "IDR 3.22B",
    l: "Marketplace revenue driven",
    evidence: "dashboard",
    note: "Tokopedia Rp562.7M + Shopee Rp2.66B, from Rp281.8M combined spend - 11.4x blended.",
  },
  {
    v: "8+",
    l: "Years operating",
    evidence: "stated",
  },
  {
    v: "USD 10K",
    l: "Google Ad Grant secured",
    evidence: "stated",
    note: "PPPA Daarul Qur'an, 2019.",
  },
  {
    v: "12",
    l: "Live AI SaaS modules shipped",
    evidence: "stated",
    note: "Impactory.id - grant pipeline, AI grant writer, donor CRM, LFA/logframe builder and more.",
  },
];

/* ------------------------------------------------------------------ */
/* Core capabilities                                                   */
/* ------------------------------------------------------------------ */

export const capabilities = [
  {
    k: "01",
    t: "Performance & Growth Marketing",
    d: "Meta Ads (Power Editor, Pixel, Tag Assistant), Google Ads (SEM/YouTube/GDN), TikTok Ads & GMV Max, Shopee/Tokopedia Ads, CPAS, LinkedIn Ads, funnel optimisation, CRO, A/B testing, audience and pixel strategy.",
  },
  {
    k: "02",
    t: "Brand & Business Leadership",
    d: "Multi-brand C-level growth ownership, go-to-market strategy, PR and live commerce, affiliate programmes, brand collaborations, market penetration.",
  },
  {
    k: "03",
    t: "AI Systems & Product Delivery",
    d: "AI agents, RAG pipelines, prompt governance, structured outputs, multi-agent dev workflow (Antigravity IDE, VS Code + Continue, GitHub, Vercel), Azure AI Foundry / OpenAI / VM, Supabase, production SaaS shipping.",
  },
  {
    k: "04",
    t: "Marketing Infrastructure",
    d: "SOP design, WhatsApp Business API integration, CRM/ERP (Oracle NetSuite) implementation, measurement tooling, e-commerce and marketplace operations, payment gateways.",
  },
  {
    k: "05",
    t: "SEO, Web & CMS",
    d: "On/off-page SEO, WordPress/Joomla/Drupal, 45+ websites shipped across NGO, education and commerce sectors, GA/GTM/Search Console, Ahrefs, Hotjar.",
  },
  {
    k: "06",
    t: "Digital Fundraising",
    d: "Google Ad Grants, donor CRM, crowdfunding platform build, campaign storytelling - scaled Global Qurban into Indonesia's #1 Qurbani sales platform.",
  },
];

/* ------------------------------------------------------------------ */
/* Technical stack - the AI-builder claim needs something concrete     */
/* ------------------------------------------------------------------ */

export const stack = [
  {
    g: "AI & LLM",
    items: [
      "Azure OpenAI",
      "Azure AI Foundry",
      "RAG + pgvector",
      "Prompt governance",
      "Structured outputs",
      "Multi-agent workflows",
    ],
  },
  {
    g: "Platform",
    items: [
      "Supabase (Postgres, Edge Functions, RLS)",
      "Vercel",
      "Cloudflare",
      "Node / TypeScript",
      "React",
    ],
  },
  {
    g: "Ads & Measurement",
    items: [
      "Meta Ads Manager & CPAS",
      "Google Ads",
      "TikTok Ads Manager",
      "Shopee / Tokopedia Ads",
      "LinkedIn Campaign Manager",
      "GA4 / GTM / Search Console",
    ],
  },
  {
    g: "Ops & Data",
    items: [
      "Oracle NetSuite (ERP + CRM)",
      "WhatsApp Business API",
      "Payment gateways",
      "Ahrefs",
      "Hotjar",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type Role = {
  y: string;
  r: string;
  c: string;
  sub?: string;
  kind: "current" | "earlier";
  bullets: string[];
};

export const experience: Role[] = [
  {
    y: "Feb 2024 - Present",
    r: "Director, Partnership & Marketing (Multi-Brand C-Level)",
    c: "PT Meta Kreasi Indonusa Holding",
    sub: "Halal Pro Supplement · Immersia Impact Consulting · Bisa Baik Bersama (Yayasan Rumah Pembangunan Berkelanjutan) · LittleChamp Daycare",
    kind: "current",
    bullets: [
      "Lead partnership, branding and performance marketing strategy across four portfolio brands - consumer health, impact consulting, foundation/CSR and early-childhood education.",
      "Manage and optimise acquisition across Meta Ads, Google Ads, TikTok Ads/Shop/GMV Max, Shopee Ads, SEO and social commerce funnels - supporting growth from startup phase through market penetration.",
      "Scaled Halal Pro Supplement's monthly revenue from IDR 4B to IDR 12B, helping attract new institutional investment within 9 months.",
      "Own the LittleChamp Daycare growth mandate end to end: positioning, parent-acquisition funnels, an AI enrolment concierge answering parent enquiries around the clock, and a Growth Intelligence System that unifies ad spend, lead source, tour attendance and centre occupancy into one cockpit.",
    ],
  },
  {
    y: "Feb 2024 - Present",
    r: "Founder & AI Systems Builder",
    c: "Impactory / Bisa Baik Ecosystem",
    sub: "AI SaaS · grant & impact management · crowdfunding · Web 2.5 experimentation",
    kind: "current",
    bullets: [
      "Built and scaled a multi-platform impact ecosystem: Impactory.id, BisaBaik.or.id/.org, PasarBaik.com and App.Impactory.id.",
      "Shipped Impactory.id as a production AI SaaS platform for NGOs and CSR teams - 12+ live modules including grant pipeline, AI grant writer, donor CRM and LFA/logframe builder; placed top ~100 of 1,500+ hackathon entrants at MVP.",
      "Architected an end-to-end RAG pipeline (Supabase Edge Functions + Azure OpenAI + pgvector) using a structured multi-agent engineering workflow to ship production code safely.",
      "Progressed the ecosystem into formal recognition tracks: accepted into a top-tier accelerator cohort and shortlisted for an international social-impact fund cohort.",
    ],
  },
  {
    y: "Aug 2024 - Jan 2025",
    r: "Project Consultant - SAPA Mobile Unit",
    c: "Save the Children Indonesia (DKI Jakarta Provincial Program)",
    sub: "Freelance / project-based · women & children's protection outreach",
    kind: "current",
    bullets: [
      "Engaged as project-based consultant on the SAPA (Sahabat Perempuan dan Anak) provincial mobile outreach initiative, delivered in partnership with Save the Children Indonesia.",
      "Supported coordination between field outreach operations, programme reporting and stakeholder communication across a 6-month engagement, applying cross-sector NGO and grant-ecosystem experience.",
    ],
  },
  {
    y: "Jul 2022 - Feb 2024",
    r: "Brand Manager - Muscle First",
    c: "PT Unggulan Bugar Indonesia (Cemerlang Sukses Energi)",
    kind: "earlier",
    bullets: [
      "Led e-branding and marketing strategy across owned and paid media; created 5 top-performing products on TikTok Shop that earned an invitation to TikTok Summit Indonesia 2023.",
      "Owned brand and paid media through the growth run that contributed to the founder's Forbes Asia 30 Under 30 recognition.",
      "Ran IDR 2.59B of TikTok Ads across 76 campaigns at a blended CPC of Rp484 and CPM of Rp7,913 (2022-2024).",
      "Drove IDR 2.66B in Shopee ad-attributed sales from IDR 257M of spend across the Pro Whey, Creatine, Isolate and Gainer SKUs - a 10.4x blended return, with individual SKUs between 8.4x and 12.0x.",
      "Managed PR, live streaming, affiliate programmes and marketplace ads (Tokopedia, Shopee, Meta CPAS).",
    ],
  },
  {
    y: "Oct 2021 - Jul 2022",
    r: "Marketing & Sales Manager",
    c: "PT Adev Natural Indonesia",
    kind: "earlier",
    bullets: [
      "Led digital marketing and growth-hacking execution to improve acquisition efficiency.",
      "Served as Project Leader for the Oracle NetSuite ERP + CRM implementation.",
    ],
  },
  {
    y: "Apr 2021 - Oct 2021",
    r: "Martech Senior Manager & Special Staff",
    c: "Biru Marmara Group / MUSIAD Indonesia",
    kind: "earlier",
    bullets: [
      "Strengthened digital marketing across 6 units of the Indonesia-Turkey business ecosystem (education, travel, trade, language centre).",
      "Built SOPs, WhatsApp API integrations and growth-hacking measurement tools.",
    ],
  },
  {
    y: "2020 - Apr 2021",
    r: "Digital Project Lead",
    c: "Shilla at Sawangan",
    kind: "earlier",
    bullets: [
      "Created and managed a startup project from ideation to launch, including client pitching, negotiation and go-to-market campaign setup.",
    ],
  },
  {
    y: "2019-2020",
    r: "Digital Marketing Manager",
    c: "PPPA Daarul Qur'an Foundation",
    kind: "earlier",
    bullets: [
      "Built and led a digital marketing team from scratch.",
      "Secured a USD 10,000 Google Ad Grant, achieved social verification and grew social media reach by 29.7%.",
    ],
  },
  {
    y: "2014-2019",
    r: "Integrated Digital Marketing Supervisor",
    c: "ACT Foundation (Aksi Cepat Tanggap)",
    kind: "earlier",
    bullets: [
      "Ran SEO/SEM/SMM and e-commerce for store.act.id across humanitarian appeal, Qurban, Zakat and Wakaf campaigns.",
      "Managed IDR 12.4B of Meta spend across 7 ad accounts under one Business Manager, plus IDR 1.45B of Google Ads (SEM, YouTube, GDN) delivering 284M impressions and 3.02M clicks at a 1.06% CTR.",
      "Delivered a 22.3x return on Tokopedia TopAds - Rp562.7M revenue from Rp25.3M spend in a single flight.",
      "Drove Global Qurban to become Indonesia's #1 Qurbani sales platform. Best Employee of the Year 2016.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Achievements                                                        */
/* ------------------------------------------------------------------ */

export const achievements = [
  "IDR 20B+ in digital ad spend managed across Meta, Google, TikTok, LinkedIn and marketplace platforms over 8+ years - IDR 16.8B of it itemised from platform dashboards in this portfolio.",
  "IDR 3.22B in marketplace revenue driven from IDR 281.8M of ad spend (11.4x blended ROAS), verified in Tokopedia and Shopee dashboards.",
  "Shipped a production 12-module AI SaaS platform (Impactory) with a working end-to-end RAG pipeline for AI-assisted grant writing.",
  "Scaled Halal Pro Supplement's monthly revenue 3x (IDR 4B → IDR 12B), helping attract new institutional investment within 9 months.",
  "Owned brand and paid media at Muscle First through the growth run that contributed to the founder's Forbes Asia 30 Under 30 recognition.",
  "Delivered a 6-month consultancy engagement with Save the Children Indonesia on the SAPA DKI Jakarta provincial protection programme.",
  "Secured a USD 10,000 Google Ad Grant and grew social media reach by 29.7% at PPPA Daarul Qur'an.",
  "Invited to TikTok Summit Indonesia 2023 (Muscle First) for creating 5 top-performing TikTok Shop products.",
  "Founder & Advisor of Yayasan Rumah Pembangunan Berkelanjutan (Bisa Baik) - community empowerment, education and environment programmes.",
];

/* ------------------------------------------------------------------ */
/* Education, organisations, certifications                            */
/* ------------------------------------------------------------------ */

export const education = [
  { d: "Digital Business", i: "Universitas Insan Cita Indonesia", y: "2024 - Present" },
  {
    d: "Master of Local Public Administration",
    i: "Institut Pemerintahan Dalam Negeri (IPDN)",
    y: "2013",
  },
  { d: "Management", i: "Sekolah Tinggi Ilmu Ekonomi Tribuana", y: "2012" },
  { d: "Information Systems", i: "UIN Syarif Hidayatullah Jakarta", y: "2011" },
];

export const organizations = [
  {
    r: "Founder & Advisor",
    o: "Yayasan Rumah Pembangunan Berkelanjutan / Bisa Baik",
    d: "Community empowerment, education, environment",
  },
  {
    r: "Associate",
    o: "NICE Indonesia",
    d: "Digital marketing guidance for mosque committees, SMEs, CSOs & NGOs",
  },
  {
    r: "Special Staff / Secretariat",
    o: "MUSIAD Indonesia / Kamar Dagang Indo-Turki",
    d: "Indonesia-Turkey trade chamber",
  },
];

export const languages = [
  { l: "Indonesian", v: "Native" },
  { l: "English", v: "Professional working proficiency" },
];

export const certifications = [
  {
    y: "2026",
    t: "IOE × Microsoft AI Fluency Training",
    i: "Institute of Entrepreneurship",
    d: "Module 1 (AI for SMEs), Course 3 (Responsible AI & Governance), Course 6 Capstone (AI-Ready Mindset)",
  },
  { y: "2025", t: "CARE'ing about AI & Ethics", i: "Infoxchange" },
  { y: "2024", t: "Empowering Power AI", i: "Udemy" },
  { y: "2024", t: "Log Frame Work Analysis", i: "NICE Indonesia" },
  { y: "2020", t: "Google My Business Optimization / Grow with Google", i: "Gapura Digital" },
  {
    y: "2018-2019",
    t: "AdLab by Google Indonesia",
    i: "Google Indonesia",
    d: "Automate Everything, Smart Campaign & Creative, Attribution, Excellence",
  },
  {
    y: "2018",
    t: "JagoFBAds · Facebook Elite Training Managix · Funnel Ad Design Strategy & SOP Mastery",
    i: "Dewa Eka Prayoga / Pixel Studio / Advertisa",
  },
  {
    y: "2016-2018",
    t: "YouTube for Performance · Facebook & Instagram Ads · Email Marketing · Google Analytics & AdWords Advanced Search",
    i: "Google Indonesia / Veltica",
  },
];

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

export const industries = [
  { n: "01", t: "Health & Supplements", b: "Halal Pro · Muscle First" },
  { n: "02", t: "Childcare & Early Education", b: "LittleChamp Daycare" },
  { n: "03", t: "Home & Lifestyle Decor", b: "ResinID" },
  { n: "04", t: "Humanitarian & NGO", b: "ACT · PalestinaID · PPPA Daarul Qur'an" },
  { n: "05", t: "Social Impact Platforms", b: "Bisa Baik · Impactory · PasarBaik" },
  { n: "06", t: "Education & Study Abroad", b: "KuliahdiTurki · StudydiTurki · BelajardiTurki" },
  { n: "07", t: "Travel & Hospitality", b: "Biru Marmara Travel · Shilla at Sawangan" },
  { n: "08", t: "Natural & Consumer Goods", b: "Adev Natural Indonesia" },
  { n: "09", t: "Wellness & Clinics", b: "Wellspaces" },
  { n: "10", t: "Corporate CSR & Grants", b: "PT Bukit Asam · Immersia Impact Consulting" },
];

/* ------------------------------------------------------------------ */
/* Ads portfolio - every figure below is read off a bundled screenshot */
/* ------------------------------------------------------------------ */

export type AdExhibit = {
  id: string;
  platform: string;
  client: string;
  title: string;
  period?: string;
  caption: string;
  img: string;
  /** Intrinsic pixel size, so the browser reserves space instead of relaying
   *  out as each screenshot decodes. Keep in step with the file. */
  w: number;
  h: number;
  figures: { v: string; l: string }[];
  headline?: { v: string; l: string };
};

export const adsPortfolio: { section: string; blurb: string; exhibits: AdExhibit[] }[] = [
  {
    section: "01 - Meta Ads",
    blurb:
      "Enterprise ad-account management across humanitarian fundraising, CSR grant projects and consumer commerce.",
    exhibits: [
      {
        id: "meta-act",
        platform: "Meta Business Manager",
        client: "ACT Foundation (Aksi Cepat Tanggap)",
        title: "Seven ad accounts under one Business Manager",
        period: "2014-2019",
        caption:
          "Humanitarian appeal, Qurban, Zakat and Wakaf campaigns run side by side. Largest single account: Rp4.53B lifetime spend.",
        img: adMetaActBm,
        w: 1788,
        h: 930,
        figures: [
          { v: "7", l: "Ad accounts" },
          { v: "Rp4.53B", l: "Largest account" },
        ],
        headline: { v: "IDR 12.4B", l: "Spend visible on screen" },
      },
      {
        id: "meta-palestina",
        platform: "Meta Ads Manager",
        client: "PalestinaID · PT Bukit Asam Grant Project · Bisa Baik Bersama",
        title: "40 campaigns across awareness, engagement & conversion",
        period: "2025",
        caption:
          "CSR- and grant-linked campaign portfolio: 3.67M impressions reaching 2.28M Accounts Centre accounts at 1.61 frequency. Best link-click cost Rp128.",
        img: adMetaPalestina,
        w: 1648,
        h: 486,
        figures: [
          { v: "3.67M", l: "Impressions" },
          { v: "2.28M", l: "Accounts reached" },
          { v: "Rp128", l: "Best cost / click" },
        ],
        headline: { v: "IDR 32.7M", l: "Total spend" },
      },
      {
        id: "meta-cpas-variants",
        platform: "Meta Collaborative Ads (CPAS)",
        client: "Muscle First",
        title: "Creative variant testing - Feed, Story & Reels",
        caption:
          "Catalog-synced dynamic product ads for the Pro Gainer line, tested across all three placements from a single product feed.",
        img: adMetaCpasVariants,
        w: 1244,
        h: 486,
        figures: [
          { v: "3", l: "Placements tested" },
          { v: "Catalog", l: "Dynamic product ads" },
        ],
      },
      {
        id: "meta-ugc",
        platform: "Meta CPAS",
        client: "Muscle First",
        title: "UGC-style creatives mapped to per-product ROAS",
        caption:
          "Influencer and UGC creative formats attributed down to individual SKU return, so creative decisions were made on revenue rather than engagement.",
        img: adMetaUgc,
        w: 1082,
        h: 402,
        figures: [
          { v: "13.56x", l: "Pro Isolate" },
          { v: "11.37x", l: "Pro Whey" },
          { v: "9.54x", l: "Pro Creatine" },
          { v: "8.07x", l: "Pro Gainer" },
        ],
      },
      {
        id: "cpas-shopee",
        platform: "Meta CPAS → Shopee",
        client: "Halal Pro / Muscle First",
        title: "Nine-campaign CPAS structure",
        caption:
          "Lookalike traffic, lookalike purchase, business-pixel and broad sales campaigns running in parallel. Cheapest link click at Rp168 on the LAL traffic campaign.",
        img: adCpasShopee,
        w: 1602,
        h: 482,
        figures: [
          { v: "9", l: "Campaigns" },
          { v: "487K", l: "Impressions" },
          { v: "Rp168", l: "Cost / link click" },
        ],
        headline: { v: "IDR 4.25M", l: "Total spend" },
      },
      {
        id: "linkedin-act",
        platform: "LinkedIn Campaign Manager",
        client: "ACT Foundation",
        title: "B2B / institutional donor outreach test",
        caption:
          "A deliberately small test of institutional donor targeting: 24,263 impressions and 295 clicks on USD 94.62 - a 1.22% CTR against a B2B audience.",
        img: adLinkedin,
        w: 994,
        h: 534,
        figures: [
          { v: "1.22%", l: "CTR" },
          { v: "24,263", l: "Impressions" },
          { v: "USD 94.62", l: "Spend" },
        ],
      },
    ],
  },
  {
    section: "02 - Google Ads",
    blurb:
      "Search, YouTube and Display across humanitarian fundraising, wellness and early-childhood education.",
    exhibits: [
      {
        id: "google-act",
        platform: "Google Ads",
        client: "ACT Foundation",
        title: "SEM, YouTube & Display Network",
        period: "Jan 2015 - Apr 2019",
        caption:
          "Four years of always-on humanitarian search and display. Top converting campaigns: SEM Global Qurban (206 conversions) and Gempa & Tsunami Palu (93,924 clicks).",
        img: adGoogleAct,
        w: 1574,
        h: 774,
        figures: [
          { v: "284M", l: "Impressions" },
          { v: "3.02M", l: "Clicks" },
          { v: "1.06%", l: "CTR" },
        ],
        headline: { v: "IDR 1.45B", l: "Total spend" },
      },
      {
        id: "google-wellspaces",
        platform: "Google Ads",
        client: "Wellspaces",
        title: "Wellness acquisition",
        period: "Q4 2023 - Q4 2025",
        caption: "31.5K clicks from 2.94M impressions at an average CPC of Rp2,840.",
        img: adGoogleWellspaces,
        w: 1598,
        h: 584,
        figures: [
          { v: "31.5K", l: "Clicks" },
          { v: "2.94M", l: "Impressions" },
          { v: "Rp2.84K", l: "Avg. CPC" },
        ],
        headline: { v: "IDR 89.7M", l: "Total spend" },
      },
      {
        id: "wellspaces-kw",
        platform: "Google Ads",
        client: "Wellspaces",
        title: "Four-tier keyword architecture",
        caption:
          "Brand / Core / Broad / Competitor split into separate campaigns so intent tiers could be budgeted and read independently - 6,561 clicks total, with Core converting at a 2.91% interaction rate.",
        img: adWellspacesKw,
        w: 1474,
        h: 468,
        figures: [
          { v: "6,561", l: "Clicks across 4 tiers" },
          { v: "2.91%", l: "Best interaction rate" },
          { v: "285K", l: "Impressions" },
        ],
      },
      {
        id: "google-littlechamp",
        platform: "Google Ads",
        client: "LittleChamp Daycare",
        title: "Parent acquisition for early-childhood education",
        caption:
          "29.9K clicks from 538K impressions at an average CPC of Rp620 - a high-intent, tightly geo-fenced local search build.",
        img: adGoogleLittlechamp,
        w: 1524,
        h: 498,
        figures: [
          { v: "29.9K", l: "Clicks" },
          { v: "538K", l: "Impressions" },
          { v: "Rp620", l: "Avg. CPC" },
        ],
        headline: { v: "IDR 18.6M", l: "Total spend" },
      },
    ],
  },
  {
    section: "03 - Marketplace Ads",
    blurb: "Where ad spend turns into a revenue line you can point at.",
    exhibits: [
      {
        id: "tokopedia-act",
        platform: "Tokopedia TopAds",
        client: "ACT Foundation - store.act.id",
        title: "22.3x return in a single flight",
        period: "27 Jul - 25 Aug 2018",
        caption:
          "The humanitarian e-commerce storefront. Rp25.3M of TopAds spend generated 1.28M product views and Rp562.7M in revenue.",
        img: adTokopediaAct,
        w: 2038,
        h: 616,
        figures: [
          { v: "Rp562.7M", l: "Revenue" },
          { v: "Rp25.3M", l: "Spend" },
          { v: "1.28M", l: "Views" },
        ],
        headline: { v: "22.3x", l: "ROAS" },
      },
      {
        id: "shopee-mf",
        platform: "Shopee Ads",
        client: "Muscle First",
        title: "A whole product line at 8-12x ad efficiency",
        caption:
          "Pro Whey 11.07x, Pro Creatine 11.96x, Pro Isolate 10.07x and two Pro Gainer SKUs at 10.26x and 8.41x - Rp257M of spend returning Rp2.66B in ad-attributed sales at a 9-12% ACOS.",
        img: adShopeeMf,
        w: 1930,
        h: 872,
        figures: [
          { v: "Rp2.66B", l: "Ad-attributed sales" },
          { v: "Rp257M", l: "Spend" },
          { v: "9.0%", l: "Best ACOS" },
        ],
        headline: { v: "10.4x", l: "Blended ROAS" },
      },
    ],
  },
  {
    section: "04 - TikTok Ads",
    blurb: "Two years of always-on video and live commerce for a sports nutrition brand.",
    exhibits: [
      {
        id: "tiktok-76",
        platform: "TikTok Ads Manager",
        client: "Muscle First",
        title: "76 campaigns across video and live conversion",
        period: "Mar 2022 - Jan 2024",
        caption:
          "Blended CPC of Rp484 and CPM of Rp7,913 held across the full flight. Largest single campaign: Video Conversion Daily at Rp343.4M.",
        img: adTiktok76,
        w: 1930,
        h: 886,
        figures: [
          { v: "76", l: "Campaigns" },
          { v: "Rp484", l: "Blended CPC" },
          { v: "Rp7,913", l: "Blended CPM" },
        ],
        headline: { v: "IDR 2.59B", l: "Total spend" },
      },
      {
        id: "tiktok-trends",
        platform: "TikTok Ads Manager",
        client: "Muscle First",
        title: "Performance trend - 18-month view",
        period: "Apr 2022 - Sep 2023",
        caption:
          "246.8M impressions and 2.78M destination clicks producing 85,780 conversions on Rp2.20B of spend within this window.",
        img: adTiktokTrends,
        w: 1528,
        h: 722,
        figures: [
          { v: "246.8M", l: "Impressions" },
          { v: "2.78M", l: "Clicks" },
          { v: "85,780", l: "Conversions" },
        ],
      },
    ],
  },
];

/**
 * The Muscle First Pro line, SKU by SKU. Product creative on the left of each
 * figure, the return it actually produced on the right.
 *
 * Shopee columns are read off `shopee-ads-musclefirst.jpg` (Modal / Biaya Iklan /
 * Penjualan dari Iklan / Efektivitas Iklan / ACOS). The CPAS column is the
 * per-product ROAS reported on `meta-ugc-creatives-roas.jpg`. Two platforms, two
 * attribution models - hence two numbers per SKU rather than one blended figure.
 */
export const skuBoard = {
  client: "Muscle First",
  note: "Shopee Ads and Meta CPAS report on different attribution models, so each SKU carries both.",
  skus: [
    {
      name: "Pro Isolate",
      img: skuIsolate,
      shopeeRoas: "10.07x",
      cpasRoas: "13.56x",
      spend: "Rp55.4M",
      revenue: "Rp558.2M",
      acos: "9.93%",
    },
    {
      name: "Pro Whey",
      img: skuWhey,
      shopeeRoas: "11.07x",
      cpasRoas: "11.37x",
      spend: "Rp63.3M",
      revenue: "Rp701.3M",
      acos: "9.03%",
    },
    {
      name: "Pro Creatine",
      img: skuCreatine,
      shopeeRoas: "11.96x",
      cpasRoas: "9.54x",
      spend: "Rp49.3M",
      revenue: "Rp589.6M",
      acos: "8.36%",
    },
    {
      name: "Pro Gainer",
      img: skuGainer,
      shopeeRoas: "8.41x",
      cpasRoas: "8.07x",
      spend: "Rp52.0M",
      revenue: "Rp437.0M",
      acos: "11.89%",
    },
  ],
};

/** Every spend figure legible across the exhibits above, for the audit note. */
export const spendLedger = [
  { l: "Meta - ACT Foundation (7 accounts)", v: 12_361_921_101 },
  { l: "TikTok - Muscle First (76 campaigns)", v: 2_592_518_288 },
  { l: "Google Ads - ACT Foundation", v: 1_450_000_000 },
  { l: "Shopee Ads - Muscle First (5 SKUs)", v: 256_552_611 },
  { l: "Google Ads - Wellspaces", v: 89_700_000 },
  { l: "Meta - PalestinaID / Bukit Asam / Bisa Baik", v: 32_654_791 },
  { l: "Tokopedia TopAds - ACT Foundation", v: 25_272_281 },
  { l: "Google Ads - LittleChamp Daycare", v: 18_600_000 },
  { l: "Meta CPAS - Halal Pro / Muscle First", v: 4_251_533 },
  { l: "LinkedIn - ACT Foundation", v: 1_500_000 },
];

export const spendLedgerTotal = spendLedger.reduce((a, b) => a + b.v, 0);

/**
 * The same ledger rolled up by platform, which is the cut a hiring manager reads:
 * "has this person run Meta at scale? Google? TikTok?"
 *
 * Ordered largest to smallest so the sequential ramp that paints it stays
 * monotonic. `revenue` is only set where the platform reports attributable sales,
 * which is the point of the marketplace row: 1.7% of the spend, and the only
 * channel here with a revenue figure against it.
 */
export const spendByPlatform: {
  l: string;
  v: number;
  detail: string;
  revenue?: number;
}[] = [
  {
    l: "Meta",
    v: 12_398_827_425,
    detail: "7 ACT ad accounts, CSR/grant campaigns, CPAS",
  },
  { l: "TikTok", v: 2_592_518_288, detail: "76 campaigns, video and live commerce" },
  { l: "Google", v: 1_558_300_000, detail: "SEM, YouTube, Display across 3 accounts" },
  {
    l: "Marketplace",
    v: 281_824_892,
    detail: "Shopee and Tokopedia Ads",
    revenue: 3_223_497_082,
  },
  { l: "LinkedIn", v: 1_500_000, detail: "Institutional donor targeting test" },
];
