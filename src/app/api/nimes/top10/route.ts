import { NextResponse } from "next/server";
import { AnimeService } from "../../services/anime.service";

const animeServices = new AnimeService();
export async function GET() {
  try {
    const top10 = await animeServices.getTop10();
    if (top10.length === 0) {
      return NextResponse.json(
        { message: "Data Anime Belum Ada / Tidak Ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: top10 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}
