import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { asset } from "@/lib/utils";

/**
 * DESIGN PHILOSOPHY: Cinematic Luxury Minimalism
 * - Image-first storytelling with minimal text overlay
 * - Full-bleed hero sections with parallax effects
 * - Black and gold color palette for exclusivity
 * - Smooth scroll-triggered animations
 * - Elegant typography hierarchy with serif/sans-serif pairing
 */

interface Property {
  id: number;
  title: string;
  location: string;
  status: "Ongoing" | "Delivered";
  image: string;
  featured?: boolean;
}

const properties: Property[] = [
  { id: 1,  title: "Sarvoday Marvel",                        location: "Kalyan (W)",                status: "Ongoing",   image: asset("/projects/sarvoday-marvel.jpg"),            featured: true },
  { id: 2,  title: "Haware Jackpot",                          location: "Thane, Ghodbunder Road",    status: "Ongoing",   image: asset("/projects/haware-jackpot.jpg") },
  { id: 3,  title: "Haware Spectrum",                         location: "Thane, Ghodbunder Road",    status: "Ongoing",   image: asset("/projects/haware-spectrum.jpg") },
  { id: 6,  title: "Bhagwati Belmonte",                       location: "Kasarvadavali, Thane",      status: "Delivered", image: asset("/projects/bhagwati-belmonte.jpg") },
  { id: 7,  title: "KIPL Morya Phase 1 & 2",                  location: "Kasarvadavali, Thane",      status: "Delivered", image: "" },
  { id: 9,  title: "Sai Heights",                             location: "Kalyan (E)",                status: "Delivered", image: "" },
  { id: 13, title: "AK Hitec Prime Rose",                     location: "Pushpak Nagar",              status: "Delivered", image: asset("/projects/ak-hitec-prime-rose.jpg") },
];

const heroSlides = [
  {
    image: asset("/skyline-drone.jpg"),
    label: "Customer First",
    title: "Your Needs Come Before Anything Else",
    description: "We put customers first, building every mandate around what truly matters to you",
  },
  {
    image: asset("/villa-exterior.jpg"),
    label: "Client Trust",
    title: "A Firm That Listens Before It Lists",
    description: "Your goals shape every decision we make, because putting customers first is how we work, not just what we say",
  },
  {
    image: asset("/penthouse-interior.jpg"),
    label: "Personal Service",
    title: "Service Built Around You",
    description: "From the first conversation to the final signature, your priorities guide every step we take",
  },
  {
    image: asset("/infinity-pool.jpg"),
    label: "Earned Trust",
    title: "Trust Earned, Customer by Customer",
    description: "We measure success by how well we serve you, not only by the deals we close",
  },
  {
    image: asset("/rooftop-lounge.jpg"),
    label: "Honest Guidance",
    title: "Honest Advice, Every Time",
    description: "We tell you what you need to hear, not just what is easy to say, because your trust matters more than any single deal",
  },
  {
    image: asset("/living-space.jpg"),
    label: "Your Priorities",
    title: "Your Property, Your Terms",
    description: "Every mandate is shaped around your goals, your timeline, and your comfort",
  },
  {
    image: asset("/office-interior.jpg"),
    label: "Dedicated Support",
    title: "Dedicated to You, Not Just the Deal",
    description: "Our team stays close through every stage, because a satisfied customer is our real measure of success",
  },
  {
    image: asset("/mumbai-skyline.jpg"),
    label: "Our Promise",
    title: "Putting Customers First, Every Single Time",
    description: "This is not just how we describe ourselves, it is the standard we hold ourselves to",
  },
];

