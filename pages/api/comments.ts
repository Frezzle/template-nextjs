import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../lib/api';

// TODO api middleware that catches all errors and returns 500.
// TODO error logging for when the above happens.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // I think this GET is technically not needed since the server will call the logic to get comments,
  // then pre-render the page before sending back, so it's not actually calling the API.
  // if (req.method === 'GET') {
  //   const comments = await api.getComments();
  //   return res.status(200).json(comments);
  // }

  if (req.method === 'POST') {
    // request body is not typed, so we assert the types within it, so the rest of the app can remain typed
    const { text } = JSON.parse(req.body);
    if (typeof text !== 'string') {
      return res.status(400).json({
        error: `text must be a string, not ${typeof text} ... req.body: ${
          req.body
        }`,
      });
    }

    const comment = await api.createComment(text);

    return res.status(200).json(comment);
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}
