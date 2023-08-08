import { Box, Button, Flex, FormControl, FormLabel, Image, Input, useToast, Progress } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import {getDownloadURL, ref , uploadBytesResumable} from 'firebase/storage'



function AddProducts1() {
    
    const [images,setImages] = useState([]);
    const [title,setTitle] = useState("");
    const [price,setPrice] = useState(0);
    const [packedPrice,setPackedPrice] = useState(0);
    const [rating,setRating] = useState(0);
    const [info,setInfo] = useState("");
    const [brand,setBrand] = useState("");
    const [description,setDescription] = useState("");
    const [progress,setProgress] = useState(0)

    const toast = useToast()


    var imageURL = [];
 

    const uploadFiles = () => {
        imageURL = [];
        let count = 0;
        
        if(images.length <= 2)
        {
            return toast({
                title: 'Images Credentials.',
                description: "You have to select attleast 3 Images.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
        if(title.length <=4)
        {
            return toast({
                title: 'Title Credentials.',
                description: "You have to write attleast more than 5 letters long.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
        if(price == 0)
        {
            return toast({
                title: 'Price Credentials.',
                description: "You are not allowed to set price at 0.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
        if(packedPrice == 0)
        {
            return toast({
                title: 'Packed Price Credentials.',
                description: "You are not allowed to set price at 0.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
        if(rating == 0)
        {
            return toast({
                title: 'Rating Credentials.',
                description: "You have to select attleast 1 rating.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
        if(info.length <=10)
        {
            return toast({
                title: 'Info Credentials.',
                description: "You have to write attleast 10 letter info!",
                status: 'info',
                duration: 9000,
                isClosable: true,
              })
        }
        if(brand.length <= 5)
        {
            return toast({
                title: 'Brand Credentials.',
                description: "You have to write attleast 6 letter Brand Name!",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
        if(description.length <= 10)
        {
            return toast({
                title: 'Description Credentials.',
                description: "You have to write attleast 10 letter Description!",
                status: 'info',
                duration: 9000,
                isClosable: true,
              })
        }

        for(let i=0;i<images.length;i++)
        {

            const storageRef = ref(storage,`/files/${images[i].name}`)
            const uploadTask = uploadBytesResumable(storageRef, images[i]);
        
            uploadTask.on(
            "state_changed",
            (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(percent)
        
            },
            (err) => console.log(err),
            async() => {
                        // download url
                    

                await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        // console.log(url)
                        imageURL.push(url);
                        console.log(imageURL)
                        count++
                        
                        if(count == images.length)
                            {
                                
                                fetch('https://dark-gray-nightingale-tam.cyclic.app/product/add',{
                                method:"post",
                                headers:{
                                    "Content-Type":"application/json",
                                },
                                body:JSON.stringify({
                                    image:imageURL,
                                    title,
                                    price,
                                    packedPrice,
                                    rating,
                                    info,
                                    brand,
                                    description
                                })
                                }).then(res => res.json())
                                .then(data => {
                                    // console.log(data,"new data")
                                    toast({
                                        title: 'New Product created.',
                                        description: "We've created your new product for you.",
                                        status: 'success',
                                        duration: 9000,
                                        isClosable: true,
                                      })
                                }).catch(err => {
                                    console.log(err)
                                    toast({
                                        title: 'Network Error!',
                                        description: "Please check your network!",
                                        status: 'error',
                                        duration: 9000,
                                        isClosable: true,
                                      })
                                })
                            }
                    });
                    }
                )
            
        }
        
        //seturl here
        // 
    }

    
    

  return (
    <div style={{border:"2px solid lightgrey",borderRadius:"20px",width:"60%",margin:"auto",padding:"20px"}}>
    <form style={{display:"flex",flexDirection:"column",gap:"10px"}}>
    <FormControl>
        <FormLabel>Image</FormLabel>
        <Input
            type="file" 
            multiple
            onChange={(e) => setImages(e.target.files)}
        />
    </FormControl>
    <Progress value={progress} />

    <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
           
        />
    </FormControl>

    <FormControl>
        <FormLabel>Price</FormLabel>
        <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />
    </FormControl>

    <FormControl>
        <FormLabel>Packed Price</FormLabel>
        <Input
            type="number"
            value={packedPrice}
            onChange={(e) => setPackedPrice(e.target.value)}
            
        />
    </FormControl>

    <FormControl>
        <FormLabel>Rating</FormLabel>
        <Input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            
        />
    </FormControl>

    <FormControl>
        <FormLabel>Info</FormLabel>
        <Input
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
        />
    </FormControl>

    <FormControl>
        <FormLabel>Brand</FormLabel>
        <Input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
        />
    </FormControl>

    <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            
        />
    </FormControl>

    
    <Button background={"teal"} color={"white"} onClick={uploadFiles} >Submit</Button>

</form>
    </div>
  )
}

export default AddProducts1