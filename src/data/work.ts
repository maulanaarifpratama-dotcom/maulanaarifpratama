/**
 * Data for /work. Same evidence policy as cv.ts: only things that were checked
 * against a live page, a platform screen or the owner's own public post.
 * Anything ambiguous stays out. Last verified: 2026-11-14.
 */

import siteImpactory from "@/assets/sites/site-impactory.jpg";
import siteBisabaik from "@/assets/sites/site-bisabaik.jpg";
import sitePasarbaik from "@/assets/sites/site-pasarbaik.jpg";
import siteHalalpro from "@/assets/sites/site-halalpro.jpg";
import siteLittlechamp from "@/assets/sites/site-littlechamp.jpg";
import sitePalestina from "@/assets/sites/site-palestina.jpg";
import siteImmersia from "@/assets/sites/site-immersia.jpg";
import siteRf from "@/assets/sites/site-rfdentalcare.jpg";
import siteAndri from "@/assets/sites/site-drandri.jpg";
import siteFaeyza from "@/assets/sites/site-faeyza.jpg";
import siteIsra from "@/assets/sites/site-isra.jpg";
import adMetaUgc from "@/assets/ads/meta-ugc-creatives-roas.jpg";
import photoResin from "@/assets/resin/resin-white-house.jpg";
import photoMendag from "@/assets/authority/mendag-audiensi.png";

export type Category = "web" | "property" | "creator" | "motion" | "recognition";

export const categories: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Websites" },
  { id: "property", label: "Property" },
  { id: "creator", label: "Creator & UGC" },
  { id: "motion", label: "Motion & content" },
  { id: "recognition", label: "Recognition" },
];

export type WorkItem = {
  id: string;
  cat: Category;
  title: string;
  kicker: string;
  body: string;
  img?: string;
  imgAlt?: string;
  facts?: string[];
  href?: string;
  hrefLabel?: string;
};

