import { createContext } from './router/context';
import ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { appRouter } from './router';

const wss = new ws.Server({ port: 3001 });

const handler = applyWSSHandler({
  router: appRouter,
  createContext,
  wss,
});

wss.on('connection', () => {
  console.log('++ ws connection ${wss.clients.size}');

  wss.on('close', () => {
    console.log(`-- ws connection ${wss.clients.size}`);
  });
});

console.log(`WS server started on port 3001`);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');

  handler.broadcastReconnectNotification();
  wss.close();
});
