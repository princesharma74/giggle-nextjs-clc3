"use client"
import { Spinner } from '@/components/ui/spinner';
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex justify-center items-center h-screen">
            <Spinner/>
        </div>
    )
  }