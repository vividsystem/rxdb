import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.NODE_ENV !== "development",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMagicMail(email: string, url: string) {
    return await transporter.sendMail({
			from: '"Your App" <no-reply@yourapp.com>',
			to: email,
			subject: "Your Magic Sign‑In Link",
			text: `Click to sign in: ${url}`,
			html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
    });
}
