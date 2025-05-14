/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/libs/prisma";
import { UsersClient } from "../../components/admin/user/client";
import {format} from "date-fns"
import { UserColumn } from "../../components/admin/user/column";

const KarakterPage = async () => {
  const chara = await prisma.user.findMany({})
  const FormatedUsers:UserColumn[] = chara.map((item:any)=> ({
    id: item.id,
    email: item.email,
    name: item.name,
    role: item.role,
    CreatedAt:item.createdAt ? format(new Date (item.createdAt), "MMM do, yyyy") : "N/A",
  }))
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6 min-h-screen">
        <UsersClient data = {FormatedUsers} />
      </div>
    </div>
  );
};

export default KarakterPage;
