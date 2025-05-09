import { AnimeService } from "@/app/api/services/anime.service";
import { NextRequest, NextResponse } from "next/server";

const animeServices = new AnimeService();
interface GenresProps {
  params: { animeId: string };
}
export async function PATCH(request: NextRequest, { params }: GenresProps) {
  try {
    const animeId = Number(params.animeId);
    if (!animeId) {
      return NextResponse.json("Anime Tidak Ditemukan", { status: 404 });
    }
    const body = await request.json();
    const { genres } = body;

    if (!genres) {
      return NextResponse.json("Harap pilih Genre", { status: 400 });
    }
    
    const addGenres = await animeServices.addGenres({ id: animeId, genre: genres });

    return NextResponse.json(
      { data: addGenres, message: "Genre Berhasil di tambahkan" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error ini ada di Catch api ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: GenresProps) {
  try {
    const animeId = Number(params.animeId);

    const existingAnime = await animeServices.getAnimeById({ id: animeId });
    
    if (!existingAnime) {
      return NextResponse.json(
        { message: "Data Anime Belum ada / Tidak Di temukan" },
        { status: 404 }
      );
    }
    const deletedGenres = await animeServices.deleteGenres({ id: animeId });

    return NextResponse.json(
      { data: deletedGenres, message: "Genre Berhasil di Hapus" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error ini ada di Catch api ${error}` },
      { status: 500 }
    );
  }
}