const services = [
  { id: 1, num: "01", title: "Housing & Commercial",  subtitle: "Property Solutions",     image: asset("/cover1.png"),   bg: asset("/SERVICE1.jpg"),           tagline: "Smart Solutions. Stronger Investments. Better Communities.",  back: "We source, evaluate, and represent premium housing and commercial mandates across India's tier 1 cities with full exclusivity." },
  { id: 2, num: "02", title: "Market Entry &",         subtitle: "Asset Management",       image: asset("/cover1.png"),  bg: asset("/SERVICE2.jpg"),            tagline: "Strategic Entry. Efficient Management. Maximum Value.",        back: "We guide clients through market entry strategy and manage real estate assets for maximum long term return." },
  { id: 3, num: "03", title: "Outreach &",             subtitle: "Marketing Consultation", image: asset("/cover1.png"),  bg: asset("/SERVICE3.jpg"),            tagline: "Smart Outreach. Stronger Branding. Higher Impact.",            back: "Our dedicated marketing arm crafts bespoke outreach campaigns that place your property in front of the right buyers." },
  { id: 4, num: "04", title: "Plot & Land",            subtitle: "Services",               image: asset("/cover1.png"),  bg: asset("/SERVICE4.jpg"),            tagline: "Right Land. Right Value. Right Future.",                      back: "From agricultural plots to development land, we identify, verify, and negotiate land mandates across every geography." },
  { id: 5, num: "05", title: "Financial",              subtitle: "Consultation Services",  image: asset("/cover1.png"),  bg: asset("/SERVICE5.jpg"),            tagline: "Right Advice. Better Finance. Stronger Growth.",              back: "Our financial advisory team structures deals, arranges financing, and ensures every mandate closes with optimal returns." },
];

