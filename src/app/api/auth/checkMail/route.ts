import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
    const {email} = await request.json();
    
    if (!email) {
        return NextResponse.json({message:"Email Harap Di Isi"},{status:400});

    }
    const checkMail = await prisma.user.findFirst({
        where : {
            email:email
        }
    })

    if (!checkMail) {
        return NextResponse.json({message:"Email Tidak Ditemukan"},{status:400});
    }

    return NextResponse.json({data:checkMail, message:"Email Ditemukan"},{status:200});
}