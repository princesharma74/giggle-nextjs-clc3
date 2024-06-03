import { DataTable } from "@/components/ui/data-table";
import { columns, UserColumn } from "./columns";

interface CodersProps {
    placeholder: string;
    data: UserColumn[];
}
const CodersTable : React.FC<CodersProps> = ({
    placeholder,
    data
}) => {
    return ( 
        <div className="px-6 overflow-auto">
            <DataTable searchKey="name" placeholder={placeholder} columns={columns} data={data} />
        </div>
     );
}
 
export default CodersTable;