import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import BaseButton from '../../buttons/base';
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
  const [isCreateMode, setIsCreateMode] = useState(false);
  return (
    <div className=" md:w-1/4 md:h-3/4 self-center sm:w-full m-4 flex-col flex items-center p-4">
      {user?.image ? (
        <Image
          src={user.image}
          alt="logo"
          width="112px"
          height="112px"
          className="rounded-full border-4 border-gray-400 mb-8 mt-4"
        />
      ) : (
        <FallbackImage initials="A" />
      )}
      <div className="flex flex-col w-full text-center mt-8">
        <p className="text-sm font-bold text-gray-500 mb-4">{user?.name}</p>
        <p className="text-xs font-semibold text-gray-400">{user?.email}</p>
      </div>
      <div className="flex flex-col">
        <BaseButton text={isCreateMode ? 'Cancel' : 'Create Gig'} onClick={() => setIsCreateMode((prev) => !prev)} />
        {!isCreateMode ? null : <CreateGigForm />}
      </div>
      <BaseButton text="Sign Out" onClick={() => signOut()} />
    </div>
  );
};

export default SidePanel;
