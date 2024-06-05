import { styled } from 'styled-components';
import { Message } from '../types';

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
      <StyledMessage key={message.id}>
        {message.userId}: {message.content}
      </StyledMessage>
    </>
  );
};
