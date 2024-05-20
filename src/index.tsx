import 'reset-css';
import '@core/di/dependencies';
import 'react-hot-loader';

import ReactDOM from 'react-dom/client';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

import { initializeStateManagement } from '@core/state-management/setup';
import { Confirmation } from '@shared/components/confirmation';
import { Notification } from '@shared/components/notification';

const App = React.lazy(() => import('./app'));

async function initializeApp() {
  try {
    initializeStateManagement();

    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

    root.render(
      <BrowserRouter>
          <CssBaseline />
          <Confirmation />
          <Notification />
          <App />
      </BrowserRouter>
    );
  } catch (err) {
    alert('Sorry, we are running a problem while loading the App');

    throw err;
  }
}

initializeApp();
