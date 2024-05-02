export interface User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly password: string;
  readonly created: string;
}

export interface Token {
  readonly token: string;
}

export type UserDetails = Pick<User, 'id' | 'email' | 'name'>;
