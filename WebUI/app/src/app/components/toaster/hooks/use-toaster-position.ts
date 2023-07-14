import { Breakpoints } from '@app/shared/assets';
import { SnackbarOrigin, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';

export const useToasterPosition = (): SnackbarOrigin => {
  const [origin, setOrigin] = useState<SnackbarOrigin>({
    vertical: 'bottom',
    horizontal: 'center',
  });
  const matches = useMediaQuery(Breakpoints.TABLET);

  useEffect(() => {
    if (matches) {
      setOrigin({ vertical: 'bottom', horizontal: 'right' });
    }
  }, [matches]);

  return origin;
};
