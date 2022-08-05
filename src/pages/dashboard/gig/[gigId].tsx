import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import {
  CashIcon,
  ClipboardListIcon,
  ClockIcon,
  FlagIcon,
  PencilIcon,
  ViewBoardsIcon,
  ViewListIcon,
} from '@heroicons/react/solid';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import BaseButton from '../../../components/buttons/base';
import DashboardLayout from '../../../components/layouts/dashboard';
import CreateGigTaskModal from '../../../components/modals/createGigTask';
import TaskCard from '../../../components/tasks/taskCard';
import { trpc } from '../../../utils/trpc';

const GigPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPriority, setIsPriority] = useState(false);
  const router = useRouter();
  const gigId = router.query.gigId as string;
  const { data: tasks } = trpc.useQuery(['task.tasks-by-gig-id', { id: gigId }]);
  const { mutateAsync: updateTask } = trpc.useMutation(['task.update-task']);

  const handleBack = () => router.back();
  const handlePriority = (taskId: string, isPriority: boolean) => {
    updateTask({
      id: taskId,
      task: {
        isPriority: !isPriority,
      },
    });
  };
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
              <ul className="mt-8 space-y-4">
                {tasks?.map((task) => (
                  <Fragment key={task.id}>
                    <TaskCard task={task} handlePriority={handlePriority} />
                  </Fragment>
                ))}
              </ul>
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
