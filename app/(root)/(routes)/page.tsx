import Container from "@/components/ui/container";
import prismadb from "@/lib/prismadb";
import { UserColumn } from "@/components/table/columns";
import { auth } from "@/auth";
import HeroSection from "../../../components/home/hero-section";
import CodersTable from "@/components/table/coders";
import { differenceInMinutes, format } from "date-fns";

const headers = {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${process.env.API_TOKEN}`
}

const HomePage = async () => {

    const data = await auth();
    
    const rooms = await prismadb.room.findMany(
        {
            include: {
                topics: true,
                participants: true
            }
        }
    )
    
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
  
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const users = await prismadb.user.findMany({
        include: {
            codechef: true,
            codeforces: true,
            leetcode: true,
            submissions: {
                where: {
                submitted_at: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                },
            },
        },
    });
    
    users.sort((a, b) => b.submissions.length - a.submissions.length);


    const formattedUsers : UserColumn[] = users.map(( user, index ) => ({
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

    // pick the first upcoming contest
    const contest = await prismadb.contest.findFirst({
        where: {
            start_time: {
                gte: new Date()
            }
        },
        orderBy: {
            start_time: 'asc'
        }
    })
    const currentDate = new Date(); // Current date in the user's local time zone
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ssXXX');
    if(contest?.start_time){
        const differenceInMins = differenceInMinutes(currentDate, contest?.start_time);
        const hours = Math.floor(differenceInMins / 60);
        const minutes = differenceInMins % 60;
        console.log(`${hours} : ${minutes}`)
    }

    return ( 
        <div className="my-4">
            <Container>
                <div className="flex flex-col gap-4">
                    <div>
                        <HeroSection user={data && data.user} contest={contest}/>
                    </div>
                    <div className="px-2 overflow-auto">
                        <CodersTable placeholder="Search your fellow coder" data={formattedUsers} />
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default HomePage;