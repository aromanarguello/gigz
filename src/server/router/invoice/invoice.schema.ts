import { z } from 'zod';

export const ItemsSchema = z.array(
  z.object({
    title: z.string(),
    amount: z.number(),
    rate: z.number(),
    quantity: z.number(),
  })
);

export const ExpensesSchema = z
  .array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      amount: z.number(),
    })
  )
  .optional();

export const InvoiceSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  userId: z.string(),
  gigId: z.string(),
  sentAt: z.date().optional(),
  amount: z.number(),
  items: ItemsSchema,
  expenses: ExpensesSchema,
});

export type Invoice = z.infer<typeof InvoiceSchema>;
