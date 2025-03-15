import Headernime from "./components/anime/headernime";
import AnimePage from "./components/anime/page";

export default function Home() {
  return (
    <div>
      <Headernime Teks="Top Anime" href="Lihat Semua.." link="/allnime" />
      <AnimePage />
    </div>
  );
}
