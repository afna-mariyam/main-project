
import './App.css';
// import React, { Component }  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ComplaintsDetails from './components/ComplaintsDetails';
import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ComplaintScreen from './components/ComplaintScreen';
import InvestigatorPage from './components/InvestigatorPage';
import MessageBox from './components/MessageBox';
import Errorpage from './components/Errorpage';
import Officials from './components/Officials';
import InvReg from './components/InvReg';
// import Test from './components/Test';
// import GeoLocation from './components/GeoLocation';
import ComplaintDelete from './components/ComplaintDelete';
function App() {
  return (
    // <><Test/></>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/admin" element={<LoginPage/>}/>
      <Route path="/user" element={<UserPage/>}/>
      {/* <Route path="/complaintscreen" element={<ComplaintScreen/>}/> */}
      <Route path="/complaintscreen" element={<ComplaintScreen/>}/>
      <Route path="/investigatorpage" element={<InvestigatorPage/>}/>
      <Route path="/complaintsdetails" element={<ComplaintsDetails/>}/>
      <Route path="/messagebox" element={<MessageBox/>}/>
      <Route path="/complaintdelete" element={<ComplaintDelete/>}/>
      <Route path="/official" element={<Officials/>}/>
      <Route path="/invreg" element={<InvReg/>}/>
      <Route path="*" element={<Errorpage/>}/>
        
    </Routes>
    </BrowserRouter>
  );
}

export default App;