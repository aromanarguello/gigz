import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { ByIdInputSchema } from '../../../constants/schemas/shared';
import { createRouter } from '../context';

const CreateItemSchema = z.array(
  z.object({
    title: z.string(),
    amount: z.number(),
    quantity: z.number(),
    rate: z.number(),
  })
);

const CreateExpenseSchema = z
  .array(
    z.object({
      title: z.string(),
      amount: z.number(),
    })
  )
  .optional();

const CreateInvoiceSchema = z.object({
  gigId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  amount: z.number(),
  currency: z.string(),
  userId: z.string(),
  items: CreateItemSchema,
  expenses: CreateExpenseSchema,
});

export const gigInvoiceRouter = createRouter()
  .mutation('create-invoice', {
    input: CreateInvoiceSchema,
    resolve({ ctx, input }) {
      const session = ctx.session;

      if (!session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.prisma.invoice.create({
        data: {
          ...input,
          userId: session.user.id,
          items: {
            create: input.items,
          },
          expenses: {
            create: input.expenses,
          },
        },
      });
    },
  })
  .query('invoices-by-gig-id', {
    input: ByIdInputSchema,
    resolve({ ctx, input }) {
      const invoices = ctx.prisma.invoice.findMany({
        where: {
          gigId: input.id,
        },
      });

      if (!invoices) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return invoices;
    },
  });
