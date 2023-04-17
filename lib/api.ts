// API calls are ideally modelled as independent functions,
// so they can be flexibly called by getStaticProps/getServerSideProps
// without having to call the generated API Routes in `pages/api`.
// The `pages/api` routes will also call these.

import db from 'lib/db';

// TODO rename this "api" layer to "service" layer or named after each business domain?
// Next.js already has API folder, and it's getting confusing.
const api = {
  getHealth: async function () {
    // call external thing e.g. API, DB
    return true;
  },
  getComments: async function () {
    const comments = await db.getComments();
    return comments;
  },
  createComment: async function (text: string) {
    if (text.length < 1 || text.length > 100)
      throw new Error('comment must be 1-100 characters');

    const comment = await db.createComment(text);
    return comment;
  },
};

export default api;

// TODO define a shared API interface that backend and frontend can both depend on,
// i.e. for backend to provide data in defined format and for frontend to espect data in same format.
// then maybe define extra API methods for frontend to use instead of fetch('/specific/route/path') every time?
