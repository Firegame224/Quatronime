import prisma from "@/libs/prisma";
import { Komentar } from "../models/komentar.model";

export class KomentarService {
  public async getKomentar() {}
  public async getKomentarByAnimeId(animeId: number) {
    return await prisma.komentar.findMany({
      where: {
        animeId,
      },
      include: {
        user: true,
      },
    });
  }
  public async getKomentarByUserId(userId: string) {
    return await prisma.komentar.findMany({
      where: {
        userId,
      },
      include: {
        anime: true,
        user: true,
      },orderBy : {
        createdAt : "asc"
      }
    });
  }
  public async createKomentar(data: {
    animeId: number;
    userId: string;
    image: string;
    komentar: string;
  }) {
    const komentar = new Komentar(
      "",
      data.animeId,
      data.userId,
      "",
      data.image,
      data.komentar
    );
    const create = await prisma.komentar.create({
      data: {
        animeId: komentar.animeId,
        userId: komentar.userId,
        image: komentar.image,
        komentar: komentar.komentar,
      },
    });
    return create;
  }
  public async deleteKomentar({ id }: { id: string;}) {
    return await prisma.komentar.delete({
      where: {
        id,
      },
    });
  }
  public async deleteKomentarByUserId({ userId , komenId} : {userId : string , komenId : string}) {
    return await prisma.komentar.delete({
      where : {
        userId,
        id : komenId
      }
    })
  }
}
