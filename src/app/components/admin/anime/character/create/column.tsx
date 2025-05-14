"use client"

import { ColumnDef } from "@tanstack/react-table"
import SellAction from "./sell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type KarakterColumn = {
  id: string
  name : string
  role : string
  cover: string
  CreatedAt : string
}

export const columns: ColumnDef<KarakterColumn>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "role",
    header: "role",
  },
  {
    accessorKey: "cover",
    header: "cover",
  },
  {
    accessorKey: "CreatedAt",
    header:"Date",
  },
  {
    id : "Action",
    cell : ({row}) => <SellAction data={row.original}/>
  }
]
