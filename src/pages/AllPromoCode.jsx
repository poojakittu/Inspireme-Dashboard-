import {
  Box,
  Button,
  Circle,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AllPromoCode() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toast = useToast();

  const fetchData = async () => {
    setLoading2(true);
    try {
      const response = await fetch("https://shy-cyan-bear-tie.cyclic.app/promos"); // Change the URL to your actual API endpoint
      const data = await response.json();
      // console.log(data);
      setLoading2(false);
      setData(data);
      setStatus(data.status);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // Fetch the data from your backend API
    fetchData();
  }, []);

  console.log(status);

  const postPromo = () => {
    setLoading(true);
    fetch("https://shy-cyan-bear-tie.cyclic.app/promos/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promoCode,
        discount,
        orderDate:selectedDate,
        status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data, "new data");
        setLoading(false);
        fetchData();
        onClose();
        setDiscount("");
        setPromoCode("");
        setStatus("");
        toast({
          title: "Promo created !",
          description: "Your promo is created now.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    console.log(id);
    const res = await axios.delete(
      `https://shy-cyan-bear-tie.cyclic.app/promos/${id}`
    );
    toast({
      title: "Promo deleted !",
      description: "Your promo is deleted now.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    fetchData();
  };

  return (
    <>
      <Box
        borderBottom={"2px solid lightgrey"}
        pb={"20px"}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
      >
        <Flex alignItems={"center"} gap={"10px"}>
          <Text fontSize={"18px"} as="i" fontWeight={"bold"}>
            Add Your Promo Here -
          </Text>
          <Button onClick={onOpen}>ADD</Button>
        </Flex>
      </Box>

      <Box mt={"20px"}>
        {loading2 ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {data.map((promo) => (
              <>
                <Box
                  p={"20px"}
                  border={"1px solid #dcdcdc"}
                  borderRadius={"10px"}
                >
                  <Box w={"20%"}>
                    <Circle bg={"#ffda00"} p={"2px"}>
                      <CiDiscount1 style={{ fontSize: "50px" }} />
                    </Circle>
                  </Box>
                  <Flex gap={"5px"} alignItems={"center"}>
                    <Text fontSize={"20px"}>Discount-</Text>
                    <Text fontSize={"20px"}>{promo.discount}%</Text>
                  </Flex>
                  <Flex gap={"5px"} alignItems={"center"}>
                    <Text fontSize={"20px"}>Expire</Text>
                    <Text fontSize={"20px"}>
                      {" "}
                      {new Date(promo.orderDate).toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </Text>
                  </Flex>
                  <Flex gap={"5px"}>
                    <Text as="u" fontSize={"20px"}>
                      Promo-Code:
                    </Text>
                    <Text as="i" fontSize={"20px"}>
                      {promo.promoCode}
                    </Text>
                  </Flex>
                  <Flex gap={"5px"}>
                    <Box p={4}>
                      <Button
                        colorScheme={promo.status == "true" ? "green" : "red"}
                        size="lg"
                      >
                        {promo.status === "true" ? "Active" : "Inactive"}
                      </Button>
                    </Box>
                  </Flex>
                  <Flex
                    mt={"15px"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Link to={`/allPromocode/${promo._id}`}>
                      <Text
                        as="u"
                        cursor={"pointer"}
                        fontSize={"18px"}
                        color={"#1677ff"}
                      >
                        Edit
                      </Text>
                    </Link>
                    <Box>
                      <MdDeleteForever
                        onClick={() => handleDelete(promo._id)}
                        style={{
                          fontSize: "20px",
                          color: "red",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  </Flex>
                </Box>
              </>
            ))}
          </Grid>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Your Promo-Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Promo-Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a Date"
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
                  <Radio value="true">True</Radio>
                  <Radio value="false">False</Radio>
                </RadioGroup>
              </FormControl>
              <Button
                w={"50%"}
                m={"auto"}
                onClick={postPromo}
                isLoading={loading}
              >
                SAVE
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AllPromoCode;
