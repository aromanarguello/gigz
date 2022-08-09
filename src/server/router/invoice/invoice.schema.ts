import { z } from 'zod';

export const InvoiceSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  userId: z.string(),
  gigId: z.string(),
  sentAt: z.date().optional(),
  amount: z.number(),
  items: z.array(
    z.object({
      title: z.string(),
      amount: z.number(),
      rate: z.number(),
      quantity: z.number(),
    })
  ),
  expenses: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        amount: z.number(),
      })
    )
    .optional(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
