import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import CreateGigForm from '../forms/createGig';

interface SidePanelProps {
  user: Session['user'];
}

const FallbackImage = ({ initials }: { initials: string }) => (
  <div className="rounded-full h-28 w-28 border border-gray-300 mb-8 mt-4 flex justify-center items-center text-5xl text-gray-400 font-bold">
    {initials}
  </div>
);
export const SidePanel = ({ user }: SidePanelProps) => {
  const onCreateGig = () => setIsCreateMode((prev) => !prev);
  const [isCreateMode, setIsCreateMode] = useState(false);
  return (
    <div className=" md:w-1/4 md:h-3/4 self-center sm:w-full m-4 flex-col flex items-center p-4">
      {user?.image ? (
        <img src={user.image} alt="logo" className="rounded-full h-28 w-28 border-4 border-gray-400 mb-8 mt-4" />
      ) : (
        <FallbackImage initials="A" />
      )}
      <div className="flex flex-col w-full text-center">
        <p className="text-sm font-bold text-gray-500 mb-4">{user?.name}</p>
        <p className="text-xs font-semibold text-gray-400">{user?.email}</p>
      </div>
      <div className="flex flex-col">
        <button
          onClick={() => setIsCreateMode((prev) => !prev)}
          className="self-center mt-4 w-32 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-300"
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
  );
};

export default SidePanel;
