import { KomentarService } from "@/app/api/services/komentar.service";
import { NextRequest, NextResponse } from "next/server";

interface komentarProps {
  params: {
    userId: string;
    komenId: string;
  };
}

const komenService = new KomentarService();
export async function DELETE(request: NextRequest, { params }: komentarProps) {
  try {
    const { userId, komenId } = await params;
    const deleted = komenService.deleteKomentarByUserId({ userId, komenId });

    return NextResponse.json({
      deleted,
      message: "Berhasil menghapus data komentar",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: `server error ${error}`, status: 500 });
  }
}
