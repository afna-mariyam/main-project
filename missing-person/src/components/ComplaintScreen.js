import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import '../App.css';
// import MultipleImageUploadComponent from './multiple-image-upload.js'
const ComplaintScreen = () => {
  const [images,setImages]=useState({});
//   function updateImageData(imageData){
//     setImages({...images,['images']:imageData});
//   }
    const navigate = useNavigate();
    const [comp,setComp] = useState({
      cid:"",mname:"",mstate:"",maddress:"",mdate:"",mlslocation:"",iname:"",iaddress:"",mdescription:"",mphone_no:"" 
    });
    // const [user,setUser]=useState({});
    let name, value;
const handleInputs = (e) => {
    // localStorage.setItem("name",e.target.value);
    console.log(e);
    // console.log(name, value);
    // console.log(e.target.name, e.target.value);
    name = e.target.name;
    value = e.target.value;
    // console.log(name,value);
    setComp({...comp, [name]:value});
}
const handleImageChanges = (e) => {
    setImages(e.target.files[0]);
  };

// function handleInputs(e){
//     setUser({...user,[e.target.name]:e.target.value});
//    }
const PostDatas = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", images);
    formData.append("cid", comp.cid);
    formData.append("mname", comp.mname);
    formData.append("mstate", comp.mstate);
    formData.append("maddress", comp.maddress);
    formData.append("mdate", comp.mdate);
    formData.append("mlslocation", comp.mlslocation);
    formData.append("iname", comp.iname);
    formData.append("iaddress", comp.iaddress);
    formData.append("mdescription", comp.mdescription);
    formData.append("mphone_no", comp.mphone_no);
    fetch("/complaint", {
      method: "POST",
      body: formData,
    })
   
      .then((response) => {
        console.log(response);
        window.alert(" registration successful");
      })
      .catch((error) => {
        console.error(error);
        window.alert("invalid registration");
      });
    // const { cid,mname,mstate,maddress,mdate,mlslocation,iname,iaddress,mdescription,mphone_no } = comp;
    // const res = await fetch("/complaint", {
    //     method:"POST",
    //     headers:{
    //         "Content-Type" : "application/json"
    //     },
    //     body: JSON.stringify({
            
    //       cid,mname,mstate,maddress,mdate,mlslocation,iname,iaddress,mdescription,mphone_no
            
    //     })
    // });
    // const data = await res.json();
    // if(res.status === 422 || !data ){
    //     window.alert("invalid registration");
    //     console.log("invalid registration");
    // } else {
    //     window.alert(" registration successful");
    //     console.log(" registration successful");

    //     navigate("/investigatorpage");
    // }
}

     return (
        
       
        <div className='complaintscreen'>
           
                <center>
                
                    <div method="POST" className="col-md-4">
                    <h2 style={{textAlign:"center",marginBottom:"14px"}}>Missing Person's Details</h2>
      {/* <MultipleImageUploadComponent handleToUpdate={updateImageData}/>  */}
      <label className="form-label">Upload photo</label>
            <input type="file" onChange={handleImageChanges} />
      <br/>
                        <label  className="form-label">Complaint ID</label>
                        <input type="text" className="form-control"name="cid" id="cid" autoComplete='off'
                        value={comp.cid}
                        onChange={handleInputs}
                        placeholder="C101"></input>
                        <br></br>
                        <label  className="form-label">Missing person name</label>
                        <input type="text" className="form-control" name="mname" id="mname"  autoComplete='off'
                         value={comp.mname}
                         onChange={handleInputs}
                        placeholder="George" ></input>
                        <br></br>
                        {/* <label  className="form-label">Upload photo</label>
                        <input className="file" type="file" id="formFile"> */}
                        {/* value={user.photo}
                        onChange={handleInputs} */}
                        {/* </input> */}
                        <br></br>
                        <label  className="form-label">Missing person state</label>
                        <input type="text" className="form-control" name="mstate" id="mstate"  autoComplete='off'
                         value={comp.mstate}
                         onChange={handleInputs}
                        placeholder="Kochi" ></input>
                        <br></br>
                        <label  className="form-label">Missing person address</label>
                        <input type="text" className="form-control" name="maddress" id="maddress"  autoComplete='off'
                         value={comp.maddress}
                         onChange={handleInputs}
                        placeholder="Vytilla,Ernakulam" ></input>
                        <br></br>

                        <label  className="form-label">Last seen date</label>
                        <input type="date" className="form-control" name="mdate" id="mdate"  autoComplete='off'
                         value={comp.mdate}
                         onChange={handleInputs}
                         ></input>
                         <br></br>
                         <label  className="form-label">Last seen location</label>
                        <input type="text" className="form-control" name="mlslocation" id="mlslocation"  autoComplete='off'
                         value={comp.mlslocation}
                         onChange={handleInputs}
                        placeholder="palarivattom" ></input>
                        <br></br>
                        <label  className="form-label">Investigator name</label>
                        <input type="text" className="form-control" name="iname" id="iname"  autoComplete='off'
                         value={comp.iname}
                         onChange={handleInputs}
                        placeholder="Arun" ></input>
                        <br></br>
                        <label  className="form-label">Investigator Station Address</label>
                        <input type="text" className="form-control" name="iaddress" id="iaddress"  autoComplete='off'
                         value={comp.iaddress}
                         onChange={handleInputs}
                        placeholder="Ernakulam-South" ></input>
                        <br></br>
                        <label  className="form-label">Missing person description</label>
                        <input type="text" className="form-control" name="mdescription" id="mdescription"  autoComplete='off'
                         value={comp.mdescription}
                         onChange={handleInputs} ></input>
                         <br></br>
                         <br></br>
                        <label  className="form-label">Contact Number</label>
                        <input type="text" className="form-control" name="mphone_no" id="mphone_no"  autoComplete='off'
                         value={comp.mphone_no}
                         onChange={handleInputs}></input>
                        <button type="submit" className="user-btn" onClick={PostDatas}>Register</button>

                    </div>
                </center>
                
        </div>  
        
        
        
    );
                      }
    export default ComplaintScreen;