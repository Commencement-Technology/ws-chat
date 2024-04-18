import { ReactNode } from 'react';
import { AuthContext } from './auth.context';

// interface LoginUserInput {
//   email: string;
//   password: string;
// }
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(localStorage.getItem('site') || '');

  const login = () => true;
  const logout = () => true;
  // const login = async (data: LoginUserInput) => {
  //   try {
  //     const response = await fetch('http://localhost:4000/user/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const res = await response.json();
  //     if (res.data) {
  //       setUser(res.data.user);
  //       setToken(res.token);
  //       localStorage.setItem('site', res.token);
  //       navigate('/dashboard');
  //       return;
  //     }
  //     throw new Error(res.message);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const logout = () => {
  // setUser(null);
  // setToken('');
  // localStorage.removeItem('site');
  // };

  const isAuthenticated = false;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
