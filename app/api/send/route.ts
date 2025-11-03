import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "MockChefs <noreply@mockchefs.com>",
      to: "delivered@resend.dev", // ✅ Resend test inbox — always succeeds
      subject: "Verify Your MockChefs Account",
      text: "Please verify your MockChefs account.",
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
