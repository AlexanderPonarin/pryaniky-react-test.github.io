import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HashRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </Provider>,
);
