// pages/_app.tsx
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { AppProvider } from '@/providers/root';
import Layout from '@/layout/default';
import '@/styles/main.scss';
import '@/styles/tailwind.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>;
}
