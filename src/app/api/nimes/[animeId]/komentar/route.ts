import { KomentarService } from "@/app/api/services/komentar.service";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

const komentarService = new KomentarService();
interface KomentarProps {
  params: { animeId: number };
}

export async function GET(_request: NextRequest, { params }: KomentarProps) {
  try {
    const komentar = await komentarService.getKomentarByAnimeId(Number(params.animeId));
    if (komentar.length === 0) {
      return NextResponse.json(
        { message: "Komentar tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: komentar }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error : ${error}` }, { status: 500 });
  }
}
export async function POST(request: NextRequest, { params }: KomentarProps) {
  try {
    const animeId = Number(params.animeId);
    const body = await request.json();
    const { komentar, name, image } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Harap login terlebih dahulu" },
        { status: 400 }
      );
    }

    if (!komentar) {
      return NextResponse.json(
        { message: "Harap isi komentar" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        name,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User tidak ditemukan", name },
        { status: 404 }
      );
    }

    if (!existingUser) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const createdKomentar = await komentarService.createKomentar({
      komentar,
      name,
      image,
      userId: existingUser.id,
      animeId,
    });

    return NextResponse.json({ data: createdKomentar }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Telah terjadi error di Catch komentar ${error}` },
      { status: 500 }
    );
  }
}
