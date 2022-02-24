import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function AssemblyLineInput({ handleSave }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();

      setInputValue('');
      handleSave(inputValue);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'>
      <TextField
        id='assembly-line-input'
        label='Add an item'
        variant='outlined'
        value={inputValue}
        onKeyPress={handleKeyPress}
        onChange={handleInputChange}
      />
    </Box>
  );
}

export default AssemblyLineInput;
