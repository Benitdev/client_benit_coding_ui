import Sidebar from '@/components/fragments/Sidebar';
import useAuth from 'hooks/useAuth';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const user = await useAuth();
  params.user = user;
  return (
    <div className="block min-h-screen lg:grid lg:grid-cols-[300px,minmax(0,1fr)]">
      <Sidebar />
      {children}
    </div>
  );
}
