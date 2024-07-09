import { useEffect, useMemo, useState } from 'react';
import { ChatMessage } from './chat-message/chat-message';
import { useNavigate, useParams } from 'react-router-dom';
import { Message, RoomDetails } from '@ws-chat/common/src';
import { useAuth } from '../auth/use-auth.hook';
import { MessageForm } from './form/form';
import { PageLayout } from '../pages/page-layout';
import { RoomBodyContainer, ChatContainer, List, BackButton } from './room.styles';
import { socket } from '..';

export const Room = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<RoomDetails | null>(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const token = auth.getToken();

  socket.on('chat message', (msg: Message) => {
    setMessages([...messages, msg]);
  });

  // socket.emit('join room', auth.user?.id);

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
  }, [room]);

  const handleLeaveRoom = async () => {
    try {
      if (!roomId) throw new Error('Room ID missing');
      const res = await fetch(
        `http://localhost:4000/rooms/${roomId}/members/${auth?.user?.id ?? ''}`,
        {
          headers: { 'Content-Type': 'application/json', Authorization: token ?? '' },
          method: 'DELETE',
        },
      );
      if (!res.ok) throw new Error(res.statusText);

      socket.disconnect();
      navigate('/lobby');
    } catch (err) {
      console.error('Failed to get messages', err);
    }
  };

  return (
    <PageLayout heading={`Room: ${room?.name ? room.name : 'error'}`}>
      <RoomBodyContainer>
        <BackButton type="button" onClick={() => void handleLeaveRoom()}>
          {'◀ Leave'}
        </BackButton>
        <ChatContainer>
          <List>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </List>
        </ChatContainer>
        <MessageForm />
      </RoomBodyContainer>
    </PageLayout>
  );
};
