import { z } from 'zod';
import { ByIdInputSchema } from '../../../constants/schemas/shared';
import { createRouter } from '../context';

export const timerRouter = createRouter()
  .mutation('startTimer', {
    input: z.object({
      taskId: z.string(),
      startedAt: z.date(),
    }),
    resolve({ ctx, input: { taskId, startedAt } }) {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new Error('You must be logged in to create a timer');
      }
      const timer = ctx.prisma.taskTimer.create({ data: { taskId, startedAt, userId } });

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
        data: { isActive: false },
      });

      return timer;
    },
  });
