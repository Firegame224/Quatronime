import prisma from "@/libs/prisma";
import GenresForm from "./components/genres-form";

interface genresPageProps {
    params : {animeId : number},
}
const GenresPage : React.FC<genresPageProps> = async ({params}) => {
const animeId = params.animeId
  const anime = await prisma.anime2.findUnique({
    where: { id: Number(animeId) },
  });
  return (
    <div className="w-full min-h-screen items-center flex flex-col gap-3 bg-white">
      {!anime ? (
        <h1 className="text-2xl font-semibold">Anime not found</h1>
      ) : (
        <GenresForm data={anime} />
      )}
    </div>
  );
}

export default GenresPage