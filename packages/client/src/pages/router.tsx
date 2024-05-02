import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../page-not-found';
import { MessageList } from '../message-list';
import { RegistrationPage } from './registration-page';
import { LoginPage } from './login-page';

export const Router = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="room">
        <Route index element={<MessageList userId="123" />} />
        {/* <Route path="create" element={<CreateFlow />} /> */}
        {/* <Route path=":id/duplicate" element={<DuplicateFlow />} /> */}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
