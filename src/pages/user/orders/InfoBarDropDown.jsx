// InfoBarDropDown.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ArrowDownwardRounded } from '@mui/icons-material';
import EnhancedInvoiceGenerator from '../../../components/body/PdfGenerator/EnhncedPdfGenerator';

const InfoBarDropDown = ({generatePdfRef,orderDetails}) => {
    const buttonStyles = {
        borderRadius: '20px', // Adjust the value as needed for the desired roundness
        color: '#ea6b87', // Text color
        borderColor: '#ea6b87', // Border color
      };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    console.log(`Clicked on ${value}`);
    handleClose();
  };

  return (
    <div className='tooltip relative'>

      <Button
      
      
        variant='outlined'
        color="primary"
        onClick={handleClick}
        style={buttonStyles}
        size='small'
      >
        <ArrowDownwardRounded/>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => generatePdfRef?.current?.click()}><EnhancedInvoiceGenerator generatePdfRef={generatePdfRef} orderDetails={orderDetails}/></MenuItem>
        {/* <MenuItem onClick={() => handleMenuItemClick('Option 2')}>Option 2</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Option 3')}>Option 3</MenuItem> */}
      </Menu>
      <span className='tooltiptext'>Download Invoice</span>
    </div>
  );
};

export default InfoBarDropDown;
