import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { Container, Typography, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Description',
    selector: row => row.excerpt,
    sortable: true,
  },
  {
    name: 'Price',
    selector: row => `$${row.price}`,
    sortable: true,
  },
  {
    name: 'Stock',
    selector: row => row.stock,
    sortable: true,
  },
  {
    name: 'Status',
    selector: row => (row.status ? 'Active' : 'Inactive'),
    sortable: true,
  },
  {
    name: 'Image',
    cell: row => (
      <img
        src={row.imageUrl || 'https://via.placeholder.com/100x100'}
        alt={row.name}
        style={{ width: '100px', height: 'auto' }}
      />
    ),
    sortable: false,
  },
];


const ExpandableComponent = ({ data }) => (
  <Box
  p={2}
    style={{
      backgroundColor: '#f5f5f5',
      width: '94%', 
      boxSizing: 'border-box', 
    }}
  >
    <Typography variant="body1">
      <strong>Description:</strong> {data.description}
    </Typography>
    <Typography variant="body1">
      <strong>Category:</strong> {data.category.name}
    </Typography>
    <Typography variant="body1">
      <strong>Category Description:</strong> {data.category.description}
    </Typography>
    <Typography variant="body1">
      <strong>Created At:</strong> {moment(data.created_at).tz('Asia/Kolkata').format('DD-MMM-YY')}
    </Typography>
  </Box>
);


const HomePage = ({ isAuthenticated, setIsAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('http://localhost:3000/api/v1/products')
        .then(response => {
          setProducts(response.data.products); 
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchText.toLowerCase()) ||
     product.excerpt.toLowerCase().includes(searchText.toLowerCase())) &&
    (statusFilter === 'All' || (statusFilter === 'Active' && product.status) || (statusFilter === 'Inactive' && !product.status))
  );

  if (!isAuthenticated) {
    return <Typography variant="h6" color="textSecondary">Please log in to view products.</Typography>;
  }

  return (
    <Container >
      <Box my={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Box mb={2} display="flex" alignItems="center">
        <FormControl style={{ marginRight: '16px', width: '200px' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ padding: '8px', width: '100%' }}
        />
      </Box>
      <DataTable
  columns={columns}
  data={filteredProducts}
  expandableRows
  expandableRowsComponent={ExpandableComponent}
  pagination
/>

    </Container>
  );
};

export default HomePage;
