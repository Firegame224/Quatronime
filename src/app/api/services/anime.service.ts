/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/libs/prisma";
import { Anime } from "../models/anime.model";


export class AnimeService {

  public async getallAnime({ limit, skip }: { limit: number; skip : number }) {
    return await prisma.anime2.findMany({
      take: limit,
      skip,
    });
  }
  public async getAnimeById({id} :{id: number}) {
    const existingAnime = await prisma.anime2.findUnique({
      where: {
        id,
      },
    });

    return existingAnime;
  }
  public async getTopAnime() {
    return await prisma.anime2.findMany({
      where: {
        ranking: {
          lte: 25,
        },
      },
      orderBy: {
        ranking: "asc",
      },
    });
  }
  public async getTop10() {
      return await prisma.anime2.findMany({
        where : {
            ranking : {
                lte:10
            }
        },orderBy : {
            ranking : "asc"
        }
      })
  }
  public async getRecomendation() {
      return await prisma.anime2.findMany({
        where : {
            favorites : {
                gte:2
            }
        }
      })
  }
  public async getAnimeByTitle({ title }: { title: string }) {
    return await prisma.anime2.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });
  }
  public async getAnimeByGenre({ genre }: { genre: string }) {
    return await prisma.anime2.findMany({
      where: {
        genres: {
          has: genre,
        },
      },
    });
  }
  public async createAnime(data: { title: string }) {
    return await prisma.anime2.create({
      data: {
        title: data.title,
      },
    });
  }
  public async updateAnime(data: any) {
    const existingAnime = await prisma.anime2.findUnique({
      where: {
        id : data.id,
      },
    });

    if (!existingAnime) {
      throw new Error("Data Anime Belum ada / Tidak Di temukan");
    }
    const anime = new Anime(
      "",
      data.title,
      data.imageUrl,
      data.popularity,
      data.ranking,
      data.source,
      data.type,
      data.episodes,
      data.status,
      data.aired,
      data.trailer,
      data.synopsis,
      data.members,
      data.favorites,
      data.score
    );
    anime.save();
    return await prisma.anime2.update({
      where: {
        id: data.id,
      },
      data: {
        title: anime.title,
        imageUrl: anime.imageUrl,
        popularity: anime.popularity,
        ranking: anime.ranking,
        source: anime.source,
        type: anime.type,
        episodes: anime.episodes,
        status: anime.status,
        aired: anime.aired,
        trailer: anime.trailer,
        synopsis: anime.synopsis,
        members: anime.members,
        favorites: anime.favorites,
        score: anime.score,
      },
    });
  }
  public async deleteAnime(id: number) {
    return await prisma.anime2.delete({
      where: {
        id: id,
      },
    });
  }
  public async addGenres(data : {id : number, genre : string[]}) {
    return await prisma.anime2.update({
      where : {
        id : data.id
      },
      data : {
        genres : data.genre
      }
    })
  }
  public async deleteGenres(data : {id : number}) {
    return await prisma.anime2.update({
      where : {
        id : data.id
      },
      data : {
        genres : []
      }
    })
  }
  public async addFavorites(data : {id : number, userId : number}) {
    return await prisma.anime2.update({
      where : {
        id : data.id
      },
      data : {
        favorites : {
          increment : 1
        }
      }
    })
  }
    public async deleteFavorites(data : {id : number, userId : number}) {
    return await prisma.anime2.update({
      where : {
        id : data.id
      },
      data : {
        favorites : {
          decrement : 1
        }
      }
    })
  }
}
