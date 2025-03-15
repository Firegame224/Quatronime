"use client";

import { Button } from "@/components/ui/button";
import HeadingNav from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { columns, KarakterColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";


interface CharaClientProps {
  data:KarakterColumn[];
}


export const KarakterClient : React.FC<CharaClientProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();
    
    return (
    <>
      <div className="flex items-center justify-between">
       
        <HeadingNav title={`Karakter (${data.length})`} description="Karakter Anime" />
        <Button className="" onClick={() => {router.push(`/admin/dashboard/${params.animeId}/karakter/new`)}}>
          <Plus className="mr-2 h-4 w-4" />
          <p>Add New</p>
        </Button>
      </div>
      <Separator/>
      <DataTable data={data} columns={columns} searchKey={"name"}/>
    </>
  );
};
