import { UserDetails } from '@ws-chat/common/src';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useAuth } from '../auth/use-auth.hook';

interface PageLayoutProps {
  children: React.ReactNode;
  heading: string;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #e8e7e7;
  height: 100vh;
`;

const NavBar = styled.div`
  display: flex;
  background: lightblue;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;

const LoggedInUserDetail = styled.p`
  font-size: 0.8rem;
  color: #222;
`;

const AuthButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
`;

const BodyContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
`;

export const PageLayout = (props: PageLayoutProps) => {
  const { children, heading } = props;
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = (data: UserDetails | null) => {
    if (data === auth.user) auth.logout();
  };

  return (
    <PageContainer>
      <NavBar>
        <h1>{heading}</h1>
        <ButtonGroup>
          {auth.user ? (
            <>
              <LoggedInUserDetail>User: {auth.user.email}</LoggedInUserDetail>
              <AuthButton onClick={() => handleLogout(auth.user)}>Logout</AuthButton>
            </>
          ) : (
            <>
              <AuthButton onClick={() => navigate('/login')}>Login</AuthButton>
              <AuthButton onClick={() => navigate('/register')}>Register</AuthButton>
            </>
          )}
        </ButtonGroup>
      </NavBar>
      <BodyContainer>{children}</BodyContainer>
    </PageContainer>
  );
};
