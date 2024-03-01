// ProductResult.js
import React from 'react';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

const ProductResult = () => {
  const location = useLocation();
  const searchResults = location.state && location.state.searchResults ? location.state.searchResults : [];

  if (!searchResults || searchResults.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {searchResults.map(product => (
          <ProductCard productProp={product} key={product._id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductResult;
