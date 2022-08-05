import { CreateGigSchema } from './../../../constants/schemas/gig';
import { TRPCError } from '@trpc/server';
import { GigType } from '@prisma/client';
import { createRouter } from '../context';
import { ByIdInputSchema } from '../../../constants/schemas/shared';
import { Events } from '../../../constants/events';
import { z } from 'zod';

export const gigRouter = createRouter()
  .mutation('create-gig', {
    input: CreateGigSchema,
    resolve({ ctx, input }) {
      const session = ctx.session;

      if (!session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const gig = ctx.prisma.gig.create({
        data: {
          title: input.title,
          description: input.description,
          startDate: input.startDate,
          userId: session.user.id,
          logo: input.logoUrl,
          type: input.type,
        },
      });

      ctx.ee.emit(Events.CREATE_GIG, gig);

      return gig;
    },
  })
  .query('gigs', {
    input: z.object({
      orderBy: z.string(),
    }),
    resolve({ ctx, input }) {
      let orderBy = {};

      if (input.orderBy === 'title') {
        orderBy = { title: 'asc' };
      } else {
        orderBy = { createdAt: input.orderBy || 'desc' };
      }

      return ctx.prisma.gig.findMany({
        where: {
          userId: ctx.session?.user?.id,
        },
        include: {
          tasks: true,
        },
        orderBy,
      });
    },
  })
  .query('gig-short', {
    input: ByIdInputSchema,
    resolve({ ctx, input: { id } }) {
      return ctx.prisma.gig.findUnique({
        where: {
          id,
        },
      });
    },
  })
  .query('gig-by-id', {
    input: ByIdInputSchema,
    resolve({ ctx, input }) {
      const gig = ctx.prisma.gig.findUnique({
        where: {
          id: input.id,
        },
        include: {
          gigContact: true,
          tasks: true,
          invoices: {
            include: {
              items: true,
              expenses: true,
            },
          },
        },
      });

      if (!gig) {
        throw new TRPCError({ code: 'NOT_FOUND', message: `Gig ${input.id} not found` });
      }

      return gig;
    },
  })
  .query('gig-count', {
    input: ByIdInputSchema,
    resolve({ ctx, input }) {
      return ctx.prisma.gig.count({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation('delete-gig', {
    input: ByIdInputSchema,
    resolve({ ctx, input }) {
      const session = ctx.session;

      if (!session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      ctx.prisma.gig.delete({
        where: {
          id: input.id,
        },
      });

      return true;
    },
  });
