import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import {
  ArrowUpRight, ArrowRight, Play, X, Menu as MenuIcon,
  MessageCircle,
  Plus, Star, MapPin, ArrowUp
} from "lucide-react";

// Instagram icon (simple custom SVG to avoid lucide export variance)
const InstagramIcon = ({ size = 16, strokeWidth = 1.5, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
import {
  BRAND, NAV_LINKS, COLLECTIONS, PRODUCTS, LOOKBOOK, CRAFT_IMAGES,
  BRAND_VALUES, TESTIMONIALS, SOCIAL, HOW_TO_ORDER, PORTAL_LOOKS, waLink
} from "./data";
import { ALL_PRODUCTS } from "./photoshootData";

// Helper to resolve workspace image paths correctly under both dev and build (dist) directories
export const getWorkspacePath = (subPath) => {
  if (!subPath) return "";
  if (subPath.startsWith("http://") || subPath.startsWith("https://") || subPath.startsWith("data:") || subPath.startsWith("/@fs/")) {
    return subPath;
  }
  const isDev = import.meta.env.DEV;
  // Correctly handle spaces in folder names and image paths
  const encodedPath = subPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
  
  if (isDev) {
    // In Vite dev mode, files outside project root must go through /@fs/ prefix with absolute path
    return `/@fs/Users/dhruv/arrent/guthani/${encodedPath}`;
  }
  
  // In production single-file build, go up 3 levels (dist/ -> premium-fashion-website-main/ -> website/ -> guthani/)
  return `../../../${encodedPath}`;
};

// Resolve the 4 homepage visual model assets
const model1 = getWorkspacePath("website/product_model_1.png");
const model2 = getWorkspacePath("website/product_model_2.png");
const model3 = getWorkspacePath("website/product_model_3.png");
const model4 = getWorkspacePath("website/product_model_4.png");

/* -------------------------------- Routing ---------------------------------- */
export const navigate = (path) => {
  const base = "/guthani-premium-fashion-website";
  const [pathname, hash] = path.split("#");
  const targetPath = window.location.pathname.startsWith(base) ? `${base}${pathname}` : pathname;
  
  // Prevent re-pushing active route pathname (without hash) to preserve history stack
  if (window.location.pathname === targetPath && !hash) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  
  window.history.pushState({}, "", targetPath + (hash ? `#${hash}` : ""));
  window.dispatchEvent(new Event("popstate"));
};

export const parsePath = (path) => {
  const cleanPath = path.replace(/\/$/, "");
  const base = "/guthani-premium-fashion-website";
  let relativePath = cleanPath;
  if (cleanPath.startsWith(base)) {
    relativePath = cleanPath.slice(base.length);
  }
  if (!relativePath) relativePath = "/";

  const collectionDetailMatch = relativePath.match(/^\/collections\/([^/]+)$/);
  if (collectionDetailMatch) {
    return { route: "collection-detail", slug: collectionDetailMatch[1] };
  }

  if (relativePath === "/collections") {
    return { route: "collections" };
  }

  const productDetailMatch = relativePath.match(/^\/products\/([^/]+)$/);
  if (productDetailMatch) {
    return { route: "product-detail", slug: productDetailMatch[1] };
  }

  return { route: "home" };
};

export const handleLinkClick = (e, path) => {
  e.preventDefault();
  navigate(path);
};

export const handleAnchorClick = (e, targetHash) => {
  e.preventDefault();
  const base = "/guthani-premium-fashion-website";
  const relativePath = window.location.pathname.startsWith(base) 
    ? window.location.pathname.slice(base.length) 
    : window.location.pathname;

  if (relativePath !== "/" && relativePath !== "") {
    navigate("/" + targetHash);
  } else {
    const el = document.querySelector(targetHash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
};

/* ---------------------------------- Intro ---------------------------------- */
function Intro({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 1500);
    return () => clearTimeout(t);
  }, [onComplete]);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.77, 0, 0.175, 1] } }}
      className="fixed inset-0 z-[200] flex items-center justify-center textured-light-bg bg-pearl"
    >
      <div className="text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          className="mx-auto mb-8 h-px w-40 origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
        />
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl tracking-[0.15em] text-charcoal"
        >
          GUTHANI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold-dark"
        >
          A Modern Indian Edit
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
          className="mx-auto mt-8 h-px w-40 origin-right bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>
    </motion.div>
  );
}

/* -------------------------------- Custom Cursor ----------------------------- */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [text, setText] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };
    const raf = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(raf);
    };
    window.addEventListener("mousemove", move);
    raf();

    // Cursor labels based on data attribute
    const over = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) setText(t.dataset.cursor);
      else setText("");
      if (e.target.closest("button, a, [data-hover]")) {
        ringRef.current?.classList.add("scale-150");
      } else {
        ringRef.current?.classList.remove("scale-150");
      }
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  const labelRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const ring = ringRef.current;
      const label = labelRef.current;
      if (ring && label) {
        const r = ring.getBoundingClientRect();
        label.style.left = `${r.left + r.width / 2}px`;
        label.style.top = `${r.top + r.height / 2}px`;
      }
      requestAnimationFrame(update);
    };
    const id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <div ref={ringRef} className={`cursor-ring hidden md:block ${hidden ? "opacity-0" : "opacity-100"} ${text ? "!w-20 !h-20" : ""}`} />
      <div ref={dotRef} className={`cursor-dot hidden md:block ${hidden ? "opacity-0" : "opacity-100"}`} />
      {text && (
        <div
          ref={labelRef}
          className="cursor-text hidden md:flex"
          style={{ position: "fixed", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%, -50%)" }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">{text}</span>
        </div>
      )}
    </>
  );
}

