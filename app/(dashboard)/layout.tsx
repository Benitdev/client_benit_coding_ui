import Sidebar from '@/components/fragments/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="block min-h-screen lg:grid lg:grid-cols-[300px,minmax(0,1fr)]">
      <Sidebar />
      {children}
    </div>
  );
}
