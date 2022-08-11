import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { BriefcaseIcon, CalendarIcon, CreditCardIcon, InboxIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import CreateGigModal from '../../modals/createGig';

import GigTab from './gig';

export const GigPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  return (
    <>
      <div className="flex justify-end items-center py-2">
        <button
          onClick={openModal}
          className="mr-4  bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold  px-4 rounded-3xl shadow-lg h-10"
        >
          Add New Gig
        </button>
      </div>
      <GigTab />
      <CreateGigModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default GigPanel;
