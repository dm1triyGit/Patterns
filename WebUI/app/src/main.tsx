import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { store } from './app/stores';
import { Provider } from 'react-redux';
import { ThemeStoreProvider } from './app/theme-store-provider.tsx';
import App from '@app/app';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeStoreProvider>
        <App />
      </ThemeStoreProvider>
    </Provider>
  </React.StrictMode>,
);