/* -------------------------------- Scroll Progress --------------------------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-gold via-burgundy to-gold"
    />
  );
}

/* --------------------------------- Navbar ---------------------------------- */
function Navbar({ onMenuToggle }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.div
          layout
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center justify-between ${scrolled ? "glass rounded-full px-5 md:px-8 py-3 shadow-[0_10px_40px_-20px_rgba(26,23,20,0.25)]" : "px-0 py-0"}`}
        >
          <a href="#top" onClick={(e) => handleAnchorClick(e, "#top")} data-hover className="flex items-center gap-2">
            <span className="font-display text-lg md:text-xl tracking-[0.22em] text-charcoal">GUTHANI</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.slice(0, 4).map((l) => (
              <a key={l.href} href={l.href} data-hover
                onClick={(e) => {
                  if (l.href.startsWith("#")) {
                    handleAnchorClick(e, l.href);
                  } else {
                    handleLinkClick(e, l.href);
                  }
                }}
                className="link-underline font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-charcoal/80 hover:text-charcoal">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <a href={waLink("Hi Guthani, I'd love to know more about your collection.")}
              target="_blank" rel="noreferrer"
              data-hover
              className="hidden md:inline-flex btn-pill btn-primary !py-2 !px-4 !text-[10px]">
              <MessageCircle size={12} strokeWidth={1.5} />
              WhatsApp
            </a>
            <button onClick={onMenuToggle} data-hover aria-label="Menu"
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full glass">
              <MenuIcon size={16} strokeWidth={1.5} className="text-charcoal" />
            </button>
            <button onClick={onMenuToggle} data-hover aria-label="Menu"
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 hover:bg-charcoal hover:text-pearl transition-colors">
              <MenuIcon size={14} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}

/* ---------------------------------- Mobile Menu ----------------------------- */
function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[120] md:hidden bg-pearl"
        >
          <div className="absolute inset-0 grain opacity-60" />
          <div className="relative h-full flex flex-col px-6 pt-16 pb-8">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl tracking-[0.2em]">GUTHANI</span>
              <button onClick={onClose} data-hover
                className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-16 overflow-hidden">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    onClose();
                    if (l.href.startsWith("#")) {
                      handleAnchorClick(e, l.href);
                    } else {
                      handleLinkClick(e, l.href);
                    }
                  }}
                  initial={{ y: "120%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.77, 0, 0.175, 1] }}
                  className="block font-serif text-5xl leading-[1.1] py-3 text-charcoal border-b border-charcoal/10"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto space-y-3">
              <a href={waLink("Hi Guthani!")} target="_blank" rel="noreferrer"
                className="btn-pill btn-primary w-full justify-center">
                <MessageCircle size={14} strokeWidth={1.5}/> WhatsApp Concierge
              </a>
              <div className="flex items-center justify-between font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/60">
                <span>Indore · India</span>
                <span>@guthani</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------- Hero Section ------------------------------- */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const leftX = useTransform(mx, (v) => v * -0.8);
  const leftY = useTransform(my, (v) => v * -0.5);
  const rightX = useTransform(mx, (v) => v * 1.2);
  const rightY = useTransform(my, (v) => v * 0.8);

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const py = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mx.set(px * 20);
    my.set(py * 20);
  };

  return (
    <section ref={ref} onMouseMove={handleMouse} id="top"
      className="relative min-h-[100svh] w-full overflow-hidden textured-light-bg bg-pearl">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,153,104,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(92,30,43,0.12),transparent_55%)]" />
      </div>

      {/* Decorative ring */}
      <motion.div
        style={{ x: mx, y: my }}
        className="absolute right-[8%] top-[18%] hidden md:block"
      >
        <div className="relative h-[38vw] w-[38vw] max-w-[560px] max-h-[560px]">
          <div className="absolute inset-0 rounded-full border border-gold/30 animate-slow-spin" />
          <div className="absolute inset-8 rounded-full border border-gold/15 animate-slow-spin-rev" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 text-[9px] tracking-[0.4em] uppercase text-gold-dark rotate-0">
            · GUTHANI ·
          </div>
        </div>
      </motion.div>

      {/* Main content grid */}
      <motion.div style={{ y, opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-5 pt-32 pb-24 md:px-10 md:pt-40 md:pb-16">

        <div className="grid flex-1 grid-cols-1 md:grid-cols-12 gap-8 items-center">

          {/* Left column — Eyebrow + Headline */}
          <motion.div
            style={{ x: leftX, y: leftY }}
            className="md:col-span-7 z-20 md:pr-8"
          >
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="h-px w-10 bg-gold" />
              <span className="font-sans text-[10px] md:text-xs tracking-[0.45em] uppercase text-gold-dark">
                Festive 2026 · The New Edit
              </span>
            </div>

            <h1 className="font-serif font-light leading-[0.95] tracking-tight text-charcoal">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 1.8, ease: [0.22,1,0.36,1] }}
                className="block text-[56px] md:text-[8vw] lg:text-[112px] italic font-light"
              >
                Festive Elegance
              </motion.span>
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 2.0, ease: [0.22,1,0.36,1] }}
                className="block text-[56px] md:text-[8vw] lg:text-[112px] font-display tracking-[0.01em]"
              >
                REIMAGINED.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.3 }}
              className="mt-6 md:mt-8 max-w-md font-sans text-sm md:text-base leading-relaxed text-charcoal/70"
            >
              Curated Indian silhouettes crafted for celebrations worth remembering.
              Handwoven silk. Soft zari. Modern lines.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="mt-8 md:mt-10 flex flex-wrap items-center gap-4 md:gap-6"
            >
              <a href="/collections" onClick={(e) => handleLinkClick(e, "/collections")} data-hover className="btn-pill btn-primary">
                Explore Collection <ArrowRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={waLink("Hi Guthani, I'd love to know more.")} target="_blank" rel="noreferrer" data-hover
                className="btn-editorial">
                WhatsApp Us <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.7 }}
              className="mt-10 md:mt-14 flex items-center gap-8"
            >
              <div>
                <div className="font-display text-2xl text-charcoal">24</div>
                <div className="font-sans text-[9px] tracking-[0.25em] uppercase text-charcoal/50">New Pieces</div>
              </div>
              <div className="h-8 w-px bg-charcoal/15" />
              <div>
                <div className="font-display text-2xl text-charcoal">06</div>
                <div className="font-sans text-[9px] tracking-[0.25em] uppercase text-charcoal/50">Collections</div>
              </div>
              <div className="h-8 w-px bg-charcoal/15" />
              <div>
                <div className="font-display text-2xl text-charcoal">01</div>
                <div className="font-sans text-[9px] tracking-[0.25em] uppercase text-charcoal/50">Atelier</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — Portrait image */}
          <motion.div
            style={{ x: rightX, y: rightY, scale }}
            className="md:col-span-5 relative z-10 mt-4 md:mt-0"
          >
            <div className="relative mx-auto w-[78%] md:w-full max-w-[520px]">
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 1.6, delay: 1.8, ease: [0.77, 0, 0.175, 1] }}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src={model1}
                  alt="GUTHANI campaign"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine/20 via-transparent to-transparent" />
              </motion.div>

              {/* Metallic capsule label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 2.8 }}
                className="absolute -left-8 md:-left-14 bottom-10 md:bottom-16 glass rounded-full px-4 py-2 md:px-5 md:py-2.5 flex items-center gap-3"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-burgundy animate-gentle-pulse" />
                <div>
                  <div className="font-sans text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-charcoal/70">Festive 2026</div>
                  <div className="font-display text-[13px] md:text-sm tracking-wider text-charcoal">The Isha Saree</div>
                </div>
              </motion.div>

              {/* Vertical text */}
              <div className="hidden md:flex absolute -right-14 top-12 vertical-text font-sans text-[10px] tracking-[0.5em] uppercase text-gold-dark gap-3">
                <span>GUTHANI</span><span>·</span><span>INDORE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-auto flex items-center justify-between pt-10 md:pt-0"
        >
          <div className="hidden md:flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/50">
            <div className="h-px w-8 bg-charcoal/30" />
            Scroll to explore
          </div>
          <div className="hidden md:flex items-center gap-8 font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/50">
            <span>Couture · Festive · Ready-to-Wear</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- Marquee -------------------------------- */
function Marquee() {
  const items = [
    "New Festive Edit", "Limited Pieces", "Curated Indian Wear", "New Arrivals",
    "Shop the Look", "WhatsApp to Order", "Handcrafted in India", "Festive 2026"
  ];
  return (
    <section className="relative border-y border-charcoal/10 bg-charcoal py-6 md:py-8 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((it, i) => (
          <span key={i} className={`mx-8 md:mx-14 ${i % 2 ? "font-display text-3xl md:text-6xl text-pearl" : "font-serif italic text-3xl md:text-6xl text-gold/90"}`}>
            {it}
          </span>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Collections ------------------------------ */
function Collections() {
  return (
    <section id="collections" className="relative py-24 md:py-40 textured-light-bg bg-pearl">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex items-end justify-between mb-14 md:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-dark">01 — Collections</span>
            </div>
            <h2 className="font-serif text-4xl md:text-7xl leading-[0.95] text-charcoal">
              The Edit, <br/><span className="italic font-light">reimagined.</span>
            </h2>
          </div>
          <div className="hidden md:block max-w-xs font-sans text-sm text-charcoal/60 leading-relaxed">
            Six curated edits, each a different silhouette — all crafted for the modern Indian woman.
          </div>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* 01 Sarees — large portrait */}
          <CollectionCard data={COLLECTIONS[0]}
            className="col-span-12 md:col-span-5 md:row-span-2 aspect-[3/4] md:aspect-[3/5] rounded-[220px_220px_12px_12px]"
            delay={0}
          />
          {/* 02 Lehengas — landscape */}
          <CollectionCard data={COLLECTIONS[1]}
            className="col-span-12 md:col-span-4 aspect-[4/3] md:aspect-auto rounded-3xl"
            delay={0.1}
          />
          {/* 03 Suits — landscape */}
          <CollectionCard data={COLLECTIONS[2]}
            className="col-span-6 md:col-span-3 aspect-square md:aspect-auto rounded-full"
            circle
            delay={0.2}
          />
          {/* 04 Kurta Sets — large */}
          <CollectionCard data={COLLECTIONS[3]}
            className="col-span-6 md:col-span-4 aspect-[4/5] md:aspect-[3/4] rounded-[30px_80px_30px_80px]"
            delay={0.3}
          />
          {/* 05 Festive — big feature */}
          <CollectionCard data={COLLECTIONS[4]}
            className="col-span-12 md:col-span-4 aspect-[16/10] md:aspect-[4/5] rounded-[80px] bg-burgundy text-pearl"
            dark
            delay={0.4}
          />
          {/* 06 New Arrivals */}
          <CollectionCard data={COLLECTIONS[5]}
            className="col-span-12 md:col-span-4 aspect-[4/3] rounded-2xl md:rounded-3xl"
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ data: { id, number, name, tagline, image, image2, count }, className, circle, dark, delay = 0 }) {
  const [hover, setHover] = useState(false);
  const path = `/collections/${id}`;
  return (
    <motion.a
      href={path}
      onClick={(e) => handleLinkClick(e, path)}
      data-cursor="explore"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group relative overflow-hidden ${className} ${dark ? "" : "bg-champagne/20"}`}
    >
      {/* Images */}
      <motion.div
        animate={{ scale: hover ? 1.05 : 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute inset-0 ${circle ? "scale-110" : ""}`}
      >
        <img
          src={getWorkspacePath(image)}
          alt={name}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hover ? "opacity-0" : "opacity-100"}`}
        />
        <img
          src={getWorkspacePath(image2 || image)}
          alt=""
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hover ? "opacity-100" : "opacity-0"}`}
        />
      </motion.div>

      {/* Overlays */}
      <div className={`absolute inset-0 ${dark
        ? "bg-gradient-to-t from-wine/80 via-wine/20 to-transparent"
        : "bg-gradient-to-t from-charcoal/50 via-charcoal/0 to-transparent"}`}
      />

      {/* Number / label */}
      <div className={`absolute inset-0 flex flex-col justify-between p-5 md:p-8 ${dark ? "text-pearl" : "text-pearl"}`}>
        <div className="flex items-start justify-between">
          <span className={`font-display text-[11px] tracking-[0.3em] ${dark ? "text-pearl/80" : "text-pearl/90"}`}>{number}</span>
          <span className={`font-sans text-[9px] tracking-[0.25em] uppercase ${dark ? "text-gold" : "text-pearl/80"}`}>{count}</span>
        </div>
        <div>
          <h3 className={`font-serif ${circle ? "text-3xl md:text-5xl" : "text-4xl md:text-6xl"} leading-none drop-shadow-md`}>
            {name}
          </h3>
          <div className="mt-3 flex items-end justify-between gap-3">
            <p className={`hidden md:block max-w-[240px] font-sans text-xs leading-relaxed ${dark ? "text-pearl/70" : "text-pearl/85"}`}>
              {tagline}
            </p>
            <motion.div
              animate={{ x: hover ? 6 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full ${dark ? "bg-pearl text-charcoal" : "bg-pearl/95 text-charcoal"}`}
            >
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

