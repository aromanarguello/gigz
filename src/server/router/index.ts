// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { gigRouter } from './gig/gig';
import { gigTaskRouter } from './gig/task';
import { timerRouter } from './timer/timer';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('gig.', gigRouter)
  .merge('task.', gigTaskRouter)
  .merge('timer.', timerRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
