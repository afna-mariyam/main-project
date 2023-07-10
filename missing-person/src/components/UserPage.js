import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from 'axios';

const UserPage = () => {
  
  const navigate = useNavigate();
  const [data,setComps]=useState([]);
  // const [testimg,setTestimg]=useState([]);
  
  const [image, setImage] = useState("");
  const [user, setUser] = useState({
    name: "",
    phone_no: "",
    loc:""
  });
  // const [user,setUser]=useState({});
  let name, value;
  const handleInputs = (e) => {
    // localStorage.setItem("name",e.target.value);
    // console.log(e);
    // console.log(name, value);
    // console.log(e.target.name, e.target.value);
    name = e.target.name;
    value = e.target.value;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };
  // function handleInputs(e){
  //     setUser({...user,[e.target.name]:e.target.value});
  //    }

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append('image', image);
  //     try {
  //       const res = await axios.post('/api/upload', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         }a
  //       });
  //       console.log(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const PostData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", user.name);
    formData.append("phone_no", user.phone_no);
    formData.append("loc",user.loc);
    fetch("/api1/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text()).then(data=>{
        console.log(data);
        axios.post('/api2/testimage', { image_url:data })
    
        .then(response => {
          console.log(response.data);
         const cmpid=response.data.caseid.split("_",1);
          const  person=response.data.file.split(".",1);
                
          if(response.data.caseid == "unknown" ){
                window.alert("No match found");
                
            } else {
                window.alert("Match found and details sent to investigator");
                console.log(cmpid);
                console.log(person);
               
                //messsage box need to be called here
                msgfill(cmpid,person);
                }
        
          
        })
        .catch(error => {
          console.error(error);
        });
        window.alert(" registration successful");
        // fetchtestimage()
      })
      .catch((error) => {
        console.error(error);
        window.alert("invalid registration");
      });

    // const data = await res.json();
    // if(res.status === 422 || !data ){
    //     window.alert("invalid registration");
    //     console.log("invalid registration");
    // } else {
    //     window.alert(" registration successful");
    //     console.log(" registration successful");

    // navigate("/");
    // }
  };
  const msgfill = (cmpid,person) => {
    // cmpid.preventDefault();
    // person.preventDefault();
    console.log(cmpid);
    console.log(person);
    axios.post('/api1/msgbx',{cmpid:cmpid, person:person});
  };
  const [location, setLocation] = useState("null");

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if(position && position.coords){
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log(location.latitude);
          console.log(location.longitude);
          
          user.loc = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
          value=user.loc
            // onChange={handleInputs}
          console.log(user.loc)
        } else {
            console.log('invalid position objects: ');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
          
       
  return (
    <div className="container">
      <div className="userpage">
        <center>
          
          <div method="POST" className="col-md-4">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              autoComplete="off"
              value={user.name}
              onChange={handleInputs}
              onClick={handleGetLocation}
              placeholder="John Smith"
            ></input>
            <br></br>
            <label className="form-label">Phone number</label>
            <input
              type="text"
              className="form-control"
              name="phone_no"
              id="phone_no"
              autoComplete="off"
              value={user.phone_no}
              onChange={handleInputs}
              onClick={handleGetLocation}
              placeholder="9192939495"
            ></input>
            <br></br>
            <label className="form-label">Upload photo</label>
            <input type="file" onChange={handleImageChange}  />
            <br></br>
            
            <button type="submit" className="user-btn" onClick={PostData}>
              Submit
            </button>
          </div>
        </center>
      </div>
    </div>
  )
};

export default UserPage
