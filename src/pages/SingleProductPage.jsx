import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Flex,
  HStack,
  useToast,
  ListItem,
  Select,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import "@fontsource/roboto";
import { useParams, useNavigate } from "react-router-dom";

import { AiFillApple } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { TbCoinRupee } from "react-icons/tb";
import { RiWechatLine } from "react-icons/ri";
import "@fontsource/poppins"; //

const SingleProductPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productp, setProductp] = useState(0);
 
  const [selectedColor, setSelectedColor] = useState("black");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [display, setDisplay] = useState("");
  const [storage1, setStorage] = useState("");
  const { id } = useParams();
  const toast = useToast();
  const [oldPhones, setOldPhones] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBodyDamage, setSelectedBodyDamage] = useState("");
  const [selectedBodyDamage1, setSelectedBodyDamage1] = useState("");
  const [selectedBodyDamage2, setSelectedBodyDamage2] = useState("");
  const [selectedDes, setSelectedDes] = useState([]);
  const [selectedBox, setSelectedBox] = useState("");

  const handleBoxSelection = (boxName) => {
    setSelectedBox(boxName);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://shy-cyan-bear-tie.cyclic.app/old"
      );
      const data = await response.json();
      setOldPhones(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleModelChange = (event) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);
    const selectedPhone = oldPhones.find(
      (phone) => phone.modelName === selectedModel
    );
    setSelectedBodyDamage(selectedPhone?.bodyDamage || "");
    setSelectedBodyDamage1(selectedPhone?.returnNoDamage || "");
    setSelectedBodyDamage2(selectedPhone?.screenDamage || "");
    setSelectedDes(selectedPhone?.des || "");
  };

  let condition;
  if (selectedBodyDamage !== "" && selectedModel !== "") {
    condition = "No Body Damange";
  } else if (selectedBodyDamage1 !== "" && selectedModel !== "") {
    condition = "Only body damage";
  } else if (selectedBodyDamage2 !== "" && selectedModel !== "") {
    condition = "Screen Damange";
  } else if (selectedModel === "") {
    condition = "No data";
  }

  let appleCareDatamontly;
  let applecareDataMrp;
  if (selectedBox === "appleCare") {
    appleCareDatamontly = product.AppleCareMontly;
    applecareDataMrp = product.ApplecareMrp;
  }

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://shy-cyan-bear-tie.cyclic.app/product/allproductdata/${id}`
        );
        const data = await response.json();
        setProduct(data);
        setPrice(data.price);
        setsellingPrice(data.price);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  const handleAddToCart = ({
    productId,
    title,
    image,
    color,
    storage,
    display,
    quantity,
    price,
    mobileCondition,
    oldmobileModel,
    selectedBox,
    appleMrp,
    appleMontly,
  }) => {
    if (color === "") {
      toast({
        title: "Please select a color",

        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (display === "") {
      toast({
        title: "Please select a Model",

        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (storage === "") {
      toast({
        title: "Please select a storage",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (selectedBox === null) {
      toast({
        title: "Please Select Apple care",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const data = {
        productId: productId,
        title: title,
        image: image,
        price: price,
        color: color,
        storage: storage,
        display: display,
        quantity: quantity,
        oldmobileModel: oldmobileModel,
        mobileCondition: mobileCondition,
        selectedBox: selectedBox,
        appleCareMrp: appleMrp,
        appleCareMontly: appleMontly,
      };
      console.log(data);

      const token = localStorage.getItem("token");

      axios
        .post("https://shy-cyan-bear-tie.cyclic.app/cart/add", data, {
          SingleProductPages: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          toast({
            title: "Product Added Successfully!!",

            status: "success",

            isClosable: true,
            position: "top",
          });
          navigate("/cart");
        })
        .catch((error) => {
          console.log(error.response.data);
          toast({
            title: "Error In Adding Product To Cart!!",

            status: "error",

            isClosable: true,
            position: "top",
          });
        });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }


  const handleColorSelection = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0);

    // Find the selected phone color
    const selectedPhoneColor = product.phoneColour.find(
      (colour) => colour.color === color
    );

    // Update the price based on the selected color
    if (selectedPhoneColor) {
      setPrice(selectedPhoneColor.sellingPrice);
      setProductp(selectedPhoneColor.ProductPrice);
      
    } else {
      setPrice(product.price);
      setProductp(product.price);
    }
  };

  const handleDecrease = () => {
    setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.phoneColour.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.phoneColour.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderImages = () => {
    const selectedPhoneColor = product.phoneColour.find(
      (color) => color.color === selectedColor
    );

    if (!selectedPhoneColor) {
      return (
        <Flex alignItems="center" justifyContent="center">
          <Button
            variant="ghost"
            onClick={handlePrevImage}
            leftIcon={<ChevronLeftIcon />}
          />

          <Box
            display={["none", "none", "block"]}
            w="100%"
            padding={"20px"}
            mt={"50px"}
          >
            <Image
              src={product.phoneColour[0][`img${currentImageIndex + 1}`]}
              alt="Phone"
              w={"100%"}
              borderRadius="md"
              boxShadow="md"
              h={"370px"}
            />
          </Box>
          <Button
            variant="ghost"
            onClick={handleNextImage}
            rightIcon={<ChevronRightIcon />}
          />
        </Flex>
      );
    }

    return (
      <Flex alignItems="center" justifyContent="center">
        <Button
          variant="ghost"
          onClick={handlePrevImage}
          leftIcon={<ChevronLeftIcon />}
        />

        <Box
          display={["none", "none", "block"]}
          w="100%"
          padding={"20px"}
          mt={"50px"}
        >
          <Image
            src={selectedPhoneColor[`img${currentImageIndex + 1}`]}
            alt="Phone"
            w={"100%"}
            borderRadius="md"
            boxShadow="md"
            h={"370px"}
          />
        </Box>
        <Button
          variant="ghost"
          onClick={handleNextImage}
          rightIcon={<ChevronRightIcon />}
        />
      </Flex>
    );
  };

  return (
    <Box mt={"150px"}>
      <Heading textAlign={"left"} fontFamily={"Roboto"}>
        {product.title}
      </Heading>
      <Text fontWeight={"20"} mt="1%" textAlign={"left"} fontFamily={"Roboto"}>
        From ₹{product.model[0].perMonthEmi}/mo.Per Month with instant savings§§
        and No Cost EMI§Footnote or ₹{product.model[0].Actualprice}
      </Text>

      <Box mt="5%" display={"flex"} gap={"20px"}>
        <Box display={["none", "none", "block"]} w="50%" padding={"20px"}>
          {renderImages()}
          <Box>
            <Heading size={"xl"}>Selling Price ₹{price}</Heading>
          </Box>
          <br />
          <Box>
            <Heading size={"lg"}>
              {" "}
              Price ₹<strike>{productp}</strike>
            </Heading>
          </Box>
        </Box>
        <Box w={["100%", "100%", "50%"]} padding={"5px"}>
          <Heading fontSize={"27px"} fontFamily={"Roboto"}>
            Select Model Which Best For you ?
          </Heading>
          <Box
            mt="5%"
            display={"flex"}
            flexFlow={["column", "column", "row"]}
            gap={"20px"}
          >
            {product.model.map((model) => (
              <Box
                bg={display === model.display ? "#c1c1c1" : "aliceblue"}
                borderRadius={"30px"}
                padding={"6px 7px"}
                border={"2px solid black"}
                display={"flex"}
                justifyContent={"space-between"}
                gap={"10px"}
                key={model._id}
                onClick={() => setDisplay(model.display)}
              >
                <Text
                  display={"flex"}
                  justifyContent={"left"}
                  alignItems={"center"}
                  textAlign={"center"}
                  fontSize={"12px"}
                  fontWeight={"700"}
                  p={"10px 3px"}
                  w={"65%"}
                >
                  {product.title}
                  <br />
                  {model.display}
                </Text>
                <Text
                  justifyContent={"right"}
                  alignItems={"right"}
                  textAlign={"right"}
                  fontSize={"10px"}
                  p={"0px 0px"}
                  fontWeight={"700"}
                  w={"33%"}
                  pr={"7px"}
                  fontFamily={"Poppins"}
                >
                  From ₹{model.perMonthEmi}/mo.Per Month with instant savings§§
                  and No Cost EMI§Footnoteor ₹{model.Actualprice}Footnote‡
                </Text>
              </Box>
            ))}
          </Box>

          <Box
            mt={["15%", "15%", "5%"]}
            flexFlow={["column", "column", "row"]}
            display={"flex"}
            gap={"20%"}
          >
            <Heading
              mb={["5%", "5%", "1%"]}
              fontSize={"27px"}
              fontFamily={"Roboto"}
            >
              Choose Your Color
            </Heading>
            <Box mt={2} w={"40%"} display={"flex"}>
              {product.phoneColour.map((colour) => (
                <Box
                  key={colour._id}
                  size="xs"
                  onClick={() => handleColorSelection(colour.color)}
                  ml={2}
                  backgroundColor={colour.color}
                  width="20px"
                  height="20px"
                  borderRadius="50%"
                  border="1px solid gray"
                />
              ))}
            </Box>
          </Box>

          <Heading
            mt={["10%", "10%", "5%"]}
            fontSize={"27px"}
            fontFamily={"Roboto"}
          >
            Storage
          </Heading>
          <Box
            mt={["5%", "5%", "3%"]}
            display={"flex"}
            flexFlow={["column", "column", "row"]}
            gap={"20px"}
          >
            {product.storage.map((storage) => (
              <Box
                bg={storage1 === storage.phoneStorage ? "#c1c1c1" : "aliceblue"}
                borderRadius={"30px"}
                padding={"6px 7px"}
                border={"2px solid black"}
                display={"flex"}
                justifyContent={"space-between"}
                gap={"10px"}
                key={storage._id}
                onClick={() => setStorage(storage.phoneStorage)}
              >
                <Text
                  display={"flex"}
                  justifyContent={"left"}
                  alignItems={"center"}
                  textAlign={"center"}
                  fontSize={"12px"}
                  fontWeight={"700"}
                  p={"10px px"}
                  w={"65%"}
                >
                  {storage.phoneStorage}
                </Text>
                <Text
                  justifyContent={"right"}
                  alignItems={"right"}
                  textAlign={"right"}
                  fontSize={"11px"}
                  p={"0px 0px"}
                  fontWeight={"700"}
                  w={"58%"}
                  pr={"5px"}
                >
                  From ₹2{storage.perMonthEmi}/mo.Per Month with instant
                  savings§§ and No Cost EMI§Footnoteor MRP ₹
                  {storage.Actualprice}Footnote‡ (Incl. of all taxes)
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ^^^^^^^^^^^^^^^^^^^^^^^^ SingleProductPage &&&&&&&&&&&&&&&&&&&&&&&& */}
      <Box mt={["13%", "13%", "3%"]}>
        <Box m="6% 0">
          <Heading fontSize={"30px"} textAlign={"left"}>
            AppleCare+ coverage. Protect your new iPhone.
          </Heading>

          <Box
            p={"10px"}
            mt={["8%", "8%", "2%"]}
            display={"grid"}
            gridTemplateColumns={[
              "repeat(1,1fr)",
              "repeat(1,1fr)",
              "repeat(2,1fr)",
            ]}
            gap={"20px"}
          >
            <Box
              borderRadius={"20px"}
              padding={"10px"}
              border={"1px solid #c1c1c1"}
              pt={"10px"}
              bg={selectedBox === "appleCare" ? "#c1c1c1" : "white"}
              onClick={() => handleBoxSelection("appleCare")}
            >
              <Box display={"flex"} gap={"5px"} pl={"20px"} pt={"10px"}>
                <AiFillApple color="red" fontSize={"19px"} />
                <Heading fontSize={"19px"} fontFamily={"Roboto"}>
                  AppleCare+
                </Heading>
              </Box>
              <Text
                color={"gray"}
                fontSize={"17px"}
                fontWeight={"600"}
                textAlign={"left"}
                pl={"25px"}
                pt={"10px"}
                fontFamily={"Roboto"}
              >
                From ₹{product.AppleCareMontly}.00/mo.
              </Text>
              <Text
                color={"gray"}
                fontSize={"17px"}
                fontWeight={"600"}
                textAlign={"left"}
                pl={"25px"}
                fontFamily={"Roboto"}
              >
                or MRP ₹{product.ApplecareMrp}00(inc.of all taxes)
              </Text>
              <br />
              <hr />
              <UnorderedList mt="2%" pl={"10px"}>
                {product.ApplecareDes.map((item, index) => (
                  <ListItem
                    textAlign={"left"}
                    key={index}
                    fontFamily={"Roboto"}
                    color={"gray"}
                    fontSize={"17px"}
                  >
                    {item}
                  </ListItem>
                ))}
                <br />
              </UnorderedList>
            </Box>

            <Box
              borderRadius={"20px"}
              padding={"10px"}
              border={"1px solid #c1c1c1"}
              p={"10px"}
              pt={"10px"}
              bg={selectedBox === "noAppleCare" ? "#c1c1c1" : "white"}
              onClick={() => handleBoxSelection("noAppleCare")}
            >
              <Heading
                fontSize={"19px"}
                textAlign={"left"}
                pl={"10px"}
                pt={"10px"}
              >
                No AppleCare+ Coverage
              </Heading>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleProductPage;
