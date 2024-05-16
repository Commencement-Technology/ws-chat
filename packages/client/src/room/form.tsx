import { FormEvent, useState } from 'react';

const createMessage = (input: string, userId: string) => ({
  content: input,
  userId,
});

export const Form = ({ userId }: { userId: string }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    createMessage(input, userId);
    setInput('');
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
