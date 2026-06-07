import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  readonly name?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly date?: string;
  readonly time?: string;
  readonly message?: string;
};

const requiredSmtpKeys = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM_EMAIL",
] as const;

export const runtime = "nodejs";

function getMissingSmtpKeys() {
  return requiredSmtpKeys.filter((key) => !process.env[key]);
}

function sanitize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const name = sanitize(payload.name);
  const phone = sanitize(payload.phone);
  const email = sanitize(payload.email);
  const date = sanitize(payload.date);
  const time = sanitize(payload.time);
  const message = sanitize(payload.message);

  if (!name || !phone || !email) {
    return NextResponse.json(
      { message: "Name, phone, and email are required." },
      { status: 400 }
    );
  }

  const missingKeys = getMissingSmtpKeys();

  if (missingKeys.length > 0) {
    return NextResponse.json(
      { message: `SMTP is not configured. Missing: ${missingKeys.join(", ")}` },
      { status: 500 }
    );
  }

  const smtpPort = Number(process.env.SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL || "info@hasshome.com",
    replyTo: email,
    subject: `New consultation request from ${name}`,
    text: [
      "New consultation request",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Preferred date: ${date || "Not selected"}`,
      `Preferred time: ${time || "Not selected"}`,
      "",
      "Message:",
      message || "No message provided",
    ].join("\n"),
  });

  return NextResponse.json({ message: "Consultation request sent." });
}
