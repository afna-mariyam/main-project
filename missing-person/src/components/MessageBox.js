import React,{ useEffect, useState } from 'react';
import MaterialTable from 'material-table';
// import {useNavigate} from 'react-router-dom';
import axios from 'axios'
// import {Link} from '@material-ui/core'

const MessageBox = () => {
  const [data,setComp]=useState([])
  const columns=[
    {title:"case id",field:"cmpid"},
    {title:'missing name',field:'miname'},
    {title:'investigator name',field:'inname'},
    {title:'missing photo',field:'mphoto',render: rowData => ( <a href={rowData.mphoto}>view photo</a>)},
    {title:'user name',field:'person'},
    {title:'user number',field:'uphone'},
    {title:'user location',field:'uloc',render: rowData => ( <a href={rowData.uloc}>view location</a>)},
    {title:'suspected photo',field:'sphoto',render: rowData => ( <a href={rowData.sphoto}>view photo</a>)},
    ]
    
    const viewmessages = async(e) =>{
      e.preventDefault();
      try{
        const response = await axios.get('/api1/fetchmessage');
        setComp(response.data);
          }
      catch(error){
          console.log("inside catch not fetched");
          console.log(error);
      }
      
  }
  

    return (
      <div>
      <button className=" mt-2 bg-indigo-800 hover:bg-indigo-500 text-white font-semibold hover:text-white py-2 px-10  border border-blue-500 hover:border-transparent rounded" onClick = { viewmessages }>
     View List
   </button>
     <h1 align='center'> Message Box </h1>
     <MaterialTable title="Messages" 
     data={data}
     columns={columns} 
     options={{paging:false , delete:true }}/>
 </div>


 );
    }
    export default MessageBox;