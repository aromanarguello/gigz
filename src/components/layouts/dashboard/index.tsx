import { signIn, useSession } from 'next-auth/react';
import SidePanel from '../../dashboard/sidepanel/sidepanel';

export const DashboardLayout = ({ children }) => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  return (
    <div className="w=screen bg-gray-50 h-screen overflow-y-auto">
      <div className="md:mx-auto bg-gray-200 h-full flex flex-col md:flex-row overflow-y-auto">
        <SidePanel user={session.user} />
        <div className=" md:w-3/4 p-4">
          <div className="border border-gray-300 h-[800px] rounded-lg p-8 overflow-y-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
