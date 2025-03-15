import prisma from "@/libs/prisma";
import { AuthSession } from "@/libs/session";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./components/settings-form";

interface SettingsProps {
    params : {animeId : string}
}
const SettingsPage : React.FC<SettingsProps> = async({params}) => {
    const session = await AuthSession();
    if (!session) {
        redirect("/auth/signin");
    }
    const anime = await prisma.anime2.findFirst({
        where : {
            id : Number(params.animeId)
        }
    })

    if (!anime) {
        redirect("/admin/dashboard");
    }
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
            <SettingsForm data={anime}/>
            </div>
        </div>
    );
}

export default SettingsPage