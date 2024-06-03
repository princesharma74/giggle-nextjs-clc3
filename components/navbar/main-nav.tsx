"use client"

import { NavItem } from "@/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { User } from "next-auth";
import { useLoginModal } from "@/hooks/use-login-modal";

interface MainNavProps{
    user: User | null | undefined
    data: NavItem[]
}

const MainNav : React.FC<MainNavProps> = ({
    data, 
    user
}) => {
    const pathname = usePathname();
    const loginState = useLoginModal()
    const routes = data.map(item => item.href === pathname ? { ...item, active: true} : item)
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        if (!modalOpened && (user === null || user === undefined)) {
            loginState.onOpen();
            setModalOpened(true);
        }
    }, [user, modalOpened, loginState]);

    return ( 
        <>
            <nav
            className="hidden mx-6 items-center space-x-4 lg:space-x-6 md:block"
            >
                {routes.map((route)=>(
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:font-semibold",
                            route.active ? "font-semibold" : "text-neutral-500"
                        )}
                    >
                        {route.label}
                    </Link>
                ))}
            </nav>
        </>
     );
}
 
export default MainNav;