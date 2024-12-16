'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const navbarElements = [
    {
        key: 0,
        href: '/search',
        name: 'Search',
    },
    {
        key: 1,
        href: '/about',
        name: 'About',
    },
    {
        key: 2,
        href: '/auctions',
        name: 'Auctions',
    },
    {
        key: 3,
        href: '/flash-auctions',
        name: 'Flash Auctions',
    }
];

export function NavbarLinks() {

    const location = usePathname()

    return (
    <div className="hidden md:flex md:justify-center items-center 
    gap-8 col-span-7 font-semibold text-gray-500">
        {navbarElements.map((item) => 
            (<Link className={cn(
                location === item.href? "bg-orange-500 text-white px-3 py-1 rounded-full" : "hover:text-gray-800"
            )} href={item.href}
            key={item.key}>
            <div className="flex items-center gap-2">
                <h1>{item.name}</h1>
            </div>
            </Link>)
        )}
    </div>
    )
}