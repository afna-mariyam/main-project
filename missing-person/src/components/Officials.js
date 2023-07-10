import React, {useState} from 'react'
import '../App.css';
import profile from "./image/pr.jpg";
import email from "./image/email.png";
import pass from "./image/lock.png";
import {useNavigate} from "react-router-dom";

const Officials = () =>{ 
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

//  let name, value;
// const handleInputs = (e) => {
 
//  name = e.target.name;
//  value = e.target.value;
//  console.log(name,value);
//  setLogin({...login, [name]:value});
// }
const loginInv = async (e) => {
  e.preventDefault();
  
  const res = await fetch('/api1/login', {
    method : "POST",
    credentials:"include",
    headers:{
      "Content-Type" : "application/json"
    },
    body:JSON.stringify({
      username,password
    })
  

  });
const data = await res.json();
if(res.status === 400 || !data){
  window.alert("invalid credential");
} else {
  window.alert("login successful");
  navigate("/invreg");
}
}
  return (
    <div className="main" >
     <div className="sub-main">
       <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>


         </div>
         <div>
           <h1>ADMIN LOGIN</h1>
           <div method = "POST">
            <span>
             <img src={email} alt="email" className="email" style={{minWidth:"60px",minHeight:"40px"}} />
             <input type="text" placeholder="user name" className="name" autoComplete="off" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
             </span>
           </div>
           <div className="second-input">
             <img src={pass} alt="pass" className="email" style={{minWidth:"60px",minHeight:"40px"}} />
             <input type="password" placeholder="password" className="name" autoComplete='off' name="password" value={password} onChangeCapture={(e) => setPassword(e.target.value)}
             
/>
           </div>
          <div className="login-button">
          <button onClick={loginInv} className='login-btn'>LOGIN</button>
          </div>
           
            <p className="link">
            </p>
           
 
         </div>
       </div>
       

     </div>
    </div>
  );
}

export default Officials;