import { getSession, signIn, useSession } from 'next-auth/react';

import SidePanel from '../components/dashboard/sidepanel/sidepanel';

export const Dashboard = () => {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  return (
    <div className="w=screen bg-gray-50 p-4 h-screen">
      <div className="md:mx-auto bg-gray-200 h-full flex flex-col md:flex-row overflow-y-auto">
        <SidePanel user={session.user} />
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
