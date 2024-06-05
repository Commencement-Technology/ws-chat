import { Message } from '@ws-chat/common/src';
import { styled } from 'styled-components';

const StyledMessage = styled.p`
  background-color: lightseagreen;
  border-radius: 1em;
  padding: 0.5em 1em;
  margin: 0.5em;
  margin-right: 4em;
`;

export const MessageText = ({ message }: { message: Message }) => {
  return (
    <>
      message goes here
      {/* <StyledMessage key={message.id}>
        {message.user.name}: {message.content}
      </StyledMessage> */}
    </>
  );
};
