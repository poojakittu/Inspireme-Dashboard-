import React, { useState } from 'react';
import { Button, VStack, Image, Input } from '@chakra-ui/react';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';



// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyAM2Z7PZhKqU2Km1rnI8Nxb2XU_52PIuHU",
    authDomain: "livhealthify-a26b9.firebaseapp.com",
    databaseURL:"gs://livhealthify-a26b9.appspot.com",
    projectId: "livhealthify-a26b9",
    storageBucket: "livhealthify-a26b9.appspot.com",
    messagingSenderId: "703301225412",
    appId: "1:703301225412:web:9c35d84b3b70cf50487291"
  });
  
 

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    }
  };

  return (
    <VStack spacing={4}>
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
      {imageUrl && <Image src={imageUrl} alt="Uploaded Image" />}
      {imageUrl && <Input value={imageUrl} isReadOnly />}
    </VStack>
  );
};

export default ImageUploader;
