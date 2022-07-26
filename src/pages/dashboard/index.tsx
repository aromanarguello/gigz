import { Divider, Tab, TabList, TabPanel, Tabs } from '@chakra-ui/react';
import { getSession, signIn, useSession } from 'next-auth/react';
import Gig, { GigPanel } from '../../components/dashboard/tabs';

import SidePanel from '../../components/dashboard/sidepanel/sidepanel';
import DashboardLayout from '../../components/layouts/dashboard';

export const Dashboard = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  return (
    <DashboardLayout>
      <GigPanel />
    </DashboardLayout>
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
