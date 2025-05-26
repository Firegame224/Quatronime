/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import UsersKomentarCard from "./user-komentar-card";
import Kartu from "../anime/card";

export default function UsersFavoritesKomentar({
  favorite,
  komentar,
}: {
  favorite: any;
  komentar: any;
}) {
  const [isFavorite, setIsFavorite] = React.useState(true);

  return (
    <div className="w-full h-full flex flex-col">
      <nav className="flex items-center border-b-2 border-white w-full h-10 pb-2 mb-2 md:hidden">
        <Button
          className={`${
            isFavorite ? "bg-red-600 hover:bg-red-600" : "bg-transparent hover:bg-red-600"
          } text-white w-1/2 h-full transition ease-in duration-500`}
          onClick={() => setIsFavorite(true)}
        >
          Favorit
        </Button>
        <Button
          className={`${
            isFavorite ? "bg-transparent hover:bg-red-600" : "bg-red-600 hover:bg-red-600"
          } text-white w-1/2 h-full transition ease-in duration-500`}
          onClick={() => setIsFavorite(false)}
        >
          Komentar
        </Button>
      </nav>
      <section className="w-full h-full">
        <div className={isFavorite ? "w-full min-h-screen" : "hidden"}>
          <div className="w-full">
            <p className="text-white text-sm">Favorit ({favorite.length})</p>
          </div>
          <div className="flex flex-col justi fy-between items-center w-full">
            {favorite.length > 0 ? (
              <Kartu Api={favorite} />
            ) : (
              <div className="flex justify-center items-center w-full h-40 ">
                <h1 className="text-md font-semibold text-white">
                  ups, kamu belum memiliki favorit
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className={isFavorite ? "hidden" : "w-full min-h-screen"}>
          <div className="w-full">
            <p className="text-white text-sm">Komentar ({komentar.length})</p>
          </div>
          <section className="w-full h-full p-4">
            {komentar.length > 0 ? (
              <UsersKomentarCard data={komentar} />
            ) : (
              <div className="flex h-full justify-center items-center w-full">
                <h1 className="text-md font-semibold text-white">
                  Sepertinya kamu belum memiliki komentar
                </h1>
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}