import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';
import { Comment } from '@prisma/client';
import api from '../lib/api';
// TODO import namespaces/aliases for easier absolute imports instead of relative paths.

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
  // FYI: Using the Comment type from prisma does not seem to expose any DB structures nor connection info,
  // AFAICT from inspecting the data returned by the production deployment.
  comments: Comment[];
};

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
        setAllComments([comment, ...allComments]);
        setText('');
      })
      .catch(() => {
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
