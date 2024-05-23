export interface User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly password: string;
  readonly created: string;
}

export type UserId = Pick<User, 'id'>;

export interface Token {
  readonly token: string;
}

export type UserDetails = Pick<User, 'id' | 'email' | 'name'>;

export interface RoomMember {
  readonly roomId: string;
  readonly userId: UserId;
}

export interface RoomDetails {
  readonly id: string;
  readonly name: string;
  readonly owner: UserId;
}

export interface MemberCount {
  readonly memberCount: number;
}

export type RoomDetailsWithMemberCount = RoomDetails & MemberCount;

export type RoomId = Pick<RoomDetails, 'id'>;

export type CreateRoomInput = Pick<RoomDetails, 'name' | 'owner'>;
