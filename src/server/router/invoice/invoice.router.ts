import { ByIdInputSchema } from './../../../constants/schemas/shared';
import { createRouter } from '../context';
import invoiceService from './invoice.service';
import { InvoiceSchema } from './invoice.schema';
import { TRPCError } from '@trpc/server';

export const invoiceRouter = createRouter()
  .query('getAll', {
    resolve({ ctx }) {
      const userId = ctx.session?.user?.id;

      if (!userId) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return invoiceService.getAll(userId, { include: { gig: true } });
    },
  })
  .mutation('create', {
    input: InvoiceSchema,
    resolve({ input }) {
      return invoiceService.create(input);
    },
  });
