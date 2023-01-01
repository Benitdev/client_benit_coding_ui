import Header from '@/components/fragments/Header';

import useAuth from 'hooks/useAuth';

export const dynamic = 'force-dynamic';

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useAuth();
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
}
