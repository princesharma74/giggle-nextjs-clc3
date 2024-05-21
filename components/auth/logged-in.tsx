import { signOut } from "@/auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Session } from "@auth/core/types"
import avatar from "@/public/avatar.svg"
import Link from "next/link";

interface LoggedInComponentProps {
    session: Session
}
 
export const LoggedInComponent : React.FC<LoggedInComponentProps> = ({
    session
}) => {
    return ( 
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={session?.user?.image || avatar}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/user/${session?.user?.username}`}>
            <DropdownMenuLabel>
              My Profile
            </DropdownMenuLabel>
          </Link>
          <DropdownMenuSeparator />
          <Link href="/edit-profile" >
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
              <button type="submit" className="w-full cursor-pointer">
                <DropdownMenuItem className="cursor-pointer">
                        Logout
                </DropdownMenuItem>
              </button>
            </form>
        </DropdownMenuContent>
      </DropdownMenu>
     );
}
 
export default LoggedInComponent;