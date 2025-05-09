import { CollectionService } from "@/app/api/services/collection.service";
import { NextRequest, NextResponse } from "next/server";

const collectionServices = new CollectionService();
export async function GET(_request: NextRequest, {params} : {params : {userId : string}}) {
    try {
        const userId = params.userId;
        const collections = await collectionServices.getCollectionByUserId(userId);

        if (collections.length === 0) {
            return NextResponse.json({message : "Collection not found"},{status : 404})
        }

        return NextResponse.json({data : collections.map((collection) => collection.anime)},{status : 200})
    } catch (error) {
        return NextResponse.json({message : `Error : ${error}`},{status : 500})
    }
}