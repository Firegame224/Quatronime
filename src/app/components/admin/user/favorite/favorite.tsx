"use client";

import { ColumnDef } from "@tanstack/react-table";
import SellAction from "./sell.action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FavoriteColumn = {
  id: number;
  title: string;
  source: string | null;
  type: string | null;
  imageUrl: string | null;
  synopsis: string | null;
  ranking: number | null;
  score: number | null;
  episodes: number | null;
  UpdateAt: Date;
};

export const Favorite: ColumnDef<FavoriteColumn>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type Anime",
  },
  {
    id: "Action",
    cell: ({ row }) => <SellAction data={row.original} />,
  },
];
