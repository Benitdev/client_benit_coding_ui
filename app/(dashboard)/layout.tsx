import Sidebar from '@/components/fragments/Sidebar';
import useAuth from 'hooks/useAuth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useAuth();
  return (
    <div className="block min-h-screen xl:grid xl:grid-cols-[300px,minmax(0,1fr)]">
      <Sidebar />
      {children}
    </div>
  );
}
