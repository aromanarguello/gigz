import { z } from 'zod';

export const ByIdInputSchema = z.object({
  id: z.string(),
});
