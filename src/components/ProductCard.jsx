import {
  Badge,
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  Textarea,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

export const ProductCard = ({
  product,
  handleColorSelection,
  handleDelete,
}) => {
  console.log(product.phoneColour[0].img1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useContext(AuthContext);

  return (
    <>
      <Box
        key={product._id}
        textAlign="center"
        p={4}
        boxShadow={"2xl"}
        borderRadius={"20px"}
      >
        {/* Render selected phone image */}
        {product.selectedColor &&
          product.selectedColor ===
            product.phoneColour.find(
              (colour) => colour.color === product.selectedColor
            )?.color && (
            <Box mt={4}>
              <Link to={`/new/${product._id}`}>
              <Box mt={2}>
                <Image
                  src={
                    product.phoneColour.find(
                      (colour) => colour.color === product.selectedColor
                    )?.img1
                  }
                  alt="Selected Phone"
                  maxW="240px"
                  maxH="240px"
                  mx="auto"
                />
              </Box>
              </Link>
            </Box>
          )}

        {!product.selectedColor && product.phoneColour.length > 0 && (
             <Link to={`/new/${product._id}`}>
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
            </Link>
        )}

        <Box mt={2}>
          {product.phoneColour.map((colour) => (
            <Button
              key={colour.color}
              size="xs"
              onClick={() =>
                handleColorSelection(product._id, colour.color, colour.img1)
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
        <Text fontFamily="Roboto" mt={2} fontWeight="800" color={"#393d3d"}>
          From ₹{product.price}*
        </Text>

        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Link to={`/allproducts/${product._id}`}>
            <Button>Edit</Button>
          </Link>
          <MdDeleteForever
            onClick={() => handleDelete(product._id)}
            style={{ fontSize: "25px", color: "red", cursor: "pointer" }}
          />
        </Flex>
      </Box>
    </>
  );
};
