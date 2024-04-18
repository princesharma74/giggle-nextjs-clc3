"use client"
import { ModeToggle } from "../mode-toggle"
import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"


const NavActions = () => {
    const { isLoaded, isSignedIn, user } = useUser()

    return ( 
        <div className="ml-auto flex items-center gap-x-4">
            <UserButton/>
            {
                !isSignedIn && 
                <Link href={"/sign-in"} className="font-semibold">
                    Login
                </Link>
            }
            <ModeToggle/>
        </div>
     );
}
 
export default NavActions;