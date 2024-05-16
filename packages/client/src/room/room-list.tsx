import { RoomDetails } from '@ws-chat/common/src';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../auth/use-auth.hook';

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 2em;
  width: 20em;
`;

export const RoomList = () => {
  const [rooms, setRooms] = useState<RoomDetails[]>([]);
  const auth = useAuth();
  const token = auth.getToken();

  useEffect(() => {
    async function getAllRooms() {
      const res = await fetch(`http://localhost:4000/rooms`, {
        headers: {
          Authorization: token || '',
        },
      });
      if (!res.ok) throw new Error(res.statusText);
      console.log('RESPONSE: ', res);
      const response = (await res.json()) as RoomDetails[];
      setRooms(response);
    }

    getAllRooms().catch((e) => console.log(e));
  }, []);

  console.log('ROOMS: ', rooms);

  return (
    <List>
      {rooms.map((r) => (
        <li>
          {r.name} - {r.memberCount}
        </li>
      ))}
    </List>
  );
};
