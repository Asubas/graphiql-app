import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface MethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

const MethodSelector: React.FC<MethodSelectorProps> = ({ selectedMethod, onMethodChange }) => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];

  return (
    <FormControl fullWidth>
      <InputLabel
        id="method-select-label"
        sx={{
          color: 'azure',
          '&.Mui-focused': {
            color: 'azure',
          },
        }}
      >
        Method
      </InputLabel>
      <Select
        labelId="method-select-label"
        id="method-select"
        value={selectedMethod}
        label="Method"
        onChange={(e) => onMethodChange(e.target.value)}
        sx={{
          color: 'azure',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'azure',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'azure',
          },
        }}
      >
        {methods.map((method) => (
          <MenuItem
            key={method}
            value={method}
            sx={{
              color: 'azure',
              backgroundColor: '#1D1B1F',
              '&.Mui-selected': {
                backgroundColor: 'azure',
                color: '#1D1B1F',
              },
              '&:hover': {
                backgroundColor: '#47459b',
              },
            }}
          >
            {method}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MethodSelector;
