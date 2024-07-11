import Link from "next/link";
import { getBadge } from "./rank-label";
import { Badge } from "@/components/ui/badge";
import { Codeforces, Leetcode, Codechef } from "@prisma/client";
import { BadgeCheck } from "lucide-react";

interface RatingProps {
    leetcode: Leetcode | null;
    codeforces: Codeforces | null;
    codechef: Codechef | null;
}

const PerformanceStats : React.FC<RatingProps> = ({
    leetcode, codeforces, codechef
}) => {
    return (
            <div className="grid grid-cols-1 gap-2">
            <div className="grid grid-cols-3 gap-1 md:gap-4 justify-center items-center w-full">
                <Link href={`https://www.leetcode.com/${leetcode?.leetcode_id}` ?? "#"} className="h-full border p-5 rounded-md flex flex-col items-center">
                    <div className="flex gap-1 text font-medium items-center">
                        <div>
                            Leetcode
                        </div>
                        <div>
                            {leetcode?.verified && <BadgeCheck size={15} color="green"/>}
                        </div>
                    </div>
                    <div className="text-2xl font-bold">
                        {leetcode?.rating ? leetcode?.rating : "N/A"}
                    </div>
                    {leetcode?.rating &&
                        <Badge variant={"outline"}>{getBadge('Leetcode', leetcode?.rating)}</Badge>
                    }
                    <div className="text-xs font-medium text-center">
                        @{leetcode?.leetcode_id}
                    </div>
                </Link>
                <Link href={`https://codeforces.com/profile/${codeforces?.codeforces_id}` ?? "#"} className="h-full border p-5 rounded-md flex flex-col items-center">
                    <div className="flex gap-1 text font-medium items-center">
                        <div>
                            Codeforces
                        </div>
                        <div>
                            {codeforces?.verified && <BadgeCheck size={15} color="green"/>}
                        </div>
                    </div>
                    <div className="text-2xl font-bold">
                        {codeforces?.rating ? codeforces?.rating : "N/A"}
                    </div>
                    {codeforces?.rating &&
                        <Badge variant={"outline"}>{getBadge('Codeforces', codeforces?.rating)}</Badge>
                    }
                    <div className="text-xs font-medium text-center">
                        @{codeforces?.codeforces_id}
                    </div>
                </Link>
                <Link href={`https://www.codechef.com/users/${codechef?.codechef_id}` ?? "#"} className="h-full border p-5 rounded-md flex flex-col items-center">
                    <div className="flex gap-1 text font-medium items-center">
                        <div>
                            Codechef
                        </div>
                        <div>
                            {codechef?.verified && <BadgeCheck size={15} color="green"/>}
                        </div>
                    </div>
                    <div className="text-2xl font-bold">
                        {codechef?.rating ? codechef?.rating : "N/A"}
                    </div>
                    {codechef?.rating &&
                        <Badge variant={"outline"}>{getBadge('Codechef', codechef?.rating)}</Badge>
                    }
                    <div className="text-xs font-medium text-center">
                        @{codechef?.codechef_id}
                    </div>
                </Link>
            </div>
            <div className="border rounded-md w-full p-4">
            <div className="text-center font-bold text-lg">
                Total ({((leetcode?.number_of_questions ?? 0) + (codechef?.number_of_questions ?? 0) + (codeforces?.number_of_questions ?? 0))}) Problems Solved 
            </div>

                <div className="grid grid-cols-3 justify-center items-center">
                    <div className="p-5 rounded-md flex flex-col items-center">
                        <div className="text-2xl font-bold">
                            {leetcode?.number_of_questions ? leetcode?.number_of_questions: "N/A"}
                        </div>
                        <div className="text-xs text-gray-400">Leetcode</div>
                    </div>
                    <div className="p-5 rounded-md flex flex-col items-center">
                        <div className="text-2xl font-bold">
                            {codeforces?.number_of_questions ? codeforces?.number_of_questions : "N/A"}
                        </div>
                        <div className="text-xs text-gray-400">Codeforces</div>
                    </div>
                    <div className="p-5 rounded-md flex flex-col items-center">
                        <div className="text-2xl font-bold">
                            {codechef?.number_of_questions ? codechef?.number_of_questions : "N/A"}
                        </div>
                        <div className="text-xs text-gray-400">Codechef</div>
                    </div>
                </div>
            </div>
            </div>
     );
}
 
export default PerformanceStats;