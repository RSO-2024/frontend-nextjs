"use client"

import { NavbarLinks } from "./ui/NavbarLinks"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "./MobileMenu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

export function Navbar() {

    function handleUserClick() {
        console.log('hi')
    }

    return(
        <nav className="relative w-full flex justify-between
        items-cente md:grid md:grid-cols-12 px-4 md:px-8
        mx-auto py-7"> 
            <div className="md:col-span-3">
                <Link href={'/'}>
                    <div className="flex items-center gap-2">
                        <img src="./icon.svg" alt="" width={25}/>
                        <h1 className="text-3xl font-bold">
                        Clutch<span className="text-orange-500">bids</span>
                    </h1>
                    </div>
                </Link>
            </div>

            <NavbarLinks/>
        
            <div className="flex items-center justify-end gap-5 ms-auto">
                <Link href={'/login'}><Button className="font-bold hover:text-gray-500">Sign In</Button></Link>
                <Link href={'/register'}><Button className="text-gray-600 font-bold hover:bg-gray-200 hover:text-orange-500" variant={"secondary"}>Sign Up</Button></Link>
                
                    <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                    <div className="border-2 border-gray-300 rounded-full
                                hover:border-orange-600 hover:cursor-pointer">
                    <Avatar onClick={handleUserClick}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                
            </div>

            <div className="md:hidden pl-3">
                <MobileMenu/>
            </div>

        </nav>
    )
}