import getTopics  from "@/actions/get-topics";
import { Topic } from "@/types";
import { Separator } from "../ui/separator";

const TopicsView = async () => {
    const topics : Topic[] = await getTopics()
    return ( 
        <div className="hidden md:flex flex-col gap-3 w-48">
            <div className="font-bold">Browse Topics</div>
            <Separator/>
            <div className="flex flex-col gap-5">
                {topics.map((topic) => (
                    <div key={topic.id} className="flex justify-between items-center">
                        <div>{topic.name}</div>
                        <div className="bg-slate-100 dark:bg-slate-800 w-5 h-5 flex justify-center items-center rounded-md p-3">{topic.room_count}</div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default TopicsView;