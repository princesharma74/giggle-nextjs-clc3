import Container from "@/components/ui/container";
import TopicsView from "@/components/topics/topics-view";
import RoomList from "@/components/rooms/room-list";
import ContestsList from "@/components/contests/contests-list";
import { getRooms } from "@/actions/get-rooms";
import { getUpcomingContests } from "@/actions/get-upcoming-contests";

const Home = async () => {
    const rooms = await getRooms()
    const contests = await getUpcomingContests()
    return ( 
        <div className="my-4">
            <Container>
                <div className="px-4 sm:px-6 lg:px-8 flex justify-between gap-x-10">
                    <TopicsView/>
                    <RoomList rooms={rooms}/>
                    <ContestsList contests={contests}/>
                </div>
            </Container>
        </div>
     );
}
 
export default Home;