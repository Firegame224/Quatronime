import prisma from "@/libs/prisma"
import { Collection } from "../models/collection.model"


export class CollectionService {
    public async getCollectionByAnimeId({ animeId }: { animeId: number }) {
        return await prisma.collection.findMany({
            where: {
                animeId,
            },include : {
                user : true
            }
        });
    }
    public async getCollectionByAnimeIdAndUserId({ userId, animeId }: { userId: string; animeId: number }) {
        return await prisma.collection.findUnique({
            where: {
                userId_animeId: {
                    userId,
                    animeId,
                },
            },include :{
                anime : true,
                user : true
            }
        });
    }
    public async getCollectionByUserId(userId : string) {
        return await prisma.collection.findMany({
            where : {
                userId
            },include : {
                anime : true
            }
        });
    }
    public async addCollection(data :{userId : string , animeId : number}) {
        const collection = new Collection("" , data.userId , data.animeId);
        return await prisma.collection.create({
            data : {
                userId : collection.userId,
                animeId : collection.animeId
            }
        })
    }
    public async deleteCollection(data :{userId : string , animeId : number}) {
        const collection = new Collection("" , data.userId , data.animeId);
        const existingCollection = await prisma.collection.findUnique({
            where : {
                userId_animeId : {
                    userId : collection.userId,
                    animeId : collection.animeId
                }
            }
        })
        if (!existingCollection) {
            throw new Error("Collection not found");
        }
        return await prisma.collection.delete({
            where : {
                userId_animeId : {
                    userId : data.userId,
                    animeId : data.animeId
                }
            }
        })
    }
}