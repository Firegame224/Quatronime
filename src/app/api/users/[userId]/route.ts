import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
interface UserMethodProps {
  params: { userId: string };
}
export async function PATCH(request: NextRequest, { params }: UserMethodProps) {
  try {
    const body = await request.json();
    const {role} = body;
    const userId = params.userId;

    const User = await prisma.user.findUnique({
        where : {
            id : userId
        }
    });

    if (!User) {
      return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: User.id,
      },
      data: {
        role: role,
      },
    })

    return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
    return NextResponse.json({ message: `Error ada di Catch: ${error}` }, { status: 500 });
  }
}

export async function DELETE (request: NextRequest, {params} : UserMethodProps){
    try {
        const userId = params.userId;
        const User = await prisma.user.findUnique({
            where : {
                id : userId
            }
        });

        if (!User) {
            return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
        }
        const deletedUser = await prisma.user.delete({
            where : {
                id : User.id
            }
        })
  
        return NextResponse.json(deletedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Error ada di Catch: ${error}` }, { status: 500 });
    }
}