import React from "react";
import InformationForm from "../../../../components/admin/anime/settings/settings-form";
import { AuthSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { fetcher } from "@/libs/fetcher";

interface InformationsPageProps {
    params : {
        animeId : number
    }
}
const InformationsPage : React.FC<InformationsPageProps> = async ({params}) =>{
    const session = await AuthSession()

    const AnimeId = params.animeId
    if (!session) {
        redirect("/auth/signin");
    }

    const {data: anime} = await fetcher({port : `${process.env.NEXT_PUBLIC_API_URL}/api/nimes/${AnimeId}`})

    if (!anime) {
        redirect("/admin/dashboard");
    }
    return (
        <div className="flex-col w-full h-full pb-6 bg-white">
            <div className="flex px-14 pt-6 ">
                <InformationForm data={anime}/>
            </div>
        </div>
    )
} 

export default InformationsPage