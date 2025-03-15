import prisma from "@/libs/prisma";
import React from "react";
import Kartu from "./card";



export default async function AnimePage() {


    const animeData2 = await prisma.anime2.findMany({
      where: { id: { gt: 0 } },
    });
    return (
      <div className="flex flex-col justify-between items-center">
        <Kartu Api={animeData2} />
      </div>
      
    );
  }