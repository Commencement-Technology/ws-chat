import { Lobby } from '../lobby/lobby';
import { PageLayout } from './page-layout';

export const LoginPage = () => {
  return (
    <PageLayout heading="Login">
      <Lobby />
    </PageLayout>
  );
};
