import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { animeId: string } }
) {
  try {
    const body = await request.json();
    const {imageUrl, synopsis, ranking, source, score, type, episodes, aired, popularity, members, favorites, status, trailer} = body;

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
      },
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


