import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { KarakterService } from "@/app/services/karakterService";

interface UpdateCharProps {
  params: { animeId: number; charId: string };
}

const karakterServices = new KarakterService();
export async function PATCH(
  request: NextRequest,
  { params }: { params: { animeId: string; charId: string } }
) {
  try {
    const animeId = Number(params.animeId);
    if (!animeId) {
      return NextResponse.json(
        { message: "ID Anime Tidak/Belum ada" },
        { status: 404 }
      );
    }
    const charId = params.charId;
    if (!charId) {
      return NextResponse.json(
        { message: "ID Karakter Tidak/Belum ada" },
        { status: 404 }
      );
    }
    const body = await request.json();
    const { name, imageUrl, role, cover } = body;

    if (!name && !imageUrl && !role && !cover) {
      return NextResponse.json(
        { message: "Minimal 1 data karakter harus diupdate" },
        { status: 400 }
      );
    }
    
    console.log(
      "Updating karakter dengan animeId:",
      animeId,
      "dan charId:",
      charId
    );
    
    const Chardb = await karakterServices.updateKarakter(animeId, charId, body);

    return NextResponse.json(
      { data: Chardb, message: "Data Karakter Berhasil di Update" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error berada di Catch ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { charId: string } }
) {
  try {
    const Chardb = await karakterServices.deleteKarakter(params.charId);
    if (!Chardb) {
      return NextResponse.json(
        { message: "Data Karakter Tidak/Belum ada" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { data: Chardb, message: "Data Karakter Berhasil di Hapus" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: `Error berada di Catch ${error}` });
  }
}

export async function GET(request: NextRequest, { params }: UpdateCharProps) {
  try {
    const Chardb = await prisma.karakter.findUnique({
      where: {
        id: params.charId,
      },
    });
    if (!Chardb) {
      return NextResponse.json(
        { message: "Data Karakter Tidak/Belum ada" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { data: Chardb, message: "Data Karakter Berhasil di tampilkan" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: `Error berada di Catch ${error}` });
  }
}
