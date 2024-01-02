import React from 'react'
import ProductFilter from './ProductFiltering'
import SearchResults from './SearchResults'
import './search.css'

function Search() {
  return (
    <div className="user-pg-cntr ">
        <div className="user-bd-sub-cntr space-x-5">
      <div className='search-filter-cntr h-[100%] flex justify-start'>

      <ProductFilter/>
      </div>
      <div className='search-result-cntr'>
        <SearchResults/>
      </div>
    </div>
    </div>
  )
}

export default Search