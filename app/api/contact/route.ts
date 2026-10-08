import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().max(254).pipe(z.email()),
  company: z.string().trim().max(150).optional().default(""),
  services: z.array(z.string().trim().min(1).max(100)).min(1).max(20),
  budget: z.string().trim().max(50).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  // Honeypot — hidden from humans, so any value means a bot filled it in.
  website: z.string().optional().default(""),
});

type ContactPayload = z.infer<typeof contactSchema>;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Strip control characters (incl. CR/LF) so user input can never inject headers.
const headerSafe = (value: string) =>
  value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

// Basic per-IP rate limit. In-memory, so on serverless hosts it is
// best-effort per instance — enough to blunt simple flooding.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissions.set(ip, recent);

  if (submissions.size > 5000) {
    for (const [key, times] of submissions) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        submissions.delete(key);
      }
    }
  }

  return false;
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function buildEmail(data: ContactPayload) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "—"],
    ["Services", data.services.join(", ")],
    ["Budget", data.budget || "—"],
    [
      "Submitted",
      new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
      }) + " UTC",
    ],
  ];

  const text = [
    "New Contact Form Submission",
    "AH Growth Website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 16px 8px 0;color:#6b6b6b;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td>
          <td style="padding:8px 0;color:#111;font-size:15px;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;">
      <tr>
        <td style="padding:32px;">
          <p style="margin:0 0 4px;color:#6b6b6b;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">AH Growth Website</p>
          <h1 style="margin:0 0 24px;color:#111;font-size:22px;">New Contact Form Submission</h1>
          <table role="presentation" cellpadding="0" cellspacing="0">${htmlRows}
          </table>
          <h2 style="margin:24px 0 8px;color:#111;font-size:15px;">Message</h2>
          <p style="margin:0;color:#111;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { text, html };
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Silently drop bot submissions without sending anything.
  if (data.website) {
    return Response.json({ ok: true });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASSWORD,
    CONTACT_RECEIVER,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_RECEIVER) {
    console.error(
      "[contact] SMTP is not configured — missing SMTP_HOST, SMTP_USER, SMTP_PASSWORD or CONTACT_RECEIVER."
    );
    return Response.json(
      { ok: false, error: "Unable to send message." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 465),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
    // Fail fast instead of hanging the request (Nodemailer defaults are minutes).
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  const { text, html } = buildEmail(data);
  const visitorName = headerSafe(data.name).slice(0, 80);

  try {
    await transporter.sendMail({
      from: { name: "AH Growth Website", address: SMTP_USER },
      to: CONTACT_RECEIVER,
      replyTo: { name: visitorName, address: data.email },
      subject: `New Inquiry from ${visitorName} — AH Growth`,
      text,
      html,
    });
  } catch (error) {
    const err = error as { code?: string; responseCode?: number; message?: string };
    console.error("[contact] Failed to send email:", {
      code: err.code,
      responseCode: err.responseCode,
      message: err.message,
    });
    return Response.json(
      { ok: false, error: "Unable to send message." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
