import { CardsChat } from "./components/chat";
import Container from "@/components/ui/container";
import Participants from "./components/participants";
import prismadb from "@/lib/prismadb";
const RoomPage  = async ({
    params
} : { params: {roomId: string}}) => {
    const room = await prismadb.room.findUnique({
        where: {
            id: params.roomId
        }, 
        include: {
            participants: true,
            messages: true
        }
    });
    return ( 
        <Container>
            <div className="flex justify-between md:m-8 gap-4">
                <div className="w-full">
                </div>
                <Participants/>
            </div>
        </Container>
     );
}
 
export default RoomPage;