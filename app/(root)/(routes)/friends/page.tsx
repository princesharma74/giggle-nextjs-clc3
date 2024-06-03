import { auth } from "@/auth";
import CodersTable from "@/components/table/coders";
import { UserColumn } from "@/components/table/columns";
import Heading from "@/components/ui/heading";
import Section from "@/components/ui/section";
import prismadb from "@/lib/prismadb";

const Friends = async () => {
    const data = await auth();
    if(!data?.user){
        return <></>
    }

    const friends = await prismadb.user.findMany({
        where: {
            followedBy: {
                some: {
                    username: data.user.username
                }
            }
        },
        include: {
            codeforces: true,
            codechef: true,
            leetcode: true,
            submissions: {
                where: {
                    submitted_at: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lte: new Date(new Date().setHours(23, 59, 59, 999))
                    }
                }
            }
        }
    });

    const me = await prismadb.user.findUnique({
        where: {
            username: data.user.username
        }, 
        include: {
            codeforces: true,
            codechef: true,
            leetcode: true,
            submissions: {
                where: {
                    submitted_at: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lte: new Date(new Date().setHours(23, 59, 59, 999))
                    }
                }
            }
        }
    });
    
    if(me){
        friends.push(me);
    }

    friends.sort((a, b) => b.submissions.length - a.submissions.length);

    const formattedUsers : UserColumn[] = friends.map(( user, index ) => ({
        rank: index+1,
        username: user.username,
        name: `${user.first_name} ${user.last_name ? user.last_name : ""}`,
        leetcode_rating: user.leetcode?.rating,
        codeforces_rating: user.codeforces?.rating,
        codechef_rating: user.codechef?.rating,
        leetcodeId: user.leetcode?.leetcode_id,
        codeforcesId: user.codeforces?.codeforces_id,
        codechefId: user.codechef?.codechef_id,
        todays_submissions: user.submissions.length
    }))
    


    return ( 
        <Section>
            <Heading title={"Your friends list"} description="Follow more people to show here"/>
            <CodersTable placeholder="Search Friends" data={formattedUsers}/>
        </Section>
     );
}
 
export default Friends;