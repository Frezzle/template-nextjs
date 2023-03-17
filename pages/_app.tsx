import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import 'styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
