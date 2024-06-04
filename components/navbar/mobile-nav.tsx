import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useLoginModal } from "@/hooks/use-login-modal"
import { cn } from "@/lib/utils"
import { NavItem } from "@/types"
import { AlignJustify } from "lucide-react"
import { User } from "next-auth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import LoggedInComponent from "../auth/logged-in"
import { useMobileNavState } from "@/hooks/use-mobile-nav"
import { on } from "events"

interface MobileNavProps {
  user: User | undefined;
  data: NavItem[]
}

export function MobileNav({
  user,
  data
}: MobileNavProps) {

  const loginModalState = useLoginModal()
  const isLoggedIn = !!user
  const pathname = usePathname();
  const routes = data.map(item => item.href === pathname ? { ...item, active: true} : item)
  const mobileNavState = useMobileNavState();


  const onChange = (open: boolean) =>{
      if(!open){
          mobileNavState.onClose()
      }
  };

  return (
    <div className="block md:hidden">
      <Sheet open={mobileNavState.isOpen} onOpenChange={onChange}>
        <Button variant="outline" className="border-none"
          onClick={()=>{mobileNavState.onOpen()}}
        ><AlignJustify/></Button>
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="text-start">
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
                </SheetTitle>
                <SheetDescription>
                  {`Hello, ${user?.first_name || "Guest"}`}
                </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4">
                {routes.map((route)=>(
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "bg-background hover:bg-accent hover:text-accent-foreground rounded-full p-2",
                            route.active ? "font-semibold" : "text-neutral-500"
                        )}
                        onClick={()=>{
                          mobileNavState.onClose()
                        }}
                    >
                        {route.label}
                    </Link>
                ))}
            </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
