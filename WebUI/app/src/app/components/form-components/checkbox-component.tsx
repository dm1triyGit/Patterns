import { CheckboxProps } from '@mui/material';
import { forwardRef } from 'react';
import {
  CheckboxIcon,
  StyledCheckbox,
  CheckboxCheckedIcon,
} from './components';

export const CheckboxComponent = forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => (
    <StyledCheckbox
      ref={ref}
      disableFocusRipple
      disableRipple
      {...props}
      icon={<CheckboxIcon />}
      checkedIcon={<CheckboxCheckedIcon />}
    />
  ),
);

CheckboxComponent.displayName = 'checkbox-component';
