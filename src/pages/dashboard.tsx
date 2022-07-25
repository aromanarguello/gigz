import { Divider, Tab, TabList, TabPanel, Tabs } from '@chakra-ui/react';
import { getSession, signIn, useSession } from 'next-auth/react';
import Gig, { GigPanel } from '../components/dashboard/tabs';

import SidePanel from '../components/dashboard/sidepanel/sidepanel';

export const Dashboard = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  return (
    <div className="w=screen bg-gray-50 h-screen overflow-y-auto">
      <div className="md:mx-auto bg-gray-200 h-full flex flex-col md:flex-row overflow-y-auto">
        <SidePanel user={session.user} />
        <div className=" md:w-3/4 p-4 h-1/2">
          <GigPanel />
        </div>
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
