"use client"
import { ModeToggle } from "../mode-toggle"
import { Button } from "@/components/ui/button"
import LoggedInComponent from "@/components/auth/logged-in"
import { useLoginModal } from "@/hooks/use-login-modal"
import { User } from "next-auth"
import { MobileNav } from "./mobile-nav"
import { NavItem } from "@/types"
import { usePathname } from "next/navigation"

interface NavActionsProps{
    user: User | undefined;
    data: NavItem[]
}

const NavActions: React.FC<NavActionsProps> = ({
    user,
    data
}) => {
    const loginModalState = useLoginModal()
    const isLoggedIn = !!user
    return ( 
        <div className="ml-auto flex items-center gap-x-4">
            {
                isLoggedIn ? 
                <div className="hidden md:block">
                <LoggedInComponent user={user}/>
                </div>
                : 
                <Button variant={"outline"} className="border-none text-md"
                    onClick={()=>{
                        loginModalState.onOpen()
                    }}
                >
                    Login
                </Button>
            }
            <ModeToggle/>
            <MobileNav user={user} data={data}/>
        </div>
     );
}
 
export default NavActions;