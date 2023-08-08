import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const {id} = useParams()

  console.log(id);

  const [product, setProduct] = useState({
    title: "",
    price: 0,
    subTitle: "",
    brand: "",
    modelName: "",
    networkServiceProvider: "",
    os: "",
    technology: "",
    description: "",
    category: [],
    phoneColour: [],
    model: [],
    storage: [],
    new: "",
    AppleCareMontly: 0,
    ApplecareMrp: 0,
    ApplecareDes: [],
    name: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://shy-cyan-bear-tie.cyclic.app/product/allproductdata/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://shy-cyan-bear-tie.cyclic.app/product/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render your form fields based on the product schema */}
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={product.title}
        onChange={handleChange}
      />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
      />

      {/* Add more form fields based on the product schema */}

      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateProduct;
