/**
 * Case studies, shared by the site (/) and the CV (/cv).
 *
 * See the evidence policy in ./cv.ts. Results marked `evidence: "dashboard"` are
 * legible in the screenshots under src/assets/ads and can be quoted verbatim.
 * Anything that was previously asserted without an artefact has been moved into
 * the narrative as qualitative copy rather than dressed up as a metric.
 */

import type { CaseStudy } from "@/components/CaseStudyModal";

import projImpactory from "@/assets/project-impactory.jpg";
import projBisabaik from "@/assets/project-bisabaik.jpg";
import projPasarbaik from "@/assets/project-pasarbaik.jpg";
import projHalalpro from "@/assets/project-halalpro.jpg";
import projLittlechamp from "@/assets/project-littlechamp.jpg";
import projResinid from "@/assets/project-resinid.jpg";

import adMetaActBm from "@/assets/ads/meta-act-business-manager.jpg";
import adGoogleAct from "@/assets/ads/google-ads-act-sem-youtube-gdn.jpg";
import adTokopediaAct from "@/assets/ads/tokopedia-topads-act.jpg";
import adShopeeMf from "@/assets/ads/shopee-ads-musclefirst.jpg";
import adTiktok76 from "@/assets/ads/tiktok-76-campaigns.jpg";
import adTiktokTrends from "@/assets/ads/tiktok-performance-trends.jpg";
import adMetaUgc from "@/assets/ads/meta-ugc-creatives-roas.jpg";
import adGoogleWellspaces from "@/assets/ads/google-ads-wellspaces.jpg";
import adWellspacesKw from "@/assets/ads/wellspaces-keyword-structure.jpg";
import adGoogleLittlechamp from "@/assets/ads/google-ads-littlechamp.jpg";
import adMetaPalestina from "@/assets/ads/meta-palestinaid-bukitasam-bisabaik.jpg";
import adCpasShopee from "@/assets/ads/cpas-shopee-halalpro-musclefirst.jpg";

// Live brand creatives from the clients' own storefronts, 2026-09-08.
import skuIsolate from "@/assets/brands/musclefirst-pro-isolate.jpg";
import skuWhey from "@/assets/brands/musclefirst-pro-whey.jpg";
import skuCreatine from "@/assets/brands/musclefirst-pro-creatine.jpg";
import skuGainer from "@/assets/brands/musclefirst-pro-gainer.jpg";
import halalproCreaspark from "@/assets/brands/halalpro-creaspark.webp";

