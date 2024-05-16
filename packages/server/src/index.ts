import express, { Request, Response } from 'express';
import { MessageInput, addMessage, getAllMessages } from './messages/messages.controller';
import { Client } from 'pg';
import { createServer } from 'http';
// import { Server } from 'socket.io';
import cors from 'cors';
import { createUser, logUserIn, logUserInWithToken } from './user/user.controller';
import { CreateUserInput, LoginUserInput } from './user/user.repository';
import { auth } from './auth/auth.middleware';
import { createRoom, getAllRooms } from './rooms/rooms.controller';
import { CreateRoomInput } from '@ws-chat/common/src';

const app = express();
const db = new Client();
const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

async function clientConnect() {
  await db.connect();
  console.log('Postgres database connected');
}

app.use(express.json());
app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/messages', auth, async (_: Request, res: Response) => {
  const messages = await getAllMessages({ db });
  res.send(messages);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/messages', auth, async (req: Request, res: Response) => {
  const message = await addMessage({ db }, req.body as MessageInput);
  if (message) {
    res.status(201).send(message);
  }
  res.status(500).send();
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/room', auth, async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateRoomInput;
    const result = await createRoom({ db }, body);

    res.status(200).send(result);
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(500).send({ error: 'Unexpected error' });
    return;
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/rooms', auth, async (_: Request, res: Response) => {
  const rooms = await getAllRooms({ db });
  res.send(rooms);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/user/new', async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateUserInput;
    const result = await createUser({ db }, body);

    res.status(200).send(result);
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(500).send({ error: 'Unexpected error' });
    return;
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/user/login', async (req: Request, res: Response) => {
  const userDetails = await logUserIn({ db }, req.body as LoginUserInput);
  if (userDetails) {
    res.status(200).send(userDetails);
    return;
  }
  res.status(500).send({ error: 'Login failed' });
  return;
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/user/verify', async (req: Request, res: Response) => {
  const userDetails = await logUserInWithToken({ db }, req.body as { token: string });
  console.log('ENDPOINT: ', userDetails);
  if (userDetails) {
    res.status(200).send(userDetails);
    return;
  }
  res.status(500).send({ error: 'Login failed' });
  return;
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

void clientConnect();
server.listen(4000, () => console.log('Server started on port 4000'));
