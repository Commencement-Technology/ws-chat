import { RoomDetailsWithMemberCount } from '@ws-chat/common/src';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../auth/use-auth.hook';
import { useNavigate } from 'react-router-dom';

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 2em;
  width: 20em;
`;

export const RoomList = () => {
  const [rooms, setRooms] = useState<RoomDetailsWithMemberCount[]>([]);
  const auth = useAuth();
  const navigate = useNavigate();
  const token = auth.getToken();

  useEffect(() => {
    async function getAllRooms() {
      const res = await fetch(`http://localhost:4000/rooms`, {
        headers: { Authorization: token ?? '' },
      });
      if (!res.ok) throw new Error(res.statusText);
      const response = (await res.json()) as RoomDetailsWithMemberCount[];
      setRooms(response);
    }

    getAllRooms().catch((e) => console.error(e));
  }, []);

  return (
    <List>
      {rooms.map((r) => (
        <li>
          {r.name} (Member count: {r.memberCount})
          <button type="button" onClick={() => navigate(`/lobby/room/${r.id}`)}>
            Go to room
          </button>
        </li>
      ))}
    </List>
  );
};
