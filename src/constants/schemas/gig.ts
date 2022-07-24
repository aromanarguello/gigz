import { z } from 'zod';

export const CreateGigSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  startDate: z.date().optional(),
});
