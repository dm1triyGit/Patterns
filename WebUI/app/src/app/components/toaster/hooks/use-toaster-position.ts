import { SnackbarOrigin, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import { Breakpoints } from '@/shared/enums';

export const useToasterPosition = (): SnackbarOrigin => {
  const [origin, setOrigin] = useState<SnackbarOrigin>({
    vertical: 'bottom',
    horizontal: 'center',
  });
  const matches = useMediaQuery(Breakpoints.Mobile);

  useEffect(() => {
    if (matches) {
      setOrigin({ vertical: 'bottom', horizontal: 'left' });
    }
  }, [matches]);

  return origin;
};