/** Live sites: each answered HTTP 200 on 2026-11-14. */
const web: WorkItem[] = [
  {
    id: "impactory",
    cat: "web",
    title: "Impactory.id",
    kicker: "AI SaaS for NGOs and CSR teams",
    body: "Grant pipeline, AI grant writer, donor CRM and logframe builder on a RAG pipeline (Supabase, Azure OpenAI, pgvector). Product and go-to-market owner.",
    img: siteImpactory,
    imgAlt: "Impactory.id home page",
    facts: ["Founder", "Supabase", "Azure OpenAI", "Vercel"],
    href: "https://impactory.id",
    hrefLabel: "impactory.id",
  },
  {
    id: "tools",
    cat: "web",
    title: "tools.impactory.id",
    kicker: "Acquisition site for the digital product line",
    body: "186 pages in English and Indonesian that sell a 72-product line of NGO templates and systems sold on Etsy, Gumroad and Lynk.id.",
    facts: ["Astro", "EN + ID", "186 pages", "SEO"],
    href: "https://tools.impactory.id",
    hrefLabel: "tools.impactory.id",
  },
  {
    id: "bisabaik",
    cat: "web",
    title: "BisaBaik.or.id",
    kicker: "Donation platform",
    body: "Campaign pages, payment rails, donor receipts and an SEO foundation for grassroots causes. Paid acquisition runs alongside it.",
    img: siteBisabaik,
    imgAlt: "BisaBaik.or.id home page",
    facts: ["Founder", "Payments", "SEO"],
    href: "https://www.bisabaik.or.id",
    hrefLabel: "bisabaik.or.id",
  },
  {
    id: "pasarbaik",
    cat: "web",
    title: "PasarBaik.com",
    kicker: "Impact marketplace",
    body: "An aggregator that connects impact-driven products, cooperatives and community producers into one storefront with shared checkout and trust signals.",
    img: sitePasarbaik,
    imgAlt: "PasarBaik.com home page",
    facts: ["Founder", "Aggregator", "Commerce"],
    href: "https://pasarbaik.com",
    hrefLabel: "pasarbaik.com",
  },
  {
    id: "littlechamp",
    cat: "web",
    title: "LittleChamp.id",
    kicker: "Premium daycare, South Jakarta",
    body: "Parent-acquisition site and funnels for a daycare that sells within a few kilometres of its door. Growth and marketing lead.",
    img: siteLittlechamp,
    imgAlt: "LittleChamp.id home page",
    facts: ["Growth lead", "Google Ads", "AI concierge"],
    href: "https://littlechamp.id",
    hrefLabel: "littlechamp.id",
  },
  {
    id: "arrustendi",
    cat: "web",
    title: "Arrustendi.org",
    kicker: "Donation and news site",
    body: "Donation section, news, field photos and a Decap CMS login so the team can publish without a developer.",
    facts: ["Decap CMS", "Vercel"],
    href: "https://www.arrustendi.org",
    hrefLabel: "arrustendi.org",
  },
  {
    id: "halalpro",
    cat: "web",
    title: "Halal Pro",
    kicker: "Halal fitness supplements",
    body: "Brand site for CreaSpark creatine, Whey Radiant and NaturSpark herbal, with marketplace links to Shopee and Tokopedia. Growth and brand lead for the line.",
    img: siteHalalpro,
    imgAlt: "Halal Pro home page",
    facts: ["Brand", "SEO", "Marketplace"],
    href: "https://www.halalpro.id",
    hrefLabel: "halalpro.id",
  },
  {
    id: "palestina",
    cat: "web",
    title: "Palestina.id",
    kicker: "Digital exhibition and merchandise",
    body: "A scroll-driven exhibition of tumblers, leather and apparel with tatreez, Al-Aqsa and watermelon motifs, shipped to 25 provinces. Humanity Merchandise Movement.",
    img: sitePalestina,
    imgAlt: "Palestina.id home page",
    facts: ["Storytelling", "Commerce"],
    href: "https://www.palestina.id",
    hrefLabel: "palestina.id",
  },
  {
    id: "immersia",
    cat: "web",
    title: "Immersia",
    kicker: "Strategic impact advisory",
    body: "Corporate site for an impact advisory firm: services, engagements such as the YCAB Foundation ANDAL baseline and feasibility study, publications and a proposal request flow.",
    img: siteImmersia,
    imgAlt: "Immersia home page",
    facts: ["Advisory", "Publications"],
    href: "https://immersia.id",
    hrefLabel: "immersia.id",
  },
  {
    id: "rfdental",
    cat: "web",
    title: "RF Dental Care",
    kicker: "Dental clinic, two branches",
    body: "Branch selector, services, doctor profiles, clinic photos and a visit request that goes to the branch admin on WhatsApp.",
    img: siteRf,
    imgAlt: "RF Dental Care home page",
    facts: ["Netlify", "WhatsApp flow"],
    href: "https://rfdentalcare.netlify.app",
    hrefLabel: "rfdentalcare.netlify.app",
  },
  {
    id: "drandri",
    cat: "web",
    title: "drg. Andri Kusbandi",
    kicker: "Dentist practice, Ciseeng",
    body: "Practice site with services, morning and evening schedule and an appointment request through the admin's WhatsApp. Pre-rendered HTML for search.",
    img: siteAndri,
    imgAlt: "drg. Andri Kusbandi home page",
    facts: ["React", "Vite", "Netlify", "SEO"],
    href: "https://drgandrikusbandi.netlify.app",
    hrefLabel: "drgandrikusbandi.netlify.app",
  },
  {
    id: "faeyza",
    cat: "web",
    title: "Faeyza Bouquet",
    kicker: "Graduation bouquets and gifts, Bogor",
    body: "Catalogue of graduation, satin flower and money bouquets with a budget-based browse and ordering through WhatsApp chat.",
    img: siteFaeyza,
    imgAlt: "Faeyza Bouquet home page",
    facts: ["Netlify", "WhatsApp ordering"],
    href: "https://faeyzabouquet.netlify.app",
    hrefLabel: "faeyzabouquet.netlify.app",
  },
  {
    id: "isra",
    cat: "web",
    title: "Isra Amanah Internasional",
    kicker: "Umrah and Hajj travel, Banggai branch",
    body: "Package pages for regular Umrah, Umrah Plus Aqsa and Fast Umrah Turkey, with a direct contact line for the branch.",
    img: siteIsra,
    imgAlt: "Isra Amanah Internasional home page",
    facts: ["Travel", "Lead generation"],
    href: "https://www.israamanahtravel.com",
    hrefLabel: "israamanahtravel.com",
  },
  {
    id: "halalprogym",
    cat: "web",
    title: "Halal Pro Gym",
    kicker: "Web app",
    body: "A personal gym and body-weight tracker deployed on Vercel.",
    facts: ["Vercel", "Web app"],
    href: "https://halalprogym.vercel.app",
    hrefLabel: "halalprogym.vercel.app",
  },
];

const property: WorkItem[] = [
  {
    id: "resin",
    cat: "property",
    title: "Resin Indonesia (PT Resin Indonesia Cemerlang)",
    kicker: "Design and build, interiors, home decor",
    body: "A one-person limited company that designs and builds houses, office pantries, kitchen sets, wardrobes, vanity and meeting tables, and cafe fit-outs. The Instagram account documents each project, from site works to finishing.",
    img: photoResin,
    imgAlt: "House project by Resin Indonesia",
    facts: ["Founder", "Instagram 3.7K", "60 posts"],
    href: "https://www.instagram.com/resindotid/",
    hrefLabel: "@resindotid",
  },
];

