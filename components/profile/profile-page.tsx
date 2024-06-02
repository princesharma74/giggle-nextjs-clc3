/*
"use client"
import { RatingChangePagination, User } from "@/types";
import NoResults from "../ui/no-result";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import PerformanceStats from "../performance/performance-stats";
import RatingChangeListView from "./rating_change_list";
import profileImage from "@/public/avatar.svg";

interface ProfilePageProps {
    user: User | null
    data: RatingChangePagination | null
}

const ProfilePage : React.FC<ProfilePageProps> = ({
    user,
    data
}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, []);
    if(!isMounted){
        return null;
    }
    if (!user){
        return <NoResults message="No user data available."/>
    }
    return ( 
            <div className="flex flex-col items-center gap-2 my-10">
                <div className="w-20 h-20 bg-white rounded-full">
                    <Image
                        src={profileImage}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="object-cover rounded-full"
                        />
                </div>
                <div className="flex flex-col">
                    <div className="text-lg">{user.name}</div>
                    <div className="text-sm text-gray-500">@{user.username}</div>
                </div>
                <Button variant={"outline"} className="rounded-full">Follow</Button>
                <PerformanceStats leetcode={user.leetcode} codeforces={user.codeforces} codechef={user.codechef}/>
                <RatingChangeListView data={data}/>
            </div>
    );
}
 
export default ProfilePage;
*/