import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
  SxProps,
} from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { StyledRadioButton, StyledRadioWrapper } from './components';

interface IOption {
  value: string;
  label: string;
}

interface Props<T extends FieldValues> {
  id: string;
  options: IOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<T, any>;
  name: Path<T>;
  style?: SxProps;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
}

export const RadioComponent = <T extends FieldValues>({
  formControl,
  name,
  id,
  options,
  style,
  label,
  error,
  errorMessage,
  className,
  disabled,
}: Props<T>): JSX.Element => {
  return (
    <Controller
      control={formControl}
      name={name}
      render={({ field }) => (
        <StyledRadioWrapper className={className} sx={style}>
          <FormLabel id={`radio-group-${id}`}>{label}</FormLabel>
          <RadioGroup {...field} aria-labelledby={`radio-group-${id}`}>
            {options.map(({ value, label: optionLabel }) => (
              <FormControlLabel
                key={value}
                value={value}
                label={optionLabel}
                control={<StyledRadioButton />}
                disabled={disabled}
              />
            ))}
          </RadioGroup>
          {error && <FormHelperText>{errorMessage}</FormHelperText>}
        </StyledRadioWrapper>
      )}
    />
  );
};
