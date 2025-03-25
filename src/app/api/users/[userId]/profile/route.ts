import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

interface UserPatchProps {
  params: { userId: string };
}
export async function PATCH(request: NextRequest, { params }: UserPatchProps) {
  try {
    const userId = params.userId;
    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID di butuhkan",
        },
        { status: 400 }
      );
    }
    const body = await request.json();
    const { name, image } = body;
    const UpdatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        image: image,
      },
    });

    return NextResponse.json(
      { user: UpdatedUser, message: " Berhasil Update data User" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error ada di catch Users Method patch ${error}`,
      },
      { status: 500 }
    );
  }
}
