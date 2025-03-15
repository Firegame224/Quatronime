import prisma from "@/libs/prisma";
import React from "react";
import KarakterForm from "./components/karakter-form";

interface KarakterProps {
  params : {charId : string}
}
const KarakterPageNew = async ({ params } : KarakterProps) => {
  const karakter = await prisma.karakter.findUnique({
    where: {
      id: params.charId,
    },
  })

  return (
    <div className="flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <KarakterForm data={karakter} />
      </div>
    </div>
  );
};

export default KarakterPageNew;
