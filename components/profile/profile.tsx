"use client"
import { User } from "@/types";
import NoResults from "../ui/no-result";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfilePageProps {
    data: User | null
}

const ProfilePage : React.FC<ProfilePageProps> = ({
    data
}) => {
    return ( 
        <div>
            {data ? 
                <div className="flex flex-col">
                    <div>
                        <Avatar>
                            <AvatarImage src={data.profile}/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            : <NoResults message="No such user"/>}
        </div>
    );
}
 
export default ProfilePage;