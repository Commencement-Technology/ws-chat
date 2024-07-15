import { EventResponse } from '@ws-chat/common/src';
import { Socket } from 'socket.io-client';

export const emitAck = (socket: Socket, event: string, payload: string) => {
  socket.timeout(5000).emit(event, payload, (err: Error | null, response: EventResponse) => {
    if (!err) console.log(response.status); // 'ok'
  });
};
