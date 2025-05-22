import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";


export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
  
        const { id, newPassword } = body;
  
        if (!id || !newPassword) {
            return NextResponse.json({ message: "Email dan password harus diisi" }, { status: 400 });
        }
  
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        const updateData = await prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
  
        if (!updateData.email) {
            return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
        }
  
        return NextResponse.json({ message: "Password berhasil diubah" }, { status: 200 });
  
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ message:error || "Terjadi kesalahan server" }, { status: 500 });
    }
  }
