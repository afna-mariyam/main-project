import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Test =() => {
    const [data,setComps]=useState([]);
    const [img,setImg]=useState([]);
    const Fetchcimageurls = async (e) => {
        e.preventDefault();
        try{
          const response = await axios.get('/api1/fetchcimageurl');
          setComps(response.data);
          console.log(data);
          // console.log(data.pop().cimage_url);
          setImg(data.pop());
          console.log(img)
      // man();
        }
        catch(error){
          console.log("inside catch not fetched");
          console.log(error);
        }
      
      };
    return(
        <div>
            test
            <button type="submit"  onClick={Fetchcimageurls}>Get the image</button>
        </div>
    );
}
export default Test;