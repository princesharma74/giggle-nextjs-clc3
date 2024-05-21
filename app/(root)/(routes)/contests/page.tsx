import { getUpcomingContests } from "@/actions/get-upcoming-contests";
import ContestsList from "@/components/contests/contests-list";
import Container from "@/components/ui/container";

const ContestsPage = async () => {
    const contests = await getUpcomingContests()
    return ( 
        <Container>
            <div className="my-4">
                <ContestsList contests={contests}/>
            </div>                                        
        </Container>
     );
}
 
export default ContestsPage;