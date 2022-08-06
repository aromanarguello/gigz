import { ClockIcon, FlagIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { GigTasks } from '@prisma/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { trpc } from '../../utils/trpc';

interface TaskCardProps {
  isDeleteMode: boolean;
  gigId: string;
}

const TaskList = ({ gigId, isDeleteMode }: TaskCardProps) => {
  const [tasks, setTasks] = useState<GigTasks[]>([]);
  const [isPriority, setIsPriority] = useState(false);
  const { data } = trpc.useQuery(['task.tasksByGigId', { id: gigId }]);
  const { mutateAsync: deleteTask } = trpc.useMutation(['task.deleteTask']);
  const { mutateAsync: updateTask } = trpc.useMutation(['task.updateTask']);

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

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return (
    <ul className="mt-8 space-y-4 px-4">
      {tasks?.map((task) => (
        <li
          key={task.id}
          className="w-3/4 h-44 md:h-16 bg-gray-50 rounded-lg sm:flex sm:flex-wrap md:grid md:grid-cols-5 md:justify-center px-4 justify-evenly items-center"
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
            {/* <PencilIcon className="w-6 h-6 mr-2 text-gray-400 cursor-pointer hover:text-bl-500" /> */}
            {isDeleteMode && (
              <TrashIcon
                onClick={() => handleDeleteTask(task.id)}
                className="w-6 h-6 mr-2 text-gray-400 cursor-pointer hover:text-red-500"
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
