import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { BriefcaseIcon, InboxIcon } from '@heroicons/react/solid';

import GigTab from './gig';

export const GigPanel = () => {
  return (
    <Tabs>
      <TabList className="text-sm font-semibold text-gray-500 px-4">
        <Tab>
          <BriefcaseIcon className="w-4 h-4 mr-2" />
          Gigs
        </Tab>
        <Tab>
          <InboxIcon className="w-4 h-4 mr-2" />
          Contacts
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <GigTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default GigPanel;
