import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleOrder() {
    const [data, setData] = useState({});
  
    const {id} = useParams()

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://shy-cyan-bear-tie.cyclic.app/order/${id}`
      ); // Change the URL to your actual API endpoint
      const data = await response.json();
    //   console.log(data,"offer");
      setData(data)
    } catch (error) {
      console.error("Error fetching products:", error);
      
    }
  };
  
  useEffect(() => {
    // Fetch the data from your backend API
    fetchData();
  }, []);

  console.log(data)
  return (
    <>
        <Box display={"flex"} flexDirection={"column"} gap={"20px"} >
            <Flex alignItems={"center"} gap={"5px"}>
                <Text fontSize={"20px"} fontWeight={"bold"} >UserName :</Text>
                <Text fontSize={"20px"} fontWeight={"light"}>{data?.username}</Text>
            </Flex>
            <Flex alignItems={"center"} gap={"70px"} >
                <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Text fontSize={"18px"} fontWeight={"bold"} >Address :</Text>
                    <Text fontSize={"18px"} fontWeight={"light"}>{data?.address} {data?.landmark} {data?.state} {data?.city} {data?.locality}</Text>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Text fontSize={"18px"} fontWeight={"bold"} >Pincode :</Text>
                    <Text fontSize={"18px"} fontWeight={"light"}>{data?.pincode}</Text>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Text fontSize={"18px"} fontWeight={"bold"} >Mobile No. :</Text>
                    <Text fontSize={"18px"} fontWeight={"light"}>{data?.Mobile}</Text>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Text fontSize={"18px"} fontWeight={"bold"} >Alternative No. :</Text>
                    <Text fontSize={"18px"} fontWeight={"light"}>{data?.alternatephone}</Text>
                </Box>
            </Flex>
            <Flex alignItems={"center"} gap={"5px"}>
                <Text fontSize={"20px"} fontWeight={"bold"}>Address Type:</Text>
                <Text fontSize={"20px"} fontWeight={"light"}>{data?.addresstype}</Text>
            </Flex>
            <Flex alignItems={"center"} gap={"5px"}>
                <Text fontSize={"20px"} fontWeight={"bold"}>Discounted Total Price:</Text>
                <Text fontSize={"20px"} fontWeight={"light"}>{data?.discountedTotalprice}</Text>
            </Flex>
            <Flex flexWrap={"wrap"} gap={"20px"} >
                {
                    data?.products?.map((el) => (
                        <>
                            <Box border={"1px solid lightgrey"} p={"10px"} borderRadius={"10px"} >
                                <Image src={el.image} />
                                <Text fontSize={"20px"} fontWeight={"semibold"}>{el.title}</Text>
                                <Flex fontSize={"18px"} fontWeight={"light"} gap={"5px"}>
                                    <Text>Color:</Text>
                                    <Text>{el.colour}</Text>
                                </Flex>
                                <Flex fontSize={"18px"} fontWeight={"light"} gap={"5px"}>
                                    <Text>Storage:</Text>
                                    <Text>{el.storage}</Text>
                                </Flex>
                                <Flex fontSize={"18px"} fontWeight={"light"} gap={"5px"}>
                                    <Text>Display:</Text>
                                    <Text>{el.display}</Text>
                                </Flex>
                                <Flex fontSize={"18px"} fontWeight={"light"} gap={"5px"}>
                                    <Text>Quantity:</Text>
                                    <Text>{el.quantity}</Text>
                                </Flex>
                                <Flex fontSize={"18px"} fontWeight={"light"} gap={"5px"}>
                                    <Text>Single Item Price:</Text>
                                    <Text>{el.singleItemPrice}</Text>
                                </Flex>
                                <Flex fontSize={"18px"} fontWeight={"light"} gap={"5px"}>
                                    <Text>Total Item Price:</Text>
                                    <Text>{el.totalitemPrice}</Text>
                                </Flex>
                                <Flex fontSize={"18px"} fontWeight={"light"} gap={"5px"}>
                                    <Text>Status:</Text>
                                    <Text>{el.status}</Text>
                                </Flex>
                            </Box>
                        </>
                    ))
                }
            </Flex>

            <Flex alignItems={"center"} gap={"5px"}>
                <Text fontSize={"20px"} fontWeight={"bold"}>Mobile Condition:</Text>
                <Text fontSize={"20px"} fontWeight={"light"}>{data?.mobileCondition}</Text>
            </Flex>

            <Flex alignItems={"center"} gap={"5px"}>
                <Text fontSize={"20px"} fontWeight={"bold"}>Old Mobile Model:</Text>
                <Text fontSize={"20px"} fontWeight={"light"}>{data?.oldmobileModel}</Text>
            </Flex>

            <Flex alignItems={"center"} gap={"70px"}>
                <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Text fontSize={"20px"} fontWeight={"bold"}>Order Status:</Text>
                    <Text fontSize={"20px"} fontWeight={"light"}>{data?.orderStatus}</Text>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Text fontSize={"20px"} fontWeight={"bold"}>Order Date:</Text>
                    <Text fontSize={"20px"} fontWeight={"light"}>{data?.orderDate?.substring(0,10)}</Text>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Text fontSize={"20px"} fontWeight={"bold"}>Order Time:</Text>
                    <Text fontSize={"20px"} fontWeight={"light"}>{data?.orderDate?.substring(11,19)}</Text>
                </Box>
            </Flex>

            <Flex alignItems={"center"} gap={"70px"}>
                <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Text fontSize={"20px"} fontWeight={"bold"}>Promo-Code:</Text>
                    <Text fontSize={"20px"} fontWeight={"light"}>{data?.promoCode}</Text>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Text fontSize={"20px"} fontWeight={"bold"}>Promo-Discount:</Text>
                    <Text fontSize={"20px"} fontWeight={"light"}>{data?.promoDiscount}</Text>
                </Box>
            </Flex>
        </Box>
    </>
  )
}

export default SingleOrder