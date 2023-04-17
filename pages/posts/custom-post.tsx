import Head from 'next/head';
import Layout from '../../components/layout';

const title = 'My Custom Post';

export default function CustomPost() {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      <p>
        This is a custom post written as a React functional component, beside
        other posts generated from markdown files.
      </p>
      <p>{"Here's some custom HTML:"}</p>
      <div
        style={{
          width: '300px',
          height: '20px',
          backgroundColor: 'red',
          borderRadius: '5px',
          opacity: 0.2,
        }}
      ></div>
    </Layout>
  );
}
