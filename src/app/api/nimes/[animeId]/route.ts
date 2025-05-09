import { NextRequest, NextResponse } from "next/server";
import { AnimeService } from "../../services/anime.service";

const animeServices = new AnimeService();
export async function GET(
  _request: NextRequest,
  { params }: { params: { animeId: string } }
) {
  try {
    const animeId = Number(params.animeId);
    const animeById = await animeServices.getAnimeById({ id: animeId });
    if (!animeById) {
      return NextResponse.json(
        { message: "Data Anime Belum Ada / Tidak Ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: animeById }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Error : ${error}` },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { animeId: number } }
) {
  try {
    const {animeId} = params;
    const body = await request.json();
    const {
      title,
      imageUrl,
      synopsis,
      ranking,
      source,
      score,
      type,
      episodes,
      aired,
      popularity,
      members,
      favorites,
      status,
      trailer,
    } = body;


    const anime = await animeServices.updateAnime({
      id: Number(animeId),
      title,
      imageUrl,
      synopsis,
      ranking,
      source,
      score,
      type,
      episodes,
      aired,
      popularity,
      members,
      favorites,
      status,
      trailer
    });

    if (!anime) {
      return NextResponse.json(
        { message: "Data Anime Belum ada / Tidak Di temukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Berhasil Update Anime", data: anime },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error Berada di Catch" + error },
      { status: 500 }
    );
  }
}