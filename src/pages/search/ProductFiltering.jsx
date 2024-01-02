import React from "react";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import Chip from "@mui/material/Chip";
import PriceSlider from "./PriceRangeSlider";
import { productCategories } from "../../data/cartproducts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const ProductFilter = () => {
  // State for selected filters
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [productCategory, setProductCategory] = React.useState(productCategories)
  const [filterList, setFilterList] = React.useState({
    rating: 0,
    range: [0, 700000],
    categories: [],
  });
  const [searchParams, setSearchParams] = useSearchParams();


  // Functions to handle filter changes
  const handleRatingChange = (event, newValue) => {
    setFilterList(prevFilterList => ({...prevFilterList, rating: newValue}))
    searchParams.set('rating', newValue);
    setSearchParams(searchParams);
    // Perform filtering based on the selected rating
  };

  const handlePriceRangeChange = ( newValue) => {
    setFilterList(prevFilterList => ({...prevFilterList, range: newValue}))
    searchParams.set('range', newValue);
    setSearchParams(searchParams);
    // Perform filtering based on the price range
  };

  const handleCategoryDelete = (category) => {
    const arr = [...filterList.categories];
    const index = arr.indexOf(category);
    if (index > -1) {
        arr.splice(index, 1);
        }
    setFilterList(prevFilterList => ({...prevFilterList, categories: arr}))
    searchParams.set('category', arr);
    setSearchParams(searchParams);

    // Perform filtering based on categories
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const arr = [...filterList.categories];
    arr.push(value);
    setFilterList(prevFilterList => ({...prevFilterList, categories: arr}))
    searchParams.set('category', arr);
    setSearchParams(searchParams);
  }

    const handelFilterClear = () => {
        setFilterList({
            rating: 0,
            range: [0, 700000],
            categories: [],
        })
        searchParams.delete('rating');
        searchParams.delete('range');
        searchParams.delete('category');
        setSearchParams(searchParams);
    }

  return (
    <div className="bg-white p-4 rounded-lg sticky flex-column h-[550px] top-[110px] shadow-md w-80">
        <div className=" border-b-2 mb-3">

        <h2 className="text-2xl font-semibold mb-4">Product Filters</h2>
        </div>
        
      {/* Rating Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Rating</h3>
        <Rating value={filterList.rating} onChange={handleRatingChange} max={5} />
      </div>


      <div className="mb-4">
   
        <PriceSlider filterList={filterList} setFilterList={handlePriceRangeChange} />
      </div>


      <div className="mb-4 space-y-5">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategories[selectedCategories.length - 1]}
              label="productCategories"
              onChange={handleChange}
            >
              {
                productCategory?.map((category) => (
                    <MenuItem value={category}>{category}</MenuItem>
                    ))
                }
             
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-wrap gap-2 max-h-[250px] overflow-scroll">
          {filterList.categories?.map((category) => (
            <Chip
              key={category}
              label={category}
              onDelete={() => handleCategoryDelete(category)}
            />
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button onClick={handelFilterClear} className="bg-gray-800 text-white py-2 px-4 rounded-md">
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilter;
