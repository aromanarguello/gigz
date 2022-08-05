import { ClockIcon, FlagIcon } from '@heroicons/react/solid';
import { GigTasks } from '@prisma/client';
import dayjs from 'dayjs';

interface TaskCardProps {
  task: GigTasks;
  handlePriority: (taskId: string, isPriority: boolean) => void;
}

const TaskCard = ({ task, handlePriority }: TaskCardProps) => {
  return (
    <li
      key={task.id}
      className="w-3/4 h-44 md:h-16 bg-gray-50 rounded-lg sm:flex sm:flex-wrap md:grid md:grid-cols-5 md:justify-center px-4 justify-evenly items-center"
    >
      <p className="font-semibold text-gray-500 capitalize">{task.title}</p>
      <p className="font-semibold text-gray-500">Start date: {dayjs(task.createdAt).format('MMM DD, YYYY')}</p>
      <div className="flex">
        <ClockIcon className="w-6 h-6 mr-2 text-gray-400" />
        <p className="font-semibold text-gray-500">
          End date: {task.deadline ? dayjs(task.deadline).format('MMM DD, YYYY') : '--'}
        </p>
      </div>
      <p className="font-semibold text-gray-500 capitalize">Status: {task.status}</p>
      <FlagIcon
        onClick={() => handlePriority(task.id, task.isPriority)}
        className={`w-6 h-6 mr-2 ${task.isPriority && 'text-blue-500'} cursor-pointer`}
      />
    </li>
  );
};

export default TaskCard;
