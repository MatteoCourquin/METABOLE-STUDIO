import InstancedField from '@/components/CrossBackground/Scene';
import FloatingHalo from '@/components/FloatingHalo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScreenLoader from '@/components/ScreenLoader';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useLanguage } from '@/providers/language.provider';
import { AppProvider } from '@/providers/root';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Head from 'next/head';
import { ReactNode, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }: { children: ReactNode }) => {
  const { isProd } = useEnvironment();
  const { isFrench } = useLanguage();

  useEffect(() => {
    const defaultTitle = 'Metabole STUDIO';
    const alternateTitles = isFrench
      ? ['Expériences web uniques', 'Un studio créatif']
      : ['Unique web experiences', 'A creative studio'];

    let titleIndex = 0;
    let intervalId: number | null = null;

    const changeTitle = () => {
      titleIndex = titleIndex === 0 ? 1 : 0;
      document.title = alternateTitles[titleIndex];
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        const [firstTitle] = alternateTitles;
        document.title = firstTitle;
        intervalId = window.setInterval(changeTitle, 3000);
      } else {
        document.title = defaultTitle;
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    });
  }, [isFrench]);

  return (
    <AppProvider>
      <Head>
        <title>Metabole STUDIO</title>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
      </Head>
      <Header />
      {/* {isProd && <ScreenLoader />} */}
      <ScreenLoader />
      <main className="h-[140vh]">{children}</main>
      <Footer />
      <InstancedField />
      <FloatingHalo
        className="!fixed top-1/2 -left-full -z-10 h-[250vw] w-[250vw]"
        from="#1b17ee"
        to="#f1f2ff00"
      />
      {/* <Analytics />
      <SpeedInsights /> */}
    </AppProvider>
  );
};

export default Layout;
