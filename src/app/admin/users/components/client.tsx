"use client";

import HeadingNav from "@/components/ui/heading";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { columns, UserColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface UsersClientProps {
  data: UserColumn[];
}

export const UsersClient: React.FC<UsersClientProps> = ({ data }) => {
    const router = useRouter();
    return (
    <>
      <div className="flex items-center justify-between">
        <HeadingNav
          title={`Users (${data.length})`}
          description="Data users"
        />
        <Button className="" onClick={() => {router.push("/admin")}}>
            <ArrowLeft className="w-6 h-6"/>
            Back
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey={"email"} />
    </>
  );
};
