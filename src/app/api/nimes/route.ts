import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AnimeService } from "../services/anime.service";

const animeServices = new AnimeService();
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const total = await prisma.anime2.count();

    const animes = await animeServices.getallAnime({ limit, skip });

    return NextResponse.json({ animes, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error" + error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ message: "Harap isi title" }, { status: 400 });
    }

    const anime = await animeServices.createAnime({ title });

    return NextResponse.json({ data: anime }, { status: 201 });
  } catch (error) {
    console.log("Error nya ada di Catch" + error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
