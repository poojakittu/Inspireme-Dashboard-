import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  Flex,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const AddProducts = () => {
  const toast = useToast();
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [subTitle, setSubTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [modelName, setmodelName] = useState("");
  const [networkServiceProvider, setnetworkServiceProvider] = useState("");
  const [os, setos] = useState("");
  const [technology, settechnology] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    model: [
      {
        display: "",
        perMonthEmi: "",
        ModelActualPrice: "",
      },
    ],
    storage: [
      {
        phoneStorage: "",
        perMonthEmi: "",
        ActualPrice: "",
      },
    ],
    new: "false",
    AppleCareMontly: 0,
    ApplecareMrp: 0,
    ApplecareDes: [],
    name: "",
  });

  const [phoneColours, setPhoneColours] = useState([
    {
      color: "",
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      ProductPrice: "",
      sellingPrice: "",
      quantity: "",
    },
  ]);

  const handleModelChange = (event, index) => {
    const { name, value } = event.target;
    const updatedModel = [...formData.model];
    const updatedItem = { ...updatedModel[index] };

    updatedItem[name] = value;
    updatedModel[index] = updatedItem;

    setFormData((prevFormData) => ({
      ...prevFormData,
      model: updatedModel,
    }));
  };

  const handleStorageChange = (event, index) => {
    const { name, value } = event.target;
    const updatedStorage = [...formData.storage];
    const updatedItem = { ...updatedStorage[index] };

    updatedItem[name] = value;
    updatedStorage[index] = updatedItem;

    setFormData((prevFormData) => ({
      ...prevFormData,
      storage: updatedStorage,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange1 = (e) => {
    const selectedFile = e.target.files[0];
    setFile1(selectedFile);
  };

  const handleFileChange2 = (e) => {
    const selectedFile = e.target.files[0];
    setFile2(selectedFile);
  };

  const handleFileChange3 = (e) => {
    const selectedFile = e.target.files[0];
    setFile3(selectedFile);
  };

  const handleFileChange4 = (e) => {
    const selectedFile = e.target.files[0];
    setFile4(selectedFile);
  };

  const handleUpload1 = async (index) => {
    const storage = getStorage(app);
    const uploadPromises = [];

    if (file1) {
      const storageRef = ref(storage, `images/${file1.name}`);
      const uploadTask = uploadBytes(storageRef, file1); // Use file1 instead of file
      uploadPromises.push(uploadTask);
      const url = await getDownloadURL(storageRef);

      // Update the phoneColours state with the new image URL
      const updatedPhoneColours = [...phoneColours];
      updatedPhoneColours[index].img1 = url;
      setPhoneColours(updatedPhoneColours);
    }

    await Promise.all(uploadPromises);
  };

  const handleUpload2 = async (index) => {
    const storage = getStorage(app);
    const uploadPromises = [];

    if (file2) {
      const storageRef = ref(storage, `images/${file2.name}`);
      const uploadTask = uploadBytes(storageRef, file);
      uploadPromises.push(uploadTask);
      const url = await getDownloadURL(storageRef);

      // Update the phoneColours state with the new image URL
      const updatedPhoneColours = [...phoneColours];
      updatedPhoneColours[index].img2 = url;
      setPhoneColours(updatedPhoneColours);
    }

    await Promise.all(uploadPromises);
  };

  const handleUpload3 = async (index) => {
    const storage = getStorage(app);
    const uploadPromises = [];

    if (file3) {
      const storageRef = ref(storage, `images/${file3.name}`);
      const uploadTask = uploadBytes(storageRef, file);
      uploadPromises.push(uploadTask);
      const url = await getDownloadURL(storageRef);

      // Update the phoneColours state with the new image URL
      const updatedPhoneColours = [...phoneColours];
      updatedPhoneColours[index].img3 = url;
      setPhoneColours(updatedPhoneColours);
    }

    await Promise.all(uploadPromises);
  };

  const handleUpload4 = async (index) => {
    const storage = getStorage(app);
    const uploadPromises = [];

    if (file4) {
      const storageRef = ref(storage, `images/${file4.name}`);
      const uploadTask = uploadBytes(storageRef, file);
      uploadPromises.push(uploadTask);
      const url = await getDownloadURL(storageRef);

      // Update the phoneColours state with the new image URL
      const updatedPhoneColours = [...phoneColours];
      updatedPhoneColours[index].img4 = url;
      setPhoneColours(updatedPhoneColours);
    }

    await Promise.all(uploadPromises);
  };
  const app = initializeApp({
    apiKey: "AIzaSyAM2Z7PZhKqU2Km1rnI8Nxb2XU_52PIuHU",
    authDomain: "livhealthify-a26b9.firebaseapp.com",
    databaseURL: "gs://livhealthify-a26b9.appspot.com",
    projectId: "livhealthify-a26b9",
    storageBucket: "livhealthify-a26b9.appspot.com",
    messagingSenderId: "703301225412",
    appId: "1:703301225412:web:9c35d84b3b70cf50487291",
  });

  const handleAddColour = () => {
    setPhoneColours([
      ...phoneColours,
      { color: " ", img1: "", img2: "", img3: "", img4: "" },
    ]);
  };

  const handlePhoneColourChange = (e, index) => {
    const { name, value } = e.target;
    const updatedColours = [...phoneColours];
    const updatedColour = { ...updatedColours[index] };

    switch (name) {
      case "color":
        updatedColour.color = value;
        break;
      case "sellingPrice":
        updatedColour.sellingPrice = value;
        break;
      case "ProductPrice":
        updatedColour.ProductPrice = value;
        break;
      case "quantity":
        updatedColour.quantity = value;
        break;
      default:
        break;
    }

    updatedColours[index] = updatedColour;
    setPhoneColours(updatedColours);
  };

  const initialCategory = ["Iphone", "TV", "Ipad", "Airpod", "Watch", "MAC"];

  const handleCategoryCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCategory((prevCategory) => [...prevCategory, value]);
    } else {
      setCategory((prevCategory) =>
        prevCategory.filter((category) => category !== value)
      );
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch("https://shy-cyan-bear-tie.cyclic.app/product/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
        subTitle: subTitle,
        brand: brand,
        category: category, // Add the category field
        phoneColour: phoneColours,
        model: formData.model,
        storage: formData.storage,
        modelName: modelName,
        networkServiceProvider: networkServiceProvider,
        os: os,
        technology: technology,
        description: description,
        new: "true",
        AppleCareMontly: formData.AppleCareMontly,
        ApplecareMrp: formData.ApplecareMrp,
        ApplecareDes: formData.ApplecareDes,
        name: formData.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data) {
          toast({
            title: "Data added successfully!",
            description: "Data added successfully!",
            status: "success",
            duration: 2000,
            isClosable: true,
          }); // Show success toast
          // navigate("/allproducts");
        } else {
          toast({
            title: "Data Not added successfully!",
            description: "Data Not added successfully!",
            status: "error",
            duration: 5000,
            isClosable: true,
          }); // Show error toast
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Grid
      gridTemplateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={4}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      m={"auto"}
    >
      <FormControl mb={4}>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Sub Title</FormLabel>
        <Input
          type="text"
          name="subTitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Brand</FormLabel>
        <Input
          type="text"
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Model Name</FormLabel>

        <Input
          type="text"
          name="brand"
          value={modelName}
          onChange={(e) => setmodelName(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Network Service Provider</FormLabel>
        <Input
          type="text"
          name="brand"
          value={networkServiceProvider}
          onChange={(e) => setnetworkServiceProvider(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Os</FormLabel>
        <Input
          type="text"
          name="brand"
          value={os}
          onChange={(e) => setos(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Technology</FormLabel>
        <Input
          type="text"
          name="brand"
          value={technology}
          onChange={(e) => settechnology(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          name="brand"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>AppleCare Monthly</FormLabel>
        <Input
          type="number"
          name="AppleCareMonthly"
          value={formData.appleCareMonthly}
          onChange={(e) =>
            setFormData({
              ...formData,
              appleCareMonthly: e.target.value,
            })
          }
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>AppleCare MRP</FormLabel>
        <Input
          type="number"
          name="ApplecareMrp"
          value={formData.applecareMrp}
          onChange={(e) =>
            setFormData({
              ...formData,
              applecareMrp: e.target.value,
            })
          }
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>AppleCare Description</FormLabel>
        <Input
          type="text"
          name="ApplecareDes"
          value={formData.ApplecareDes}
          onChange={(e) =>
            setFormData({
              ...formData,
              applecareDes: e.target.value,
            })
          }
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Category</FormLabel>
        <Box display={"flex"} flexWrap={"wrap"} gap={"10px"}>
          {initialCategory.map((categories) => (
            <Flex w={{ base: "auto", lg: "25%" }} gap={"5px"}>
              <input
                type="checkbox"
                key={categories}
                value={categories}
                onChange={handleCategoryCheckboxChange}
                isChecked={category.includes(categories)}
              />
              <label style={{ fontSize: "15px" }}>{categories}</label>
            </Flex>
          ))}
        </Box>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Phone Colour</FormLabel>
        {phoneColours?.map((colour, index) => (
          <div>
            <FormControl>
              <FormLabel>Colour</FormLabel>
              <Input
                type="text"
                name="color"
                value={colour.color || ""}
                onChange={(e) => handlePhoneColourChange(e, index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Product Price</FormLabel>
              <Input
                type="text"
                name="ProductPrice"
                value={colour.ProductPrice || ""}
                onChange={(e) => handlePhoneColourChange(e, index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Selling Price</FormLabel>
              <Input
                type="text"
                name="sellingPrice"
                value={colour.sellingPrice || ""}
                onChange={(e) => handlePhoneColourChange(e, index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="text"
                name="quantity"
                value={colour.quantity || ""}
                onChange={(e) => handlePhoneColourChange(e, index)}
              />
            </FormControl>
            <div key={index}>
              {/* ... */}
              <FormControl>
                <FormLabel>Image 1</FormLabel>
                <VStack spacing={4}>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange1(e, index)}
                  />
                </VStack>
              </FormControl>
              <Button onClick={() => handleUpload1(index)}>
                {colour.img1 ? "Change" : "Upload"}
              </Button>

              <FormControl>
                <FormLabel>Image 2</FormLabel>
                <VStack spacing={4}>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange2(e, index)}
                  />
                </VStack>
              </FormControl>
              <Button onClick={() => handleUpload2(index)}>
                {colour.img2 ? "Change" : "Upload"}
              </Button>
              {/* ... */}

              {/* ... */}
              <FormControl>
                <FormLabel>Image 3</FormLabel>
                <VStack spacing={4}>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange3(e, index)}
                  />
                </VStack>
              </FormControl>
              <Button onClick={() => handleUpload3(index)}>
                {colour.img3 ? "Change" : "Upload"}
              </Button>
              {/* ... */}

              {/* ... */}
              <FormControl>
                <FormLabel>Image 4</FormLabel>
                <VStack spacing={4}>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange4(e, index)}
                  />
                </VStack>
              </FormControl>
              <Button onClick={() => handleUpload4(index)}>
                {colour.img4 ? "Change" : "Upload"}
              </Button>
              {/* ... */}
            </div>
          </div>
        ))}
        <Button onClick={handleAddColour}>Add Phone Colour & Images</Button>
      </FormControl>
      <FormControl>
        <FormLabel>Model</FormLabel>
        {formData.model.map((model, index) => (
          <div key={index}>
            <FormControl>
              <FormLabel>Display</FormLabel>
              <Input
                type="text"
                name="display"
                value={model.display}
                onChange={(e) => handleModelChange(e, index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Per Month EMI</FormLabel>
              <Input
                type="text"
                name="perMonthEmi"
                value={model.perMonthEmi}
                onChange={(e) => handleModelChange(e, index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Model Actual Price</FormLabel>
              <Input
                type="text"
                name="ModelActualPrice"
                value={model.ModelActualPrice}
                onChange={(e) => handleModelChange(e, index)}
              />
            </FormControl>
          </div>
        ))}
        <Button
          onClick={() =>
            setFormData({
              ...formData,
              model: [
                ...formData.model,
                {
                  display: "",
                  perMonthEmi: "",
                  ModelActualPrice: "",
                },
              ],
            })
          }
        >
          Add Model
        </Button>
      </FormControl>

      <FormControl>
        <FormLabel>Storage</FormLabel>
        {formData.storage.map((storage, index) => (
          <div key={index}>
            <FormControl>
              <FormLabel>Phone Storage</FormLabel>
              <Input
                type="text"
                name="phoneStorage"
                value={storage.phoneStorage}
                onChange={(e) => handleStorageChange(e, index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Per Month EMI</FormLabel>
              <Input
                type="text"
                name="perMonthEmi"
                value={storage.perMonthEmi}
                onChange={(e) => handleStorageChange(e, index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Actual Price</FormLabel>
              <Input
                type="text"
                name="ActualPrice"
                value={storage.ActualPrice}
                onChange={(e) => handleStorageChange(e, index)}
              />
            </FormControl>
          </div>
        ))}
        <Button
          onClick={() =>
            setFormData({
              ...formData,
              storage: [
                ...formData.storage,
                {
                  phoneStorage: "",
                  perMonthEmi: "",
                  ActualPrice: "",
                },
              ],
            })
          }
        >
          Add Storage
        </Button>
      </FormControl>

      {/* <FormControl mb={4}>
        <FormLabel>New</FormLabel>
        <Input
          type="text"
          name="new"
          value={formData.new}
          onChange={handleInputChange}
        />
      </FormControl> */}
      <FormControl mb={4}>
        <FormLabel>AppleCare Monthly</FormLabel>
        <Input
          type="number"
          name="AppleCareMontly"
          value={formData.AppleCareMontly}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>AppleCare MRP</FormLabel>
        <Input
          type="number"
          name="ApplecareMrp"
          value={formData.ApplecareMrp}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>AppleCare Description</FormLabel>
        <Input
          type="text"
          name="ApplecareDes"
          value={formData.applecareDes}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </FormControl>
      <Button colorScheme="teal" isLoading={loading} onClick={handleSave}>
        Save
      </Button>
    </Grid>
  );
};

export default AddProducts;
