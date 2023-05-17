import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../App.css';

const UserPage = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
       name:"",phone_no:""
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
    setUser({...user, [name]:value});
}
// function handleInputs(e){
//     setUser({...user,[e.target.name]:e.target.value});
//    }
const PostData = async (e) => {
    e.preventDefault();
    const { name, phone_no } = user;
    const res = await fetch("/submit", {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            
                name, phone_no
            
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
        <div className='userpage'>
           
                <center>
                
                    <div method="POST" className="col-md-4">
                        <label  className="form-label">Name</label>
                        <input type="text" className="form-control"name="name" id="name" autoComplete='off'
                        value={user.name}
                        onChange={handleInputs}
                        placeholder="John Smith"></input>
                        <br></br>
                        <label  className="form-label">Phone number</label>
                        <input type="text" className="form-control" name="phone_no" id="phone_no"  autoComplete='off'
                         value={user.phone_no}
                         onChange={handleInputs}
                        placeholder="9192939495" ></input>
                        <br></br>
                        <label  className="form-label">Upload photo</label>
                        <input className="file" type="file" id="formFile">
                        {/* value={user.photo}
                        onChange={handleInputs} */}
                        </input>
                        <br></br>
                        <button type="submit" className="user-btn" onClick={PostData}>Submit</button>
                    </div>
                </center>
                
        </div>  
        </div> 
        
        
    );
    
}
export default UserPage;