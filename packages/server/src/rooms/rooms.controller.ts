import { getRoomById, getRooms, insertRoom } from './rooms.repository';
import { Context } from '../db/connection';
import {
  CreateRoomInput,
  RoomDetails,
  RoomDetailsWithMemberCount,
  RoomId,
} from '@ws-chat/common/src';

export const getAllRooms = async (ctx: Context): Promise<RoomDetailsWithMemberCount[]> =>
  await getRooms(ctx);

export const getRoom = async (ctx: Context, roomId: string): Promise<RoomDetails | null> =>
  await getRoomById(ctx, roomId);

export const createRoom = async (ctx: Context, room: CreateRoomInput): Promise<RoomId | null> =>
  await insertRoom(ctx, room);
