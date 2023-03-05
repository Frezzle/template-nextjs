import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>My First Post</title>
      </Head>
      <Link href="/">Go back home</Link>
      <h1>First Post</h1>
    </Layout>
  );
}
