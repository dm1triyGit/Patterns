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

  // '.phone-input .invalid-number-message': {
  //   display: 'none',
  // },

  // '.form-control.phone-input__input': {
  //   paddingLeft: 82,
  //   width: '100%',
  //   minHeight: 48,
  //   color: theme.palette.text.secondary,
  //   borderColor: theme.palette.misc.dark,
  //   borderRadius: theme.shape.borderRadius,
  //   boxShadow: '0px 4px 16px rgba(7, 20, 48, 0.04)',

  //   '&.invalid-number': {
  //     borderColor: theme.palette.error.main,
  //     backgroundColor: 'transparent',
  //   },

  //   [theme.breakpoints.up('lmd')]: {
  //     minHeight: 56,
  //   },
  // },

  // '.country-list.phone-input__dropdown': {
  //   width: 'calc(100vw - 32px)',
  //   borderRadius: theme.shape.borderRadius,

  //   [theme.breakpoints.up('lmd')]: {
  //     width: 461,

  //     '&::-webkit-scrollbar': {
  //       width: 4,
  //     },
  //     '&::-webkit-scrollbar-track': {
  //       backgroundColor: theme.palette.background.default,
  //     },
  //     '&::-webkit-scrollbar-thumb': {
  //       borderRadius: 23,
  //       backgroundColor: theme.palette.misc.dark,
  //     },
  //   },

  //   [theme.breakpoints.up('xl')]: {
  //     width: 465,
  //   },
  // },

  // '.flag-dropdown.phone-input__btn': {
  //   borderColor: theme.palette.misc.dark,
  //   backgroundColor: theme.palette.misc.light,

  //   '&.open': {
  //     '.selected-flag': {
  //       backgroundColor: 'transparent',
  //     },
  //   },

  //   '.selected-flag': {
  //     width: 70,
  //     borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,

  //     '&:hover, &:focus': {
  //       backgroundColor: 'transparent',
  //     },

  //     '.flag': {
  //       position: 'relative',
  //       left: 11,
  //       transform: 'scale(1.3)',
  //     },

  //     '.arrow': {
  //       position: 'absolute',
  //       width: 11,
  //       height: 11,
  //       right: -10,
  //       top: 1,
  //       border: 'none',
  //       backgroundImage:
  //         'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNiAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzg5MF80MTQzKSI+CjxwYXRoIGQ9Ik0xMy4zMzQgNS4yODU0Nkw3Ljc3ODQzIDEwLjA0NzQiIHN0cm9rZT0iIzg0OEI5OCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTcuNzc3MzQgMTAuMDQ3NEwyLjIyMTc5IDUuMjg1NDYiIHN0cm9rZT0iIzg0OEI5OCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF84OTBfNDE0MyI+CjxyZWN0IHdpZHRoPSIxMy43MTQzIiBoZWlnaHQ9IjE2IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYgMC4xNDI1NzgpIHJvdGF0ZSg5MCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K)',
  //       backgroundSize: 'contain',
  //       backgroundPosition: 'center',
  //       backgroundRepeat: 'no-repeat',
  //     },
  //   },
  // },
}));

export const StyledInputLabel = styled('label')(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(2),
  fontWeight: 500,
}));

export const StyledInputComponent = styled(Input, {
  shouldForwardProp: prop => !['limit', 'minHeight'].includes(prop.toString()),
})<{ limit?: number; minHeight?: number }>(
  ({ theme, color, limit, value, minHeight }) => {
    const textLength = limit ? limit - (value as string).length : 0;
    let counterColor = theme.palette.text.disabled;

    if (textLength < 20 && textLength >= 0) {
      counterColor = theme.palette.warning.light;
    }

    if (textLength < 0) {
      counterColor = theme.palette.error.main;
    }

    return {
      display: 'flex',
      padding: 0,
      border: `1px solid ${
        color === 'error'
          ? theme.palette.error.light
          : theme.palette.text.primary
      }`,
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.text.primary,
      boxShadow: '0px 4px 16px rgba(7, 20, 48, 0.04)',

      '&:hover': {
        '&::before': {
          border: 'none !important',
        },
      },

      '&::before, &::after': {
        display: 'none',
      },

      '&::before': limit
        ? {
            left: 'auto',
            right: 7,
            bottom: 3,
            display: 'inline-block',
            content: `"${textLength}"`,
            border: 'none',
            color: counterColor,
          }
        : {},

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
  },
);
