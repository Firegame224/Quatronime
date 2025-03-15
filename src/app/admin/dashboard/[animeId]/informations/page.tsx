import React from "react";
import InformationForm from "./components/inform-form";
import { AuthSession } from "@/libs/session";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";

interface InformationsPageProps {
    params : {
        animeId : number
    }
}
const InformationsPage : React.FC<InformationsPageProps> = async ({params}) =>{
    const session = await AuthSession()

    const AnimeId = Number(params.animeId)
    if (!session) {
        redirect("/auth/signin");
    }

    const anime = await prisma.anime2.findFirst({
        where : {
            id : AnimeId
        }
    })

    if (!anime) {
        redirect("/admin/dashboard");
    }
    return (
        <div className="flex-col w-full h-full pb-6">
            <div className="flex space-y-4 px-14 pt-6 ">
                <InformationForm data={anime}/>
            </div>
        </div>
    )
} 

export default InformationsPage