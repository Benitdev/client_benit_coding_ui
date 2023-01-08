import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import ToastContainerWrapper from '@/components/providers/ToastContainer';
import ReduxWrapper from '@/components/providers/ReduxWrapper';
import ReactQueryWrapper from '@/components/providers/ReactQueryWrapper';
import ProgressBarWrapper from '@/components/providers/ProgressBarWrapper';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark">
      <head />
      <body className="bg-white text-slate-900 antialiased dark:bg-black dark:text-slate-100">
        <ProgressBarWrapper />
        <ReactQueryWrapper>
          <ReduxWrapper>{children}</ReduxWrapper>
        </ReactQueryWrapper>
        <div className="fixed top-[15%] left-11 -z-10 h-32 w-[50rem] -rotate-45 bg-pink-600/60 bg-gradient-to-tr blur-[200px]"></div>
        <div className="fixed bottom-[15%] right-11 -z-10 h-24 w-[40rem] rotate-45 bg-purple-600/60 bg-gradient-to-tr blur-[120px]"></div>
        <div className="fixed top-0 right-0 -z-10 h-[30rem] w-[30rem] translate-x-1/2 -translate-y-1/2 rotate-45 bg-orange-700/30 bg-gradient-to-tr blur-[300px]"></div>
        <div className="bg-grid fixed inset-0 -z-10"></div>
        <ToastContainerWrapper />

        {/*   <div id="fb-root"></div>
        <div id="fb-customer-chat" className="fb-customerchat"></div>
        <Script src="/messenger.js" /> */}
      </body>
    </html>
  );
}
