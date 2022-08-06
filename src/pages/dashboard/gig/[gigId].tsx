import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { CashIcon, ClipboardListIcon, PencilIcon, ViewBoardsIcon, ViewListIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import BaseButton from '../../../components/buttons/base';
import DashboardLayout from '../../../components/layouts/dashboard';
import CreateGigTaskModal from '../../../components/modals/createGigTask';
import TaskList from '../../../components/tasks/taskList';
import { trpc } from '../../../utils/trpc';

const GigPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const router = useRouter();
  const gigId = router.query.gigId as string;

  const handleBack = () => router.back();
  const handleDeleteMode = () => setIsDeleteMode((prev) => !prev);

  const openModal = () => setIsOpen(true);

  return (
    <DashboardLayout>
      <div>
        <Tabs>
          <div className="flex justify-between pt-4">
            <TabList className="text-lg font-semibold text-gray-400 px-4 space-x-10">
              <Tab>
                <ClipboardListIcon className="w-4 h-4 mr-2" />
                List Tasks
              </Tab>
              <Tab isDisabled>
                <ViewBoardsIcon className="w-4 h-4 mr-2" />
                Board
              </Tab>
              <Tab isDisabled>
                <ViewListIcon className="w-4 h-4 mr-2" />
                Timeline
              </Tab>
              <Tab isDisabled>
                <CashIcon className="w-4 h-4 mr-2" />
                Invoices
              </Tab>
              <Tab isDisabled>
                <PencilIcon className="w-4 h-4 mr-2" />
                Notepad
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
              <div className=""></div>
              <BaseButton text="Delete" onClick={handleDeleteMode} />
              <TaskList gigId={gigId} isDeleteMode={isDeleteMode} />
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
