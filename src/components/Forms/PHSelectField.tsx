import { MenuItem, SxProps, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface ITextField {
  name: string;
  size?: 'small' | 'medium';
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  items?: string[];
  options?: { value: string; label: string }[];
  disabled?: boolean;
  helperText?: string;
  multiple?: boolean;
}

const PHSelectField = ({
  items,
  options,
  name,
  label,
  size = 'small',
  required,
  fullWidth = true,
  sx,
  placeholder,
  disabled,
  helperText,
  multiple,
}: ITextField) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          sx={{
            ...sx,
          }}
          size={size}
          select
          label={label}
          placeholder={placeholder}
          required={required}
          fullWidth={fullWidth}
          disabled={disabled}
          error={isError}
          helperText={
            isError ? (formState.errors[name]?.message as string) : helperText
          }
          SelectProps={{
            multiple: multiple,
          }}
        >
          {options
            ? options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            : items?.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
        </TextField>
      )}
    />
  );
};

export default PHSelectField;
