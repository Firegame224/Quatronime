import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";



interface KomentarProps {
    params : {animeId : number}
}
export async function POST(request : NextRequest,{params}: KomentarProps) {
    try {
        const animeId = Number(params.animeId)
        const body = await request.json();
        const {comment , name , image} = body;

        if (!name) {
            return NextResponse.json({message:"Harap login terlebih dahulu"},{status:400})
        }
        if (!comment) {
            return NextResponse.json({message:"Harap isi komentar"},{status:400})
        }
        const exitingUser = await prisma.user.findFirst({
            where : {
                name
            }
        })

        if (name !== exitingUser?.name) {
            return NextResponse.json({message:"User tidak ditemukan"},{status:404})
        }
        if (!exitingUser) {
            return NextResponse.json({message:"User tidak ditemukan"},{status:404})
        }
        
        const komentar = await prisma.komentar.create({
            data :{
                animeId : animeId,
                userId : exitingUser.id,
                name : exitingUser.name,
                image,
                komentar : comment,
            }
        })

        return NextResponse.json({data:komentar},{status:201})
    } catch (error) {
        return NextResponse.json({message:`Telah terjadi error di Catch komentar ${error}`},{status:500})
    }
}