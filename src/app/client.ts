import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const fetchUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
        return session.user
    } else {
        return null
    }
}

export const signIn = async (email: string, password: string) => {

    const {data, error} = await supabase.auth.signInWithPassword({email, password})

    return {data, error}
  }

export const signUp = async (email: string, password: string) => {

    const { data, error } = await supabase.auth.signUp({ email, password });

    return {data, error}
} 

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error.message);
    } 
}


 export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};