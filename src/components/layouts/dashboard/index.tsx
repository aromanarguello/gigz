import { signIn, useSession } from 'next-auth/react';
import SidePanel from '../../dashboard/sidepanel/sidepanel';

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  return (
    <div className="w-screen bg-gray-50 h-screen overflow-y-auto">
      <div className=" bg-gray-100 md:w-full h-full flex flex-col md:flex-row overflow-y-auto">
        <SidePanel user={session.user} />
        <div className="md:w-3/4">
          <div className="border border-gray-300 h-[900px] rounded-lg overflow-y-hidden mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
