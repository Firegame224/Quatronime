import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request : NextRequest) {
    try {
        const body = await request.json();
        const {title} = body;

        if (!title) {
            return NextResponse.json({message:"Harap isi title"},{status:400})
        }

        const anime = await prisma.anime2.create({
            data : {
                title : title,
            }
        })

        return NextResponse.json({data :anime},{status:201})
    } catch (error) {
        console.log("Error nya ada di Chatch" + error)
        return NextResponse.json({message:"Internal Error"},{status:500})
    }
}

