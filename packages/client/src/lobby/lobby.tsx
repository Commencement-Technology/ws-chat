import { styled } from 'styled-components';
import { useAuth } from '../auth/use-auth.hook';
import { RoomDetails, RoomId } from '@ws-chat/common/src';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RoomList } from './room-list';
import { useNavigate } from 'react-router-dom';

const CreateButton = styled.button`
  background-color: lightgreen;
  border: none;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
`;

type RoomName = Pick<RoomDetails, 'name'>;

export const Lobby = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomName>();

  const handleCreateRoom: SubmitHandler<RoomName> = async (data: RoomName) => {
    try {
      const token = auth.getToken();
      if (!token) throw new Error('Not logged in');
      const res = await fetch(`http://localhost:4000/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ name: data.name, owner: auth.user?.id }),
      });
      if (!res.ok) throw new Error(res.statusText);

      const response = (await res.json()) as RoomDetails;

      navigate(`/lobby/room/${response.id}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <h3>Welcome to the Lobby!</h3>
      <form onSubmit={(e) => void handleSubmit(handleCreateRoom)(e)}>
        <label htmlFor="name">Room name</label>
        <input {...register('name', { required: true })} type="text" />
        {errors.name && <span>[Room Name]: {errors.name.message}</span>}
        <CreateButton type="submit">Create Room</CreateButton>
      </form>
      <ul>
        <RoomList />
      </ul>
    </>
  );
};
