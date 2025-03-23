import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const CommandId = params.id;
    const body = await request.json();
    const { email } = body;

    if (!CommandId) {
      return NextResponse.json(
        { message: "ID Komentar Tidak/Belum ada" },
        { status: 404 }
      );
    }
    const exitingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });


    if (email !== exitingUser?.email) {
      return NextResponse.json(
        { message: "User tidak ditemukan " + email + "=" + exitingUser?.email },
        { status: 404 }
      );
    }

    const deletedKomentar = await prisma.komentar.delete({
      where: {
        id: CommandId,
        email : exitingUser?.email,
      },
    });

    return NextResponse.json(
      { data: deletedKomentar, message: "Komentar Berhasil di Hapus" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}
