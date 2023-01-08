import Header from '@/components/fragments/Header';
import useAuth from 'hooks/useAuth';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useAuth();
  console.log('cc');
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
}
