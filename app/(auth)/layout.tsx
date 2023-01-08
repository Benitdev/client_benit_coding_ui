import { notFound } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useAuth();
  if (user) notFound();
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
