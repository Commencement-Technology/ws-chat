import { Message } from '@ws-chat/common/src';
import { styled } from 'styled-components';
import { useAuth } from '../auth/use-auth.hook';

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

const StyledMessage = styled.p`
  margin: 0.5em;
`;

const StyledAvatar = styled.div.attrs<{ $mine: string }>((props) => ({
  $mine: props.$mine || 'false',
}))`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.$mine === 'true' ? '#043764' : '#3e688c')};
  color: white;
  line-height: 24px;
  height: 24px;
  width: 24px;
`;

const Avatar = ({ userName, userId }: { userName: string; userId: string }) => {
  const auth = useAuth();
  const mine = auth.user?.id === userId ? 'true' : 'false';

  return <StyledAvatar $mine={mine}>{userName[0].toUpperCase()}</StyledAvatar>;
};

export const MessageText = ({
  message: {
    user: { name, id: userId },
    id,
    content,
  },
}: {
  message: Message;
}) => {
  return (
    <MessageContainer>
      <Avatar userName={name} userId={userId} />
      <StyledMessage key={id}>{content}</StyledMessage>
    </MessageContainer>
  );
};
