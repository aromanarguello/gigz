import { Tabs, TabList, Tab, TabPanel, Divider, TabPanels } from '@chakra-ui/react';
import GigTab from './gig';

export const GigPanel = () => {
  return (
    <Tabs className="border-0 border-b-gray-300">
      <TabList className="text-sm font-semibold text-gray-500">
        <Tab>Gigs</Tab>
        <Tab>Contacts</Tab>
      </TabList>
      <Divider />
      <div className="h-[670px] overflow-y-auto mt-4">
        <TabPanels className="overflow-y-auto">
          <TabPanel>
            <GigTab />
          </TabPanel>
        </TabPanels>
      </div>
    </Tabs>
  );
};

export default GigPanel;
