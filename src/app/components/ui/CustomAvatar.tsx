import { useEffect, useState } from 'react';
import { supabase } from '@/app/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const CustomAvatar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Function to fetch and set the initial user session
    const fetchInitialUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setUser(session?.user ?? null);
      }
    };

    fetchInitialUser();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <Avatar>
      <AvatarImage src={!user ? "/avatar-anon.png" : "/avatar-logged.jpg"} alt="User Avatar" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
