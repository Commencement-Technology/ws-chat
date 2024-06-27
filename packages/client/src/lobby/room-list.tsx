import { RoomDetailsWithMemberCount } from '@ws-chat/common/src';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../auth/use-auth.hook';
import { useNavigate } from 'react-router-dom';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RoomItem = styled.li`
  padding: 0.5rem 0;
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
        <RoomItem key={r.id}>
          <a
            type="button"
            href={`/lobby/room/${r.id}`}
            onClick={() => navigate(`/lobby/room/${r.id}`)}
          >
            {r.name} (Member count: {r.memberCount})
          </a>
        </RoomItem>
      ))}
    </List>
  );
};
