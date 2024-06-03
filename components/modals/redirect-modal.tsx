"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const RedirectModal = () => {
    const user = useSession().data?.user
    const router = useRouter()
    useEffect(() => {
        if(user && !(user.codechef_id || user.codeforces_id || user.leetcode_id)){
            router.push("/edit-profile")
        }
    })
    return ( 
        <></>
     );
}
 
export default RedirectModal;