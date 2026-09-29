import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import cors from "cors";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(cors());
  app.use(express.json());

  // ── Contact form email endpoint ──────────────────────────────────
  app.post("/api/send-email", async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: "Missing required fields" });
      return;
    }

    try {
      await transporter.sendMail({
        from: `"IRE Homes Website" <${process.env.EMAIL_USER}>`,
        to: "info@irehomes.in",
        replyTo: email,
        subject: `New Enquiry from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:24px;border:1px solid #e0d5c5;border-radius:8px;">
            <h2 style="color:#C4A35A;margin-top:0;">New Contact Form Enquiry</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:6px 0;color:#666;width:100px;">Name</td><td style="padding:6px 0;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:6px 0;color:#666;">Phone</td><td style="padding:6px 0;">${phone || "—"}</td></tr>
            </table>
            <hr style="margin:16px 0;border-color:#e0d5c5;"/>
            <p style="color:#666;margin:0 0 6px;">Message</p>
            <p style="margin:0;white-space:pre-wrap;">${message}</p>
          </div>
        `,
      });
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Mail error:", err);
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  });
  // ────────────────────────────────────────────────────────────────

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Vite's build output hashes filenames under /assets, so those are safe
  // to cache forever; a new build gets new hashes. Everything else (plain
  // image filenames, index.html) gets a short cache instead.
  app.use("/assets", express.static(path.join(staticPath, "assets"), { maxAge: "1y", immutable: true }));
  app.use(express.static(staticPath, { maxAge: "1d" }));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
