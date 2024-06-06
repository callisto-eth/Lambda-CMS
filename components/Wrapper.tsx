import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Wrapper({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data.user) {
    redirect('/');
  }

  return <>{children}</>;
}
