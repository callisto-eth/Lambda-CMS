import Navbar from '@/components/Navbar';

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative">
      <Navbar />
      {children}
    </main>
  );
}
