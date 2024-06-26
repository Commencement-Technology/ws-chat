/* eslint-disable @typescript-eslint/no-misused-promises */
import { FormEvent, useState } from 'react';
import { useAuth } from '../auth/use-auth.hook';
import { useParams } from 'react-router-dom';

export const MessageForm = () => {
  const { roomId } = useParams();
  const auth = useAuth();
  const [input, setInput] = useState('');
  const token = auth.getToken();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    try {
      const body = JSON.stringify({ content: input, userId: auth.user?.id, roomId });

      await fetch(`http://localhost:4000/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token ?? '' },
        body,
      });
      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          id="message"
          name="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Ok</button>
      </form>
    </div>
  );
};
