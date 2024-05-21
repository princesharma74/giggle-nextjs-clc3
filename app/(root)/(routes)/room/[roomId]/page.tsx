import { Car } from "lucide-react";
import { CardsChat } from "./components/chat";
import Container from "@/components/ui/container";
import Participants from "./components/participants";
import { getRoom } from "@/actions/get-room";
const RoomPage  = async ({
    params
} : { params: {roomId: string}}) => {
    const room = await getRoom(parseInt(params.roomId))
    return ( 
        <Container>
            <div className="flex justify-between md:m-8 gap-4">
                <div className="w-full">
                    { room && <CardsChat room={room}/> }
                </div>
                <Participants/>
            </div>
        </Container>
     );
}
 
export default RoomPage;