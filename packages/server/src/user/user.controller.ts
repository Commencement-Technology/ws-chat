import { Context } from '../db/connection';
import {
  UserDetails,
  CreateUserInput,
  LoginUserInput,
  insertUser,
  loginUser,
} from './user.repository';

export const createUser = async (
  ctx: Context,
  userData: CreateUserInput,
): Promise<UserDetails | null> => await insertUser(ctx, userData);

export const logUserIn = async (ctx: Context, userData: LoginUserInput): Promise<boolean> =>
  await loginUser(ctx, userData);
