// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { gigRouter } from './gig/gig';
import { gigTaskRouter } from './gig/task';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('gig.', gigRouter)
  .merge('task.', gigTaskRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
