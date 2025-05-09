import { KomentarService } from "@/app/api/services/komentar.service";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

const komentarService = new KomentarService();
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const CommandId = await params.id;
    const body = await request.json();
    const { name } = body;

    if (!CommandId) {
      return NextResponse.json(
        { message: "ID Komentar Tidak/Belum ada" },
        { status: 404 }
      );
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        name,
      },
    });

    if (name !== existingUser?.name) {
      return NextResponse.json(
        { message: "User tidak ditemukan " + name + "=" + existingUser?.name },
        { status: 404 }
      );
    }

    const deletedKomentar = await komentarService.deleteKomentar({
      id: CommandId,
      name,
    });

    return NextResponse.json(
      { data: deletedKomentar, message: "Komentar Berhasil di Hapus" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}
