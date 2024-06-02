/*
"use client"
import { Topic } from "@/types";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface TopicsViewProps {
    topics : Topic[]
}

const TopicsView : React.FC<TopicsViewProps> = ({
    topics
}) => {
    const top10_topics = topics.slice(0, 15);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, []);
    if(!isMounted){
        return null;
    }
    return ( 
        <div className="flex flex-col gap-3">
            <div className="font-bold">Browse Topics</div>
            <Separator/>
            <div className="flex flex-col gap-5">
                {top10_topics.map((topic) => (
                    <div key={topic.id} className="flex justify-between items-center">
                        <div>{topic.name}</div>
                        <div className="bg-slate-100 dark:bg-slate-800 w-5 h-5 flex justify-center items-center rounded-md p-3">{topic.room_count}</div>
                    </div>
                ))}
                <Dialog>
                    <DialogTrigger>
                        <div className="flex gap-2 font-bold"><ChevronDown size={20}/>MORE</div>
                    </DialogTrigger>
                    <DialogContent>
                            <ScrollArea className="h-72">
                            <div className="p-4">
                                <h4 className="mb-4 text-sm font-bold leading-none">Tags</h4>
                                {top10_topics.map((topic) => (
                                    <div key={topic.id} className="flex justify-between items-center">
                                        <div>{topic.name}</div>
                                        <div className="bg-slate-100 dark:bg-slate-800 w-5 h-5 flex justify-center items-center rounded-md p-3">{topic.room_count}</div>
                                    </div>
                                ))}
                            </div>
                            </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
     );
}
 
export default TopicsView;
*/