/* --------------------------- Featured Campaign ----------------------------- */
function FeaturedCampaign() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} id="festive" className="relative bg-wine text-pearl py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,153,104,0.2),transparent_60%)]" />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">The Festive Edit · 2026</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.98] font-light">
              Designed for <br />
              <span className="italic font-normal">celebrations</span> <br />
              that become <span className="font-display">memories.</span>
            </h2>
            <p className="mt-6 md:mt-8 font-sans text-sm md:text-base text-pearl/70 leading-relaxed max-w-md">
              Our flagship edit brings together heritage silk, hand zardozi and contemporary silhouettes — for the weddings,
              the pujas and the long nights you'll want to remember.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#products" onClick={(e) => handleAnchorClick(e, "#products")} data-hover className="btn-pill btn-light">
                Discover the Edit <ArrowRight size={13} strokeWidth={1.5} />
              </a>
              <a href={waLink("Hi! I'd like to explore the Festive Edit.")} target="_blank" rel="noreferrer"
                className="btn-editorial btn-editorial-dark">
                WhatsApp Concierge <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-pearl/15 pt-8">
              {[["24", "Pieces"], ["06", "Silhouettes"], ["01", "Atelier"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl md:text-4xl text-gold">{n}</div>
                  <div className="mt-1 font-sans text-[9px] tracking-[0.3em] uppercase text-pearl/60">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 order-1 md:order-2 relative">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <motion.div style={{ y: imgY }}
                className="col-span-8 md:col-span-7 aspect-[3/4] overflow-hidden rounded-[80px_12px_80px_12px]">
                <img src={model2}
                  alt="Festive Edit" loading="lazy"
                  className="h-full w-full object-cover" />
              </motion.div>
              <div className="col-span-4 md:col-span-5 flex flex-col gap-4 md:gap-6 pt-16 md:pt-28">
                <div className="aspect-[3/4] overflow-hidden rounded-[12px_60px_12px_60px]">
                  <img src={model3} alt=""
                    loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="hidden md:flex items-center gap-2 font-sans text-[9px] tracking-[0.3em] uppercase text-pearl/60">
                  <MapPin size={10} strokeWidth={1.5} /> Indore · India
                </div>
              </div>
            </div>

            {/* Floating meta tag */}
            <div className="absolute top-2 right-2 md:top-6 md:-left-4 glass-dark rounded-full px-4 py-2 text-pearl">
              <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-pearl/70">GUTHANI / Festive 2026</div>
              <div className="font-display text-sm">Collection 01</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Product Rail -------------------------------- */
function ProductRail({ onQuickView }) {
  return (
    <section id="products" className="relative py-24 md:py-40 textured-light-bg bg-pearl">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-dark">02 — Featured</span>
            </div>
            <h2 className="font-serif text-4xl md:text-7xl leading-[0.95] text-charcoal">
              Signature <span className="italic">pieces.</span>
            </h2>
          </div>
          <a href="#new-arrivals" onClick={(e) => handleAnchorClick(e, "#new-arrivals")} data-hover className="btn-editorial self-start md:self-auto">
            View All New Arrivals <ArrowRight size={14} strokeWidth={1.5}/>
          </a>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-6 md:gap-8 px-5 md:px-10 pb-6 md:pb-8">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={onQuickView} />
          ))}
          <div className="shrink-0 w-10 md:w-20" />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, onQuickView, isGrid = false }) {
  const [hover, setHover] = useState(false);
  const ratios = {
    tall: "aspect-[2/3] md:aspect-[9/16]",
    portrait: "aspect-[3/4]",
    square: "aspect-[4/5]",
  };
  const ratio = ratios[product.ratio] || ratios.portrait;
  const radii = [
    "rounded-[60px_12px_60px_12px]",
    "rounded-[12px_80px_12px_80px]",
    "rounded-[40px]",
    "rounded-[80px_12px_12px_80px]",
    "rounded-[12px_40px_40px_12px]",
    "rounded-[60px]",
  ];
  const radius = radii[index % radii.length];

  const img1 = product.images ? getWorkspacePath(product.images[0]) : product.image;
  const img2 = product.images ? getWorkspacePath(product.images[1] || product.images[0]) : (product.image2 || product.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22,1,0.36,1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onQuickView(product)}
      data-cursor="view"
      data-hover
      className={`group relative cursor-pointer ${isGrid ? "w-full" : "shrink-0 w-[72vw] sm:w-[55vw] md:w-[28vw] lg:w-[22vw] max-w-[360px]"}`}
    >
      <div className={`relative overflow-hidden ${ratio} ${radius} bg-champagne/20`}>
        <img src={img1} alt={product.name} loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${hover ? "opacity-0 scale-105" : "opacity-100"}`} />
        <img src={img2} alt="" loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${hover ? "opacity-100 scale-105" : "opacity-0"}`} />

        {/* Number */}
        <div className="absolute left-4 top-4 font-display text-[11px] tracking-[0.3em] text-pearl mix-blend-difference">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Bottom info */}
        <div className={`absolute inset-x-0 bottom-0 p-5 md:p-6 transition-all duration-500 ${hover ? "translate-y-0 opacity-100" : "translate-y-4 opacity-90"}`}>
          <div className="flex items-end justify-between gap-3">
            <div className="text-pearl">
              <div className="font-sans text-[9px] tracking-[0.25em] uppercase opacity-80">{product.category}</div>
              <div className="font-serif text-xl md:text-2xl leading-tight drop-shadow">{product.name}</div>
            </div>
            <motion.div animate={{ rotate: hover ? 45 : 0 }}
              transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
              className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-pearl text-charcoal">
              <Plus size={14} strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Under-card info */}
      <div className="mt-4 flex items-center justify-between">
        <div className="font-sans text-[11px] tracking-wider text-charcoal/60">{product.fabric.split(" ").slice(0, 3).join(" ")}</div>
        <div className="font-display text-sm text-charcoal">{product.price}</div>
      </div>
    </motion.div>
  );
}

