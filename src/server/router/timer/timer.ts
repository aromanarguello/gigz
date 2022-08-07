import { TaskTimer } from '@prisma/client';
import { z } from 'zod';
import { ByIdInputSchema } from '../../../constants/schemas/shared';
import { createRouter } from '../context';

export const timerRouter = createRouter()
  .mutation('startTimer', {
    input: z.object({
      taskId: z.string(),
      startedAt: z.date(),
    }),
    async resolve({ ctx, input: { taskId, startedAt } }) {
      const userId = ctx.session?.user?.id;
      let timer: TaskTimer;
      if (!userId) {
        throw new Error('You must be logged in to create a timer');
      }
      const existingTimer = await ctx.prisma.taskTimer.findFirst({ where: { taskId, isActive: true } });

      if (existingTimer) {
        timer = await ctx.prisma.taskTimer.update({ where: { id: existingTimer.id }, data: { startedAt: new Date() } });
      } else {
        timer = await ctx.prisma.taskTimer.create({ data: { taskId, startedAt, userId } });
      }

      return timer;
    },
  })
  .mutation('stopTimer', {
    input: z.object({
      id: z.string(),
      stoppedAt: z.date(),
    }),
    resolve({ ctx, input: { id, stoppedAt } }) {
      const timer = ctx.prisma.taskTimer.update({
        where: { id },
        data: { stoppedAt },
      });
      return timer;
    },
  })
  .mutation('saveTimer', {
    input: ByIdInputSchema,
    resolve({ ctx, input: { id } }) {
      const timer = ctx.prisma.taskTimer.update({
        where: { id },
        data: { isActive: false, stoppedAt: new Date() },
      });

      return timer;
    },
  })
  .query('timers', {
    input: ByIdInputSchema,
    resolve({ ctx, input: { id } }) {
      const timers = ctx.prisma.taskTimer.findMany({
        where: { taskId: id, isActive: false },
      });

      return timers;
    },
  })
  .query('totalTime', {
    input: z.object({
      ids: z.string().array(),
    }),
    async resolve({ ctx, input: { ids } }) {
      const timers = await ctx.prisma.taskTimer.findMany({
        where: { taskId: { in: ids }, NOT: { stoppedAt: null } },
      });

      let totalTime: { [key: string]: number } = {};
      for (const timer of timers) {
        const { taskId, stoppedAt, startedAt } = timer;

        if (!stoppedAt) {
          throw new Error('Timer is not stopped');
        }

        const time = (stoppedAt.getTime() - startedAt.getTime()) / 1000;

        totalTime[taskId] = totalTime[taskId] ? (totalTime[taskId] += time) : time;
      }

      return totalTime;
    },
  });
