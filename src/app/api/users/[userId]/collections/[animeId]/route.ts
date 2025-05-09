import { CollectionService } from "@/app/api/services/collection.service";
import { NextRequest, NextResponse } from "next/server";

interface CollectionProps {
    params : {
        userId : string;
        animeId : string;
    }
}

const collectionServices = new CollectionService();
export async function GET(_request : NextRequest, {params} : CollectionProps) {
    try {
        const userId = params.userId;
        const animeId = Number(params.animeId);
        const collection = await collectionServices.getCollectionByAnimeIdAndUserId({userId,animeId});
        if (!collection) {
            return NextResponse.json({message : "Collection not found"},{status : 404})
        }
        return NextResponse.json({data : collection},{status : 200})
    } catch (error) {
        return NextResponse.json({message : `Error : ${error}`},{status : 500})
    }
}