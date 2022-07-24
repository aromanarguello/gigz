import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import CreateGigForm from '../components/dashboard/forms/createGig';

export const Dashboard = () => {
  const { data: session } = useSession();
  const [isCreateMode, setIsCreateMode] = useState(false);

  if (!session) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  return (
    <div className="w=screen bg-gray-50 p-4 h-screen">
      <div className="md:mx-auto bg-gray-200 h-full flex flex-col md:flex-row">
        <div className=" md:w-1/4 md:h-3/4 self-center sm:w-full m-4 flex-col flex items-center p-4">
          <img
            src={session.user?.image || ''}
            alt="logo"
            className="rounded-full h-24 w-24 border border-gray-300 mb-8 mt-4"
          />
          <div className="flex flex-col w-full text-center">
            <p className="text-sm font-bold text-gray-500 mb-4">{session.user?.name}</p>
            <p className="text-xs font-semibold text-gray-400">{session.user?.email}</p>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => setIsCreateMode((prev) => !prev)}
              className="mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-300"
            >
              {!isCreateMode ? 'Create gig' : 'Cancel'}
            </button>
            {!isCreateMode ? null : <CreateGigForm />}
          </div>
          <button
            onClick={() => signOut()}
            className="mt-4 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Sign out
          </button>
        </div>
        <div className="border border-black w-3/4"></div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  const session = await getSession({ req });
  if (!session) {
    res.writeHead(302, {
      Location: '/login',
    });
    res.end();
    return;
  }

  return { props: { session } };
}

export default Dashboard;
