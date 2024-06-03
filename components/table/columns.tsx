"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";
import { TooltipView } from "@/components/ui/text-hover";

export type UserColumn = {
    rank: number;
    username: string;
    name: string;
    leetcode_rating: number | null | undefined;
    codeforces_rating: number | null | undefined;
    codechef_rating: number | null | undefined;
    leetcodeId: string | null | undefined;
    codeforcesId: string | null | undefined;
    codechefId: string | null | undefined;
    todays_submissions: number;
}

export const columns: ColumnDef<UserColumn>[] = [
    {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
            <Link href={`/user/${row.original.username}`}>
                <TooltipView buttonLabel={row.original.name} tooltipContent={"Click to view profile"} />
            </Link>
        )
    },
    {
        header: 'Leetcode Rating',
        accessorKey: 'leetcode_rating',
        cell: ({ row }) => (
            <Link href={`https://leetcode.com/${row.original.leetcodeId}`}>
                <TooltipView buttonLabel={row.original.leetcode_rating ? row.original.leetcode_rating.toString() : "-"} tooltipContent={"Click to view the leetcode profile"} />
            </Link>
        )
    },
    {
        header: 'Codeforces Rating',
        accessorKey: 'codeforces_rating',
        cell: ({ row }) => (
            <Link href={`https://codeforces.com/profile/${row.original.codeforcesId}`}>
                <TooltipView buttonLabel={row.original.codeforces_rating ? row.original.codeforces_rating.toString() : "-"} tooltipContent={"Click to view the codeforces profile"} />
            </Link>
        )
    },
    {
        header: 'Codechef Rating',
        accessorKey: 'codechef_rating',
        cell: ({ row }) => (
            <Link href={`https://codechef.com/users/${row.original.codechefId}`}>
                <TooltipView buttonLabel={row.original.codechef_rating ? row.original.codechef_rating.toString() : "-"} tooltipContent={"Click to view the codechef profile"} />
            </Link>
        )
    },
    {
        header: "Today's Submissions",
        accessorKey: 'todays_submissions',
    }
]
