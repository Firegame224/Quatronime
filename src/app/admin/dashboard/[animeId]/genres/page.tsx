import GenresForm from "./components/genres-form";
import { fetcher } from "@/libs/fetcher";

interface genresPageProps {
    params : {animeId : number},
}
const GenresPage : React.FC<genresPageProps> = async ({params}) => {
const animeId = params.animeId
  const {data :anime} = await fetcher({port : `${process.env.NEXT_PUBLIC_API_URL}/api/nimes/${animeId}`});
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