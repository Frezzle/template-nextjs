import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from 'components/layout';
import { PostData, getAllPostIds, getPostData } from 'lib/posts';
import Date from 'components/date';
import utilStyles from 'styles/utils.module.scss';

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = getAllPostIds();

  // Paths looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  const paths = ids.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.['id'] || typeof params['id'] !== 'string') {
    return {
      props: {
        error: true,
      },
    };
  }

  const postData = await getPostData(params['id']);
  return {
    props: {
      postData,
    },
  };
};

export type PostProps = {
  postData: PostData;
};

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles['headingXl']}>{postData.title}</h1>
        <div className={utilStyles['lightText']}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
