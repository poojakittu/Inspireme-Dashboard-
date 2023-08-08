import React, { useState } from 'react';
import axios from 'axios';

function Pooja() {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    subTitle: '',
    brand: '',
    modelName: '',
    networkServiceProvider: '',
    os: '',
    technology: '',
    description: '',
    category: ['all'],
    phoneColour: [
      {
        color: '',
        img1: '',
        img2: '',
        img3: '',
        img4: '',
      },
    ],
    model: [
      {
        display: '',
        perMonthEmi: '',
        Actualprice: '',
      },
    ],
    storage: [
      {
        phoneStorage: '',
        perMonthEmi: '',
        Actualprice: '',
      },
    ],
    new: ['false'],
  });

  const handleChange = (e) => {
    if (e.target.name === 'phoneColour') {
      const phoneColour = [...formData.phoneColour];
      const index = e.target.dataset.index;
      const property = e.target.dataset.property;
      phoneColour[index][property] = e.target.value;
      setFormData({ ...formData, phoneColour });
    } else if (e.target.name === 'model') {
      const model = [...formData.model];
      const index = e.target.dataset.index;
      const property = e.target.dataset.property;
      model[index][property] = e.target.value;
      setFormData({ ...formData, model });
    } else if (e.target.name === 'storage') {
      const storage = [...formData.storage];
      const index = e.target.dataset.index;
      const property = e.target.dataset.property;
      storage[index][property] = e.target.value;
      setFormData({ ...formData, storage });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const response = await fetch(
          "https://shy-cyan-bear-tie.cyclic.app/product/alldata?category=ipad"
        ); // Change the URL to your actual API endpoint
        const data = await response.json();
        console.log(data)
            setFormData(data.data)
        if (Array.isArray(data.data)) {
          setProducts(data.data);
          setLoading(false);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Subtitle:
          <input
            type="text"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
          />
        </label>
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </label>
        <label>
          Model Name:
          <input
            type="text"
            name="modelName"
            value={formData.modelName}
            onChange={handleChange}
          />
        </label>
        <label>
          Network Service Provider:
          <input
            type="text"
            name="networkServiceProvider"
            value={formData.networkServiceProvider}
            onChange={handleChange}
          />
        </label>
        <label>
          Operating System:
          <input
            type="text"
            name="os"
            value={formData.os}
           
            onChange={handleChange}
          />
        </label>
        <label>
          Technology:
          <input
            type="text"
            name="technology"
            value={formData.technology}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <h2>Phone Colour</h2>
        {formData.phoneColour.map((color, index) => (
          <div key={index}>
            <label>
              Color:
              <input
                type="text"
                name="phoneColour"
                data-index={index}
                data-property="color"
                value={color.color}
                onChange={handleChange}
              />
            </label>
            <label>
              Image 1:
              <input
                type="text"
                name="phoneColour"
                data-index={index}
                data-property="img1"
                value={color.img1}
                onChange={handleChange}
              />
            </label>
            <label>
              Image 2:
              <input
                type="text"
                name="phoneColour"
                data-index={index}
                data-property="img2"
                value={color.img2}
                onChange={handleChange}
              />
            </label>
            <label>
              Image 3:
              <input
                type="text"
                name="phoneColour"
                data-index={index}
                data-property="img3"
                value={color.img3}
                onChange={handleChange}
              />
            </label>
            <label>
              Image 4:
              <input
                type="text"
                name="phoneColour"
                data-index={index}
                data-property="img4"
                value={color.img4}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button onClick={() => setFormData({ ...formData, phoneColour: [...formData.phoneColour, { color: '', img1: '', img2: '', img3: '', img4: '' }] })}>
          Add Phone Colour
        </button>
        <h2>Model</h2>
        {formData.model.map((model, index) => (
          <div key={index}>
            <label>
              Display:
              <input
                type="text"
                name="model"
                data-index={index}
                data-property="display"
                value={model.display}
                onChange={handleChange}
              />
            </label>
            <label>
              Per Month EMI:
              <input
                type="text"
                name="model"
                data-index={index}
                data-property="perMonthEmi"
                value={model.perMonthEmi}
                onChange={handleChange}
              />
            </label>
            <label>
              Actual Price:
              <input
                type="text"
                name="model"
                data-index={index}
                data-property="Actualprice"
                value={model.Actualprice}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button onClick={() => setFormData({ ...formData, model: [...formData.model, { display: '', perMonthEmi: '', Actualprice: '' }] })}>
          Add Model
        </button>
        <h2>Storage</h2>
        {formData.storage.map((storage, index) => (
          

          <div key={index}>
            <label>
              Phone Storage:
              <input
                type="text"
                name="storage"
                data-index={index}
                data-property="phoneStorage"
                value={storage.phoneStorage}
                onChange={handleChange}
              />
            </label>
            <label>
              Per Month EMI:
              <input
                type="text"
                name="storage"
                data-index={index}
                data-property="perMonthEmi"
                value={storage.perMonthEmi}
                onChange={handleChange}
              />
            </label>
            <label>
              Actual Price:
              <input
                type="text"
                name="storage"
                data-index={index}
                data-property="Actualprice"
                value={storage.Actualprice}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button onClick={() => setFormData({ ...formData, storage: [...formData.storage, { phoneStorage: '', perMonthEmi: '', Actualprice: '' }] })}>
          Add Storage
        </button>
        <label>
          New:
          <input
            type="text"
            name="new"
            value={formData.new}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Pooja;