import { Context } from '../db/connection';
import { MessageInput } from './messages.controller';
import { v4 as uuid } from 'uuid';

export interface Message {
  readonly id: string;
  readonly content: string;
  readonly created: string;
  readonly userId: string;
}

export const insertMessage = async (
  { db }: Context,
  message: MessageInput,
): Promise<Message | null> => {
  try {
    const messageId = uuid();
    const sql = `INSERT INTO messages (id, content, user_id) VALUES($1, $2, $3) RETURNING *`;
    const values = [messageId, message.content, message.userId];

    const {
      rows: [msg],
    } = await db.query<Message>(sql, values);

    return msg;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMessages = async ({ db }: Context): Promise<Message[]> => {
  try {
    const sql = `SELECT id, content, created, user_id as "userId" FROM messages`;

    const { rows, rowCount } = await db.query<Message>(sql);

    return !rowCount ? [] : rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};
