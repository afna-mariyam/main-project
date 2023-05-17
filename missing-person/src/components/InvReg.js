import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../App.css';
const InvReg = () => {
    const navigate = useNavigate();
    const [inv,setInv] = useState({
       name:"",password:""
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
    console.log(name,value);
    setInv({...inv, [name]:value});
}
// function handleInputs(e){
//     setUser({...user,[e.target.name]:e.target.value});
//    }
const PostData = async (e) => {
    e.preventDefault();
    const { name, password } = inv;
    const res = await fetch("/invreg", {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            
                name, password
            
        })
    });
    const data = await res.json();
    if(res.status === 422 || !data ){
        window.alert("invalid registration");
        console.log("invalid registration");
    } else {
        window.alert(" registration successful");
        console.log(" registration successful");

        navigate("/");
    }
}

     return (
        
        <div className='container'>
        <div className='invreg'>
           
                <center>
                
                    <div method="POST" className="col-md-4">
                        <label  className="form-label">Police Station</label>
                        <input type="text" className="form-control"name="name" id="name" autoComplete='off'
                        value={inv.name}
                        onChange={handleInputs}
                        placeholder="Ernakulam-North"></input>
                        <br></br>
                        <label  className="form-label">Password</label>
                        <input type="text" className="form-control" name="password" id="password"  autoComplete='off'
                         value={inv.password}
                         onChange={handleInputs}
                         ></input>
                        <br></br>
                        
                        <br></br>
                        <button type="submit" className="user-btn" onClick={PostData}>Submit</button>
                    </div>
                </center>
                
        </div>  
        </div> 
        
        
    );
    
}
export default InvReg;