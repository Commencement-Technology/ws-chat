import { UserDetails } from '@ws-chat/common/src';
import { useAuth } from '../auth/use-auth.hook';

export const Lobby = () => {
  const auth = useAuth();
  const handleLogout = (data: UserDetails | null) => {
    if (data) {
      auth.logout(data);
    }
  };
  return (
    <>
      <h1>Welcome to the Lobby!</h1>
      <ul>
        <li>Rooms will be listed here...</li>
      </ul>
      {auth.user && (
        <>
          <p>{auth.user.name} is logged in</p>
          <button name="logout" onClick={() => handleLogout(auth.user)}>
            Logout
          </button>
        </>
      )}
    </>
  );
};
