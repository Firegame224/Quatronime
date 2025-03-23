import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

interface FavoritesProps {
  params: {
    animeId: string;
  };
}
export async function PATCH(request: NextRequest, { params }: FavoritesProps) {
  try {
    const body = await request.json();
    const animeId = Number(params.animeId);

    if (!animeId) {
      return NextResponse.json(
        { message: "ID Anime di butuhkan" },
        { status: 400 }
      );
    }
    const Anime = await prisma.anime2.findUnique({
      where: {
        id: animeId,
      },
    });

    if (!Anime) {
      return NextResponse.json(
        { message: "ID Anime tidak ditemukan" },
        { status: 404 }
      );
    }
    const { userId } = body;
    const ExitingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!ExitingUser) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }
    const ExitingFavorites = await prisma.collection.findUnique({
      where: {
        userId_animeId: {
          userId: userId,
          animeId: animeId,
        },
      },
    });

    if (ExitingFavorites) {
      return NextResponse.json(
        { message: "Anime ini sudah di Collection" },
        { status: 400 }
      );
    }

    const favorite = await prisma.collection.create({
      data: {
        userId: userId,
        animeId: animeId,
      },
    });

    const updatedAnime = await prisma.anime2.update({
      where: {
        id: animeId,
      },
      data: {
        favorites: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      {
        data: {
          favorite,
          updatedAnime,
        },
        message: "Favorites telah di tambahkan",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error ada di favorites method patch " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: FavoritesProps) {
  try {
    const animeId = Number(params.animeId);
    const body = await request.json();

    if (!animeId) {
      return NextResponse.json(
        { message: "ID Anime tidak ditemukan" },
        { status: 404 }
      );
    }

    const Anime = await prisma.anime2.findUnique({
      where: {
        id: animeId,
      },
    });

    if (!Anime) {
      return NextResponse.json(
        { message: "ID Anime tidak ditemukan" },
        { status: 404 }
      );
    }

    const { userId } = body;

    const ExitingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!ExitingUser) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const ExitingFavoritesDeleted = await prisma.collection.findUnique({
      where: {
        userId_animeId: {
          userId: userId,
          animeId: animeId,
        },
      },
    })
    if (!ExitingFavoritesDeleted) {
      return NextResponse.json(
        { message: "Anime ini belum di Collection" },
        { status: 400 }
      );
    }
    const DeletedFavorites = await prisma.collection.delete({
      where: {
        userId_animeId: {
          userId: userId,
          animeId: animeId,
        },
      },
    });

    const UpdatedFavorites = await prisma.anime2.update({
      where: {
        id: animeId,
      },
      data: {
        favorites: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json(
      {
        data: { DeletedFavorites, updated: UpdatedFavorites },
        message: "Favorites telah di hapus",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error ada di favorites method delete " + error },
      { status: 500 }
    );
  }
}
