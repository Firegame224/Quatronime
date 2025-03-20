import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

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
    const anime = await prisma.anime2.update({
      where: {
        id: animeId,
      },
      data: {
        genres,
      },
    });

    return NextResponse.json(
      { data: anime, message: "Genre Berhasil di tambahkan" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error ini ada di Catch api ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: GenresProps) {
  try {
    const animeId = Number(params.animeId);

    if (!animeId) {
      return NextResponse.json("Anime Tidak Ditemukan", { status: 404 });
    }

    const anime = await prisma.anime2.update({
      where: {
        id: animeId,
      },data : {
        genres : [],
      }
    });

    return NextResponse.json(
      { data: anime, message: "Genre Berhasil di Hapus" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error ini ada di Catch api ${error}` },
      { status: 500 }
    );
  }
}
