import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { ByIdInputSchema } from '../../../constants/schemas/shared';
import { createRouter } from '../context';

export const TaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  timeEstimateAmount: z.number().optional(),
  timeEstimateUnit: z.enum(['SECOND', 'MINUTE', 'HOUR', 'DAY']).optional(),
  deadline: z.date().optional(),
  gigId: z.string(),
});

const UpdateTaskSchema = z.object({
  id: z.string(),
  task: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    timeEstimateAmount: z.number().optional(),
    timeEstimateUnit: z.enum(['SECOND', 'MINUTE', 'HOUR', 'DAY']).optional(),
    deadline: z.date().optional(),
    gigId: z.string().optional(),
    isPriority: z.boolean().optional(),
  }),
});

export const gigTaskRouter = createRouter()
  .mutation('createTask', {
    input: TaskSchema,
    resolve({ ctx, input }) {
      console.log('🚀 ~ file: task.ts ~ line 32 ~ resolve ~ input', input);
      const session = ctx.session;

      if (!session?.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.prisma.gigTasks.create({
        data: { ...input },
      });
    },
  })
  .mutation('updateTask', {
    input: UpdateTaskSchema,
    resolve({ ctx, input: { id, task } }) {
      const session = ctx.session;

      if (!session?.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.prisma.gigTasks.update({
        where: { id },
        data: { ...task },
      });
    },
  })
  .query('tasksByGigId', {
    input: ByIdInputSchema,
    resolve({ ctx, input: { id } }) {
      const session = ctx.session;

      if (!session?.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.prisma.gigTasks.findMany({
        where: { gigId: id },
      });
    },
  })
  .query('taskById', {
    input: ByIdInputSchema,
    resolve({ ctx, input: { id } }) {
      const session = ctx.session;

      if (!session?.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.prisma.gigTasks.findUnique({
        where: { id },
      });
    },
  })
  .mutation('deleteTask', {
    input: ByIdInputSchema,
    resolve({ ctx, input }) {
      const session = ctx.session;

      if (!session?.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.prisma.gigTasks.delete({
        where: { id: input.id },
      });
    },
  });
