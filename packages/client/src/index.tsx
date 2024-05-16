import 'core-js';
import 'normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
// import { io } from 'socket.io-client';
import { Router } from './pages/router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/auth.provider';

// const socket = io('ws://localhost:4000');

// socket.io.open((err) => {
//   if (err) {
//     console.error('WebSocket error occurred');
//   } else {
//     console.log('WebSocket opened');
//   }
// });

// socket.on('connect', () => {
//   console.log('WebSocket connected');
// });

const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif 
  }
`;

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <GlobalStyles />
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
