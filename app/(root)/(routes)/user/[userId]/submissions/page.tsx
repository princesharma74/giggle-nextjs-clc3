import ProfilePage from "@/app/(root)/(routes)/user/[userId]/components/profile-page";
// import TopicsView from "@/components/topics/topics-view";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-result";
// import ContestsList from "@/components/contests/contests-list";
import prismadb from "@/lib/prismadb";
import { formatDistanceToNow } from "date-fns";
import { SubmissionColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Section from "@/components/ui/section";
import Heading from "@/components/ui/heading";


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

    if(!user){
        return <NoResults message="No user found" />
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


    const formattedSubmissions : SubmissionColumn[] = submissions.map((item) => ({
        submission_id: item.submission_id,
        problem_name: item.problem.problem_title,
        submission_url: item.submission_url,
        problem_link: item.problem.problem_link,
        time_ago: formatDistanceToNow(new Date(item.submitted_at), { addSuffix: true })
    }))

    return ( 
        <Section>
            <Heading title={`Submissions by ${user.first_name}`} description="You may click on each problem or submission to view"/>
            <DataTable searchKey="problem_name" columns={columns} data={formattedSubmissions} />
        </Section>
     );
}
 
export default UserProfile;