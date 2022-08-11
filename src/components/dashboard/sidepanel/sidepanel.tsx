import {
  AdjustmentsIcon,
  BriefcaseIcon,
  CalendarIcon,
  CloudIcon,
  CogIcon,
  CollectionIcon,
  CreditCardIcon,
  InboxInIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

import BaseButton from '../../buttons/base';

interface SidePanelProps {
  user: Session['user'];
}

const menuStyles =
  'border-b-2 border-gray-300 w-1/2 flex items-center justify-center flex-col space-y-2 hover:text-blue-500 cursor-pointer ';
const menuButtonTextStyles = 'text-sm text-gray-400 font-semibold';
const iconStyles = 'w-6 h-6 text-gray-400';

const FallbackImage = ({ initials }: { initials: string }) => (
  <div className="rounded-full h-28 w-28 border border-gray-300 mb-8 mt-4 flex justify-center items-center text-5xl text-gray-400 font-bold">
    {initials}
  </div>
);
export const SidePanel = ({ user }: SidePanelProps) => {
  return (
    <div className=" md:w-1/6 self-center sm:w-1/5 m-4 flex-col flex items-center p-4">
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
      <div className="flex flex-col w-full text-center my-8">
        <p className="text-sm font-bold text-gray-500 mb-4">{user?.name}</p>
        <p className="text-xs font-semibold text-gray-400">{user?.email}</p>
      </div>
      <div className="border-2 border-gray-300 rounded-lg w-full h-[500px] flex flex-wrap">
        <div className={`${menuStyles} border-r-2 border-gray-300`}>
          <BriefcaseIcon className={iconStyles} />
          <p className={menuButtonTextStyles}>Gigs</p>
        </div>
        <div className={menuStyles}>
          <UserGroupIcon className={iconStyles} />
          <p className={menuButtonTextStyles}>Clients</p>
        </div>
        <div className={`${menuStyles} border-r-2 border-gray-300`}>
          <CloudIcon className={iconStyles} />
          <p className={menuButtonTextStyles}>Files</p>
        </div>
        <div className={menuStyles}>
          <CollectionIcon className={iconStyles} />
          <p className={menuButtonTextStyles}>Invoices</p>
        </div>
        <div className={`${menuStyles} border-r-2 border-gray-300`}>
          <CreditCardIcon className={iconStyles} />
          <p className={menuButtonTextStyles}>Payments</p>
        </div>
        <div className={menuStyles}>
          <InboxInIcon className={iconStyles} />
          <p className={menuButtonTextStyles}>Emails</p>
        </div>
        <div className={`${menuStyles} border-b-0 border-r-2 border-gray-300`}>
          <CalendarIcon className={iconStyles} />
          <p className={menuButtonTextStyles}>Calendars</p>
        </div>
        <div className={`${menuStyles} border-b-0`}>
          <CogIcon className={iconStyles} />
          <p className={menuButtonTextStyles}>Settings</p>
        </div>
      </div>
      <BaseButton text="Sign Out" onClick={() => signOut()} />
    </div>
  );
};

export default SidePanel;
