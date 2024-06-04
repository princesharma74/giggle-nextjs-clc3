"use client"
import NoResults from "@/components/ui/no-result";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PerformanceStats from "./performance-stats";
import RatingChangeListView from "./rating_change_list";
import profileImage from "@/public/avatar.svg";
import { RatingChange } from "@/types";
import { User } from "@/types";
import { User as SessionUser } from "next-auth";
import { useRouter } from "next/navigation";
import { SubmissionColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import { toast } from "@/components/ui/use-toast"
import { auth } from "@/auth";
import { set } from "date-fns";
import { Loader2 } from "lucide-react";
import SubmissionsButton from "./submissions";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.API_TOKEN}`
}

interface ProfilePageProps {
    loggedInUser: SessionUser | undefined
    user: User | null
    submissions: SubmissionColumn[]
    isFollowing: boolean
}

const ProfilePage : React.FC<ProfilePageProps> = ({
    loggedInUser,
    user,
    isFollowing,
    submissions
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [followed, setFollowed] = useState(isFollowing);
    const router = useRouter();
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
        setLoading(true);
        if(!loggedInUser){
            toast({
                title: "Please login to follow the user"
            });
            setLoading(false);
            return;
        }
        try{
            const response = await axios.post("/api/follow", {
                userId: loggedInUser.username,
                followId: user.username
            }, {
                headers
            });
            setFollowed(!followed);
            toast({
                title: response.data.message
            });
        }
        catch(err: any){
            toast({
                title: "Failed to follow the user",
                description: err.message
            });
        }
        setLoading(false);
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
                <div className="flex gap-2">
                    <div>
                        {
                            loggedInUser &&
                            (
                                loggedInUser.username === user.username ? (
                                    <Button variant={"outline"} className="rounded-full" onClick={()=>{
                                        setLoading(true)
                                        router.push("/edit-profile")
                                        setLoading(false)
                                    }}>Edit Profile</Button>
                                ) :
                                (
                                    <Button
                                        className="rounded-full"
                                        variant={"outline"}
                                        onClick={onFollow}
                                        disabled={loading}
                                    >
                                        {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                        {loading ? "Processing..." : (followed ? "Unfollow" : "Follow")}
                                    </Button>
                                )

                            )
                        }
                    </div>
                    <div>
                        <SubmissionsButton submissions={submissions}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div>
                    <PerformanceStats leetcode={user.leetcode} codeforces={user.codeforces} codechef={user.codechef}/>
                </div>
                <div>
                    <RatingChangeListView user_email={user?.email}/>
                </div>
            </div>
        </div>
    );
}
 
export default ProfilePage;