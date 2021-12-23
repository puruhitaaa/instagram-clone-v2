import Head from 'next/head';
import Feed from '../src/components/Feed';
// import nookies from 'nookies';
// import { getAuth } from 'firebase-admin/auth';

import Header from '../src/components/Header';
import Modal from '../src/components/Modal';
import { withProtected } from '../src/hooks/route';

// export async function getServerSideProps(context) {
//   try {
//     const auth = getAuth();
//     const cookies = nookies.get(context);
//     const token = await auth.verifyIdToken(cookies.token);

//     const { uid } = token;

//     return {
//       props: {
//         message: `Your id is ${uid}`,
//       },
//     };
//   } catch (error) {
//     console.log('Error', error);
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/login',
//       },
//       props: {},
//     };
//   }
// }

function Home() {
  return (
    <main className="h-screen bg-gray-50 overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram Firebased</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Modal />

      <Feed />
    </main>
  );
}

export default withProtected(Home);
