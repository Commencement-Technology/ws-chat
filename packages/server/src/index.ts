import express, { Request, Response } from 'express';
import { MessageInput, addMessage, getAllMessages } from './messages/messages.controller';
import { Client } from 'pg';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { createUser } from './user/user.controller';
import { CreateUserInput, LoginUserInput, loginUser } from './user/user.repository';

const app = express();
const db = new Client();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

async function clientConnect() {
  await db.connect();
  console.log('Postgres database connected');
}

app.use(express.json());
app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/messages', async (_: Request, res: Response) => {
  const messages = await getAllMessages({ db });
  res.send(messages);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/messages', async (req: Request, res: Response) => {
  const message = await addMessage({ db }, req.body as MessageInput);
  if (message) {
    res.status(201).send(message);
  }
  res.status(500).send();
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/user/new', async (req: Request, res: Response) => {
  const user = await createUser({ db }, req.body as CreateUserInput);
  if (user) {
    res.status(200).send(user);
  }
  res.status(500).send();
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/user/login', async (req: Request, res: Response) => {
  const isUserLoggedIn = await loginUser({ db }, req.body as LoginUserInput);
  if (isUserLoggedIn) {
    res.status(200).send(isUserLoggedIn);
  }
  res.status(500).send();
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

void clientConnect();
server.listen(4000, () => console.log('Server started on port 4000'));
