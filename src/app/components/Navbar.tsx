"use client"
import { NavbarLinks } from "./ui/NavbarLinks"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "./MobileMenu"
import CustomAvatar from "./ui/CustomAvatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { signOut } from "../client"
import { useState, useEffect } from "react"
import { fetchUser, supabase } from "../client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function Navbar() {

    const [user, setUser] = useState<any>(null);
    const router = useRouter()
    const { toast } = useToast()

    // Fetch user session on component mount
    useEffect(() => {
      
      const user = fetchUser()
     
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      });
  
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }, []);

    const handleSignOut = async () => {
        await signOut()
        toast({
            title: "Status",
            description: "You are signed out."
        })
    }

    return(
        <nav className="w-full flex justify-between
        items-cente md:grid md:grid-cols-12 px-4 md:px-8
        mx-auto py-7 sticky top-0 bg-white z-10"> 
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
                {!user?
                ( <>
                  <Link href={'/login'}><Button className="font-bold hover:text-gray-100">Sign In</Button></Link>
                  <Link href={'/register'}><Button className="text-gray-600 font-bold hover:bg-gray-200
                   hover:text-orange-500 hidden lg:block" variant={"secondary"}>Sign Up</Button></Link>
                   </>
                ) : (<></>)}
                    <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                    <div className="border border-gray-300 rounded-full
                                hover:border-orange-600 hover:cursor-pointer">
                    <CustomAvatar/>
                    </div>
                    </DropdownMenuTrigger>

                    {user ? 
                    (<DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Credits</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSignOut}
                        >Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                    ) : (<DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            router.push('/login')
                        }}
                        >Sign In</DropdownMenuItem>
                    </DropdownMenuContent>)}
                    </DropdownMenu>
            </div>

            <div className="md:hidden pl-3">
                <MobileMenu/>
            </div>

        </nav>
    )
}