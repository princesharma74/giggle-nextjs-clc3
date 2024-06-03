import { signOut } from "@/auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Session } from "@auth/core/types"
import avatar from "@/public/avatar.svg"
import Link from "next/link";
import { handleSignOut } from "@/components/auth/server-actions";
import { User } from "next-auth";

interface LoggedInComponentProps {
  user: User | null
}
 
export const LoggedInComponent : React.FC<LoggedInComponentProps> = ({
  user
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
              src={user?.image || avatar}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/user/${user?.username}`}>
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
              action={handleSignOut}
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