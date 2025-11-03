// lib/email.ts
import VerificationEmail from "@/components/EmailButton";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify/${token}`;

  await resend.emails.send({
    from: "delivered@resend.dev",
    to: email,
    subject: "Verify your email",
    react: VerificationEmail({
      userEmail: email,
      verificationUrl: verifyUrl,
      companyName: "MockChefs",
    }),
  });
}
