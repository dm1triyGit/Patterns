import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { store } from './app/stores';
import { Provider } from 'react-redux';
import { ThemeStoreProvider } from './app/theme-store-provider.tsx';
import App from '@app/app';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Есть обновления приложения. Обновить?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    alert('Приложение будет работать оффлайн. По крайней мере постарается.');
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
