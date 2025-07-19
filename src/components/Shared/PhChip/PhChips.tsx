import { Chip, SxProps, Theme } from '@mui/material';

type ChipType = 'error' | 'success' | 'warning' | 'info';

interface PhChipsProps {
  label: string;
  type: ChipType;
  sx?: SxProps<Theme>;
}

const PhChips = ({ label, type, sx }: PhChipsProps) => {
  let chipStyles = {
    bgcolor: '#cdffe0',
    color: '#00592e',
  };

  if (type === 'success') {
    chipStyles = {
      bgcolor: '#cdffe0',
      color: '#00592e',
    };
  } else if (type === 'warning') {
    chipStyles = {
      bgcolor: '#fff3cd',
      color: '#856404',
    };
  } else if (type === 'info') {
    chipStyles = {
      bgcolor: '#d1ecf1',
      color: '#0c5460',
    };
  } else if (type === 'error') {
    chipStyles = {
      bgcolor: '#f8d7da',
      color: '#721c24',
    };
  }

  return <Chip label={label} sx={{ ...chipStyles, ...sx }} />;
};

export default PhChips;
