import { KarakterService } from "@/app/services/karakterService";
import { NextRequest, NextResponse } from "next/server";


const karakterService = new KarakterService();

export async function GET(request: NextRequest, { params }: { params: { animeId: string } }) {
  try {
    const characters = await karakterService.getallKarakters(Number(params.animeId));
    return NextResponse.json({ characters }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
}

export async function POST(request:NextRequest,{params}:{params:{animeId:number}}) {
    try {
      const body = await request.json();
      const createKarakter = await karakterService.createKarakter(params.animeId,body);
      return NextResponse.json({ createKarakter }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
    }
}