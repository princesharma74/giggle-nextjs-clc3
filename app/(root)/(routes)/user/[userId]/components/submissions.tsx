import { SubmissionColumn, columns } from "./columns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

interface SubmissionsButtonProps {
    submissions: SubmissionColumn[];
}
const SubmissionsButton : React.FC<SubmissionsButtonProps> = ({
    submissions
}) => {
    return ( 
        <Dialog>
            <DialogTrigger>
                <Button variant={"outline"} className="rounded-full">View Submissions</Button>
            </DialogTrigger>
            <DialogContent>
                <ScrollArea>
                    <DataTable searchKey="problem_name" columns={columns} data={submissions} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
     );
}
 
export default SubmissionsButton;