export const projects: CaseStudy[] = [
  {
    n: "01",
    tag: "Humanitarian · Fundraising",
    title: "ACT Foundation",
    desc: "Five years running Indonesia's largest humanitarian ad operation - seven Meta ad accounts, four years of always-on Google search, and the e-commerce storefront behind Global Qurban.",
    img: adMetaActBm,
    meta: ["Meta Ads", "Google Ads", "Tokopedia", "Digital Fundraising"],
    role: "Integrated Digital Marketing Supervisor",
    year: "2014-2019",
    story: [
      "Aksi Cepat Tanggap raises money for disasters that do not schedule themselves. The job was to keep an always-on acquisition engine running across humanitarian appeal, Qurban, Zakat and Wakaf - then surge it within hours when an earthquake or tsunami hit.",
      "That meant seven Meta ad accounts under one Business Manager, each mapped to a giving vertical so budget could move between causes without losing learning; and a Google Ads build spanning search, YouTube and Display that ran continuously from 2015 to 2019.",
      "The commerce side - store.act.id - was treated as a real retail P&L rather than a donation afterthought. Tokopedia TopAds carried it, and Global Qurban grew into Indonesia's number one Qurbani sales platform. Named Best Employee of the Year in 2016.",
    ],
    results: [
      { v: "IDR 12.4B", l: "Meta spend, 7 accounts", evidence: "dashboard" },
      { v: "IDR 1.45B", l: "Google Ads spend", evidence: "dashboard" },
      { v: "284M", l: "Google impressions", evidence: "dashboard" },
      { v: "22.3x", l: "Tokopedia ROAS", evidence: "dashboard" },
    ],
    gallery: [adMetaActBm, adGoogleAct, adTokopediaAct],
  },
  {
    n: "02",
    tag: "Sports Nutrition · Commerce",
    title: "Muscle First",
    desc: "Brand and paid-media ownership for a sports nutrition line across TikTok, Shopee, Tokopedia and Meta CPAS - the most heavily instrumented account in this portfolio.",
    img: skuWhey,
    meta: ["TikTok Ads", "Shopee Ads", "Meta CPAS", "Live Commerce"],
    role: "Brand Manager",
    year: "2022-2024",
    story: [
      "Supplements are a margin business disguised as a content business. Muscle First needed volume without buying it at a loss, so every rupiah was attributed down to the SKU before it was allowed to scale.",
      "TikTok carried reach: 76 campaigns over two years, mixing video conversion with live commerce, held at a blended Rp484 CPC. Five products became top performers on TikTok Shop, which earned an invitation to TikTok Summit Indonesia 2023. The same growth run contributed to the founder's Forbes Asia 30 Under 30 recognition.",
      "Marketplace ads carried the margin. Shopee ran the full Pro line - Whey, Creatine, Isolate and two Gainer SKUs - at 8.4x to 12.0x ad efficiency and a 9-12% ACOS, while Meta CPAS ran catalog-synced dynamic product ads with UGC creatives attributed to per-product return rather than engagement.",
    ],
    results: [
      { v: "Rp2.66B", l: "Shopee ad-attributed sales", evidence: "dashboard" },
      { v: "10.4x", l: "Blended marketplace ROAS", evidence: "dashboard" },
      { v: "IDR 2.59B", l: "TikTok spend, 76 campaigns", evidence: "dashboard" },
      { v: "13.56x", l: "Best SKU ROAS (CPAS)", evidence: "dashboard" },
    ],
    gallery: [skuIsolate, skuCreatine, skuGainer, adShopeeMf, adTiktok76, adTiktokTrends, adMetaUgc],
  },
  {
    n: "03",
    tag: "AI · SaaS",
    title: "Impactory.id",
    desc: "A production AI SaaS platform for NGOs and CSR teams - grant pipeline, AI grant writer, donor CRM and LFA/logframe builder, on an end-to-end RAG stack.",
    img: projImpactory,
    meta: ["Azure OpenAI", "Supabase", "RAG + pgvector", "Prompt Governance"],
    role: "Founder · Product & AI",
    year: "2024 - Now",
    story: [
      "NGOs and foundations lose weeks every quarter chasing grants, formatting proposals and stitching reports. Impactory collapses that loop with agentic workflows built around how the impact sector actually works.",
      "The platform runs an end-to-end RAG pipeline - Supabase Edge Functions, Azure OpenAI and pgvector - over donor databases, regulatory documents and historical proposals. A prompt governance layer keeps outputs auditable and aligned to each organisation's voice.",
      "It was built with a structured multi-agent engineering workflow so production code could ship safely without a large team behind it. Twelve-plus modules are live; the MVP placed in the top ~100 of more than 1,500 hackathon entrants, and the ecosystem has since been accepted into a top-tier accelerator cohort and shortlisted for an international social-impact fund.",
    ],
    results: [
      { v: "12+", l: "Live modules shipped", evidence: "stated" },
      { v: "Top ~100", l: "of 1,500+ hackathon entrants", evidence: "stated" },
      { v: "0 → 1", l: "RAG pipeline in production", evidence: "stated" },
    ],
    gallery: [projImpactory, projBisabaik],
  },
  {
    n: "04",
    tag: "Health · Supplements",
    title: "Halal Pro Supplement",
    desc: "Multi-brand C-level mandate on a premium halal sports nutrition line - brand, performance funnels and the marketplace engine behind a 3x revenue climb.",
    img: projHalalpro,
    meta: ["Brand", "Meta CPAS", "TikTok Shop", "Marketplace"],
    role: "Director, Partnership & Marketing",
    year: "2024 - Now",
    story: [
      "Halal Pro entered a category dominated by global names. The mandate was to carve out a premium, faith-aligned position without sounding niche - and to compress the path from launch to repeatable digital revenue.",
      "The brand was rebuilt from pack design through to a full content engine: studio-shot product films, athlete testimonial reels, and a TikTok Shop operation running daily live commerce with creator partners.",
      "Underneath sat a unified funnel across Meta, TikTok Ads and marketplace placements, with creative iterated weekly. Inventory, COGS and CAC were modelled together so growth never outran margin. Monthly revenue moved from IDR 4B to IDR 12B, and the run helped attract new institutional investment within nine months.",
    ],
    results: [
      { v: "3x", l: "Monthly revenue (4B → 12B)", evidence: "stated" },
      { v: "9 mo", l: "To new institutional investment", evidence: "stated" },
    ],
    gallery: [projHalalpro, halalproCreaspark, adCpasShopee],
  },
  {
    n: "05",
    tag: "Childcare · Education",
    title: "LittleChamp Daycare",
    desc: "Growth mandate end to end: positioning, parent-acquisition search, a 24/7 AI enrolment concierge, and a Growth Intelligence System tying ad spend to centre occupancy.",
    img: projLittlechamp,
    meta: ["Google Ads", "AI Concierge", "Growth Intelligence", "Lead Gen"],
    role: "Growth & Marketing Lead",
    year: "2024 - Now",
    story: [
      'Daycare is a trust business with a long, anxious buying journey. Positioning was rebuilt around the parent\'s real question - "will my child be safe and seen here?" - and every touchpoint was engineered to answer it before they ask.',
      "Acquisition runs on tightly geo-fenced Google search: 29.9K clicks from 538K impressions at a Rp620 average CPC, deliberately narrow because a daycare only sells within a few kilometres of its front door.",
      "An AI enrolment concierge handles parent questions around the clock, books tours and qualifies leads straight into the CRM with parent context preserved. The Growth Intelligence System then unifies ad spend, lead source, tour attendance and occupancy into one cockpit, so the funnel is steered against real centre utilisation rather than clicks.",
    ],
    results: [
      { v: "29.9K", l: "Search clicks", evidence: "dashboard" },
      { v: "Rp620", l: "Average CPC", evidence: "dashboard" },
      { v: "24/7", l: "AI enrolment concierge", evidence: "stated" },
    ],
    gallery: [projLittlechamp, adGoogleLittlechamp],
  },
  {
    n: "06",
    tag: "Wellness · Clinics",
    title: "Wellspaces",
    desc: "A four-tier keyword architecture for wellness acquisition - brand, core, broad and competitor intent budgeted and read as separate businesses.",
    img: adGoogleWellspaces,
    meta: ["Google Ads", "Keyword Architecture", "SEM"],
    role: "Growth Partner",
    year: "2023-2025",
    story: [
      "Most wellness accounts pour every keyword into one campaign and then cannot explain why the blended cost moved. Wellspaces was built the other way around.",
      "Brand, Core, Broad and Competitor intent each got their own campaign, so each tier carried its own budget, its own bid strategy and its own read. Core landed a 2.91% interaction rate; Broad delivered the volume at 3,076 clicks; Competitor stayed capped and observed rather than chased.",
      "Two years of always-on delivery produced 31.5K clicks from 2.94M impressions - the structure is what made the number diagnosable.",
    ],
    results: [
      { v: "31.5K", l: "Clicks", evidence: "dashboard" },
      { v: "2.94M", l: "Impressions", evidence: "dashboard" },
      { v: "6,561", l: "Clicks across 4 intent tiers", evidence: "dashboard" },
    ],
    gallery: [adGoogleWellspaces, adWellspacesKw],
  },
  {
    n: "07",
    tag: "Crowdfunding · Impact",
    title: "BisaBaik.or.id",
    desc: "An end-to-end donation platform with campaign pages, payment gateway integration and an SEO foundation engineered for trust.",
    img: projBisabaik,
    meta: ["Platform", "Payments", "SEO"],
    role: "Founder · Platform Lead",
    year: "2024 - Now",
    story: [
      "BisaBaik was built to give grassroots and faith-driven causes a credible, modern home for online fundraising without platform fees swallowing the donation.",
      "The stack covers campaign authoring, multi-channel payment rails, donor receipts and a transparent reporting layer - designed so a first-time donor trusts the page within seconds of landing on it.",
      "Paid acquisition runs alongside it: the Bisa Baik Bersama and PT Bukit Asam grant campaigns delivered awareness reach at Rp1,214-1,290 per thousand people reached, and link clicks as low as Rp128.",
    ],
    results: [
      { v: "0 → 1", l: "Platform shipped", evidence: "stated" },
      { v: "Rp128", l: "Best cost per link click", evidence: "dashboard" },
      { v: "2.28M", l: "Accounts reached", evidence: "dashboard" },
    ],
    gallery: [projBisabaik, adMetaPalestina],
  },
  {
    n: "08",
    tag: "Home Decor · Lifestyle",
    title: "ResinID Home Decor",
    desc: "The digital sales engine for a designer resin home-decor brand - visual identity, e-commerce stack and creator-led performance media.",
    img: projResinid,
    meta: ["E-commerce", "Creator Ads", "Brand"],
    role: "Growth Partner",
    year: "2023",
    story: [
      "ResinID had a craft-led product but no commercial operating system. The visual identity was rebuilt around the material itself - light, colour, depth - and translated into a storefront that sells the feeling rather than the SKU.",
      "Creator-led performance media on TikTok and Instagram Reels replaced static ads, with hooks scripted around making-of moments. Thumb-stop rate rose and CPM fell materially as a result.",
    ],
    results: [
      { v: "0 → 1", l: "E-commerce stack", evidence: "stated" },
      { v: "Creator-led", l: "Performance media model", evidence: "stated" },
    ],
    gallery: [projResinid, projHalalpro],
  },
  {
    n: "09",
    tag: "Marketplace · Commerce",
    title: "PasarBaik.com",
    desc: "An aggregator connecting impact-driven products, communities and ethical commerce into one storefront.",
    img: projPasarbaik,
    meta: ["Aggregator", "Commerce", "Brand"],
    role: "Founder · Concept & Build",
    year: "2025",
    story: [
      "PasarBaik is the marketplace layer for the BisaBaik ecosystem - a place where impact-driven brands, cooperatives and community producers reach buyers who care where their money goes.",
      "Designed as an aggregator from day one: shared checkout, shared trust signals, shared fulfilment partners, so small producers plug in instead of rebuilding infrastructure they cannot afford.",
    ],
    results: [
      { v: "1", l: "Unified storefront", evidence: "stated" },
      { v: "B2C + B2B", l: "Channels", evidence: "stated" },
    ],
    gallery: [projPasarbaik, projBisabaik, projImpactory],
  },
];
