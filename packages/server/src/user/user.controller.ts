import { Context } from '../db/connection';
import {
  CreateUserInput,
  LoginUserInput,
  UserDetails,
  insertUser,
  loginUser,
} from './user.repository';

export const createUser = async (
  ctx: Context,
  userData: CreateUserInput,
): Promise<UserDetails | null> => {
  if (!userData.email || !userData.name || !userData.password) {
    throw new Error('Missing user data');
  }
  return await insertUser(ctx, userData);
};

export const logUserIn = async (
  ctx: Context,
  userData: LoginUserInput,
): Promise<UserDetails | null> => await loginUser(ctx, userData);
