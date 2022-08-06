import { TaskTimer } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';

interface TimerProps {
  id: string;
}

const Timer = ({ id }: TimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [runningTimer, setRunningTimer] = useState<TaskTimer | null>(null);

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
    }
    // @ts-ignore
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const secondsToHms = (s: number) => ({
    hours: ((s - (s % 3600)) / 3600) % 60 || '00',
    minutes: ((s - (s % 60)) / 60) % 60 || '00',
    seconds: s % 60 || '00',
  });

  return (
    <div>
      <div className="space-x-4">
        <button onClick={start} disabled={isRunning} className={`${isRunning && 'cursor-not-allowed'}`}>
          Start
        </button>
        <button onClick={stop}>Stop</button>
        <button onClick={save}>Save</button>
      </div>
      <div>{`${secondsToHms(seconds).hours} : ${secondsToHms(seconds).minutes} : ${
        secondsToHms(seconds).seconds
      }`}</div>
    </div>
  );
};

export default Timer;
