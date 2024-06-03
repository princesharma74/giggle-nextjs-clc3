import ProfilePage from "@/app/(root)/(routes)/user/[userId]/components/profile-page";
// import TopicsView from "@/components/topics/topics-view";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-result";
// import ContestsList from "@/components/contests/contests-list";
import prismadb from "@/lib/prismadb";
import { formatDistanceToNow } from "date-fns";
import { SubmissionColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import { auth } from "@/auth";
import Section from "@/components/ui/section";

async function isFollowing(followedByUsername: string, followingUsername: string) {
    const followedByUser = await prismadb.user.findUnique({
      where: {
        username: followedByUsername,
      },
      include: {
        following: true,
      },
    });
  
    if (!followedByUser) {
      throw new Error(`User with username ${followedByUsername} does not exist`);
    }
  
    const isFollowing = followedByUser.following.some(user => user.username === followingUsername);
  
    return isFollowing;
  }

const UserProfile = async ({ params } : { params: { userId: string }}
) => {

    const data = await auth();
    const loggedInUser = data?.user;
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

    const submissions = await prismadb.submission.findMany({
        where: {
            user_email: user.email
        },
        include: {
            problem: true
        },
        orderBy: {
            submitted_at: 'desc'
        },
    });

    
    var followed = false;
    if(loggedInUser?.username){
        followed = await isFollowing(loggedInUser?.username, user.username);
    }

    const formattedSubmissions : SubmissionColumn[] = submissions.map((item) => ({
        submission_id: item.submission_id,
        problem_name: item.problem.problem_title,
        submission_url: item.submission_url,
        problem_link: item.problem.problem_link,
        time_ago: formatDistanceToNow(new Date(item.submitted_at), { addSuffix: true })
    }))

    return ( 
        <Section>
            <ProfilePage isFollowing={followed} loggedInUser={loggedInUser} user={user} submissions={formattedSubmissions}/>
        </Section>
     );
}
 
export default UserProfile;