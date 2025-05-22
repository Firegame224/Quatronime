import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UsersKomentarCard({ data = [] }: { data: [] }) {
    return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((comment: any) => {
        return (
          <div
            className="flex items-center gap-4 p-4 rounded-md relative bg-white"
            key={comment.id}
          >
            <Link href={`/anime/${comment.anime.id}`}
            className="p-2 rounded-md hover:bg-red-400 flex items-center gap-2 bg-[#9e1313] text-white transition duration-500 ease-in-out absolute top-1 right-1"
            >
              <EyeIcon className="w-3 h-3" />
              <p className="text-xs">
                Lihat
              </p>
            </Link>
            <div className="flex justify-between w-20 h-20">
              <Image
                src={comment.anime.imageUrl}
                alt={comment.anime.title}
                width={100}
                height={100}
                className="rounded-md min-w-[80px] h-full object-cover border-2 border-[#FF204E]"
              />
            </div>
            <Image
              src={comment.user.image}
              alt={comment.user.name}
              width={100}
              height={100}
              className="absolute bottom-1 left-16 rounded-full w-10 h-10 border-[#FF204E] border-2"
            />
            <div className="flex flex-col h-full">
              <p className="text-xs text-gray-600 items-center">
                ●{" "}
                {comment.updateAt
                  ? new Date(comment.updateAt).toLocaleString()
                  : "Tanggal Tidak diketahui"}
              </p>
              <p className="font-semibold line-clamp-1">{comment.anime.title}</p>
              <p className="text-sm max-w-[200px] truncate">
                {comment.komentar}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
