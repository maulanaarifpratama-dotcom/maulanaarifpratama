/**
 * Data for /work. Same evidence policy as cv.ts: only things that were checked
 * against a live page, a platform screen or the owner's own public post.
 * Anything ambiguous stays out. Last verified: 2026-11-14.
 *
 * `w` and `h` are the real pixel size of each image. The page uses them to
 * reserve the exact box, so nothing is ever cropped and nothing shifts.
 */

import siteImpactory from "@/assets/sites/site-impactory.jpg";
import siteTools from "@/assets/sites/site-tools.jpg";
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

export type Shot = { src: string; w: number; h: number; alt: string };

export type Site = {
  id: string;
  name: string;
  /** What it is, in a few words. */
  line: string;
  body: string;
  role?: string;
  tags?: string[];
  shot: Shot;
  href: string;
  label: string;
};

const wide = { w: 896, h: 352 };
const std = { w: 1200, h: 750 };

/** Products I own and run. Larger treatment. */
export const platforms: Site[] = [
  {
    id: "impactory",
    name: "Impactory.id",
    line: "AI workspace for NGOs and CSR teams",
    body: "Grant pipeline, an AI grant writer, a donor CRM and a logframe builder, running on a RAG pipeline over each organisation's own documents.",
    role: "Founder. Product, build and go-to-market.",
    tags: ["Supabase", "Azure OpenAI", "pgvector"],
    shot: { src: siteImpactory, ...std, alt: "Impactory.id home page" },
    href: "https://impactory.id",
    label: "impactory.id",
  },
  {
    id: "tools",
    name: "tools.impactory.id",
    line: "Storefront for a 72-product NGO template line",
    body: "186 pages in English and Indonesian, built to rank in search and to hand buyers over to Etsy, Gumroad and Lynk.id.",
    role: "Founder. Strategy, build and SEO.",
    tags: ["Astro", "EN + ID", "186 pages"],
    shot: { src: siteTools, ...wide, alt: "tools.impactory.id home page" },
    href: "https://tools.impactory.id",
    label: "tools.impactory.id",
  },
  {
    id: "bisabaik",
    name: "BisaBaik.or.id",
    line: "Donation platform for grassroots causes",
    body: "Campaign pages, payment rails, receipts and reporting, designed so a first-time donor trusts the page within seconds. Paid acquisition runs alongside it.",
    role: "Founder. Platform and paid acquisition.",
    tags: ["Payments", "SEO"],
    shot: { src: siteBisabaik, ...std, alt: "BisaBaik.or.id home page" },
    href: "https://www.bisabaik.or.id",
    label: "bisabaik.or.id",
  },
  {
    id: "pasarbaik",
    name: "PasarBaik.com",
    line: "Marketplace for impact-driven products",
    body: "One storefront for cooperatives and community producers, with shared checkout and trust signals so small makers plug in instead of rebuilding.",
    role: "Founder. Concept and build.",
    tags: ["Aggregator", "Commerce"],
    shot: { src: sitePasarbaik, ...std, alt: "PasarBaik.com home page" },
    href: "https://pasarbaik.com",
    label: "pasarbaik.com",
  },
];

