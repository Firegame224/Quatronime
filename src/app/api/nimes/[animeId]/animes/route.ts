import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";




export async function GET(
  _request: NextRequest,
  { params }: { params: { animeId: string } }
) {
  try {
    const title = params.animeId;
    const anime = await prisma.anime2.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });
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
