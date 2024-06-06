import Navbar from '@/components/Navbar';
import ProfileModal from '@/components/ProfileModal';
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
    <main className="relative">
      <ProfileModal />
      <Navbar />
      {children}
    </main>
  );
}
