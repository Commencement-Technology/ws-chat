import { Message } from '@ws-chat/common/src';
import { styled } from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

const StyledMessage = styled.p`
  margin: 0.5em;
`;

const StyledAvatar = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #043764;
  color: white;
  line-height: 24px;
  height: 24px;
  width: 24px;
`;

const Avatar = ({ userName }: { userName: string }) => {
  return <StyledAvatar>{userName[0].toUpperCase()}</StyledAvatar>;
};

export const MessageText = ({ message }: { message: Message }) => {
  return (
    <MessageContainer>
      <Avatar userName={message.user.name} />
      <StyledMessage key={message.id}>{message.content}</StyledMessage>
    </MessageContainer>
  );
};
