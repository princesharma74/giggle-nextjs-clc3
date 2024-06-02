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
import { SubmissionColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import { auth } from "@/auth";

interface ProfilePageProps {
    user: User | null
    session_user: User | null
    submissions: SubmissionColumn[]
}

const ProfilePage : React.FC<ProfilePageProps> = ({
    user,
    session_user,
    submissions
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

    const onFollow = async () => {
        const response = await axios.post('/api/follow', {userId: session_user?.username, followId: user.username})
    }


    return ( 
        <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-col items-center gap-2 w-full">
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
                    <div className="text-2xl font-semibold text-center">{user.first_name} {user.last_name}</div>
                    <div className="text-sm text-gray-500 text-center">@{user.username}</div>
                </div>
                <Button variant={"outline"} className="rounded-full"
                    onClick={onFollow}
                >Follow</Button>
            </div>
            <div className="flex flex-col gap-2 md:w-3/4">
                <div>
                    <PerformanceStats leetcode={user.leetcode} codeforces={user.codeforces} codechef={user.codechef}/>
                </div>
                <div>
                    <RatingChangeListView user_email={user?.email}/>
                </div>
                <div>
                    <DataTable searchKey="problem_name" columns={columns} data={submissions}/>
                </div>
            </div>
        </div>
    );
}
 
export default ProfilePage;