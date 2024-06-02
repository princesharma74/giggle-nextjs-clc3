import Container from "@/components/ui/container";
import RoomList from "@/components/rooms/room-list";
// import TopicsView from "@/components/topics/topics-view";
// import ContestsList from "@/components/contests/contests-list";
import prismadb from "@/lib/prismadb";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { UserColumn } from "./components/columns";
import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${process.env.API_TOKEN}`
}

const HomePage = async () => {
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
        name: user.first_name + " " + user.last_name,
        leetcodeId: user.leetcode?.leetcode_id,
        codeforcesId: user.codeforces?.codeforces_id,
        codechefId: user.codechef?.codechef_id,
        todays_submissions: user.submissions.length
    }))

    return ( 
        <div className="my-4">
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-center gap-4 py-16 mx-10">
                        <div className="mx-4">
                            <div className="font-extrabold text-3xl text-center">Ratings, Submission & Recent Contest Performance.</div>
                            <div className="text-md text-center">Check the stats of codechef, codeforces and leetcode at once place</div>
                        </div>
                        <div className="flex gap-4">
                            <Button className="rounded-full">View Your Profile</Button>
                            <Button variant={"outline"} className="rounded-full">Upcoming Contests</Button>
                        </div>
                    </div>
                    <div className="flex justify-between md:mx-8">
                        <div className="hidden md:block w-48">
                            {/* <TopicsView topics={topics} /> */}
                        </div>
                        <div className="px-6 overflow-auto">
                            <DataTable searchKey="name" placeholder="Search your fellow coders" columns={columns} data={formattedUsers} />
                        </div>
                        <div className="hidden md:block w-48">
                            {/* <ContestsList contests={contests} /> */}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default HomePage;