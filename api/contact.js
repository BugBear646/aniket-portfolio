// Vercel serverless function: POST /api/contact
// Sends the contact form submission to you via Resend (https://resend.com).
//
// SETUP:
// 1. Create a free Resend account, verify a sending domain (or use their
//    onboarding@resend.dev sandbox address for testing).
// 2. In Vercel project settings -> Environment Variables, add:
//      RESEND_API_KEY   = your Resend API key
//      CONTACT_TO_EMAIL = the email address you want submissions sent to
// 3. Deploy. This function is automatically picked up by Vercel because it
//    lives in /api.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Basic email sanity check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars");
    return res.status(500).json({ error: "Server not configured" });
  }

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>", // swap once you verify your own domain
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error("Resend error:", errBody);
      return res.status(502).json({ error: "Failed to send" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact function error:", err);
    return res.status(500).json({ error: "Unexpected error" });
  }
}
