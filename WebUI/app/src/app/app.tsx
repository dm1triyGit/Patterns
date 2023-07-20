import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App;
