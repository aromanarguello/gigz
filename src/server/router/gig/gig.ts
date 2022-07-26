import { CreateGigSchema } from './../../../constants/schemas/gig';
import { TRPCError } from '@trpc/server';
import { GigType } from '@prisma/client';
import { createRouter } from '../context';
import { z } from 'zod';

export const gigRouter = createRouter()
  .mutation('create-gig', {
    input: CreateGigSchema,
    resolve({ ctx, input }) {
      const session = ctx.session;

      if (!session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.prisma.gig.create({
        data: {
          title: input.title,
          description: input.description,
          startDate: input.startDate,
          userId: session.user.id,
          type: GigType.CONSULTING,
        },
      });
    },
  })
  .query('gigs', {
    resolve({ ctx }) {
      return ctx.prisma.gig.findMany({
        where: {
          userId: ctx.session?.user?.id,
        },
      });
    },
  })
  .query('gig', {
    input: z.object({
      id: z.string(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.gig.findUnique({
        where: {
          id: input.id,
        },
      });
    },
  });
