import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
    const body = await request.json();
    const toEmail = "quatronime@gmail.com";
    const { fromEmail, message } = body;

    if (!fromEmail) {
      return NextResponse.json(
        {
          message: "Harap Login terlebih dahulu",
        },
        { status: 400 }
      );
    }
    
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: toEmail,
      subject: `Pesan dari ${fromEmail}`,
      text: message,
    });
    return NextResponse.json(
      {
        message: "Pesan berhasil dikirim",
        data: response,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Sepertinya terjadi error di patch method send email ${error}`,
      },
      { status: 500 }
    );
  }
}
