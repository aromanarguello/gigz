import {
  ChevronDoubleDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  FlagIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { GigTasks } from '@prisma/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { toHHMMSS } from '../../utils/helpers';

import { trpc } from '../../utils/trpc';
import Timer from '../timer/timer';

interface TaskCardProps {
  isDeleteMode: boolean;
  gigId: string;
}

const TaskList = ({ gigId, isDeleteMode }: TaskCardProps) => {
  const [tasks, setTasks] = useState<GigTasks[]>([]);
  const [isPriority, setIsPriority] = useState(false);
  const [expandedCardIds, setExpandedCardIds] = useState<string[]>([]);

  const { data } = trpc.useQuery(['task.tasksByGigId', { id: gigId }]);
  const { data: totalTaskTime } = trpc.useQuery(['timer.totalTime', { ids: expandedCardIds }], {
    keepPreviousData: true,
  });
  const { mutateAsync: deleteTask } = trpc.useMutation(['task.deleteTask']);
  const { mutateAsync: updateTask } = trpc.useMutation(['task.updateTask']);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const handlePriority = (taskId: string, isPriority: boolean) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          task.isPriority = !isPriority;
        }
        return task;
      })
    );

    updateTask({
      id: taskId,
      task: {
        isPriority: !isPriority,
      },
    });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask({ id });

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleExpand = (id: string) => {
    setExpandedCardIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((taskId) => taskId !== id);
      }
      return [...prev, id];
    });
  };

  const isExpanded = (id: string) => expandedCardIds.includes(id);

  return (
    <ul className="mt-8 space-y-4 px-4">
      {tasks?.map((task) => (
        <li
          key={task.id}
          className={`w-3/4 h-44 md:h-${isExpanded(task.id) ? '[800] full grid-row-2' : '16'}
          bg-gray-50 rounded-lg sm:flex sm:flex-wrap 
          md:grid md:grid-cols-5 md:justify-center px-4 justify-evenly items-center`}
        >
          <div>
            <p className="text-gray-400 font-bold text-xs">Title</p>
            <p className="font-semibold text-gray-500 capitalize">{task.title}</p>
          </div>
          <div>
            <p className="text-gray-400 font-bold text-xs">Start date</p>
            <p className="font-semibold text-gray-500">{dayjs(task.createdAt).format('MMM DD, YYYY')}</p>
          </div>
          <div>
            <p className="text-gray-400 font-bold text-xs">End date</p>
            <div className="flex">
              <ClockIcon className="w-6 h-6 mr-2 text-gray-400" />
              <p className="font-semibold text-gray-500">
                {task.deadline ? dayjs(task.deadline).format('MMM DD, YYYY') : '--'}
              </p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 font-bold text-xs">Status</p>
            <p className="font-semibold text-gray-500 capitalize">{task.status.replace('_', ' ')}</p>
          </div>
          <div className="grid grid-cols-2  justify-center ">
            <FlagIcon
              onClick={() => handlePriority(task.id, task.isPriority)}
              className={`w-6 h-6 mr-2 ${(isPriority || task.isPriority) && 'text-blue-500'} cursor-pointer`}
            />
            {isExpanded(task.id) ? (
              <ChevronUpIcon
                onClick={() => handleExpand(task.id)}
                className="w-6 h-6 mr-2 text-gray-400 cursor-pointer"
              />
            ) : (
              <ChevronDownIcon
                onClick={() => handleExpand(task.id)}
                className="w-6 h-6 mr-2 text-gray-400 cursor-pointer"
              />
            )}
            {/* <PencilIcon className="w-6 h-6 mr-2 text-gray-400 cursor-pointer hover:text-bl-500" /> */}
            {isDeleteMode && (
              <TrashIcon
                onClick={() => handleDeleteTask(task.id)}
                className="w-6 h-6 mr-2 text-gray-400 cursor-pointer hover:text-red-500"
              />
            )}
          </div>
          {isExpanded(task.id) && (
            <div className="flex flex-col justify-center">
              <p className="font-semibold text-gray-600 my-4">
                Total time spent: {toHHMMSS((totalTaskTime && totalTaskTime[task.id]) || 0)}
              </p>
              <Timer id={task.id} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
