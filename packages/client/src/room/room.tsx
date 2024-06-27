import { useEffect, useMemo, useState } from 'react';
import { MessageText } from './message-text';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Message, RoomDetails } from '@ws-chat/common/src';
import { useAuth } from '../auth/use-auth.hook';
import { MessageForm } from './form';
import { socket } from '..';
import { PageLayout } from '../pages/page-layout';

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  width: 100%;
  margin: 0;
`;

const ChatContainer = styled.div`
  overflow: scroll;
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
`;

const RoomBodyContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1 1 0;
  justify-content: space-between;
`;

export const Room = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<RoomDetails | null>(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const token = auth.getToken();

  socket.on('chat message', (msg: string) => {
    const newMessage = JSON.parse(msg) as Message;
    setMessages([...messages, newMessage]);
  });

  const getRoomDetails = useMemo(
    () => async () => {
      try {
        const res = await fetch(`http://localhost:4000/rooms/${roomId ?? ''}`, {
          headers: { 'Content-Type': 'application/json', Authorization: token ?? '' },
        });
        if (!res.ok) throw new Error(res.statusText);
        const response = (await res.json()) as RoomDetails;
        setRoom(response);
      } catch (err) {
        console.error(err);
      }
    },
    [],
  );

  const getAllMessages = useMemo(
    () => async () => {
      try {
        if (!roomId) throw new Error('Room ID missing');
        const res = await fetch(`http://localhost:4000/rooms/${roomId}/messages`, {
          headers: { 'Content-Type': 'application/json', Authorization: token ?? '' },
        });
        if (!res.ok) throw new Error(res.statusText);
        const response = (await res.json()) as Message[];
        setMessages(response);
      } catch (err) {
        console.error('Failed to get messages', err);
      }
    },
    [],
  );

  useEffect(() => {
    if (!room) void getRoomDetails();
    void getAllMessages();
  }, []);

  return (
    <PageLayout heading={`Room: ${room?.name ? room.name : 'error'}`}>
      <RoomBodyContainer>
        <button type="button" onClick={() => navigate('/lobby')}>
          Back to Lobby
        </button>
        <ChatContainer>
          <List>
            {messages.map((message) => (
              <MessageText key={message.id} message={message} />
            ))}
          </List>
        </ChatContainer>
        <MessageForm />
      </RoomBodyContainer>
    </PageLayout>
  );
};
