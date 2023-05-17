import React from 'react'
// import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom';

function InvestigatorPage() {
  const navigate = useNavigate();
return(
<>
  <button onClick={()=>{navigate("/admin")}}style={{ backgroundColor:"red",padding:"10px",color:"white",margin:"7px 5px 5px 1398px",border:"2px solid white"}}variant="dark">
          LogOut
        </button>{' '}
  <div style={{height:"600px",backgroundColor:"#e3f2fd",margin:"50px 500px 40px 500px",border:"10px solid black",borderRadius:"40px",padding:"10px 10px 10px 10px"}}>
    <center>
    <br/><br/>
  <button onClick={()=>{navigate("/complaintscreen")}} style={{height:"50px",width:"200px",background:"blue",color:"white",borderRadius:"3px"}}variant="dark">
          Register-Complaint
        </button>{' '}<br/><br/><br/><br/>
        <button onClick={()=>{navigate("/complaintsdetails")}} style={{height:"50px",width:"200px",background:"blue",color:"white",borderRadius:"3px"}}variant="dark">
          View-Complaint
        </button>{' '}<br/><br/><br/><br/>
        <button onClick={()=>{navigate("/complaintdelete")}} style={{height:"50px",width:"200px",background:"blue",color:"white",borderRadius:"3px"}}variant="dark">
          Delete-Complaint
        </button>{' '}<br/><br/><br/><br/>
        <button onClick={()=>{navigate("/messagebox")}}style={{height:"50px",width:"200px",background:"blue",color:"white",borderRadius:"3px"}}variant="dark">
          Message-Box
        </button>{' '}<br/>
        </center>
        </div>
        </>
  )
}

export default InvestigatorPage