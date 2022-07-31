import { GigType } from '@prisma/client';
import { z } from 'zod';

const gigs = Object.values(GigType);

export const CreateGigSchema = z.object({
  title: z.string(),
  description: z.string(),
  startDate: z.date(),
  logoUrl: z.string().optional(),
  type: z.string().optional(),
});
