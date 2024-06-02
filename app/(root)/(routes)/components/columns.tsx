"use client"

import { ColumnDef } from "@tanstack/react-table"

export type UserColumn = {
    rank: number;
    name: string;
    leetcodeId: string | null | undefined;
    codeforcesId: string | null | undefined;
    codechefId: string | null | undefined;
    todays_submissions: number;
}

export const columns: ColumnDef<UserColumn>[] = [
    {
        header: 'Rank',
        accessorKey: 'rank',
    },
    {
        header: 'Name',
        accessorKey: 'name',
    },
    {
        header: 'Leetcode Id',
        accessorKey: 'leetcodeId',
    },
    {
        header: 'Codeforces',
        accessorKey: 'codeforcesId',
    },
    {
        header: 'Codechef',
        accessorKey: 'codechefId',
    },
    {
        header: "Today's Submissions",
        accessorKey: 'todays_submissions',
    }
]
