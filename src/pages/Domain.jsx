import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Flex,
  Text,
  Circle,
  Grid,
  FormControl,
  RadioGroup,
  Radio,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { CiUser, CiTimer } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";

function Domain() {
  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();

  const [email, setEmail] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toast = useToast();

  const fetchData = async () => {
    setLoading2(true);
    try {
      const response = await fetch(
        "https://shy-cyan-bear-tie.cyclic.app/email"
      );
      const data = await response.json();
      setLoading2(false);
      if (Array.isArray(data.data)) {
        setProducts(data.data);
        setEmail(data.data.email);
        setDiscount(data.data.discount);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading2(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData1 = async () => {
    setLoading2(true);
    try {
      const response = await fetch(
        `https://shy-cyan-bear-tie.cyclic.app/email/{id}`
      );
      const data = await response.json();
      console.log(data.data);
      setEmail(data.data.email);
      setDiscount(data.data.discount);
      console.log(data.data.email);
      console.log(data.data.discount);
      setLoading2(false);
      if (Array.isArray(data)) {
        setEmail(data.data.email);
        setDiscount(data.data.discount);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading2(false);
    }
  };

  useEffect(() => {
    fetchData1();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    const res = await axios.delete(
      `https://shy-cyan-bear-tie.cyclic.app/email/delete/${id}`
    );
    toast({
      title: "Domain Deleted!",
      description: "Your Domain is Deleted now.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    fetchData();
  };

  const postDomain = () => {
    setLoading(true);
    fetch("https://shy-cyan-bear-tie.cyclic.app/email/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        discount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "new data");
        setLoading(false);
        fetchData();
        onClose();
        setDiscount("");
        setEmail("");
        toast({
          title: "Domain created!",
          description: "Your Domain is created now.",
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

  const handleEdit = (itemId, discount, email) => {
    setLoading(true);
    axios
      .put(`https://shy-cyan-bear-tie.cyclic.app/email/update/${itemId}`, {
        discount,
        email,
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        fetchData();
        setEditingItem(null);
        toast({
          title: "Domain updated!",
          description: "Your Domain is updated now.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error updating domain:", error);
        setLoading(false);
      });
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEmail(item.email);
    setDiscount(item.discount);
    onOpen();
  };
  const filteredProducts = products.filter(
    (product) =>
      product.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.discount.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fields = ["S.no.", "Email", "Discount", "Actions"];

  return (
    <div>
      <Box
        borderBottom={"2px solid lightgrey"}
        pb={"20px"}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
      >
        <Flex alignItems={"center"} gap={"10px"}>
          <Text fontSize={"18px"} as="i" fontWeight={"bold"}>
            Add Your Domain Here -
          </Text>
          <Button onClick={onOpen}>ADD</Button>
        </Flex>
      </Box>
      <Box
        borderBottom={"2px solid lightgrey"}
        pb={"20px"}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
      >
       
        <Input
          type="text"
          placeholder="Search Domain or Discount"
          value={searchQuery}
          onChange={handleSearchChange}
          ml={4}
          border="1px solid #ccc"
          borderRadius="4px"
          px={2}
          py={1}
        />
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
            {filteredProducts.map((item) => (
              <Box
                key={item._id}
                p={"20px"}
                border={"1px solid #dcdcdc"}
                borderRadius={"10px"}
              >
                <Box w={"20%"}>
                  <Circle bg={"#41bbf2"} p={"10px"}>
                    <CiUser
                      style={{
                        fontSize: "30px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  </Circle>
                </Box>
                <Flex gap={"5px"} alignItems={"center"}>
                  <Text fontSize={"20px"}>Discount-</Text>
                  <Text fontSize={"20px"}>{item.discount}%</Text>
                </Flex>
                <Flex gap={"5px"}>
                  <Text as="u" fontSize={"20px"}>
                    Domain:
                  </Text>
                  <Text as="i" fontSize={"20px"}>
                    {item.email}
                  </Text>
                </Flex>
                <Flex gap={"5px"} justifyContent={"end"} alignItems={"center"}>
                  <CiTimer />
                  <Text as="i" fontSize={"15px"}>
                    {item.createdAt.substring(0, 10)}
                  </Text>
                </Flex>
                <Flex
                  mt={"15px"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Link to={`/domain/${item._id}`}>
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
                      onClick={() => handleDelete(item._id)}
                      style={{
                        fontSize: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Flex>
              </Box>
            ))}
          </Grid>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingItem ? "Edit Domain" : "Add Your Domain"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" gap="15px">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <Button
                w="50%"
                m="auto"
                onClick={
                  editingItem
                    ? () => handleEdit(editingItem._id, discount, email)
                    : postDomain
                }
                isLoading={loading}
              >
                {editingItem ? "UPDATE" : "SAVE"}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Domain;
