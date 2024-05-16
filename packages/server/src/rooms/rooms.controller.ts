import { getRooms, insertRoom } from './rooms.repository';
import { Context } from '../db/connection';
import { CreateRoomInput, RoomDetails, RoomId } from '@ws-chat/common/src';

export const getAllRooms = async (ctx: Context): Promise<RoomDetails[]> => await getRooms(ctx);

export const createRoom = async (ctx: Context, room: CreateRoomInput): Promise<RoomId | null> =>
  await insertRoom(ctx, room);
