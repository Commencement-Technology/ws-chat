import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormContainer } from './login-form.styles';
import { useNavigate } from 'react-router-dom';
import { Token, UserDetails } from '@ws-chat/common/src/index';

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await fetch(`http://localhost:4000/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'token' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.statusText);
      const response = (await res.json()) as UserDetails & Token;
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <LoginFormContainer onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <label htmlFor="email">Email</label>
      <input {...register('email', { required: true })} />
      <label htmlFor="password">Password</label>
      <input {...register('password', { required: true })} type="password" />
      {errors.email && <span>[Email]: {errors.email.message}</span>}
      {errors.password && <span>[Password]: {errors.password.message}</span>}
      <input type="submit" />
    </LoginFormContainer>
  );
};
