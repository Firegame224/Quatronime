import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const total = await prisma.anime2.count();

    const animes = await prisma.anime2.findMany({
      take: limit,
      skip: skip,
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ animes, total, page, limit });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" + error}, { status: 500 });
  }
}
