// API calls are ideally modelled as independent functions,
// so they can be flexibly called by getStaticProps/getServerSideProps
// without having to call the generated API Routes in `pages/api`.
// The `pages/api` routes will also call these.

export default {
  getHealth: async function() {
    // call external thing e.g. API, DB
    return true;
  }
}
