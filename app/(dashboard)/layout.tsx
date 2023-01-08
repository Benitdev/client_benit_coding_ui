import { notFound } from 'next/navigation';
import Sidebar from '@/components/fragments/Sidebar';
import useAuth from 'hooks/useAuth';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useAuth();
  if (!user) notFound();
  console.log(user);
  return (
    <div className="block min-h-screen xl:grid xl:grid-cols-[300px,minmax(0,1fr)]">
      <Sidebar />
      {children}
    </div>
  );
}
