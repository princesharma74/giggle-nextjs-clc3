"use client"

import { NavItem } from "@/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface MainNavProps{
    data: NavItem[]
}

const MainNav : React.FC<MainNavProps> = ({
    data
}) => {
    const pathname = usePathname();
    const routes = data.map(item => item.href === pathname ? { ...item, active: true} : item)
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