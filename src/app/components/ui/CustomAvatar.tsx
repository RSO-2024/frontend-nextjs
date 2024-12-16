import { useEffect, useState } from 'react';
import { supabase, fetchUser } from '@/app/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const CustomAvatar = () => {
  const [user, setUser] = useState<any>(null);

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


  return(
  <Avatar >
  <AvatarImage src={ !user ? "./avatar-anon.png" : "./avatar-logged.jpg"} />
  <AvatarFallback>U</AvatarFallback>
  </Avatar>
  )
};

export default CustomAvatar;
