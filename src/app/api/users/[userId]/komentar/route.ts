import { KomentarService } from "@/app/api/services/komentar.service";
import { NextRequest, NextResponse } from "next/server";

const komentarServices = new KomentarService();
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const komentar = await komentarServices.getKomentarByUserId(userId);
    if (komentar.length === 0) {
      return NextResponse.json(
        { message: "Komentar tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: komentar }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Error : ${error}` },
      { status: 500 }
    );
  }
}
