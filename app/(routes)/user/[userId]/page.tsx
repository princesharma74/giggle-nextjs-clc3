import getUser from "@/actions/get-user";
import UpcomingContests from "@/components/contests/upcoming-contests";
import ProfilePage from "@/components/profile/profile";
import TopicsView from "@/components/topics/topics-view";
import Container from "@/components/ui/container";
import { User } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { get } from "http";

const UaerProfile = async ({ params } : { params: { userId: string }}
) => {
    const user = await getUser(params.userId)
    return ( 
        <div className="my-4">
            <Container>
                <div className="px-4 sm:px-6 lg:px-8 flex justify-between gap-x-10">
                    <TopicsView/>
                    <ProfilePage data={user}/>
                    <UpcomingContests/>
                </div>
            </Container>
        </div>
     );
}
 
export default UaerProfile;