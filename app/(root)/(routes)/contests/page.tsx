import ContestsList from "./components/contests-list";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import prismadb from "@/lib/prismadb";

const ContestsPage = async () => {

    const take = 8;

    const contests = await prismadb.contest.findMany({
        where: {
            start_time: {
                gte: new Date()
            }
        },
        orderBy: {
            start_time: 'asc'
        }, 
        take
    });

    return ( 
        <Section>
            <ContestsList contests={contests}/>
        </Section>
     );
}
 
export default ContestsPage;