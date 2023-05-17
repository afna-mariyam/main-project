import React, { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import ImgsViewer from "react-images-viewer";
import ImageViewer from "./ImageViewer";

const ComplaintsDetails = () => {
    const [viewPhoto,setViewPhoto]=useState(false);
    const [complaints,setComplaints]=useState([]);
    const [imgSource,setImgSource]=useState([]);
  useEffect(()=>{
    setComplaints(JSON.parse(sessionStorage.getItem('usersdata'))||[]);
    console.log(complaints)
  }, []);

  function viewPhotos(i){
    setViewPhoto(true);
    const photos=complaints[i]['images']['images'];
    // const source = photos.map(function(e) {
    //     return {src: e}
    //   })
      setImgSource(photos);
    //console.log(source)
  }
  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>State</th>
          <th>Country</th>
          <th>Address</th>
          <th>Missing Time</th>
          <th>LSL</th>
          <th>Inv. First Name</th>
          <th>Inv. Last Name</th>
          <th>Station Addr</th>
          <th>Photos</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((complaint, i) => {
            console.log(complaint['missingperson']['fname'])
          return (
            <tr>
              <td>{i+1}</td>
              <td>{complaint['missingperson']['fname']}</td>
              <td>{complaint['missingperson']['lname']}</td>
              <td>{complaint['missingperson']['state']}</td>
              <td>{complaint['missingperson']['country']}</td>
              <td>{complaint['missingperson']['address']}</td>
              <td>{complaint['missingperson']['date']}</td>
              <td>{complaint['missingperson']['lastseenlocation']}</td>
              <td>{complaint['investigator']['fname']}</td>
              <td>{complaint['investigator']['lname']}</td>
              <td>{complaint['investigator']['address']}</td>
              <td><button onClick={()=>viewPhotos(i)} style={{backgroundColor:'transparent',border:'0px',color:'blueviolet'}}>View</button></td>
            </tr>
          );
        })}
      </tbody>
    </Table>
    {viewPhoto&&<ImageViewer images={imgSource} setViewPhoto={setViewPhoto}/>}
      </>
  );
};

export default ComplaintsDetails;
