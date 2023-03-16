import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Date from 'components/date';
import Layout, { siteTitle } from 'components/layout';
import utilStyles from 'styles/utils.module.css';
import { PostList, getPostList } from 'lib/posts';

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getPostList();
  return {
    props: {
      allPostsData,
    },
  };
};

type HomeProps = {
  allPostsData: PostList;
};

export default function Home(props: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles['headingMd']}>
        <p>{"Fred here, Next.js'ing 🤙"}</p>
        <p>
          (This is a sample website built using{' '}
          <a href="https://nextjs.org/learn">the Next.js tutorial</a>)
        </p>
      </section>
      <section
        className={`${utilStyles['headingMd']} ${utilStyles['padding1px']}`}
      >
        <h2 className={utilStyles['headingLg']}>Blog</h2>
        <ul className={utilStyles['list']}>
          <li className={utilStyles['listItem']} key="custom-post">
            <Link href={'/posts/custom-post'}>Custooooom Post</Link>
            <br />
            <small className={utilStyles['lightText']}>
              <Date dateString="2023-03-13" />
            </small>
          </li>
          {props.allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles['listItem']} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles['lightText']}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
