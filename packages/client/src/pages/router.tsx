import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from './page-not-found';
import { RegistrationPage } from './registration-page';
import { LoginPage } from './login-page';
import { Lobby } from '../lobby/lobby';

export const Router = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/lobby">
        <Route index element={<Lobby />} />
        {/* <Route index element={<MessageList userId="123" />} /> */}
        {/* <Route path="create" element={<CreateFlow />} /> */}
        {/* <Route path=":id/duplicate" element={<DuplicateFlow />} /> */}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
