import nodemailer from "nodemailer";

// Supports both Brevo SMTP and direct Gmail SMTP automatically
const isGmail =
  process.env.SMTP_USER?.endsWith("@gmail.com") ||
  (!process.env.SMTP_USER?.includes("smtp-brevo.com") && process.env.SENDER_EMAIL?.endsWith("@gmail.com"));

const transporter = nodemailer.createTransport(
  isGmail
    ? {
        service: "gmail",
        auth: {
          user: process.env.SENDER_EMAIL || process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    : {
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000,
      }
);

transporter.verify((error) => {
  if (error) {
    console.warn("⚠️ SMTP Transporter Warning:", error.message);
  } else {
    console.log(`✅ SMTP Transporter: Connected via ${isGmail ? "Gmail" : "Brevo"} and ready to send emails.`);
  }
});

export default transporter;