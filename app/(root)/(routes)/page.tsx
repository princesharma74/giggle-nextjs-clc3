import Container from "@/components/ui/container";
import RoomList from "@/components/rooms/room-list";
// import TopicsView from "@/components/topics/topics-view";
// import ContestsList from "@/components/contests/contests-list";
import prismadb from "@/lib/prismadb";
import { Room } from "@prisma/client";

const HomePage = async () => {
    const rooms = await prismadb.room.findMany(
        {
            include: {
                topics: true,
                participants: true
            }
        }
    )
    return ( 
        <div className="my-4">
            <Container>
                <div className="flex justify-between md:mx-8">
                    <div className="hidden md:block w-48">
                        {/* <TopicsView topics={topics} /> */}
                    </div>
                    <div className="px-6">
                        <RoomList rooms={rooms} />
                    </div>
                    <div className="hidden md:block w-48">
                        {/* <ContestsList contests={contests} /> */}
                    </div>
                </div>
            </Container>
        </div>
     );
}
 
export default HomePage;