/** Sites for brands and clients. Compact treatment. */
export const clientSites: Site[] = [
  {
    id: "halalpro",
    name: "Halal Pro",
    line: "Halal fitness supplements",
    body: "Brand site for CreaSpark creatine, Whey Radiant and NaturSpark herbal, wired to Shopee and Tokopedia.",
    role: "Growth and brand lead",
    shot: { src: siteHalalpro, ...std, alt: "Halal Pro home page" },
    href: "https://www.halalpro.id",
    label: "halalpro.id",
  },
  {
    id: "littlechamp",
    name: "LittleChamp",
    line: "Premium daycare, South Jakarta",
    body: "Parent-acquisition site for a daycare that only sells within a few kilometres. Paired with Google Ads and a 24/7 AI enrolment concierge.",
    role: "Growth and marketing lead",
    shot: { src: siteLittlechamp, ...wide, alt: "LittleChamp.id home page" },
    href: "https://littlechamp.id",
    label: "littlechamp.id",
  },
  {
    id: "palestina",
    name: "Palestina.id",
    line: "Exhibition and merchandise",
    body: "A scroll-driven exhibition of tumblers, leather and apparel carrying tatreez and Al-Aqsa motifs, shipped to 25 provinces.",
    shot: { src: sitePalestina, ...wide, alt: "Palestina.id home page" },
    href: "https://www.palestina.id",
    label: "palestina.id",
  },
  {
    id: "immersia",
    name: "Immersia",
    line: "Strategic impact advisory",
    body: "Corporate site with services, engagements such as the YCAB ANDAL baseline study, publications and a proposal request flow.",
    shot: { src: siteImmersia, ...wide, alt: "Immersia home page" },
    href: "https://immersia.id",
    label: "immersia.id",
  },
  {
    id: "rfdental",
    name: "RF Dental Care",
    line: "Dental clinic, two branches",
    body: "A branch picker, services, doctors and a visit request that lands in the branch admin's WhatsApp.",
    shot: { src: siteRf, ...wide, alt: "RF Dental Care home page" },
    href: "https://rfdentalcare.netlify.app",
    label: "rfdentalcare.netlify.app",
  },
  {
    id: "drandri",
    name: "drg. Andri Kusbandi",
    line: "Dentist practice, Ciseeng",
    body: "Services, morning and evening schedule and appointment requests by WhatsApp. Pre-rendered HTML so it can be found in search.",
    shot: { src: siteAndri, ...wide, alt: "drg. Andri Kusbandi home page" },
    href: "https://drgandrikusbandi.netlify.app",
    label: "drgandrikusbandi.netlify.app",
  },
  {
    id: "faeyza",
    name: "Faeyza Bouquet",
    line: "Bouquets and gifts, Bogor",
    body: "Graduation, satin and money bouquets, browsed by budget and ordered through WhatsApp.",
    shot: { src: siteFaeyza, ...wide, alt: "Faeyza Bouquet home page" },
    href: "https://faeyzabouquet.netlify.app",
    label: "faeyzabouquet.netlify.app",
  },
  {
    id: "isra",
    name: "Isra Amanah",
    line: "Umrah and Hajj travel, Banggai",
    body: "Package pages for regular Umrah, Umrah Plus Aqsa and Fast Umrah Turkey, with a direct line to the branch.",
    shot: { src: siteIsra, ...wide, alt: "Isra Amanah home page" },
    href: "https://www.israamanahtravel.com",
    label: "israamanahtravel.com",
  },
];

export const alsoBuilt = {
  text: "Also live: Halal Pro Gym, a gym and body-weight tracker app.",
  href: "https://halalprogym.vercel.app",
  label: "halalprogym.vercel.app",
};

export const resin = {
  name: "Resin Indonesia",
  legal: "PT Resin Indonesia Cemerlang",
  body: "A one-person limited company that designs and builds houses, office pantries, kitchen sets, wardrobes, vanity and meeting tables and cafe fit-outs. Each project is documented on Instagram, from site works to finishing.",
  role: "Founder",
  stats: "3.7K followers · 60 posts",
  shot: { src: photoResin, w: 720, h: 900, alt: "A house project by Resin Indonesia" } as Shot,
  href: "https://www.instagram.com/resindotid/",
  label: "@resindotid",
};

