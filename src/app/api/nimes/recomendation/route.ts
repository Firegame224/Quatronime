import { NextResponse } from "next/server";
import { AnimeService } from "../../services/anime.service";

const animeServices = new AnimeService();
export async function GET() {
  try {
    const recomendationAnime = await animeServices.getRecomendation();

    if (recomendationAnime.length === 0) {
      return NextResponse.json(
        { message: "Data Anime Belum Ada / Tidak Ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: recomendationAnime }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Error : ${error}` },
      { status: 500 }
    );
  }
}
