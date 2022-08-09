// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { gigRouter } from './gig/gig/gig.router';
import { gigTaskRouter } from './gig/task/task.router';
import { timerRouter } from './timer/timer.router';
import { invoiceRouter } from './invoice/invoice.router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('gig.', gigRouter)
  .merge('task.', gigTaskRouter)
  .merge('timer.', timerRouter)
  .merge('invoice.', invoiceRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
