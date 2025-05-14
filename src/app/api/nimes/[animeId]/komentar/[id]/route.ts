import { KomentarService } from "@/app/api/services/komentar.service";
import { NextRequest, NextResponse } from "next/server";

const komentarService = new KomentarService();

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {id :CommandId} = await params;

    if (!CommandId) {
      return NextResponse.json(
        { message: "ID Komentar Tidak/Belum ada" },
        { status: 404 }
      );
    }

    const deletedKomentar = await komentarService.deleteKomentar({
      id: CommandId,
    });

    return NextResponse.json(
      { data: deletedKomentar, message: "Komentar Berhasil di Hapus" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}
