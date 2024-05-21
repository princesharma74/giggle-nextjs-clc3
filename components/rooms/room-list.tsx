"use client"
import { Room } from "@/types";
import React, { useEffect, useState } from "react";
import RoomCard from "./room-card";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { Input } from "@/components/ui/input";
import NoResults from "@/components/ui/no-result";

interface RoomListProps{
    rooms: Room[]
}


const RoomList : React.FC<RoomListProps> = ({
    rooms
}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, []);
    if(!isMounted){
        return null;
    }

    return ( 
        <div className="flex flex-col gap-4">
            <Input className="hidden md:block" placeholder="Search for rooms..."/>
            {rooms ? rooms.map((room)=>(
                <RoomCard data={room} key={room.id}/>
            )) : <NoResults message={"No Results"}/>}
            <Pagination>
                <PaginationContent>

                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    
                    <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                    <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
        </div>

     );
}
 
export default RoomList;