"use client"

import { TooltipView } from "@/components/ui/text-hover";
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";

export type SubmissionColumn = {
    submission_id: number;
    submission_url: string | null;
    problem_name: string;
    problem_link: string | null;
    time_ago: string;
}

export const columns: ColumnDef<SubmissionColumn>[] = [
    {
        header: 'Submission ID',
        accessorKey: 'submission_id',
        cell: ({ row }) => (
            <Link href={`${row.original.submission_url}`}>
                <TooltipView buttonLabel={row.original.submission_id.toString()} tooltipContent={"Click to view submission"} />
            </Link>
        )
    },
    {
        header: 'Problem Name',
        accessorKey: 'problem_name',
        cell: ({ row }) => (
            <Link href={`${row.original.problem_link}`} className="font-semibold">
                <TooltipView buttonLabel={row.original.problem_name} tooltipContent={"Click to view problem"} />
            </Link>
        )
    },
    {
        header: 'When',
        accessorKey: 'time_ago',
    }
];