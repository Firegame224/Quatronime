import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    const Finddata = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (Finddata) {
      return NextResponse.json(
        { message: "Data User Sudah Ada" },
       {status: 400}
      );
    }
    const Createdata = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    if (Createdata.email.endsWith("@quatronime.com")) {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          role: "ADMIN",
        },
      });
    }
    return NextResponse.json(
      { message: "Data User Berhasil Dibuat", data: Createdata },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saat Registrasi :", error);
    return NextResponse.json(
      { message: "Telah Terjadi Error" },
      { status: 500 }
    );
  }
}
