"use client"

import Container from "@/components/ui/container";
import TopicsView from "@/components/topics/topics-view";
import RoomList from "@/components/rooms/room-list";
import UpcomingContests from "@/components/contests/upcoming-contests";

const Home = () => {
    return ( 
        <div className="my-4">
            <Container>
                <div className="px-4 sm:px-6 lg:px-8 flex justify-between gap-x-10">
                    <TopicsView/>
                    <RoomList/>
                    <UpcomingContests/>
                </div>
            </Container>
        </div>
     );
}
 
export default Home;