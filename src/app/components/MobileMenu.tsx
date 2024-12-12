"use client"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle
  } from "@/components/ui/sheet"
  import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navbarElements } from "./ui/NavbarLinks"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"


export function MobileMenu() {

    const location = usePathname()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size='icon'>
                    <Menu className="w-4 h-4"/>
                </Button>
            </SheetTrigger>

            <SheetContent>
                <SheetTitle>Menu</SheetTitle>
                <div className="font-semibold mt-5 flex px-2 space-y-1 flex-col">
                    {navbarElements.map((item) => (
                    <Link href={item.href} key={item.key} className={cn(
                        location === item.href? "bg-orange-500 text-white px-3 py-1 rounded-full" : "hover:text-gray-800"
                    )}>
                        <h1>{item.name}</h1>
                    </Link>))}
                </div>
            </SheetContent>
        </Sheet>
    )
}