export const creator = {
  ugc: {
    title: "UGC creatives, measured per product",
    body: "Influencer and UGC formats mapped to return on ad spend for each Muscle First product on Meta CPAS. Read from the dashboard.",
    shot: {
      src: adMetaUgc,
      w: 1082,
      h: 402,
      alt: "Meta CPAS dashboard showing UGC creatives with ROAS per product",
    } as Shot,
    roas: [
      ["Pro Gainer", "8.07x"],
      ["Pro Creatine", "9.54x"],
      ["Pro Whey", "11.37x"],
      ["Pro Isolate", "13.56x"],
    ] as [string, string][],
  },
  tiktok: {
    title: "@diskonhebat on TikTok",
    body: "Product videos shot and posted from my own account. The FogX Lens Cleaner video from August 2025 earned 251 likes, 41 saves and 6 shares. The channel has 48.8K followers (checked 5 Nov 2026).",
    href: "https://www.tiktok.com/@diskonhebat/video/7537361426411719943",
    label: "Watch the FogX video",
  },
};

export const motion = {
  title: "Explainers built in code",
  body: "Short vertical videos for @impactoryindonesia, made with Remotion and three.js: 3D cutaways, Indonesian voice-over, per-word captions. Every legal claim is checked against the regulation text before posting.",
  reels: [
    ["Where does a Rp100,000 donation go?", "https://www.instagram.com/impactoryindonesia/reel/DfHY7WAK6Xm/"],
    ["Why donors quietly leave", "https://www.instagram.com/impactoryindonesia/reel/DfHpdNcqqNZ/"],
    ["How much grant money is left?", "https://www.instagram.com/impactoryindonesia/reel/DfHsUbaqdPb/"],
    ["Zakat is not a general donation", "https://www.instagram.com/impactoryindonesia/reel/DfHwgy5KGEK/"],
  ] as [string, string][],
  account: { href: "https://www.instagram.com/impactoryindonesia/", label: "@impactoryindonesia" },
  pillars: [
    ["Personal branding", "Building a name and trust from real experience."],
    ["Digital marketing for NGOs", "Tactics a small organisation can use today."],
    ["Impact stories", "Making an organisation's work visible and human."],
  ] as [string, string][],
  pipeline: ["Brief", "Hook", "Script", "Voice", "Build", "Frame QA", "Render", "Caption", "Publish", "Metrics"],
};

export const mendag = {
  title: "Audience with the Minister of Trade",
  when: "January 2026",
  body: "Bisa Baik Bersama met Trade Minister Dr. Budi Santoso, M.Si. (Kemendag RI) to discuss strengthening the MSME ecosystem, marketing strategy and collaboration so local products compete better.",
  shot: {
    src: photoMendag,
    w: 900,
    h: 600,
    alt: "Maulana Arif Pratama shaking hands with the Minister of Trade at Kemendag",
  } as Shot,
  href: "https://www.instagram.com/p/DTdJatFiTbJ/",
  label: "Original post",
};

/** Plain list. Left column is when, right is what. */
export const milestones: { k: string; t: string; d: string }[] = [
  {
    k: "Oct 2026",
    t: "InnoFund Siap Pendanaan",
    d: "LittleChamp Daycare was selected as one of 14 SMEs. The programme is run by Instellar Impact with Youth Business International and funded by Standard Chartered Foundation. Selected participants move on to blended finance.",
  },
  {
    k: "2026",
    t: "Google Cloud Gen AI Hackathon",
    d: "Impactory ranked 68th of the 101 shortlisted from more than 1,500 entrants (Hack2skill).",
  },
  { k: "2026", t: "APINDO UMKM", d: "Top 20 with Impactory." },
  {
    k: "2023",
    t: "TikTok Summit Indonesia",
    d: "Invited for creating five top-performing TikTok Shop products at Muscle First.",
  },
  { k: "2019", t: "Google Ad Grant", d: "Secured USD 10,000 for PPPA Daarul Qur'an." },
  { k: "2016", t: "Best Employee of the Year", d: "ACT Foundation (Aksi Cepat Tanggap)." },
];

/** Every image in the overview strip, in reading order. */
export const overview: { id: string; name: string; shot: Shot; target: "platforms" | "sites" }[] = [
  ...platforms.map((s) => ({ id: s.id, name: s.name, shot: s.shot, target: "platforms" as const })),
  ...clientSites.map((s) => ({ id: s.id, name: s.name, shot: s.shot, target: "sites" as const })),
];
