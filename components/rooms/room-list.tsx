import { Room } from "@/types";
import { getRooms } from "@/actions/get-rooms";
import React from "react";
import { useEffect, useState } from "react";
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
import { Input } from "../ui/input";
import NoResults from "../ui/no-result";


const RoomList = () => {
    const rooms : Room[] = getRooms

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null
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