"use client"

// to prevent hydration. It does sends any component for rendered until the server rendering is done
// as long as it is not mounted, we will keep returning null

import { useEffect, useState } from "react"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false); 

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return (
        <>
        </>
    )
}