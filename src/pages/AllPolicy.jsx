import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

const AllPolicies = () => {
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shy-cyan-bear-tie.cyclic.app/policy"
      );
      const data = response.data;
      
      setContent(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditDescription(content[index].description);
    onOpen();
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    onOpen();
  };

  const closeModal = () => {
    onClose();
    setEditIndex(null);
    setEditDescription("");
    setDeleteIndex(null);
  };

  const handleSave = async () => {
    if (editIndex !== null) {
      try {
        await axios.put(
          `https://shy-cyan-bear-tie.cyclic.app/policy/${content[editIndex]._id}`,
          {
            description: editDescription,
          }
        );
        console.log("Paragraph updated successfully");
        fetchData();
      } catch (error) {
        console.log("Error updating paragraph:", error);
      }
    } else if (deleteIndex !== null) {
      try {
        await axios.delete(
          `https://shy-cyan-bear-tie.cyclic.app/policy/${content[deleteIndex]._id}`
        );
        console.log("Paragraph deleted successfully");
        fetchData();
      } catch (error) {
        console.log("Error deleting paragraph:", error);
      }
    }

    closeModal();
  };

  return (
    <Container maxW="800px" mt="20px">
      <Heading as="h1" mb="20px">
        Content Page
      </Heading>
      
{content.length === 0 ? (
  <Text>Loading...</Text>
) : (
  content.map((paragraph, index) => (
    <Box key={paragraph._id} mb="20px">
      <Text>{paragraph.description}</Text>
      <Button colorScheme="blue" size="sm" onClick={() => handleEdit(index)} mr="2">
        Edit
      </Button>
      <Button colorScheme="red" size="sm" onClick={() => handleDelete(index)}>
        Delete
      </Button>
    </Box>
  ))
)}



      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editIndex !== null ? "Edit" : "Delete"} Paragraph</ModalHeader>
          <ModalBody>
            {editIndex !== null ? (
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            ) : (
              <Text>Are you sure you want to delete this paragraph?</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={editIndex !== null ? "blue" : "red"} mr={3} onClick={handleSave}>
              {editIndex !== null ? "Save" : "Delete"}
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AllPolicies;
