import { v4 as uuid } from 'uuid';
import { Context } from '../db/connection';
import bcrypt from 'bcryptjs';

export interface User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly password: string;
  readonly created: string;
}

export type CreateUserInput = Pick<User, 'email' | 'name' | 'password'>;

export type LoginUserInput = Pick<User, 'email' | 'password'>;

export const insertUser = async ({ db }: Context, userData: CreateUserInput): Promise<string> => {
  try {
    const userId = uuid();
    const hashedPassword = bcrypt.hashSync(userData.password);
    const sql = `INSERT INTO users (id, email, name, password) VALUES($1, $2, $3, $4) RETURNING *`;
    const values = [userId, userData.email, userData.name, hashedPassword];

    const {
      rows: [user],
    } = await db.query<User>(sql, values);

    if (user) return 'ok';
    return 'failed';
  } catch (error) {
    console.error(error);
    return 'failed';
  }
};

const getUserByEmail = async ({ db }: Context, userEmail: string): Promise<User | null> => {
  try {
    const sql = `SELECT FROM users WHERE email = $1`;
    const values = [userEmail];

    const {
      rows: [user],
    } = await db.query<User>(sql, values);

    if (user) return user;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const loginUser = async ({ db }: Context, userData: LoginUserInput): Promise<boolean> => {
  const { email, password } = userData;

  const userOrNull = await getUserByEmail({ db }, email);

  if (!userOrNull) return false;

  const isPasswordMatching = bcrypt.compareSync(password, userOrNull.password);

  if (!isPasswordMatching) return false;

  return true;
};
