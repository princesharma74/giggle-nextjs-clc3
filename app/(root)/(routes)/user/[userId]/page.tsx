// import ProfilePage from "@/components/profile/profile-page";
// import TopicsView from "@/components/topics/topics-view";
import Container from "@/components/ui/container";
// import ContestsList from "@/components/contests/contests-list";

const UserProfile = async ({ params } : { params: { userId: string }}
) => {

    return ( 
        <div className="my-4">
            <Container>
                <div className="flex justify-between md:mx-8">
                    <div className="w-48">
                        {/* <TopicsView topics={topics}/> */}
                    </div>
                    {/* <ProfilePage user={user} data={rating_changes_pagination}/> */}
                    <div className="w-48">
                        {/* <ContestsList contests={contests}/> */}
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default UserProfile;