'use client'

import { AnimeModal } from "@/components/modals/anime-modal"
import { useEffect, useState } from "react"

const NimeProviders = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(()=> {
        setIsMounted(true);
    },[])

    if (!isMounted){
        return null
    }
    return (
        <>
         <AnimeModal/>
        </>
    )
}

export default NimeProviders