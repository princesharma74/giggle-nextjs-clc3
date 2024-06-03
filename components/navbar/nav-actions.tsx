"use client"
import { ModeToggle } from "../mode-toggle"
import { auth } from "@/auth"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoginBox } from "../auth/log-in"
import { Button } from "@/components/ui/button"
import LoggedInComponent from "@/components/auth/logged-in"
import { useLoginModal } from "@/hooks/use-login-modal"
import { User } from "next-auth"
import { AlignJustify, X } from "lucide-react"
import { useState } from "react"

interface NavActionsProps{
    user: User | undefined;
}

const NavActions: React.FC<NavActionsProps> = ({
    user
}) => {
    const loginModalState = useLoginModal()
    const [mobileNavState, setMobileNavState] = useState(true)
    const isLoggedIn = !!user
    return ( 
        <div className="ml-auto flex items-center gap-x-4">
            {
                isLoggedIn ? 
                <LoggedInComponent user={user}/>
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
            <div className="block md:hidden"
                onClick={()=>{
                    setMobileNavState(!mobileNavState)
                }}
            >
                {mobileNavState ? <AlignJustify/> : <X/>}
            </div>
        </div>
     );
}
 
export default NavActions;