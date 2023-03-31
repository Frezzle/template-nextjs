import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from 'components/layout';
import { Comment } from '@prisma/client';
import api from 'lib/api';

// Next.js will pre-render this page on each request using the data returned by getServerSideProps.
// https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export const getServerSideProps: GetServerSideProps = async () => {
  const comments = await api.getComments();
  return {
    props: {
      // Need to stringify and parse otherwise it complains about not being able to serialise the Date object.
      // https://stackoverflow.com/a/72837265/10213136
      // TODO ideally improve this, maybe by defining that shared API definition between frontend and backend. How?
      comments: JSON.parse(JSON.stringify(comments)),
    },
  };
};

type GuestbookProps = {
  comments: Comment[];
};

// TODO by using this Comment type from prisma, am I exposing any sensitive DB stuff to the web browser? check prod deployment.
// I don't think I am because the prisma client complains if used in frontend (which I fixed),
// and only that should have any knowledge of the DB connection.
// As for DB types, that's not necessarily bad, but I don't want that info shared ideally as it helps hackers figure out
// how best to manipulate DB or SQL inject maybe; the DB types get imported and used in here (in props) for type-checking,
// but I don't think that makes it to the client after TS is compiled to JS. I'll check though.
export default function Guestbook(props: GuestbookProps) {
  const [posting, setPosting] = useState(false);
  const [postingFailed, setPostingFailed] = useState(false);
  const [text, setText] = useState('');
  const [allComments, setAllComments] = useState(props.comments);

  const postComment = () => {
    setPosting(true);
    fetch('/api/comments', { body: JSON.stringify({ text }), method: 'POST' }) // TODO try without stringify and inspect network tab; is it really needed?
      .then((res) => res.json())
      .then((comment: Comment) => {
        console.log('success', comment);
        setAllComments([comment, ...allComments]);
        setText('');
      })
      .catch((err) => {
        console.log('err', err);
        setPostingFailed(true);
      })
      .finally(() => {
        setPosting(false);
      });
  };

  return (
    <Layout home>
      <Head>
        <title>Guestbook</title>
      </Head>
      <h1 className="text-4xl">Guestbook</h1>

      <p>{`Post a comment. They're saved in a database:`}</p>
      <input
        className="border"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={postComment}>Post Comment</button>
      {posting ? <span>Posting...</span> : undefined}
      {postingFailed ? <span>Post failed...</span> : undefined}

      {allComments.length ? (
        allComments.map((comment) => (
          <p key={comment.id}>{`${comment.createdAt}: ${comment.text}`}</p>
        ))
      ) : (
        <p>No comments yet. Be the first!</p>
      )}
    </Layout>
  );
}
