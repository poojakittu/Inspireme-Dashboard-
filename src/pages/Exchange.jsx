import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Spinner,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

function Exchange() {
  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modelName, setModelName] = useState("");
  const [returnNoDamage, setReturnNoDamage] = useState("");
  const [bodyDamage, setBodyDamage] = useState("");
  const [screenDamage, setScreenDamage] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://shy-cyan-bear-tie.cyclic.app/old"
      );

      setLoading(false);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData1 = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://shy-cyan-bear-tie.cyclic.app/old/old-phones/${id}`
      );
      console.log("Response:", response.data); // Check the response data
      setLoading(false);
      setProducts1(response.data);
      setModelName(response.data.modelName);
      setBodyDamage(response.data.bodyDamage);
      setMaxPrice(response.data.maxPrice);
      setMinPrice(response.data.minPrice);
      setReturnNoDamage(response.data.returnNoDamage);
      setScreenDamage(response.data.screenDamage);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData1(id);
  }, [id]);

  const handleEditButtonClick = (id) => {
    setId(id);
    onOpen();
  };

  const fields = [
    "S.no.",
    "Model-Name",
    "Body-Damage",
    "Max-Price",
    "Min-Price",
    "Return-No-Damage",
    "Screen-Damage",
    "Action",
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://shy-cyan-bear-tie.cyclic.app/old/old-phones/${id}`
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.put(
        `https://shy-cyan-bear-tie.cyclic.app/old/old-phones/${id}`,
        {
          modelName,
          returnNoDamage: Number(returnNoDamage),
          bodyDamage: Number(bodyDamage),
          screenDamage: Number(screenDamage),
          minPrice: Number(minPrice),
          maxPrice: Number(maxPrice),
        }
      );
      fetchData();
      onClose();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const isTableResponsive = useBreakpointValue({ base: true, md: false });

  return (
    <div>
      {isTableResponsive ? (
        <Box overflowX="auto">
          <Table variant="simple" minW="full">
            <Thead>
              <Tr>
                {fields.map((field, index) => (
                  <Th key={index}>{field}</Th>
                ))}
              </Tr>
            </Thead>
            {loading ? (
              <Tbody>
                <Tr>
                  <Td colSpan={fields.length} textAlign="center">
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </Td>
                </Tr>
              </Tbody>
            ) : (
              <Tbody>
                {Array.isArray(products) &&
                  products.map((item, i) => (
                    <Tr key={item._id}>
                      <Td>{i + 1}</Td>
                      <Td>{item.modelName}</Td>
                      <Td>{item.bodyDamage}</Td>
                      <Td>{item.maxPrice}</Td>
                      <Td>{item.minPrice}</Td>
                      <Td>{item.returnNoDamage}</Td>
                      <Td>{item.screenDamage}</Td>
                      <Td display="flex" alignItems="center" gap="10px">
                        <Button onClick={() => handleEditButtonClick(item._id)}>
                          Edit
                        </Button>
                        <MdDeleteForever
                          onClick={() => handleDelete(item._id)}
                          style={{
                            fontSize: "25px",
                            color: "red",
                            cursor: "pointer",
                          }}
                        />
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            )}
          </Table>
        </Box>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              {fields.map((field, index) => (
                <Th key={index}>{field}</Th>
              ))}
            </Tr>
          </Thead>
          {loading ? (
            <Box p={4} display="flex" justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          ) : (
            <Tbody>
              {Array.isArray(products) &&
                products.map((item, i) => (
                  <Tr key={item._id}>
                    <Td>{i + 1}</Td>
                    <Td>{item.modelName}</Td>
                    <Td>{item.bodyDamage}</Td>
                    <Td>{item.maxPrice}</Td>
                    <Td>{item.minPrice}</Td>
                    <Td>{item.returnNoDamage}</Td>
                    <Td>{item.screenDamage}</Td>
                    <Td display="flex" alignItems="center" gap="10px">
                      <Button onClick={() => handleEditButtonClick(item._id)}>
                        Edit
                      </Button>
                      <MdDeleteForever
                        onClick={() => handleDelete(item._id)}
                        style={{
                          fontSize: "25px",
                          color: "red",
                          cursor: "pointer",
                        }}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          )}
        </Table>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Exchange This Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" gap="10px">
              <Input
                type="text"
                placeholder="Model-Name"
                onChange={(e) => setModelName(e.target.value)}
                value={modelName}
              />
              <Input
                type="number"
                placeholder="Return-No-Damage"
                onChange={(e) => setReturnNoDamage(e.target.value)}
                value={returnNoDamage}
              />
              <Input
                type="number"
                placeholder="Body-Damage"
                onChange={(e) => setBodyDamage(e.target.value)}
                value={bodyDamage}
              />
              <Input
                type="number"
                placeholder="Screen-Damage"
                onChange={(e) => setScreenDamage(e.target.value)}
                value={screenDamage}
              />
              <Input
                type="number"
                placeholder="Min-Price"
                onChange={(e) => setMinPrice(e.target.value)}
                value={minPrice}
              />
              <Input
                type="number"
                placeholder="Max-Price"
                onChange={(e) => setMaxPrice(e.target.value)}
                value={maxPrice}
              />
              <Button onClick={() => handleEdit(id)}>Save</Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Exchange;
