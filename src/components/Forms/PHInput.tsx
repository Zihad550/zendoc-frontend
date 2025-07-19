import { SxProps, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  startAdornment?: string;
  endAdornment?: string;
};

const PHInput = ({
  name,
  label,
  type = 'text',
  size = 'small',
  fullWidth,
  sx,
  required,
  disabled,
  helperText,
  multiline,
  rows,
  startAdornment,
  endAdornment,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={label}
          required={required}
          error={!!error?.message}
          helperText={error?.message || helperText}
          disabled={disabled}
          multiline={multiline}
          rows={rows}
          InputProps={{
            startAdornment: startAdornment,
            endAdornment: endAdornment,
          }}
        />
      )}
    />
  );
};

export default PHInput;
