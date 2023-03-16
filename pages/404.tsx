import Head from 'next/head';
import Layout, { siteTitle } from 'components/layout';
import utilStyles from 'styles/utils.module.css';

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles['headingMd']}>
        <h2 className={utilStyles['headingLg']}>
          {"I can't find it, you sure I borrowed it?"}
        </h2>
      </section>
    </Layout>
  );
}
