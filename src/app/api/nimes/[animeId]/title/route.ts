import { AnimeService } from "@/app/api/services/anime.service";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

const animeServices = new AnimeService();
export async function PATCH(
  request: NextRequest,
  { params }: { params: { animeId: string } }
) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { message: "Judul harap di isi" },
        { status: 400 }
      );
    }

    if (!params.animeId) {
      return NextResponse.json(
        { message: "ID Anime di butuhkan" },
        { status: 400 }
      );
    }
    const anime = await prisma.anime2.updateMany({
      where: {
        id: Number(params.animeId),
      },
      data: {
        title: title,
      },
    });

    if (!anime) {
      return NextResponse.json(
        { message: "Data Anime Belum ada / Tidak Di temukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: anime }, { status: 200 });
  } catch (error) {
    console.log("Errornya ada di Anime Patch" + error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { animeId: string } }
) {
  try {
    if (!params.animeId) {
      return NextResponse.json(
        { message: "ID Anime di butuhkan" },
        { status: 400 }
      );
    }
    const deleted = await animeServices.deleteAnime(Number(params.animeId));

    if (!deleted) {
      return NextResponse.json(
        { message: "Data Anime Belum ada / Tidak Di temukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Data Anime Berhasil di Hapus",
      status: 200,
    });
  } catch (error) {
    console.log("Errornya ada di Anime Patch" + error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
