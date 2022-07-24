// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { authRouter } from './auth';
import { gigRouter } from './gig/gig';

export const appRouter = createRouter().transformer(superjson).merge('auth.', authRouter).merge('gig.', gigRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
