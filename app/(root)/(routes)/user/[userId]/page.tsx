import ProfilePage from "@/app/(root)/(routes)/user/[userId]/components/profile-page";
// import TopicsView from "@/components/topics/topics-view";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-result";
// import ContestsList from "@/components/contests/contests-list";
import prismadb from "@/lib/prismadb";

const UserProfile = async ({ params } : { params: { userId: string }}
) => {

    const user = await prismadb.user.findUnique({
        where: {
            username: params.userId
        },
        include: {
            leetcode: true,
            codeforces: true,
            codechef: true
        }
    });
    
    if (!user) {
        return( <NoResults message={"No user found"}/>)
    }

    const rating_changes = await prismadb.ratingChange.findMany({
        where: {
            user_email: user.email
        },
        include: {
            contest: true
        },
        orderBy: {
            contest: {
                start_time: 'desc'
            }
        },
        take: 10
    });

    return ( 
        <div className="my-4">
            <Container>
                <div className="flex justify-center mx-4">
                    {/* <div className="w-48"> */}
                        {/* <TopicsView topics={topics}/> */}
                    {/* </div> */}
                    <ProfilePage user={user} data={rating_changes}/>
                    {/* <div className="w-48"> */}
                        {/* <ContestsList contests={contests}/> */}
                    {/* </div> */}
                </div>
            </Container>
        </div>
     );
}
 
export default UserProfile;