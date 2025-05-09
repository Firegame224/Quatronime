import { AnimeService } from "@/app/api/services/anime.service";
import { CollectionService } from "@/app/api/services/collection.service";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

interface FavoritesProps {
  params: {
    animeId: string;
  };
}

const collectionServices = new CollectionService();
const animeServices = new AnimeService();
export async function GET(_request: NextRequest, {params} : FavoritesProps) {
  try {
    const animeId = Number(params.animeId);
    const favorites = await collectionServices.getCollectionByAnimeId({animeId});

    if (favorites.length === 0) {
      return NextResponse.json({message : "Favorites not found"},{status : 404})
    }

    return NextResponse.json({data : favorites},{status : 200})
  } catch (error) {
    return NextResponse.json({message : `Error : ${error}`},{status : 500})
  }
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
    const ExistingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!ExistingUser) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const ExistingFavorites =
      await collectionServices.getCollectionByAnimeIdAndUserId({
        userId: userId,
        animeId: animeId,
      });

    if (ExistingFavorites) {
      return NextResponse.json(
        { message: "Anime ini sudah di Collection" },
        { status: 400 }
      );
    }

    const addToFavorite = await collectionServices.addCollection({
      userId,
      animeId,
    });

    const updatedAnime = await animeServices.addFavorites({
      id: animeId,
      userId,
    });

    return NextResponse.json(
      {
        data: { addToFavorite, ipdate: updatedAnime },
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

    const Anime = await animeServices.getAnimeById({ id: animeId });

    if (!Anime) {
      return NextResponse.json(
        { message: "ID Anime tidak ditemukan" },
        { status: 404 }
      );
    }

    const { userId } = body;

    const ExistingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!ExistingUser) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const ExistingFavoritesDeleted = await collectionServices.getCollectionByAnimeIdAndUserId({
      userId,
      animeId,
    })
    if (!ExistingFavoritesDeleted) {
      return NextResponse.json(
        { message: "Anime ini belum di Collection" },
        { status: 400 }
      );
    }
    const DeleteFavorites = await collectionServices.deleteCollection({
      userId,
      animeId,
    })

    const deletedFavorites = await animeServices.deleteFavorites({
      id: animeId,
      userId,
    });

    return NextResponse.json(
      {
        data: { DeleteFavorites, updated: deletedFavorites },
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
