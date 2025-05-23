import prisma from "@/libs/prisma";
import { Karakter } from "../models/karakter.model";

export class KarakterService {
  async getallKarakters(animeId: number) {
    return await prisma.karakter.findMany({
      where: { animeId },
    });
  }

  async createKarakter(
    animeId: number,
    data: { name: string; imageUrl: string; role: string; cover: string }
  ) {
    const karakter = new Karakter(
      "",
      data.name,
      data.imageUrl,
      data.role,
      data.cover
    );
    karakter.save();
    return prisma.karakter.create({
      data: {
        name: karakter.name,
        imageUrl: karakter.imageUrl,
        role: karakter.role,
        cover: karakter.cover,
        animeId: Number(animeId),
      },
    });
  }

  async updateKarakter(
    animeId: number,
    charId: string,
    data: Partial<Karakter>
  ) {
    return prisma.karakter.updateMany({
      where: {
        animeId: Number(animeId),
        id: charId,
      },
      data,
    });
  }

  async deleteKarakter(charId: string) {
    return prisma.karakter.delete({ where: { id: charId } });
  }
}
