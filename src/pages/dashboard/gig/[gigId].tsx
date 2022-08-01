import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { BriefcaseIcon, CashIcon, ClipboardListIcon, InboxIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BaseButton from '../../../components/buttons/base';

import GigTab from '../../../components/dashboard/tabs/gig';
import DashboardLayout from '../../../components/layouts/dashboard';
import CreateGigTaskModal from '../../../components/modals/createGigTask';
import { trpc } from '../../../utils/trpc';

const GigPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const gigId = router.query.gigId as string;
  const { data: gig } = trpc.useQuery(['gig.gig-by-id', { id: gigId }]);

  const handleBack = () => router.back();
  const openModal = () => setIsOpen(true);

  return (
    <DashboardLayout>
      <div>
        <Tabs>
          <div className="flex justify-between pt-4">
            <TabList className="text-lg font-semibold text-gray-500 px-4 space-x-10">
              <Tab>
                <ClipboardListIcon className="w-4 h-4 mr-2" />
                Tasks
              </Tab>
              <Tab>
                <CashIcon className="w-4 h-4 mr-2" />
                Invoices
              </Tab>
            </TabList>
            <button
              onClick={openModal}
              className="mr-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-3xl shadow-lg"
            >
              Add New Task
            </button>
          </div>
          <TabPanels>
            <TabPanel p="0">
              <div className="border border-black h-12"></div>
              <div></div>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <BaseButton onClick={handleBack} text="BACK" />
      </div>
      <CreateGigTaskModal isOpen={isOpen} setIsOpen={setIsOpen} gigId={gigId} />
    </DashboardLayout>
  );
};

export default GigPage;
