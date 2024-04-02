import { Checkbox, FormControl, Input, Radio, styled } from '@mui/material';

export const CheckboxIcon = styled('span', { label: 'unchecked' })(
  ({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    width: 18,
    height: 18,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.text.disabled}`,
    transition: theme.transitions.create('border-color'),
  }),
);

export const CheckboxCheckedIcon = styled(CheckboxIcon, { label: 'checked' })(
  ({ theme }) => ({
    borderColor: 'transparent',
    backgroundColor: theme.palette.primary.main,

    '&:before': {
      display: 'block',
      width: 18,
      height: 18,
      content: '""',
      backgroundPosition: '-1px -1px',
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 8.5L7.5 12L14.5 5' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E%0A\")",
    },
  }),
);

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  marginRight: theme.spacing(0.25),
}));

export const StyledRadioWrapper = styled(FormControl)(({ theme }) => ({
  '.MuiFormLabel-root': {
    marginBottom: theme.spacing(1.5),
    fontWeight: 500,
    color: theme.palette.text.primary,

    '&.Mui-focused': {
      color: theme.palette.text.primary,
    },
  },
}));

export const StyledRadioButton = styled(Radio)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  paddingTop: 0,
  paddingBottom: 0,

  svg: {
    color: theme.palette.secondary.light,
  },
}));

export const StyledInputWrapper = styled('div')(({ theme }) => ({
  position: 'relative',

  '.MuiFormHelperText-root': {
    position: 'absolute',
    bottom: -22,
    left: 0,
    color: theme.palette.error.light,
  },
}));

export const StyledInputLabel = styled('label')(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(2),
  fontWeight: 500,
}));

export const StyledInputComponent = styled(Input, {
  shouldForwardProp: prop => !['limit', 'minHeight'].includes(prop.toString()),
})<{ limit?: number; minHeight?: number }>(({ theme, color, minHeight }) => {
  return {
    display: 'flex',
    padding: 0,
    border: `1px solid ${
      color === 'error'
        ? theme.palette.error.light
        : theme.palette.text.disabled
    }`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    boxShadow: '0px 4px 16px rgba(7, 20, 48, 0.04)',

    input: {
      padding: theme.spacing(0, 2),
      minHeight: 48,
    },

    textarea: {
      padding: theme.spacing(2),
      minHeight: minHeight ?? 120,
      boxSizing: 'border-box',
    },

    [theme.breakpoints.up('lmd')]: {
      input: {
        minHeight: 56,
      },
    },
  };
});
