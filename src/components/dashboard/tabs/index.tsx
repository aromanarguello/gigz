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
      <Tabs>
        <div className="flex justify-between pt-4">
          <TabList className="text-lg font-semibold text-gray-500 px-4 space-x-10">
            <Tab>
              <BriefcaseIcon className="w-4 h-4 mr-2" />
              Gigs
            </Tab>
            <Tab isDisabled>
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar
            </Tab>
            <Tab isDisabled>
              <InboxIcon className="w-4 h-4 mr-2" />
              Contacts
            </Tab>
            <Tab isDisabled>
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Budgets
            </Tab>
          </TabList>
          <button
            onClick={openModal}
            className="mr-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-3xl shadow-lg"
          >
            Add New Gig
          </button>
        </div>
        <TabPanels>
          <TabPanel p="0">
            <GigTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <CreateGigModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default GigPanel;
