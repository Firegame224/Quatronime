"use client"

import { ColumnDef } from "@tanstack/react-table"
import SellAction from "./sell-action"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserColumn = {
  id: string
  email : string
  name : string | "User Name"
  role : string
  CreatedAt : string
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "role",
    header: "role",
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
