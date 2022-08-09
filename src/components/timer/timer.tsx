import { TaskTimer } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import { toHHMMSS } from '../../utils/helpers';
import { trpc } from '../../utils/trpc';

interface TimerProps {
  id: string;
}

const buttonStyles = `border border-gray-300 w-12 text-xs text-gray-500 font-semibold bg-gray-200 rounded-sm`;

const Timer = ({ id }: TimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [runningTimer, setRunningTimer] = useState<TaskTimer | null>(null);
  const { data: activeTimer } = trpc.useQuery(['timer.activeTimers', { id }], {
    keepPreviousData: true,
  });

  const { mutateAsync: startTimer } = trpc.useMutation(['timer.startTimer']);
  const { mutateAsync: stopTimer } = trpc.useMutation(['timer.stopTimer']);
  const { mutateAsync: saveTimer } = trpc.useMutation(['timer.saveTimer']);

  const save = () => {
    setSeconds(0);
    setIsRunning(false);
    if (runningTimer) {
      saveTimer({ id: runningTimer?.id });
    }
  };

  const stop = () => {
    setIsRunning(false);
    if (runningTimer) {
      stopTimer({ id: runningTimer?.id, stoppedAt: new Date() });
    }
  };

  const start = async () => {
    setIsRunning(true);
    const timer = await startTimer({ taskId: id, startedAt: new Date() });
    setRunningTimer(timer);
  };

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (activeTimer) {
      setRunningTimer(activeTimer);
      let timer: number;
      // FIX
      if (activeTimer.stoppedAt) {
        timer = Math.floor((activeTimer.stoppedAt.getTime() - activeTimer?.startedAt.getTime()) / 1000);
        setIsRunning(false);
        setSeconds(timer);
      } else {
        timer = Math.floor((new Date(activeTimer?.startedAt).getTime() - new Date().getTime()) / 1000);
        setIsRunning(true);
        interval = setInterval(() => {
          setSeconds(timer + 1);
        }, 1000);
      }
    }
    // @ts-ignore
    return () => clearInterval(interval);
  }, [isRunning, seconds, activeTimer]);

  return (
    <div className="border broder-blue-500 rounded-lg w-64 h-18 flex flex-col items-center">
      <div className="space-x-4 flex justify-center my-2">
        <button onClick={start} disabled={isRunning} className={`${isRunning && `cursor-not-allowed`} ${buttonStyles}`}>
          Start
        </button>
        <button onClick={stop} className={buttonStyles}>
          Stop
        </button>
        <button onClick={save} className={buttonStyles}>
          Save
        </button>
      </div>
      <div className="text-2xl font-semibold text-gray-500">{toHHMMSS(seconds)}</div>
    </div>
  );
};

export default Timer;
