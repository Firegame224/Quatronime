/* eslint-disable @typescript-eslint/no-explicit-any */
import { KarakterClient } from "./components/client";
import { KarakterColumn } from "./components/column";
import { format } from "date-fns";
import { fetcher } from "@/libs/fetcher";

const KarakterPage = async ({ params }: { params: { animeId: string } }) => {
  const { data: chara } = await fetcher({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/nimes/${params.animeId}/character`,
  });
  const FormattedChara: KarakterColumn[] = chara.map((item: any) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    cover: item.cover,
    CreatedAt: item.CreatedAt
      ? format(new Date(item.CreatedAt), "MMM do, yyyy")
      : "N/A",
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 min-h-screen">
        <KarakterClient data={FormattedChara} />
      </div>
    </div>
  );
};

export default KarakterPage;
