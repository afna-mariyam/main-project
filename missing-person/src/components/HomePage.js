import React from 'react'
import "../App.css"
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='home-page-screen'>
        <h1 className='header-content'>MISSING PERSON IDENTIFICATION<br></br>SYSTEM</h1>
        <button onClick={()=>{navigate("/admin")}} className='home-btn'>INVESTIGATOR</button>
        <button onClick={()=>{navigate("/user")}} className='home-btn'>USER</button>
        <button onClick={()=>{navigate("/official")}} className='home-btn'>ADMIN</button>

    </div>
  );
}

export default HomePage;