import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const SingleProduct = () => {
  const toast = useToast();
  const { id } = useParams();
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
    AppleCareMontly: "",
    ApplecareMrp: "",
    ApplecareDes: [],
    name: "",
  });

  console.log(formData.model);

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
      // Use file1 here
      const storageRef = ref(storage, `images/${file1.name}`);
      const uploadTask = uploadBytes(storageRef, file1); // Update here
      uploadPromises.push(uploadTask);
      const url = await getDownloadURL(storageRef);

      // Update the phoneColours state with the new image URL
      const updatedPhoneColours = [...phoneColours];
      updatedPhoneColours[index].img1 = url;
      setPhoneColours(updatedPhoneColours);
    }

    await Promise.all(uploadPromises);
  };

  // Similarly, update the remaining upload functions (handleUpload2, handleUpload3, handleUpload4)

  const handleUpload2 = async (index) => {
    const storage = getStorage(app);
    const uploadPromises = [];

    if (file2) {
      const storageRef = ref(storage, `images/${file2.name}`);
      const uploadTask = uploadBytes(storageRef, file2);
      uploadPromises.push(uploadTask);
      const url = await getDownloadURL(storageRef);

      // Update the phoneColours state with the new image URL
      const updatedPhoneColours = [...phoneColours];
      updatedPhoneColours[index].img2 = url;
      setPhoneColours(updatedPhoneColours);
    }

    await Promise.all(uploadPromises);
  };

  const initialCategory = ["Iphone", "TV", "Ipad", "Airpod", "Watch", "MAC"];

  const handleUpload3 = async (index) => {
    const storage = getStorage(app);
    const uploadPromises = [];

    if (file3) {
      const storageRef3 = ref(storage, `images/${file3.name}`);
      const uploadTask3 = uploadBytes(storageRef3, file3);
      uploadPromises.push(uploadTask3);
      const url3 = await getDownloadURL(storageRef3);

      // Update the phoneColours state with the new URL for Image 3
      const updatedPhoneColours = [...phoneColours];
      updatedPhoneColours[index].img3 = url3;
      setPhoneColours(updatedPhoneColours);
    }

    await Promise.all(uploadPromises);
  };

  const handleUpload4 = async (index) => {
    const storage = getStorage(app);
    const uploadPromises = [];

    if (file4) {
      const storageRef4 = ref(storage, `images/${file4.name}`);
      const uploadTask4 = uploadBytes(storageRef4, file4);
      uploadPromises.push(uploadTask4);
      const url4 = await getDownloadURL(storageRef4);

      // Update the phoneColours state with the new URL for Image 4
      const updatedPhoneColours = [...phoneColours];
      updatedPhoneColours[index].img4 = url4;
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://shy-cyan-bear-tie.cyclic.app/product/allproductdata/${id}`
        );
        const data = await response.json();

        setTitle(data.title);
        setPrice(data.price);
        setSubTitle(data.subTitle);
        setBrand(data.brand);
        setmodelName(data.modelName);
        setnetworkServiceProvider(data.networkServiceProvider);
        setos(data.os);
        settechnology(data.technology);
        setdescription(data.description);

        // Update the formData with data received from the API
        setFormData({
          model: data.model, // Assuming the API response contains model data
          storage: data.storage, // Assuming the API response contains storage data
          new: data.new,
          AppleCareMontly: data.AppleCareMontly,
          ApplecareMrp: data.ApplecareMrp,
          ApplecareDes: data.ApplecareDes,
          name: data.name,
        });
        console.log(data);
        setCategory(data.category);
        setPhoneColours(data.phoneColour);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

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
      case "quantity": // Add a case for the "quantity" field
        updatedColour.quantity = value; // Update the quantity value
        break;
      default:
        break;
    }

    updatedColours[index] = updatedColour;
    setPhoneColours(updatedColours);
  };

  const handleCategoryCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCategory((prevCategory) => {
      if (checked) {
        return [...prevCategory, value];
      } else {
        return prevCategory.filter((category) => category !== value);
      }
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`https://shy-cyan-bear-tie.cyclic.app/product/update/${id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: title,
        price: price,
        subTitle: subTitle,
        brand: brand,
        category: category,
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
            title: "Data updated successfully!",
            description: "Data updated successfully!",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/allproducts");
        } else {
          toast({
            title: "Data not updated!",
            description: "Data not updated!",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
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
          value={formData.AppleCareMontly}
          onChange={(e) =>
            setFormData({
              ...formData,
              AppleCareMontly: e.target.value,
            })
          }
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>AppleCare MRP</FormLabel>
        <Input
          type="number"
          name="ApplecareMrp"
          value={formData.ApplecareMrp}
          onChange={(e) =>
            setFormData({
              ...formData,
              ApplecareMrp: e.target.value,
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
              ApplecareDes: e.target.value,
            })
          }
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Category</FormLabel>
        <Box display={"flex"} flexWrap={"wrap"} gap={"10px"}>
          {initialCategory.map((category) => (
            <Flex w={{ base: "auto", lg: "25%" }} gap={"5px"} key={category}>
              <input
                type="checkbox"
                value={category}
                onChange={handleCategoryCheckboxChange}
                checked={category.includes(category)}
              />
              <label style={{ fontSize: "15px" }}>{category}</label>
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
            <div>
              {/* ... */}
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="text"
                  name="quantity" // Add the name attribute
                  value={colour.quantity || ""}
                  onChange={(e) => handlePhoneColourChange(e, index)}
                />
              </FormControl>
              {/* ... */}
            </div>
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
        {formData.model.map((modelData, index) => (
          <div key={index}>
            <FormControl>
              <FormLabel>Display</FormLabel>
              <Input
                type="text"
                name="display"
                value={modelData.display}
                onChange={(e) => handleModelChange(e, index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Per Month EMI</FormLabel>
              <Input
                type="text"
                name="perMonthEmi"
                value={modelData.perMonthEmi}
                onChange={(e) => handleModelChange(e, index)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Model Actual Price</FormLabel>
              <Input
                type="text"
                name="ModelActualPrice"
                value={modelData.ModelActualPrice}
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
      <Button
        colorScheme="blue"
        size="lg"
        onClick={handleSave}
        isLoading={loading}
        loadingText="Saving"
      >
        Save
      </Button>
    </Grid>
  );
};

export default SingleProduct;
