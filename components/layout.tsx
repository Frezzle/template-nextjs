import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.scss';
import Link from 'next/link';
import Header from './header';

export const siteTitle = 'Next.js Sample Website';

interface LayoutProps {
  children: React.ReactNode;
  /** Whether home page or not. */
  home?: boolean;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="container mx-auto p-3">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Header shows sign-in status and sign-in/out button */}
      <Header />

      {/* TODO: this is 2nd header; another exists inside Header component; resolve */}
      <header className="flex py-3 justify-between items-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            height={50}
            width={107}
            alt="fred logo"
          />
        </Link>
        <nav className="hidden md:flex space-x-10">
          <Link href="/product" className="hover:text-blue-800">
            Product
          </Link>
          <Link href="/guestbook" className="hover:text-blue-800">
            Guestbook
          </Link>
        </nav>
        <a
          href="#"
          className="hidden md:block bg-cyan-900 text-slate-200 py-2 px-4 rounded-full hover:bg-cyan-800"
        >
          Contact
        </a>
      </header>

      <main>{props.children}</main>

      {!props.home && (
        <div className={styles['backToHome']}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