export default function Home() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [heroRef, heroApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoplay = useCallback(() => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => heroApi?.scrollNext(), 5000);
  }, [heroApi]);

  useEffect(() => {
    if (!heroApi) return;
    const onSelect = () => {
      setCurrentSlide(heroApi.selectedScrollSnap());
      setRotation((prev) => prev + 45);
    };
    heroApi.on("select", onSelect);
    resetAutoplay();
    return () => {
      heroApi.off("select", onSelect);
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [heroApi, resetAutoplay]);

  useEffect(() => {
    const projectTimer = setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % properties.length);
    }, 6500);

    return () => clearInterval(projectTimer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (elementId: string) => {
    return visibleElements.has(elementId) ? "animate-fade-in-up" : "opacity-0";
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* Hero Section - Full Bleed Slideshow, extends behind transparent nav */}
      <section
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Embla Viewport */}
        <div ref={heroRef} className="absolute inset-0">
          <div className="flex h-full">
            {heroSlides.map((slide, idx) => (
              <div key={idx} className="relative min-w-full h-full flex-shrink-0">
                <img
                  src={slide.image}
                  alt={slide.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D302F]/92 via-[#2D302F]/35 to-[#2D302F]/10" />
              </div>
            ))}
          </div>
        </div>

        {/* Outer rotating ring — translucent warm gold */}
        {/*
        <div
          className="absolute pointer-events-none z-[5] rounded-full"
          style={{
            width: "clamp(400px, 70vw, 780px)",
            height: "clamp(400px, 70vw, 780px)",
            top: "56%",
            left: 0,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            transition: "transform 1.6s cubic-bezier(0.23, 1, 0.32, 1)",
            border: "1.5px solid rgba(255, 255, 255, 0.10)",
            background: "rgba(255, 255, 255, 0.10)",
          }}
        >
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{
              background: "rgba(196, 163, 90, 0.65)",
              boxShadow: "0 0 10px 3px rgba(196,163,90,0.25)",
            }}
          />
        </div>
        */}

        {/* Inner counter-rotating ring — more translucent */}
        {/*
        <div
          className="absolute pointer-events-none z-[5] rounded-full"
          style={{
            width: "clamp(260px, 45vw, 500px)",
            height: "clamp(260px, 45vw, 500px)",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${-rotation * 1.5}deg)`,
            transition: "transform 1.6s cubic-bezier(0.23, 1, 0.32, 1)",
            border: "1px dashed rgba(255, 255, 255, 0.10)",
          }}
        >
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
            style={{ background: "rgba(196, 163, 90, 0.50)" }}
          />
        </div>
        */}

        {/* Hero Content — text straddling the circle's right edge */}
        {/* Desktop-only decorative badge: sized/positioned for wide screens, hidden on mobile so it doesn't overlap the hero text */}
        <img
          src={asset("/ire-logo-gold-transparent.png")}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none z-[6] hidden md:block"
          style={{
            width: "clamp(145px, 22vw, 255px)",
            top: "50%",
            left: "clamp(70px, 12vw, 150px)",
            transform: "translate(-50%, -50%)",
            opacity: 0.82,
            filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.28))",
          }}
        />

        {/* Desktop-only decorative rotating frame — oversized relative to mobile viewports, hidden below md */}
        <div
          className="absolute pointer-events-none z-[5] hidden md:block"
          style={{
            width: "clamp(520px, 88vh, 820px)",
            height: "clamp(520px, 88vh, 820px)",
            top: "50%",
            left: 0,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            transition: "transform 1.6s cubic-bezier(0.23, 1, 0.32, 1)",
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            border: "1px solid rgba(196, 163, 90, 0.55)",
            background: "rgba(196, 163, 90, 0.20)",
          }}
        />

        <div className="relative z-10 flex items-end justify-end h-full pb-24">
          <div
            key={currentSlide}
            className="animate-fade-in-up px-6 md:pr-20 max-w-full md:max-w-4xl text-right"
          >
            <h1
              className="font-display font-bold mb-5 leading-[1.1]"
              style={{
                fontSize: "clamp(1.8rem, 4.2vw, 3.4rem)",
                color: "var(--text-on-scrim)",
                textShadow: "0 2px 40px rgba(0,0,0,0.55)",
                fontFamily: "'Cormorant Garamond','Ginger',serif",
              }}
            >
              {heroSlides[currentSlide].title}
            </h1>
            <p
              className="mb-8 leading-relaxed"
              style={{
                fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
                color: "var(--text-on-scrim-secondary)",
                fontFamily: "'Space Grotesk','Metrik',sans-serif",
                letterSpacing: "0.03em",
              }}
            >
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex gap-4 justify-end">
              <Button
                size="lg"
                className="font-semibold tracking-widest transition-all duration-500"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "var(--gold)",
                  color: "var(--gold-contrast)",
                  border: "none",
                  boxShadow: "0 4px 24px rgba(196,163,90,0.22)",
                  fontFamily: "'Space Grotesk','Metrik',sans-serif",
                  fontSize: "10.5px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "14px 28px",
                }}
              >
                View Our Projects
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { heroApi?.scrollTo(idx); resetAutoplay(); }}
              aria-label={`Go to slide ${idx + 1}`}
              className="h-[3px] rounded-full transition-all duration-500"
              style={{
                width: idx === currentSlide ? "2rem" : "0.5rem",
                background: idx === currentSlide
                  ? "var(--gold)"
                  : "var(--text-on-scrim-faint)",
              }}
            />
          ))}
        </div>
      </section>

      {/* Luxury Divider */}
      <div className="luxury-divider my-20" />

      {/* Projects Section */}
      <section id="projects" className="projects-section py-24 overflow-hidden">
        <div className="projects-glow" />

        <div
          id="properties-header"
          data-animate
          className={`text-center mb-10 relative z-10 ${getAnimationClass("properties-header")}`}
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
            View Our Projects
          </h2>
          <div className="luxury-divider projects-title-divider" />
          <p className="text-foreground/70 text-lg">
            Exclusively curated luxury mandates across India's finest addresses
          </p>
        </div>

        {/* 3D Fan Carousel — perspective anchored at center so cards fan out symmetrically */}
        <div className="fan-carousel-viewport">
          <div className="fan-carousel-track">
            {properties.map((property, idx) => {
              const offset = idx - projectIndex;
              const abs = Math.abs(offset);
              if (abs > 4) return null;

              const isActive = idx === projectIndex;
              const tx = offset * 280;
              const ry = -offset * 20;
              const tz = -abs * 60;
              const sc = Math.max(0.66, 1 - abs * 0.085);
              const op = Math.max(0.15, 1 - abs * 0.22);

              return (
                <button
                  key={property.id}
                  type="button"
                  aria-label={`View ${property.title}`}
                  onClick={() => setProjectIndex(idx)}
                  className={`fan-carousel-card${isActive ? " fan-carousel-card-active" : ""}`}
                  style={{
                    transform: `translateX(${tx}px) rotateY(${ry}deg) translateZ(${tz}px) scale(${sc})`,
                    opacity: op,
                    zIndex: 20 - abs,
                  }}
                >
                  {property.image ? (
                    <img src={property.image} alt={property.title} className="fan-carousel-img" />
                  ) : (
                    <div
                      className="fan-carousel-img"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
                        color: "var(--text-faint)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        textAlign: "center",
                        padding: "1rem",
                      }}
                    >
                      Photo coming soon
                    </div>
                  )}
                  <div className="fan-carousel-gradient" />

                  {/* Timer bar on active card */}
                  {isActive && (
                    <div
                      key={`timer-${projectIndex}`}
                      className="fan-carousel-timer"
                      style={{ animation: "projectTimer 6500ms linear forwards" }}
                    />
                  )}

                  {/* Label always visible at bottom */}
                  <div className="fan-carousel-label">
                    <span className="fan-carousel-location">{property.location}</span>
                    <strong className="fan-carousel-title">{property.title}</strong>
                  </div>

                  {/* Status badge */}
                  <span
                    className="fan-carousel-status"
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                      fontSize: "0.65rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: property.status === "Delivered" ? "#0a0a0a" : "var(--gold)",
                      background: property.status === "Delivered" ? "var(--gold)" : "rgba(0,0,0,0.55)",
                      border: property.status === "Delivered" ? "none" : "1px solid var(--gold)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {property.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active card details strip */}
        <div className="fan-carousel-details">
          <div className="fan-carousel-details-inner" key={projectIndex}>
            <p className="fan-detail-location">{properties[projectIndex].location}</p>
            <h3 className="fan-detail-title">{properties[projectIndex].title}</h3>
            <div className="fan-detail-stats">
              <span>{properties[projectIndex].status} Project</span>
            </div>
            <a href="/contact" className="fan-detail-cta">
              Enquire With IRE Homes <ChevronRight className="inline ml-1 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            size="icon"
            variant="outline"
            aria-label="Previous project"
            onClick={() => setProjectIndex((prev) => (prev - 1 + properties.length) % properties.length)}
            className="rounded-full border-accent/40 bg-background/50 text-accent backdrop-blur-md hover:bg-accent hover:text-background"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            {properties.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setProjectIndex(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: idx === projectIndex ? "2rem" : "0.45rem",
                  background: idx === projectIndex ? "var(--gold)" : "var(--text-faint)",
                }}
              />
            ))}
          </div>
          <Button
            size="icon"
            variant="outline"
            aria-label="Next project"
            onClick={() => setProjectIndex((prev) => (prev + 1) % properties.length)}
            className="rounded-full border-accent/40 bg-background/50 text-accent backdrop-blur-md hover:bg-accent hover:text-background"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Luxury Divider */}
      <div className="luxury-divider my-20" />

      {/* Services Section */}
      <section id="amenities" className="services-grid-section">
        <div className="services-grid-header">
          <p className="services-eyebrow">Our Services</p>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
            What We Offer
          </h2>
          <div className="luxury-divider services-grid-divider" />
          <p className="text-foreground/70 text-lg">
            Five disciplines, one mandate representing every side of a property's journey
          </p>
        </div>

        <div className="services-editorial-list">
          {services.map((svc, idx) => {
            const isOpen = flippedCard === idx;
            const reversed = idx % 2 === 1;
            return (
              <div
                key={svc.id}
                className={`service-row${reversed ? " service-row-reversed" : ""}${isOpen ? " service-row-open" : ""}`}
              >
                <div className="service-row-media">
                  <img src={svc.bg} alt="" className="service-row-img" />
                  <div className="service-row-frame" />
                </div>
                <div className="service-row-body">
                  <span className="service-row-num">{svc.num}</span>
                  <h3 className="service-row-title">{svc.title} {svc.subtitle}</h3>
                  <div className="luxury-divider service-row-divider" />
                  <p className="service-row-tagline">{svc.tagline}</p>
                  {isOpen && <p className="service-row-back">{svc.back}</p>}
                  <button
                    type="button"
                    className="service-card-toggle"
                    onClick={() => setFlippedCard(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Show Less" : "Learn More"}
                    <ChevronRight className={`ml-1 h-3.5 w-3.5 service-card-toggle-icon${isOpen ? " service-card-toggle-icon-open" : ""}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Luxury Divider */}
      <div className="luxury-divider my-20" />

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-media">
          <img src={asset("/penthouse-interior.jpg")} alt="" className="about-img about-img-primary" />
          <img src={asset("/living-space-sunset.jpg")} alt="" className="about-img about-img-secondary" />
          <div className="about-media-frame" />
          <div className="about-media-badge">
            <span className="about-media-badge-num">A51700029389</span>
            <span className="about-media-badge-label">MahaRERA Registered</span>
          </div>
        </div>

        <div className="about-content">
          <p className="about-eyebrow">Who We Are</p>
          <h2 className="about-heading">
            A Mandate Firm,<br />Not a Listing Service
          </h2>
          <div className="luxury-divider about-divider" />
          <p className="about-body">
            IRE Homes represents sellers, not the market. Every property we accept comes under
            an exclusive mandate meaning our full attention, network, and negotiating power
            are committed to a single outcome: the right buyer, at the right value, on your terms.
          </p>
          <p className="about-body">
            From Mumbai's skyline to Maharashtra's most coveted addresses, we operate with the
            discretion of a private office and the reach of a national firm closing mandates
            others simply can't.
          </p>

          <div className="about-pillars">
            <div className="about-pillar">
              <span className="about-pillar-num">01</span>
              <h4 className="about-pillar-title">Discretion</h4>
              <p className="about-pillar-body">Confidential representation for clients who value privacy above all.</p>
            </div>
            <div className="about-pillar">
              <span className="about-pillar-num">02</span>
              <h4 className="about-pillar-title">Expertise</h4>
              <p className="about-pillar-body">Deep market intelligence across residential, commercial, and land mandates.</p>
            </div>
            <div className="about-pillar">
              <span className="about-pillar-num">03</span>
              <h4 className="about-pillar-title">Results</h4>
              <p className="about-pillar-body">We close mandates with strategy, not just listings.</p>
            </div>
          </div>

          <a href="/contact" className="about-cta">
            Work With Us <ChevronRight className="inline ml-1 h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Luxury Divider */}
      <div className="luxury-divider my-20" />

      {/* CTA Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${asset("/skyline-drone.jpg")}')`,
            opacity: 0.2,
          }}
        />
        <div className="cinematic-overlay" />

        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Ready to Mandate Your Property?
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Speak with our team about an exclusive mandate discreet, strategic, and results driven
          </p>
          <Button
            size="lg"
            className="bg-accent text-background hover:bg-accent/90"
          >
            Begin Your Mandate
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={asset("/ire-logo-gold-transparent.png")} alt="IRE Homes" className="h-8 w-auto" />
              </div>
              <p className="text-foreground/60 text-sm">
                India's premier luxury real estate mandate firm exclusively representing sellers of exceptional properties
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Mandates</h5>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover-gold">
                    Active Mandates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover-gold">
                    Off-Market Deals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover-gold">
                    Closed Mandates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover-gold">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover-gold">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover-gold">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="https://www.instagram.com/irehomes/" target="_blank" rel="noreferrer" className="hover-gold">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/74060804/" target="_blank" rel="noreferrer" className="hover-gold">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/profile.php?id=61578665341487" target="_blank" rel="noreferrer" className="hover-gold">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="luxury-divider mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
            <p>&copy; 2026 IRE Homes. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover-gold">
                Privacy Policy
              </a>
              <a href="#" className="hover-gold">
                Terms of Service
              </a>
              <a href="#" className="hover-gold">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
