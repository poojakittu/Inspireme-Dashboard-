import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

const PostData = () => {
  const [modelName, setModelName] = useState("");
  const [returnNoDamage, setReturnNoDamage] = useState(0);
  const [bodyDamage, setBodyDamage] = useState(0);
  const [screenDamage, setScreenDamage] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [des, setDes] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://shy-cyan-bear-tie.cyclic.app/old/add",
        {
          modelName,
          returnNoDamage,
          bodyDamage,
          screenDamage,
          minPrice,
          maxPrice,
          des,
        }
      );
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <Box maxW="sm" p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <form onSubmit={handleFormSubmit}>
        <FormControl mb={4}>
          <FormLabel>Model Name:</FormLabel>
          <Input
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Return No Damage:</FormLabel>
          <Input
            type="number"
            value={returnNoDamage}
            onChange={(e) => setReturnNoDamage(Number(e.target.value))}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Body Damage:</FormLabel>
          <Input
            type="number"
            value={bodyDamage}
            onChange={(e) => setBodyDamage(Number(e.target.value))}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Screen Damage:</FormLabel>
          <Input
            type="number"
            value={screenDamage}
            onChange={(e) => setScreenDamage(Number(e.target.value))}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Min Price:</FormLabel>
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Max Price:</FormLabel>
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Description:</FormLabel>
          <Input
            type="text"
            value={des}
            onChange={(e) => setDes(e.target.value)}
          />
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PostData;
