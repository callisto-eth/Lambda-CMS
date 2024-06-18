import Navbar from '@/components/common/Navbar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect('/');
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
