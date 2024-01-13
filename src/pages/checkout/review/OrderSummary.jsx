import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { userIcon } from '../../../assets/icons/png/toolbar1/data';
import { rightArrowIcon2 } from '../../../assets/icons/png/user-page-icons/data';
import { rightArrowIcon } from '../../../assets/icons/png/toolbar-icons/data';
import Review from './Review';
import ReviewsFacet from '../../../components/body/Facet&Navbar/ReviewFacet';

const OrderSummary = () => {

  const [facets, setFacets] = useState([
    { type: 'Products', isActive: true },
    { type: 'Address', isActive: false },
    { type: 'Payment', isActive: false },
    { type: 'Shipping', isActive: false },
  ]);

  const [activeFacet, setActiveFacet] = useState('Products');

  const handleFacetClick = (item) => {
    setActiveFacet(item);
  }
  
  return (
    <>
    <div>
      <ReviewsFacet facets={facets} activeFacet={activeFacet} onClick={handleFacetClick} />
    </div>
      </>
  )
}

export default OrderSummary