const creator: WorkItem[] = [
  {
    id: "diskonhebat",
    cat: "creator",
    title: "@diskonhebat on TikTok",
    kicker: "Affiliate and UGC-style product videos",
    body: "Product videos made and posted from my own account. One example is the FogX Lens Cleaner video from August 2025, with 251 likes, 41 saves and 6 shares. The channel stands at 48.8K followers and 128.4K likes (checked 2026-11-05).",
    facts: ["Own account", "Affiliate", "TikTok Shop"],
    href: "https://www.tiktok.com/@diskonhebat/video/7537361426411719943",
    hrefLabel: "Watch the FogX video",
  },
  {
    id: "ugc-roas",
    cat: "creator",
    title: "UGC creatives with product-level ROAS",
    kicker: "Muscle First, Meta CPAS",
    body: "Influencer and UGC formats mapped to return on ad spend per product: Pro Gainer 8.07x, Pro Whey 11.37x, Pro Isolate 13.56x, Pro Creatine 9.54x. Read from the Meta dashboard.",
    img: adMetaUgc,
    imgAlt: "Meta CPAS dashboard showing UGC creatives and ROAS",
    facts: ["Dashboard evidence", "Meta CPAS"],
  },
];

const reels = [
  ["Where does a Rp100,000 donation go?", "https://www.instagram.com/impactoryindonesia/reel/DfHY7WAK6Xm/"],
  ["Why donors quietly leave", "https://www.instagram.com/impactoryindonesia/reel/DfHpdNcqqNZ/"],
  ["How much grant money is left?", "https://www.instagram.com/impactoryindonesia/reel/DfHsUbaqdPb/"],
  ["Zakat is not a general donation", "https://www.instagram.com/impactoryindonesia/reel/DfHwgy5KGEK/"],
] as const;

const motion: WorkItem[] = [
  {
    id: "remotion",
    cat: "motion",
    title: "Remotion explainers for NGOs",
    kicker: "@impactoryindonesia on Instagram",
    body: "Short vertical explainers built in code with Remotion and three.js: 3D cutaways, Indonesian voice-over, per-word captions, QA by reading frames. Topics are checked against the legal text before posting.",
    facts: ["Remotion", "three.js", "Azure TTS", "Indonesian"],
    href: "https://www.instagram.com/impactoryindonesia/",
    hrefLabel: "@impactoryindonesia",
  },
];

const recognition: WorkItem[] = [
  {
    id: "mendag",
    cat: "recognition",
    title: "Audience with the Minister of Trade",
    kicker: "Bisa Baik Bersama, January 2026",
    body: "An audience with Trade Minister Dr. Budi Santoso, M.Si. (Kemendag RI) on strengthening the MSME ecosystem, marketing strategy and collaboration so that local products compete better.",
    img: photoMendag,
    imgAlt: "Maulana Arif Pratama shaking hands with the Minister of Trade at Kemendag",
    href: "https://www.instagram.com/p/DTdJatFiTbJ/",
    hrefLabel: "Original post",
  },
  {
    id: "innofund",
    cat: "recognition",
    title: "InnoFund: Siap Pendanaan",
    kicker: "LittleChamp Daycare, October 2026",
    body: "Selected as one of 14 SMEs for the Siap Pendanaan programme by InnoFund, run by Instellar Impact with Youth Business International and funded by Standard Chartered Foundation. Selected participants move on to blended finance.",
    facts: ["14 SMEs", "Instellar Impact", "YBI"],
  },
  {
    id: "hackathon",
    cat: "recognition",
    title: "Google Cloud Gen AI Hackathon",
    kicker: "Impactory, Hack2skill",
    body: "Ranked 68th of the 101 shortlisted from more than 1,500 entrants, with the MVP of Impactory. Later Top 20 at APINDO UMKM.",
    facts: ["68th of 101", "1,500+ entrants", "APINDO Top 20"],
    href: "https://impactory.id",
    hrefLabel: "impactory.id",
  },
  {
    id: "earlier",
    cat: "recognition",
    title: "Earlier milestones",
    kicker: "2016 to 2023",
    body: "Best Employee of the Year 2016 at ACT Foundation. USD 10,000 Google Ad Grant secured at PPPA Daarul Qur'an. Invited to TikTok Summit Indonesia 2023 for five top-performing TikTok Shop products.",
  },
];

export const workItems: WorkItem[] = [
  ...web,
  ...property,
  ...creator,
  ...motion,
  ...recognition,
];

export const reelLinks = reels;

export const contentSystem = {
  pillars: [
    ["Personal branding", "How to build a name and trust, from real experience."],
    ["Digital marketing for NGOs", "Tactics a small organisation can use today."],
    ["Impact stories", "Make an organisation's work visible and human."],
  ],
  pipeline: [
    "Brief",
    "Hook",
    "Script",
    "Voice",
    "Build",
    "QA on frames",
    "Render",
    "Caption",
    "Publish",
    "Log metrics",
  ],
};
