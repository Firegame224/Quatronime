"use client";

import { ColumnDef } from "@tanstack/react-table";
import SellAction from "./sell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type KomenColumn = {
  id: string;
  name: string | null;
  image: string | null;
  createdAt: Date;
  updateAt: Date;
  komentar: string | null;
  userId: string;
  animeId: number;
};

export const komen: ColumnDef<KomenColumn>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "komentar",
    header: "komentar",
  },
    {
    accessorKey: "animeId",
    header: "animeId",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "Action",
    cell: ({ row }) => <SellAction data={row.original} />,
  },
];
