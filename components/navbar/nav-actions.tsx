import { ModeToggle } from "../mode-toggle"
import { auth } from "@/auth"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoginBox } from "../auth/log-in"
import { Button } from "../ui/button"
import LoggedInComponent from "@/components/auth/logged-in"


const NavActions = async () => {
    // check if user is signed in
    const session = await auth()
    const isLoggedIn = !!session?.user
    return ( 
        <div className="ml-auto flex items-center gap-x-4">
            {
                isLoggedIn ? 
                <LoggedInComponent session={session}/>
                : 
                <Dialog>
                    <DialogTrigger>
                    Login
                    </DialogTrigger>
                    <DialogContent>
                        <LoginBox/>
                    </DialogContent>
                </Dialog>
            }
            <ModeToggle/>
        </div>
     );
}
 
export default NavActions;