import { Message, getMessages, insertMessage } from './messages.repository';
import { Context } from '../db/connection';

export interface MessageInput {
  content: string;
  userId: string;
}

export const getAllMessages = async (ctx: Context): Promise<Message[]> => await getMessages(ctx);

export const addMessage = async (ctx: Context, message: MessageInput): Promise<Message | null> =>
  await insertMessage(ctx, message);
