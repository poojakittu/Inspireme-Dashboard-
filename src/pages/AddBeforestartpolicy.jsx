import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const AddBeforePolicy = () => {
  const [description, setDescription] = useState('');
  const toast = useToast();

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://shy-cyan-bear-tie.cyclic.app/beforePolicy', {
        description: description,
      });
      console.log('Policy added successfully:', response.data);
      setDescription('');
      toast({
        title: 'Policy Added',
        description: 'Policy added successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log('Error adding policy:', error);
      toast({
        title: 'Error',
        description: 'Failed to add policy.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} maxWidth="500px" margin="0 auto">
      <Heading as="h1" mb={4} textAlign="center">
        Add Policy
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
            resize="vertical"
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit" isFullWidth>
          Add Policy
        </Button>
      </form>
    </Box>
  );
};

export default AddBeforePolicy;
