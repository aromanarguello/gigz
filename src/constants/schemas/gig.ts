import { GigType } from '@prisma/client';
import { z } from 'zod';

const GIG_TYPE_ENUM = ['CONSULTING', 'CONTRACT', 'TEMPORARY', 'LEAD', 'FULL_TIME', 'ADVISOR'] as const;

export const CreateGigSchema = z.object({
  title: z.string(),
  description: z.string(),
  startDate: z.date(),
  logoUrl: z.string().optional(),
  type: z.enum(GIG_TYPE_ENUM),
});
