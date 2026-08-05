import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ChevronRight, MapPin, Phone, Mail, Globe, Loader2, Clock } from "lucide-react";
import { asset } from "@/lib/utils";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-page min-h-screen bg-background text-foreground flex flex-col">
      <div className="contact-hero-bg">
        <img src={asset("/office-interior.jpg")} alt="" className="contact-hero-img" />
        <div className="contact-hero-overlay" />
      </div>

      <Navbar />

      <div className="flex-1 flex items-center py-28 lg:py-32">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">

          {/* Page heading */}
          <div className="contact-page-heading">
            <p className="contact-eyebrow">Get In Touch</p>
            <h1 className="contact-title">Let's Start a Conversation</h1>
            <div className="luxury-divider contact-title-divider" />
            <p className="contact-title-sub">
              Whether you're searching for your next address or ready to list an exceptional
              property, our team is here to guide you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* ── LEFT — Info ── */}
            <div className="lg:col-span-2 space-y-6 contact-fade" style={{ animationDelay: "0.1s" }}>

              <div className="contact-brand-row">
                <img src={asset("/ire-logo-gold-transparent.png")} alt="IRE Homes" className="h-10 w-auto" />
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.08em" }}>
                  IRE HOMES PVT. LTD.
                </p>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-block">
                  <div className="contact-info-icon"><MapPin className="h-5 w-5" style={{ color: "var(--gold)" }} /></div>
                  <div>
                    <p className="contact-info-label">Office Address</p>
                    <p className="contact-info-value">
                      Office No.1, MalbariWadi, Opp. Purnima Talkies,<br />
                      Kalyan, Maharashtra, India
                    </p>
                    <p className="contact-maharera">MahaRERA No: <span>A51700029389</span></p>
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <p className="contact-section-title">Connect With Us</p>
                <div className="space-y-4">
                  <div className="contact-info-block">
                    <div className="contact-info-icon"><Phone className="h-5 w-5" style={{ color: "var(--gold)" }} /></div>
                    <div>
                      <p className="contact-info-label">Mobile</p>
                      <a href="tel:+919820868481" className="contact-info-value contact-link">+91 98208 68481</a>
                      <span className="contact-info-value" style={{ color: "var(--text-faint)" }}> &nbsp;·&nbsp; </span>
                      <a href="tel:+918452868481" className="contact-info-value contact-link">+91 84528 68481</a>
                    </div>
                  </div>
                  <div className="contact-info-block">
                    <div className="contact-info-icon"><Mail className="h-5 w-5" style={{ color: "var(--gold)" }} /></div>
                    <div>
                      <p className="contact-info-label">Email</p>
                      <a href="mailto:info@irehomes.in" className="contact-info-value contact-link">info@irehomes.in</a>
                    </div>
                  </div>
                  <div className="contact-info-block">
                    <div className="contact-info-icon"><Globe className="h-5 w-5" style={{ color: "var(--gold)" }} /></div>
                    <div>
                      <p className="contact-info-label">Website</p>
                      <a href="https://www.irehomes.in" target="_blank" rel="noreferrer" className="contact-info-value contact-link">www.irehomes.in</a>
                    </div>
                  </div>
                  <div className="contact-info-block">
                    <div className="contact-info-icon"><Clock className="h-5 w-5" style={{ color: "var(--gold)" }} /></div>
                    <div>
                      <p className="contact-info-label">Office Hours</p>
                      <p className="contact-info-value">Mon – Sat, 10:00 AM – 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-map-card">
                <iframe
                  title="IRE Homes Office Location"
                  className="contact-map-frame"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Office%20No.1%2C%20MalbariWadi%2C%20Opp.%20Purnima%20Talkies%2C%20Kalyan%2C%20Maharashtra&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />
                <div className="contact-map-frame-border" />
              </div>
            </div>

            {/* ── RIGHT — Form ── */}
            <div className="lg:col-span-3 contact-form-card contact-fade" style={{ animationDelay: "0.25s" }}>
              <div className="contact-form-glow" />
              <h2 className="contact-form-heading">Send Us a Message</h2>
              <p className="contact-form-sub">Our team will get back to you within 24 hours.</p>

              {status === "sent" ? (
                <div className="contact-success">
                  <div className="contact-success-icon">✓</div>
                  <p className="contact-success-title">Message Sent!</p>
                  <p className="contact-success-body">Thank you. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="contact-field">
                      <label className="contact-label">Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="contact-input" />
                    </div>
                    <div className="contact-field">
                      <label className="contact-label">Phone *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" className="contact-input" />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label className="contact-label">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="contact-input" />
                  </div>

                  <div className="contact-field">
                    <label className="contact-label">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="How can we help you?" className="contact-input contact-textarea" />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center">
                      Something went wrong. Email us directly at info@irehomes.in
                    </p>
                  )}

                  <button type="submit" className="contact-submit" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <><Loader2 className="inline mr-2 h-4 w-4 animate-spin" />Sending…</>
                    ) : (
                      <>Send Message <ChevronRight className="inline ml-1 h-4 w-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
