import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // To track if search is in progress
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch('http://localhost:4000/products/searchByName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
      navigate('/product-result', { state: { searchResults: data } });
    } catch (error) {
      console.error('Error searching for products:', error);
    } finally {
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  return (
    <Form className="d-flex mx-auto">
      <Form.Control
        type="text"
        id="productName"
        className="form-control"
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      <Button variant="outline-success" onClick={handleSearch} disabled={!searchQuery.trim() || isSearching}>
        {isSearching ? 'Searching...' : 'Search'}
      </Button>
    </Form>
  );
};

export default ProductSearch;
