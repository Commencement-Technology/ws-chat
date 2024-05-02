import { styled } from 'styled-components';

interface PageLayoutProps {
  children: React.ReactNode;
  heading: string;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50vw;
  background: lightgrey;
  padding: 2rem;
  color: black;
`;

export const PageLayout = (props: PageLayoutProps) => {
  const { children, heading } = props;

  return (
    <PageContainer>
      <h1>{heading}</h1>
      {children}
    </PageContainer>
  );
};
