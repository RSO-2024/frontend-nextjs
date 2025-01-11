"use client"
import { useEffect, useState } from "react";
import { NavbarLinks } from "./ui/NavbarLinks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import CustomAvatar from "./ui/CustomAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, fetchUser, supabase } from "../client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js"; // Import User type from Supabase

export function Navbar() {
  const [user, setUser] = useState<User | null>(null); // Use proper type instead of 'any'
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Function to fetch and set the initial user session
    const fetchInitialUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setUser(session?.user ?? null);
      }
    };


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


    // Cleanup subscription on unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have successfully signed out.",
      });
      router.push("/"); // Redirect to home or login page after sign out
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="w-full flex justify-between items-center md:grid md:grid-cols-12 px-4 md:px-8 mx-auto py-7 sticky top-0 bg-white z-10">
      {/* Logo Section */}
      <div className="md:col-span-3">
        <Link href="/">
          <div className="flex items-center gap-2">
            <img src="/icon.svg" alt="Clutchbids Icon" width={25} />
            <h1 className="text-3xl font-bold">
              Clutch<span className="text-orange-500">bids</span>
            </h1>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <NavbarLinks />

      {/* Authentication Buttons and Avatar */}
      <div className="flex items-center justify-end gap-5 ms-auto">
        {/* Show Sign In and Sign Up only when user is not logged in */}
        {!user && (
          <>
            <Link href="/login">
              <Button className="font-bold hover:text-gray-100">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button
                className="text-gray-600 font-bold hover:bg-gray-200 hover:text-orange-500 hidden lg:block"
                variant="secondary"
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}

        {/* Dropdown Menu with Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="border border-gray-300 rounded-full hover:border-orange-600 hover:cursor-pointer">
              <CustomAvatar />
            </div>
          </DropdownMenuTrigger>

          {user ? (
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/credits")}>
                Credits
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/login")}>
                Sign In
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden pl-3">
        <MobileMenu />
      </div>
    </nav>
  );
}
