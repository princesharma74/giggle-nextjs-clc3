import getUser from "@/actions/get-user";
import ProfilePage from "@/components/profile/profile-page";
import TopicsView from "@/components/topics/topics-view";
import Container from "@/components/ui/container";
import { getUpcomingContests } from "@/actions/get-upcoming-contests";
import ContestsList from "@/components/contests/contests-list";
import getTopics from "@/actions/get-topics";
import { getRatingChanges } from "@/actions/get-rating-changes";

const UserProfile = async ({ params } : { params: { userId: string }}
) => {

    const user = await getUser(params.userId)
    const rating_changes_pagination = await getRatingChanges(params.userId, 1, 4)
    const contests = await getUpcomingContests()
    const topics = await getTopics()
    return ( 
        <div className="my-4">
            <Container>
                <div className="flex justify-between md:mx-8">
                    <div className="w-48">
                        <TopicsView topics={topics}/>
                    </div>
                    <ProfilePage user={user} data={rating_changes_pagination}/>
                    <div className="w-48">
                        <ContestsList contests={contests}/>
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default UserProfile;