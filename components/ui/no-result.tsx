"use client"

import { useEffect, useState } from "react";

const NoResults = ({
    message
} : {message: string}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, []);
    if(!isMounted){
        return null;
    }
    return ( 
        <div className="flex items-center w-full h-full text-center">
            {message}
        </div>
     );
}
 
export default NoResults;