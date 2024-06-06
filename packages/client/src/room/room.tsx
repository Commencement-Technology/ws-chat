import { useEffect, useState } from 'react';
import { MessageText } from './message-text';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Message, RoomDetails } from '@ws-chat/common/src';
import { useAuth } from '../auth/use-auth.hook';
import { MessageForm } from './form';

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 2em;
  width: 20em;
`;

export const Room = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<RoomDetails | null>(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const token = auth.getToken();

  useEffect(() => {
    async function getRoomDetails() {
      const res = await fetch(`http://localhost:4000/rooms/${roomId ?? ''}`, {
        headers: { 'Content-Type': 'application/json', Authorization: token ?? '' },
      });
      if (!res.ok) throw new Error(res.statusText);
      const response = (await res.json()) as RoomDetails;
      setRoom(response);
    }

    if (!room) {
      getRoomDetails().catch((e) => console.error(e));
    }

    async function getAllMessages() {
      try {
        if (!roomId) throw new Error('Room ID missing');
        console.log('Room Id in client: ', roomId);
        const res = await fetch(`http://localhost:4000/rooms/${roomId}/messages`, {
          headers: { 'Content-Type': 'application/json', Authorization: token ?? '' },
        });
        if (!res.ok) throw new Error(res.statusText);
        const response = (await res.json()) as Message[];
        setMessages(response);
      } catch (err) {
        console.error('Failed to get messages', err);
      }
    }

    getAllMessages().catch((e) => console.error(e));
  }, []);

  // ws.onmessage = (e) => {
  //   const msgObject = JSON.parse(e.data as string) as Message;
  //   setMessages([...messages, msgObject]);
  // };

  return (
    <List>
      <button type="button" onClick={() => navigate('/lobby')}>
        Back to Lobby
      </button>
      <h1>Room: {room?.name}</h1>
      <MessageForm />
      {messages.map((message) => (
        <MessageText key={message.id} message={message} />
      ))}
    </List>
  );
};
