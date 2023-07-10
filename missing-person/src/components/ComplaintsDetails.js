import React,{ useEffect, useState } from 'react';
import MaterialTable from 'material-table';
// import {useNavigate} from 'react-router-dom';
import axios from 'axios'
// import {Link} from '@material-ui/core'

const ComplaintsDetails = () => {
  const [data,setComp]=useState([])
  const columns=[
    {title:"case id",field:"cid"},
    {title:'missing name',field:'mname'},
    {title:'missing state',field:'mstate'},
    {title:'missing address',field:'maddress'},
    {title:'missing date',field:'mdate'},
    {title:'missing location',field:'mlslocation'},
    {title:'investigator name',field:'iname'},
    {title:'investigator address',field:'iaddress'},
    {title:'missing photo',field:'cimage_url',render: rowData => ( <a href={rowData.cimage_url}>view</a>)},
    {title:'missing description',field:'mdescription'},
    {title:'missing phone no.',field:'mphone_no'},
    ]
    
    const viewcomplaints = async(e) =>{
      e.preventDefault();
      try{
        const response = await axios.get('/api1/fetchcomplaint');
        setComp(response.data);
          }
      catch(error){
          console.log("inside catch not fetched");
          console.log(error);
      }
  }

return (
  <div>
       <button className=" mt-2 bg-indigo-800 hover:bg-indigo-500 text-white font-semibold hover:text-white py-2 px-10  border border-blue-500 hover:border-transparent rounded" onClick = { viewcomplaints }>
      View List
    </button>
      <h1 align='center'> View Complaint</h1>
      <MaterialTable title="Complaints" 
      data={data}
      columns={columns} 
      options={{paging:false  }}/>
  </div>
)
};

export default ComplaintsDetails;
