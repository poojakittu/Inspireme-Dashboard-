import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

function EditPromoCode() {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const toast = useToast();

  const fetchData1 = async () => {
    try {
      const response = await fetch(
        `https://shy-cyan-bear-tie.cyclic.app/promos/${id}`
      );
      const data = await response.json();
      console.log(data);
      setPromoCode(data.promoCode);
      setDiscount(data.discount);

      if (Array.isArray(data)) {
        setPromoCode(data.data.promoCode);
        setDiscount(data.data.discount);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData1();
  }, []);

  const handleEdit = (id) => {
    setLoading(true);
    fetch(`https://shy-cyan-bear-tie.cyclic.app/promos/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promoCode: promoCode,
        discount: discount,
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLoading(false);
        toast({
          title: "Promo-Code Edited !",
          description: "Your promo is Updated now.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setDiscount("");
        setPromoCode("");
        setStatus("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  console.log(promoCode);

  return (
    <>
      <Box
        borderBottom={"2px solid lightgrey"}
        pb={"20px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link to="/allPromocode">
          <Box>
            <BsFillArrowLeftSquareFill style={{ fontSize: "25px" }} />
          </Box>
        </Link>
        <Box>
          <Text fontSize={"18px"} fontWeight={"bold"}>
            Edit Your Promo-Code
          </Text>
        </Box>
      </Box>

      <Box display={"flex"} flexDirection={"column"} gap={"10px"} w={"30%"}>
        <FormControl>
          <FormLabel>Promo-Code</FormLabel>
          <Input
            type="text"
            placeholder="Promo-Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Discount</FormLabel>
          <Input
            type="text"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </FormControl>
        <FormControl display={"flex"} alignItems={"center"}>
          <FormLabel>Status</FormLabel>
          <RadioGroup
            mb={"5px"}
            value={status}
            onChange={setStatus}
            display={"flex"}
            gap={"10px"}
            alignItems={"center"}
          >
            <Radio value="true">Active</Radio>
            <Radio value="false">InActive</Radio>
          </RadioGroup>
        </FormControl>
        <Button isLoading={loading} onClick={() => handleEdit(id)}>
          EDIT
        </Button>
      </Box>
    </>
  );
}

export default EditPromoCode;
