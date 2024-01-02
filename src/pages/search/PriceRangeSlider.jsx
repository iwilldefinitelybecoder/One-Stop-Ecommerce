import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

const PriceSlider = ({filterList,setFilterList}) => {
  const maxPrice = 1000000;
//   const [filterList.range, setFilterList] = useState([0, 500000]); // Initial price range values
  const [sliderValues, setSliderValues] = useState([0, 75]); // Initial percentage values for slider

  const calculateSliderValues = () => {
    const sliderStart = Math.round((filterList?.range[0] / maxPrice) * 100);
    const sliderEnd = Math.round((filterList?.range[1] / maxPrice) * 100);
    return [sliderStart, sliderEnd];
  };

  useEffect(() => {
    setSliderValues(calculateSliderValues());
  }, [filterList?.range]);

  const handleSliderChange = (event, newValue) => {
    setSliderValues(newValue);
    const newPrices = newValue.map(value => Math.round((value / 100) * maxPrice));
    setFilterList(newPrices);
  };

  const handleInputChange = (index) => (event) => {
    const newInputValues = [...filterList?.range];
    newInputValues[index] = event.target.value === '' ? '' : Number(event.target.value);
    setFilterList(newInputValues);
  };

  return (
    <div className="mb-4">
          <div className=' space-y-4'>
          <h3 className="text-lg font-semibold mb-2">Price Range</h3>
      <Box display="flex" alignItems="center">
        <Input
          value={filterList?.range[0]}
          onChange={handleInputChange(0)}
          onBlur={() => setSliderValues(calculateSliderValues())}
          inputProps={{
            min: 0,
            max: maxPrice,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
          style={{ width: '120px', marginRight: '20px' }}
          endAdornment={<InputAdornment position="end">&#8377;</InputAdornment>}
        />
      
        <Input
          value={filterList?.range[1]}
          onChange={handleInputChange(1)}
          onBlur={() => setSliderValues(calculateSliderValues())}
          inputProps={{
            min: 0,
            max: maxPrice,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
          style={{ width: '120px', marginLeft: '20px' }}
          endAdornment={<InputAdornment position="end">&#8377; </InputAdornment>}
        />
      </Box>
      <Slider
          value={sliderValues}
          onChange={handleSliderChange}
          min={0}
          max={100}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          style={{ flexGrow: 1 }}
        />
      </div>
      {/* <p>Price Range: ${filterList?.range[0]} - ${filterList?.range[1]}</p> */}
    </div>
  );
};

export default PriceSlider;
