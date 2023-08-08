import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import SearchInput from '../components/SearchInput';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Grid,
  Button,
  Flex,
} from '@chakra-ui/react'
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';
import axios from 'axios';

const Products = () => {
  // const [data, setData] = useState([]);
  let id;
  const [selectedValue, setSelectedValue] = useState('');
  const [url, setUrl] = useState("https://shy-cyan-bear-tie.cyclic.app/product/alldata")
  const { data, error, reFetch } = useFetch(url);
  // console.log('loading: ', loading);
  // console.log('data: ', data);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    reFetch()
  }, [url]);

  const handleSearch = (e) => {
    if (id) {
      clearTimeout(id)
    }
    id = setTimeout(() => {
      const newUrl = `https://erin-tough-viper.cyclic.app/product/allproductdata?q=${e.target.value}`;
      setUrl(newUrl);
    }, 1000)
  }

  const handleFilter = (e) => {
    // setSelectedValue(e)
    const newUrl = `https://erin-tough-viper.cyclic.app/product/allproductdata?category=${e}`;
    setUrl(newUrl);
    // https://aquamarine-crayfish-tux.cyclic.app/product/allproductdata?category=men
  }

  console.log(data,"sahil");

  // new data

  const [products, setProducts] = useState([]);
 

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://shy-cyan-bear-tie.cyclic.app/product/alldata"
      ); // Change the URL to your actual API endpoint
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setProducts(data.data);
        setLoading(false);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Fetch the data from your backend API
    fetchData();
  }, []);

  const handleColorSelection = (productId, color, img1) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, selectedColor: color, selectedImg: img1 }
          : product
      )
    );
  };

  const handleDelete = async(id) => {
    console.log(id)
    const res = await axios.delete(`https://shy-cyan-bear-tie.cyclic.app/product/delete/${id}`)
    fetchData()
    
  }

  return (
    <div>
      
      <Grid
        mt={5}
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={6} >
        {loading ? Array(10).fill(" ").map((e, i) => (
          <Loader />
        )) : products?.map((product, i) => (
          <ProductCard product={product} handleColorSelection={handleColorSelection} handleDelete={handleDelete} />
        ))}
      </Grid>



     {/*
      <Flex justifyContent="space-between" alignItems="center">
        <Menu closeOnSelect={false} >
          <MenuButton as={Button} colorScheme='blue' w="8%" >
            Filter
          </MenuButton>
          <MenuList minWidth='240px'  >
            <MenuItemOption value='asc' onClick={() => handleFilter('asc')}>Ascending</MenuItemOption>
            <MenuItemOption value='desc' onClick={() => handleFilter('desc')}>Descending</MenuItemOption>
            <MenuItemOption value='men' onClick={() => handleFilter('men')}>Mens</MenuItemOption>
            <MenuItemOption value='phone' onClick={() => handleFilter('phone')}>Phone</MenuItemOption>
            <MenuItemOption value='country' onClick={() => handleFilter('country')}>Country</MenuItemOption>
          </MenuList>
        </Menu>

        <SearchInput handleSearch={handleSearch} type="Products" />

      </Flex>
        */}
    </div>
  )
}

export default Products
