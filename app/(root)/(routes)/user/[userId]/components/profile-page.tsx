"use client"
import NoResults from "../../../../../../components/ui/no-result";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../../../../../../components/ui/button";
import PerformanceStats from "../../../../../../components/performance/performance-stats";
import RatingChangeListView from "./rating_change_list";
import profileImage from "@/public/avatar.svg";
import { RatingChange } from "@/types";
import { User } from "@/types";
import { useParams } from "next/navigation";

interface ProfilePageProps {
    user: User | null
    data: RatingChange[]
}

const ProfilePage : React.FC<ProfilePageProps> = ({
    user,
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const params = useParams();
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
            <div className="flex flex-col items-center gap-2 mx-15 md:w-1/2">
                <div className="w-20 h-20 bg-white rounded-full">
                    <Image
                        src={user.avatar ? user.avatar : profileImage}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="object-cover rounded-full"
                        />
                </div>
                <div className="flex flex-col">
                    <div className="text-lg">{user.first_name} {user.last_name}</div>
                    <div className="text-sm text-gray-500">@{user.username}</div>
                </div>
                <Button variant={"outline"} className="rounded-full">Follow</Button>
                <PerformanceStats leetcode={user.leetcode} codeforces={user.codeforces} codechef={user.codechef}/>
                <div className="w-full"><RatingChangeListView user_email={user?.email}/></div>
            </div>
    );
}
 
export default ProfilePage;