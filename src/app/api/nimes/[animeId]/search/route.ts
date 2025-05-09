import { NextRequest, NextResponse } from "next/server";
import { AnimeService } from "@/app/api/services/anime.service";

const animeServices = new AnimeService();

export async function GET(
  _request: NextRequest,
  { params }: { params: { animeId: string } }
) {
  try {
    const title = params.animeId;
    const anime = await animeServices.getAnimeByTitle({ title });
    if (!anime) {
      return NextResponse.json(
        { message: "Data Anime Belum Ada / Tidak Ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: anime }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
