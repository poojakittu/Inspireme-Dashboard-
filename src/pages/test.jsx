import React, { useState } from "react";

import { Box, Text, Button, Grid, Image, Heading } from "@chakra-ui/react";

import { BiShoppingBag } from "react-icons/bi";

import { Stack, Skeleton } from "@chakra-ui/react";

import "../style/product.css";
import Carousels from "../Components/Carousels";
import BlogsSection from "../Components/BlogsSection";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Filters from "./Filters";
import { useSelector } from "react-redux/es";
import { useLocation } from "react-router-dom";
import { getProductRecord } from "../Redux/AppReducer/Action";

const Ipad = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch the data from your backend API
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://shy-cyan-bear-tie.cyclic.app/product/alldata?category=ipad"
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

  return (
    <div style={{ marginTop: "130px" }}>
      <Box w="80%" m="auto" mt={"220"}>
        <Heading size={"xl"}>Buy the all-new 24” iPad.</Heading>
        {loading ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <Box>
            <Grid
              pt="4"
              width="90%"
              margin="auto"
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={4}
              justifyContent="center"
            >
              {products.map((product) => (
                <Box key={product._id} textAlign="center" p={4}>
                  {/* Render selected phone image */}
                  {product.selectedColor &&
                    product.selectedColor ===
                      product.phoneColour.find(
                        (colour) => colour.color === product.selectedColor
                      )?.color && (
                      <Box mt={4}>
                        <Box mt={2}>
                          <Image
                            src={product.selectedImg}
                            alt="Selected Phone"
                            maxW="240px"
                            maxH="240px"
                            mx="auto"
                          />
                        </Box>
                      </Box>
                    )}

                  {!product.selectedColor && product.phoneColour.length > 0 && (
                    <Box mt={4}>
                      <Box mt={2}>
                        <Image
                          src={product.phoneColour[0].img1}
                          alt="Selected Phone"
                          maxW="240px"
                          maxH="240px"
                          mx="auto"
                        />
                      </Box>
                    </Box>
                  )}

                  <Box mt={2}>
                    {product.phoneColour.map((colour) => (
                      <Button
                        key={colour.color}
                        size="xs"
                        onClick={() =>
                          handleColorSelection(
                            product._id,
                            colour.color,
                            colour.img1
                          )
                        }
                        ml={2}
                        backgroundColor={colour.color}
                        width="20px"
                        height="20px"
                        borderRadius="50%"
                        border="1px solid gray"
                      />
                    ))}
                  </Box>

                  <Heading fontFamily="Roboto" mt={2} fontSize="3xl">
                    {product.title}
                  </Heading>
                  <Text
                    fontFamily="Roboto"
                    mt={2}
                    fontWeight="800"
                    fontSize="xl"
                    color={"#393d3d"}
                  >
                    {product.subTitle}
                  </Text>
                  <Text
                    fontFamily="Roboto"
                    mt={2}
                    fontWeight="800"
                    color={"#393d3d"}
                  >
                    From ₹{product.price}*
                  </Text>

                  <Link to={`/cart`}>
                    <Button
                      p="-15px 15px"
                      colorScheme="blue"
                      borderRadius="20px"
                      color="white"
                      fontFamily="Roboto"
                      mt={4}
                    >
                      Buy
                    </Button>
                  </Link>

                  <Link to={`/new/${product._id}`}>
                    <Text color="#3182ce" mt={2} fontWeight="600">
                      Learn More (<span>"&deg;"F</span>)
                    </Text>
                  </Link>
                </Box>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Ipad;