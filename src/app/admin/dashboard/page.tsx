'use client'

import { useNimeModals } from "../../../../hooks/use-store-modal";
import { useEffect } from "react";


export default function Dashboard() {
    const onOpen = useNimeModals((state)=> state.onOpen)
    const isOpen = useNimeModals((state)=> state.isOpen)
    
    useEffect(()=> {
        if (!isOpen) {
            onOpen()
        }
    },[isOpen,onOpen])

    return null
}