/* ---------------------------- Quick View Drawer ---------------------------- */
function QuickView({ product, onClose }) {
  useEffect(() => {
    if (product) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  if (!product) return null;
  const waMsg = `Hi Guthani, I'm interested in *${product.name}* (${product.category}). Could you please share availability, size and price details?`;
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-charcoal/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[160] w-full md:w-[520px] bg-pearl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-pearl/80 backdrop-blur-md border-b border-charcoal/10">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/60">Quick View</span>
              <button onClick={onClose} data-hover
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15">
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            <div className="px-6 py-6 md:px-8 md:py-8">
              <div className="aspect-[3/4] overflow-hidden rounded-[40px_8px_40px_8px] mb-6">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border border-charcoal/15 text-charcoal/70">{product.category}</span>
                <span className="text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border border-charcoal/15 text-charcoal/70">{product.color}</span>
              </div>

              <h3 className="font-serif text-4xl leading-tight text-charcoal">{product.name}</h3>
              <div className="mt-2 font-display text-lg text-burgundy">{product.price}</div>

              <p className="mt-5 font-sans text-sm leading-relaxed text-charcoal/70">{product.description}</p>

              <div className="mt-6 space-y-3 border-t border-charcoal/10 pt-5">
                <InfoRow label="Fabric" value={product.fabric} />
                <InfoRow label="Colour" value={product.color} />
                <InfoRow label="Sizes" value={product.sizes.join(" · ")} />
                <InfoRow label="Styling note" value={product.styling} />
                <InfoRow label="Care" value="Dry clean only. Store in a muslin cloth." />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <a href={waLink(waMsg)} target="_blank" rel="noreferrer" data-hover
                  className="btn-pill btn-primary col-span-2 justify-center">
                  <MessageCircle size={14} strokeWidth={1.5}/> Enquire on WhatsApp
                </a>
                <button className="btn-pill btn-outline col-span-1 justify-center" onClick={onClose}>Close</button>
                <a href={waLink(waMsg)} target="_blank" rel="noreferrer" className="btn-pill btn-outline col-span-1 justify-center">
                  Save
                </a>
              </div>

              <div className="mt-8 text-center font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/40">
                GUTHANI · MADE IN INDIA
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
function InfoRow({ label, value }) {
  return (
    <div className="flex gap-4 font-sans text-sm">
      <span className="w-24 shrink-0 text-[10px] tracking-[0.25em] uppercase text-charcoal/50 pt-0.5">{label}</span>
      <span className="flex-1 text-charcoal/80">{value}</span>
    </div>
  );
}

/* --------------------------- Brand Philosophy ------------------------------ */
function BrandPhilosophy() {
  return (
    <section id="story" className="relative py-24 md:py-40 textured-light-bg bg-champagne/25">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-dark">Why GUTHANI</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] text-charcoal">
              Tradition, <br/><span className="italic font-light">without limits.</span>
            </h2>
            <p className="mt-6 font-sans text-sm text-charcoal/70 leading-relaxed max-w-sm">
              Indian silhouettes shaped for the modern woman — designed to move between occasions, cities and moods.
            </p>
          </div>
          <div className="md:col-span-8 space-y-0">
            {BRAND_VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="grid grid-cols-12 gap-4 items-start py-8 md:py-12 border-t border-charcoal/15 last:border-b hover:bg-pearl/60 transition-colors px-2 md:px-6"
              >
                <div className="col-span-2 md:col-span-1 font-display text-sm text-gold-dark">{v.n}</div>
                <div className="col-span-10 md:col-span-5 font-serif text-2xl md:text-4xl leading-tight text-charcoal">
                  {v.title}
                </div>
                <div className="col-span-12 md:col-span-6 font-sans text-sm text-charcoal/65 leading-relaxed md:pl-6">
                  {v.body}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Fashion Story ------------------------------ */
function FashionStory() {
  const panels = [
    { n: "01", label: "Craft", src: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=1200&q=85" },
    { n: "02", label: "Silhouette", src: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&q=85" },
    { n: "03", label: "Celebration", src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=85" },
    { n: "04", label: "Modern India", src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=85" },
  ];
  return (
    <section className="relative py-24 md:py-40 textured-light-bg bg-pearl">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-12 md:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-dark">03 — Story</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.95]">
            Four chapters, <br/><span className="italic font-light">one woman.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <div className="aspect-[3/4] rounded-[80px_20px] overflow-hidden bg-champagne/30">
              <StoryCarousel panels={panels} />
            </div>
          </div>
          <div className="md:col-span-7 space-y-4 md:space-y-0 md:py-10">
            {panels.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="py-8 md:py-14 border-b border-charcoal/10 flex items-baseline justify-between gap-6"
              >
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-display text-sm text-gold-dark">{p.n}</span>
                  <h3 className="font-serif text-3xl md:text-5xl text-charcoal">{p.label}</h3>
                </div>
                <ArrowRight size={18} strokeWidth={1.2} className="text-charcoal/40 shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCarousel({ panels }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % panels.length), 3500);
    return () => clearInterval(t);
  }, [panels.length]);
  return (
    <div className="relative h-full w-full">
      {panels.map((p, i) => (
        <motion.div
          key={p.n}
          initial={false}
          animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }}
          transition={{ duration: 1, ease: [0.22,1,0.36,1] }}
          className="absolute inset-0"
        >
          <img src={p.src} alt={p.label} className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
      ))}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-pearl">
        <div className="font-display text-xl drop-shadow">{panels[active].label}</div>
        <div className="flex gap-1.5">
          {panels.map((_, i) => (
            <div key={i} className={`h-1 w-6 rounded-full transition-all ${i === active ? "bg-pearl" : "bg-pearl/40"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Lookbook / Art of Dressing -------------------- */
function Lookbook() {
  return (
    <section id="lookbook" className="relative bg-charcoal text-pearl py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">04 — Lookbook</span>
            </div>
            <h2 className="font-serif text-5xl md:text-8xl leading-[0.95] font-light">
              The Art <br/>
              <span className="italic">of Festive</span> <br/>
              <span className="font-display">Dressing.</span>
            </h2>
          </div>
          <p className="md:max-w-sm font-sans text-sm text-pearl/60 leading-relaxed">
            A cinematic diary of our campaign — from the first drape to the final shot.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3 md:gap-5">
          {/* Tall left */}
          <div className="col-span-7 md:col-span-4 row-span-2 aspect-[3/5] rounded-[80px_8px] overflow-hidden">
            <img src={getWorkspacePath(LOOKBOOK[0].image)} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="col-span-5 md:col-span-3 aspect-[3/4] rounded-[8px_60px] overflow-hidden">
            <img src={getWorkspacePath(LOOKBOOK[1].image)} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="col-span-5 md:col-span-3 aspect-[3/4] rounded-[60px_8px_60px_8px] overflow-hidden">
            <img src={getWorkspacePath(LOOKBOOK[2].image)} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="hidden md:block col-span-2 pt-8">
            <div className="vertical-text font-sans text-[10px] tracking-[0.5em] uppercase text-pearl/60">
              GUTHANI · CAMPAIGN 01 · INDORE
            </div>
          </div>

          {/* Bottom row */}
          <div className="col-span-6 md:col-span-4 aspect-[4/3] rounded-[8px_60px_8px_60px] overflow-hidden mt-2 md:mt-0">
            <img src={getWorkspacePath(LOOKBOOK[3].image)} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="col-span-6 md:col-span-3 aspect-[4/5] rounded-[60px_60px_8px_8px] overflow-hidden">
            <img src={getWorkspacePath(LOOKBOOK[4].image)} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="hidden md:block col-span-2 aspect-square rounded-full overflow-hidden ring-1 ring-pearl/20">
            <img src={getWorkspacePath(LOOKBOOK[5].image)} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="hidden md:flex col-span-3 flex-col justify-between pb-4">
            <div className="font-display text-2xl">“The future of Indian elegance.”</div>
            <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-pearl/60">— Editor's Note</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Fashion Portal (Signature) -------------------- */
function FashionPortal() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const dragX = useMotionValue(0);
  const dragThreshold = 60;

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -dragThreshold) setActive((a) => (a + 1) % PORTAL_LOOKS.length);
    else if (info.offset.x > dragThreshold) setActive((a) => (a - 1 + PORTAL_LOOKS.length) % PORTAL_LOOKS.length);
    dragX.set(0);
  };

  return (
    <section className="relative py-24 md:py-40 textured-light-bg bg-pearl overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10 md:mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-dark">05 — The Edit</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-5xl md:text-8xl leading-none tracking-tight text-charcoal">
            THE <span className="italic font-serif font-light">GUTHANI</span> EDIT
          </h2>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Rotating rings */}
          <div className="absolute h-[100vw] max-h-[700px] w-[100vw] max-w-[700px] pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-gold/20 animate-slow-spin" />
            <div className="absolute inset-[8%] rounded-full border border-gold/10 animate-slow-spin-rev" />
            <div className="absolute inset-[16%] rounded-full border border-charcoal/5" />
          </div>

          {/* Portal */}
          <motion.div
            ref={containerRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x: dragX }}
            onDragEnd={handleDragEnd}
            data-cursor="drag"
            className="relative h-[72vw] w-[72vw] max-h-[520px] max-w-[520px] overflow-hidden rounded-full bg-champagne/20 cursor-grab active:cursor-grabbing select-none shadow-[0_30px_80px_-30px_rgba(92,30,43,0.35)]"
          >
            {PORTAL_LOOKS.map((l, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  scale: active === i ? 1 : 1.1,
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={active === i ? { x: dragX } : undefined}
                className="absolute inset-0"
              >
                <img src={getWorkspacePath(l.image)} alt={l.label} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-wine/40 via-transparent to-transparent" />
              </motion.div>
            ))}
            <div className="absolute bottom-8 left-0 right-0 text-center text-pearl">
              <div className="font-display text-lg md:text-2xl">{PORTAL_LOOKS[active].label}</div>
              <div className="mt-1 font-sans text-[9px] tracking-[0.35em] uppercase opacity-80">Drag to explore</div>
            </div>
          </motion.div>

          {/* Big typography around */}
          <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 font-serif text-[140px] leading-none text-charcoal/90 pointer-events-none">THE</div>
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 font-display text-[140px] leading-none text-burgundy/80 pointer-events-none">EDIT</div>
        </div>

        <div className="mt-12 md:mt-16 flex items-center justify-center gap-4">
          {PORTAL_LOOKS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} data-hover
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-10 bg-charcoal" : "w-3 bg-charcoal/20"}`}
              aria-label={`Look ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Craft / Macro ------------------------------ */
function CraftSection() {
  return (
    <section className="relative bg-charcoal text-pearl py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-20">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">06 — Craft</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] font-light">
              Details that <br/><span className="italic">make</span> the <br/>difference.
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 self-end">
            <p className="font-sans text-sm text-pearl/65 leading-relaxed">
              Every stitch tells a story of hands that have spent decades perfecting their art — zari from Surat,
              silk from Kanchipuram, chikankari from Lucknow.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-4 md:gap-6 px-5 md:px-10 pb-6">
          {CRAFT_IMAGES.concat(CRAFT_IMAGES).map((c, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08 }}
              className={`relative shrink-0 overflow-hidden rounded-[60px_12px] ${i % 3 === 0 ? "w-[80vw] md:w-[44vw] aspect-[16/10]" : i % 3 === 1 ? "w-[65vw] md:w-[30vw] aspect-[3/4]" : "w-[70vw] md:w-[34vw] aspect-[4/5]"}`}
            >
              <img src={getWorkspacePath(c.src)} alt={c.label} loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1400ms]" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-charcoal/80 to-transparent">
                <div className="font-sans text-[9px] tracking-[0.3em] uppercase text-pearl/70">Detail {String((i % 4) + 1).padStart(2, "0")}</div>
                <div className="font-serif text-2xl md:text-3xl text-pearl">{c.label}</div>
              </div>
            </motion.div>
          ))}
          <div className="shrink-0 w-4" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- New Arrivals ------------------------------ */
function NewArrivals({ onQuickView }) {
  const hero = PRODUCTS[3];
  const rest = [PRODUCTS[4], PRODUCTS[5], PRODUCTS[0]];
  return (
    <section id="new-arrivals" className="relative py-24 md:py-40 textured-light-bg bg-pearl">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex items-end justify-between mb-10 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-dark">07 — Just In</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] text-charcoal">
              <span className="italic font-light">New</span> this week.
            </h2>
          </div>
          <a href="#products" onClick={(e) => handleAnchorClick(e, "#products")} data-hover className="btn-editorial">All New Arrivals <ArrowRight size={14} strokeWidth={1.5}/></a>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <motion.div
            onClick={() => onQuickView(hero)} data-cursor="view"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="col-span-12 md:col-span-6 relative aspect-[4/5] md:aspect-[3/4] rounded-[80px_16px_80px_16px] overflow-hidden bg-champagne/20 cursor-pointer group"
          >
            <img src={hero.image} alt={hero.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-[1400ms]" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex items-end justify-between text-pearl">
              <div>
                <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-pearl/70 mb-1">New · Hero Piece</div>
                <h3 className="font-serif text-3xl md:text-5xl leading-none">{hero.name}</h3>
                <p className="mt-2 font-sans text-xs md:text-sm text-pearl/80 max-w-xs">{hero.styling}</p>
              </div>
              <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-pearl text-charcoal">
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </div>
            </div>
            <div className="absolute top-6 left-6 font-display text-sm tracking-[0.3em] text-pearl">01</div>
          </motion.div>

          <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-4 md:gap-6 content-between">
            {rest.map((p, i) => (
              <motion.div
                key={p.id}
                onClick={() => onQuickView(p)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
                data-cursor="view"
                className={`relative cursor-pointer group overflow-hidden ${i === 0 ? "aspect-[3/4] rounded-[12px_60px_12px_60px]" : i === 1 ? "aspect-[3/4] rounded-[60px_12px]" : "col-span-2 aspect-[16/9] rounded-[20px]"} bg-champagne/20`}
              >
                <img src={p.image} alt={p.name} loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-[1400ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-pearl">
                  <div>
                    <div className="font-sans text-[9px] tracking-[0.25em] uppercase opacity-80">{p.category.split("·")[0]}</div>
                    <div className="font-serif text-lg md:text-2xl leading-tight">{p.name}</div>
                  </div>
                  <div className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-pearl/95 text-charcoal">
                    <Plus size={12} strokeWidth={1.5} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Instagram / Social -------------------------- */
function Instagram() {
  return (
    <section id="instagram" className="relative py-24 md:py-40 textured-light-bg bg-champagne/25">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-20 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-dark">08 — Social</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95]">
              Seen on <span className="italic font-light">@guthani.</span>
            </h2>
          </div>
          <div className="md:col-span-5 flex md:justify-end">
            <a href="https://instagram.com/guthani" target="_blank" rel="noreferrer" data-hover
              className="btn-pill btn-primary">
              <InstagramIcon size={14} strokeWidth={1.5} /> Follow on Instagram
            </a>
          </div>
        </div>

        <div className="grid grid-cols-6 md:grid-cols-12 gap-3 md:gap-4">
          {SOCIAL.map((s, i) => {
            const spans = [
              "col-span-3 md:col-span-4 aspect-[4/3] rounded-[60px_8px]",
              "col-span-3 md:col-span-3 aspect-[3/4] rounded-[8px_40px]",
              "col-span-6 md:col-span-5 aspect-[16/10] rounded-[8px_60px_8px_60px]",
              "col-span-3 md:col-span-3 aspect-square rounded-full",
              "col-span-3 md:col-span-4 aspect-[4/3] rounded-[40px]",
              "col-span-6 md:col-span-4 aspect-[3/4] rounded-[60px_12px]",
              "col-span-3 md:col-span-2 aspect-square rounded-xl",
              "col-span-3 md:col-span-2 aspect-square rounded-xl",
            ];
            return (
              <motion.a
                key={i}
                href="https://instagram.com/guthani" target="_blank" rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                data-hover
                className={`relative group overflow-hidden ${spans[i % spans.length]} bg-champagne/30`}
              >
                <img src={getWorkspacePath(s.src)} alt={s.caption} loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {s.type === "reel" ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pearl/90 text-charcoal">
                      <Play size={14} strokeWidth={1.5} />
                    </div>
                  ) : (
                    <InstagramIcon size={20} className="text-pearl" strokeWidth={1.4} />
                  )}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- How to Order ------------------------------ */
function HowToOrder() {
  return (
    <section className="relative py-24 md:py-40 textured-light-bg bg-pearl">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-14 md:mb-24 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-dark">09 — Process</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] text-charcoal">
            How to <span className="italic font-light">order.</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px">
            <svg className="w-full" preserveAspectRatio="none" viewBox="0 0 100 1" fill="none">
              <path d="M0 0.5 Q 25 0.5, 50 0.5 T 100 0.5" stroke="#b89968" strokeWidth="0.5" strokeDasharray="1 2" />
            </svg>
          </div>
          {HOW_TO_ORDER.map((s, i) => (
            <motion.div key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative flex flex-col items-start md:items-center md:text-center px-0 md:px-6"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-pearl border border-gold/40 mb-6">
                <span className="font-display text-xl text-burgundy">{s.n}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">{s.title}</h3>
              <p className="font-sans text-sm text-charcoal/65 leading-relaxed max-w-xs">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Concierge ------------------------------- */
function Concierge() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-wine via-burgundy to-espresso text-pearl overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,153,104,0.2),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 bg-gold/60" />
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">GUTHANI Concierge</span>
          <div className="h-px w-10 bg-gold/60" />
        </div>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight font-light">
          Not sure <span className="italic">what to wear?</span>
        </h2>
        <p className="mt-6 mx-auto max-w-xl font-sans text-sm md:text-base text-pearl/70 leading-relaxed">
          Our stylists can help you discover the perfect GUTHANI look for your next celebration — personalised suggestions,
          size guidance, and bespoke alterations, all over WhatsApp.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={waLink("Hi Guthani, I'd love some styling help for an upcoming occasion.")}
            target="_blank" rel="noreferrer" data-hover
            className="btn-pill btn-light">
            <MessageCircle size={14} strokeWidth={1.5}/> Chat with our Stylist
          </a>
          <a href="/collections" onClick={(e) => handleLinkClick(e, "/collections")} data-hover className="btn-editorial btn-editorial-dark">
            Browse Collections <ArrowUpRight size={14} strokeWidth={1.5}/>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Testimonials ------------------------------ */
function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[active];
  return (
    <section className="relative py-24 md:py-40 textured-light-bg bg-pearl">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-dark">10 — Loved by</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-3xl md:text-5xl leading-[1.2] italic font-light text-charcoal"
              >
                <span className="text-gold">“</span>{t.quote}<span className="text-gold">”</span>
              </motion.blockquote>
            </AnimatePresence>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex gap-0.5 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" strokeWidth={0} />)}
              </div>
              <div className="font-display text-base md:text-lg text-charcoal">{t.name}</div>
              <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-charcoal/50 flex items-center gap-1">
                <MapPin size={10} strokeWidth={1.5}/> {t.city}
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} data-hover
                  className={`h-1 rounded-full transition-all ${i === active ? "w-12 bg-burgundy" : "w-4 bg-charcoal/20"}`} />
              ))}
            </div>
          </div>
          <div className="md:col-span-5 order-1 md:order-2 relative">
            <div className="relative mx-auto aspect-[4/5] max-w-[380px] rounded-[120px_12px_120px_12px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={getWorkspacePath(t.image)}
                  alt={t.name}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="hidden md:grid absolute -left-10 top-10 h-20 w-20 rounded-full overflow-hidden ring-2 ring-pearl shadow-lg place-items-center">
              <img src={getWorkspacePath(TESTIMONIALS[(active + 1) % 3].image)} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="hidden md:grid absolute -right-6 bottom-12 h-14 w-14 rounded-full overflow-hidden ring-2 ring-pearl shadow-lg place-items-center">
              <img src={getWorkspacePath(TESTIMONIALS[(active + 2) % 3].image)} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Final CTA -------------------------------- */
function FinalCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={model4}
          alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-wine/60 via-wine/50 to-nearblack/80" />
      </motion.div>
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-10 py-24 md:py-32 text-pearl text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-10 bg-gold/70" />
          <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-gold">The Next Chapter</span>
          <div className="h-px w-10 bg-gold/70" />
        </div>
        <h2 className="font-serif text-5xl md:text-[9vw] lg:text-[130px] leading-[0.95] font-light">
          Your next <br/>
          <span className="italic">celebration</span> <br/>
          <span className="font-display tracking-tight">starts here.</span>
        </h2>
        <p className="mt-8 mx-auto max-w-xl font-sans text-sm md:text-base text-pearl/75 leading-relaxed">
          Discover Indian fashion designed to make every moment feel extraordinary.
        </p>
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/collections" onClick={(e) => handleLinkClick(e, "/collections")} data-hover className="btn-pill btn-light">
            Explore Collection <ArrowRight size={13} strokeWidth={1.5}/>
          </a>
          <a href={waLink("Hi Guthani!")} target="_blank" rel="noreferrer" data-hover
            className="btn-pill btn-primary !bg-pearl !text-charcoal !border-pearl hover:!bg-gold hover:!border-gold hover:!text-pearl">
            <MessageCircle size={13} strokeWidth={1.5}/> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Footer ---------------------------------- */
function Footer() {
  return (
    <footer className="relative bg-nearblack text-pearl pt-20 md:pt-28 pb-24 md:pb-10 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="text-center mb-14 md:mb-20">
          <div className="hairline mb-10" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display text-[16vw] md:text-[14vw] leading-[0.85] tracking-[0.02em] text-pearl"
          >
            GUTHANI
          </motion.h2>
          <div className="hairline mt-10" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 pb-14 border-b border-pearl/10">
          <FooterCol title="Collections" items={[
            ["Sarees", "/collections/sarees"], ["Lehengas", "/collections/lehengas"], ["Suits", "/collections/suits"],
            ["Kurta Sets", "/collections/kurta-sets"], ["Festive Edit", "/collections/festive-edit"]
          ]} />
          <FooterCol title="Discover" items={[
            ["New Arrivals", "/#new-arrivals"], ["Lookbook", "/#lookbook"], ["Our Story", "/#story"], ["The Edit", "/collections"]
          ]} />
          <FooterCol title="Connect" items={[
            ["Instagram", "https://instagram.com/guthani"], ["WhatsApp", waLink("Hi!")], ["Contact", "#"]
          ]} />
          <FooterCol title="Policies" items={[
            ["Privacy", "#"], ["Shipping", "#"], ["Returns", "#"], ["Care Guide", "#"]
          ]} />
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-pearl/60 mb-4">Atelier</h4>
            <p className="font-sans text-sm text-pearl/70 leading-relaxed">
              {BRAND.location}<br/>
              By appointment only.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gold animate-gentle-pulse" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold">Open for Festive 2026</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-[10px] tracking-[0.3em] uppercase text-pearl/50">
          <div>© {new Date().getFullYear()} GUTHANI · All Rights Reserved</div>
          <div className="flex items-center gap-6">
            <span>Made in India</span>
            <a href="#top" onClick={(e) => handleAnchorClick(e, "#top")} data-hover className="flex items-center gap-2 hover:text-pearl">Back to top <ArrowUp size={12} strokeWidth={1.5}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-pearl/60 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {items.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              onClick={(e) => {
                if (href.startsWith("#")) {
                  handleAnchorClick(e, href);
                } else if (href.startsWith("/#")) {
                  const hash = href.slice(1);
                  handleAnchorClick(e, hash);
                } else if (href.startsWith("/")) {
                  handleLinkClick(e, href);
                }
              }}
              data-hover
              className="link-underline font-sans text-sm text-pearl/80 hover:text-pearl"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------- Floating WhatsApp CTA ------------------------- */
function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
          href={waLink("Hi Guthani! I'd love to know more about your collection.")}
          target="_blank" rel="noreferrer"
          data-hover
          className="fixed bottom-20 md:bottom-8 right-5 md:right-8 z-40 group"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-burgundy/30 blur-xl animate-gentle-pulse" />
            <div className="relative flex items-center gap-3 rounded-full bg-charcoal text-pearl pl-4 pr-2 py-2 shadow-2xl hover:bg-burgundy transition-colors">
              <span className="font-sans text-[10px] md:text-[11px] tracking-[0.22em] uppercase hidden sm:inline pr-1">WhatsApp Concierge</span>
              <span className="font-sans text-[10px] tracking-[0.22em] uppercase sm:hidden">Chat</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-charcoal">
                <MessageCircle size={16} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------- Mobile Sticky Bar ---------------------------- */
function MobileStickyBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 mobile-bar bg-pearl/95 backdrop-blur-md border-t border-charcoal/10 px-4 py-3 flex items-center gap-3">
      <a href="/collections" onClick={(e) => handleLinkClick(e, "/collections")} className="flex-1 btn-pill btn-outline !py-3 justify-center text-[10px]">Explore</a>
      <a href={waLink("Hi Guthani!")} target="_blank" rel="noreferrer"
        className="flex-1 btn-pill btn-primary !py-3 justify-center text-[10px]">
        <MessageCircle size={12} strokeWidth={1.5}/> WhatsApp
      </a>
    </div>
  );
}

/* ----------------------------- Collections Page ----------------------------- */
function CollectionsPage({ onProductClick }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 textured-light-bg bg-pearl">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-gold" />
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-dark">Atelier GUTHANI</span>
        </div>
        <h1 className="font-serif text-5xl md:text-8xl leading-none text-charcoal mb-14 md:mb-20">
          The Collections <span className="italic font-light">Edit</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {ALL_PRODUCTS.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onQuickView={onProductClick}
              isGrid={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Collection Detail Page ------------------------- */
function CollectionDetailPage({ slug, onQuickView }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const collection = COLLECTIONS.find((c) => c.id === slug);

  if (!collection) {
    return (
      <section className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 textured-light-bg bg-pearl flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-4xl mb-6 text-charcoal">Collection not found</h2>
          <a
            href="/collections"
            onClick={(e) => handleLinkClick(e, "/collections")}
            className="btn-pill btn-primary"
          >
            Back to Collections
          </a>
        </div>
      </section>
    );
  }

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    if (Array.isArray(p.collectionSlug)) {
      return p.collectionSlug.includes(slug);
    }
    return p.collectionSlug === slug;
  });

  return (
    <section className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 textured-light-bg bg-pearl">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <a
          href="/collections"
          onClick={(e) => handleLinkClick(e, "/collections")}
          className="inline-flex items-center gap-2 mb-8 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-charcoal/60 hover:text-charcoal transition-colors group"
        >
          <ArrowRight size={12} strokeWidth={1.5} className="rotate-180 transition-transform group-hover:-translate-x-1" />
          Back to Collections
        </a>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-24 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display text-sm tracking-[0.3em] text-gold">{collection.number}</span>
              <div className="h-px w-8 bg-gold" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-dark">
                {filteredProducts.length} Pieces
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-8xl leading-none text-charcoal">
              {collection.name}
            </h1>
          </div>
          <p className="max-w-md font-sans text-sm md:text-base text-charcoal/60 leading-relaxed">
            {collection.tagline}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-charcoal/10 rounded-3xl bg-pearl/40">
            <h3 className="font-serif text-3xl text-charcoal mb-4">No pieces found</h3>
            <p className="font-sans text-sm text-charcoal/60 max-w-sm mx-auto mb-8">
              We are currently curating new designs for this collection. Please check back later or explore our other edits.
            </p>
            <a
              href="/collections"
              onClick={(e) => handleLinkClick(e, "/collections")}
              className="btn-pill btn-primary"
            >
              Explore Collections
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProducts.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                onQuickView={onQuickView}
                isGrid={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------- Product Detail Page --------------------------- */
function ProductDetailPage({ slug }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Support resolving from either newly scan photoshoot products or the original products
  const product = ALL_PRODUCTS.find((p) => p.id === slug) || PRODUCTS.find((p) => p.id === slug);

  if (!product) {
    return (
      <section className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 textured-light-bg bg-pearl flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-4xl mb-6 text-charcoal">Product not found</h2>
          <a
            href="/collections"
            onClick={(e) => handleLinkClick(e, "/collections")}
            className="btn-pill btn-primary"
          >
            Back to Collections
          </a>
        </div>
      </section>
    );
  }

  // Pre-fill WhatsApp message query
  const waMsg = `Hi Guthni, I'm interested in *${product.name}*. Could you please share more details?`;

  const images = product.images 
    ? product.images.map(img => getWorkspacePath(img)) 
    : [product.image, product.image2 || product.image];

  return (
    <section className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 textured-light-bg bg-pearl">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <a 
          href="/collections" 
          onClick={(e) => handleLinkClick(e, "/collections")}
          className="inline-flex items-center gap-2 mb-8 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-charcoal/60 hover:text-charcoal transition-colors group"
        >
          <ArrowRight size={12} strokeWidth={1.5} className="rotate-180 transition-transform group-hover:-translate-x-1" />
          Back to Collections
        </a>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Images list */}
          <div className="md:col-span-7 space-y-6">
            {images.map((img, i) => (
              <div 
                key={i} 
                className="overflow-hidden rounded-3xl bg-champagne/20 aspect-[3/4]"
              >
                <img 
                  src={img} 
                  alt={`${product.name} detail view ${i + 1}`} 
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right: Sticky Details */}
          <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border border-charcoal/15 text-charcoal/70">
                {product.category}
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border border-charcoal/15 text-charcoal/70">
                {product.color}
              </span>
            </div>

            <h1 className="font-serif text-4xl lg:text-5xl leading-tight text-charcoal mb-3">
              {product.name}
            </h1>
            
            <div className="font-display text-2xl text-burgundy mb-6">
              {product.price}
            </div>

            <p className="font-sans text-sm leading-relaxed text-charcoal/70 mb-8">
              {product.description}
            </p>

            <div className="space-y-3 border-t border-charcoal/10 pt-6 mb-8">
              <InfoRow label="Fabric" value={product.fabric} />
              <InfoRow label="Colour" value={product.color} />
              <InfoRow label="Sizes" value={product.sizes.join(" · ")} />
              <InfoRow label="Styling note" value={product.styling} />
              <InfoRow label="Care" value={product.care || "Dry clean only. Store in a zip-lock bag."} />
            </div>

            <div className="space-y-3">
              <a 
                href={waLink(waMsg)} 
                target="_blank" 
                rel="noreferrer" 
                data-hover
                className="btn-pill btn-primary w-full justify-center"
              >
                <MessageCircle size={14} strokeWidth={1.5}/> Enquire on WhatsApp
              </a>
              <a 
                href="/collections" 
                onClick={(e) => handleLinkClick(e, "/collections")}
                className="btn-pill btn-outline w-full justify-center"
              >
                Back to Collections
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- App ----------------------------------- */
export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    if (menuOpen || quickView) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [menuOpen, quickView]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const { route, slug } = parsePath(currentPath);

  // Scroll to hash elements on load or page changes
  useEffect(() => {
    if (introDone && window.location.hash) {
      const hash = window.location.hash;
      const t = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 800);
      return () => clearTimeout(t);
    }
  }, [introDone, currentPath]);

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`);
  };

  const handleQuickViewClose = () => {
    setQuickView(null);
    if (route === "product-detail") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="relative bg-pearl text-charcoal min-h-screen">
      <AnimatePresence>
        {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      <ScrollProgress />
      <CustomCursor />
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="md:pb-0">
        {route === "home" && (
          <>
            <Hero />
            <Marquee />
            <Collections />
            <FeaturedCampaign />
            <ProductRail onQuickView={handleProductClick} />
            <BrandPhilosophy />
            <FashionStory />
            <Lookbook />
            <FashionPortal />
            <CraftSection />
            <NewArrivals onQuickView={handleProductClick} />
            <Instagram />
            <HowToOrder />
            <Concierge />
            <Testimonials />
            <FinalCTA />
            <Footer />
          </>
        )}
        {route === "collections" && (
          <>
            <CollectionsPage onProductClick={handleProductClick} />
            <Footer />
          </>
        )}
        {route === "product-detail" && (
          <>
            <ProductDetailPage slug={slug} />
            <Footer />
          </>
        )}
        {route === "collection-detail" && (
          <>
            <CollectionDetailPage slug={slug} onQuickView={handleProductClick} />
            <Footer />
          </>
        )}
      </main>

      <FloatingWhatsApp />
      <MobileStickyBar />
      <QuickView product={quickView} onClose={handleQuickViewClose} />
    </div>
  );
}
