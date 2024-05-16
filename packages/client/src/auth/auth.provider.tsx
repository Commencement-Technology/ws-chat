import { ReactNode, useState } from 'react';
import { AuthContext } from './auth.context';
import { Token, UserDetails } from '@ws-chat/common/src';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [token, setToken] = useState(localStorage.getItem('site') || '');

  const login = (data: UserDetails & Token) => {
    console.log('LOGGING IN: ', data);
    setUser({ id: data.id, name: data.name, email: data.email });
    setToken(token);
    localStorage.setItem('site', data.token);
    return;
  };

  const logout = (data: UserDetails) => {
    console.log('LOGGING OUT: ', data);
    setUser(null);
    setToken('');
    localStorage.removeItem('site');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
