import type { NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4"></main>
    </>
  );
};

// export async function getServerSideProps(context: any) {
//   const { req, res } = context;
//   const session = await getSession({ req });
//   console.log(session);

//   return;
// }

export default Home;
