import { z } from 'zod';

export const CreateGigSchema = z.object({
  title: z.string(),
  description: z.string(),
  startDate: z.date(),
});
