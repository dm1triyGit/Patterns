import { AlertColor } from '@mui/material';

export interface Toaster {
  message: string;
  severety: AlertColor;
  key: number;
}
