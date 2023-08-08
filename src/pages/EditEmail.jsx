import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

function EditEmail() {
  const [email, setEmail] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { id } = useParams();

  const fetchData1 = async () => {
    try {
      const response = await fetch(
        `https://shy-cyan-bear-tie.cyclic.app/otp/${id}`
      );
      const data = await response.json();
      console.log(data.data);
      setEmail(data.data.email);
      setDiscount(data.data.adminDiscount);

      if (Array.isArray(data)) {
        setEmail(data.data.email);
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

  const handleEdit = async (id) => {
    setLoading(true);
    const data = await axios.put(
      `https://shy-cyan-bear-tie.cyclic.app/otp/otp/${id}`,
      {
        email: email,
        adminDiscount: discount,
      }
    );
    console.log(data, "update");
    setLoading(false);
    toast({
      title: "Promo-Code Edited !",
      description: "Your promo is Updated now.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setEmail("");
    setDiscount("");
  };
  return (
    <>
      <Box
        borderBottom={"2px solid lightgrey"}
        pb={"20px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link to="/allusers">
          <Box>
            <BsFillArrowLeftSquareFill style={{ fontSize: "25px" }} />
          </Box>
        </Link>
        <Box>
          <Text fontSize={"18px"} fontWeight={"bold"}>
            Edit Your Email
          </Text>
        </Box>
      </Box>

      <Box display={"flex"} flexDirection={"column"} gap={"10px"} w={"30%"}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Button isLoading={loading} onClick={() => handleEdit(id)}>
          EDIT
        </Button>
      </Box>
    </>
  );
}

export default EditEmail;
