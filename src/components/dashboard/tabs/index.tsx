import { Tabs, TabList, Tab, TabPanel, Divider, TabPanels } from '@chakra-ui/react';
import GigTab from './gig';

export const GigPanel = () => {
  return (
    <div className="border border-gray-300 h-max rounded-lg p-8">
      <Tabs>
        <TabList>
          <Tab>Gigs</Tab>
          <Tab>Contacts</Tab>
        </TabList>
        <Divider />
        <TabPanels>
          <TabPanel>
            <GigTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default GigPanel;
