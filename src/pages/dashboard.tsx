import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
export const Dashboard = () => {
  const { data: session } = useSession();

  const router = useRouter();

  if (!session) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }

  return (
    <div className="w=screen bg-gray-50 p-4 h-screen">
      <div className="md:mx-auto bg-gray-200 h-full flex flex-col md:flex-row">
        <div className=" md:w-1/4 md:h-3/4 self-center sm:w-full m-4 flex-col flex items-center p-4">
          <img src={session.user?.image} className="rounded-full h-24 w-24 border border-gray-300 mb-8 mt-4" />
          <div className="flex flex-col w-full text-center">
            <p className="text-sm font-bold text-gray-500 mb-4">{session.user?.name}</p>
            <p className="text-xs font-semibold text-gray-400">{session.user?.email}</p>
          </div>
        </div>
        <div className="border border-black w-3/4"></div>
      </div>
    </div>
  );
};

export default Dashboard;
