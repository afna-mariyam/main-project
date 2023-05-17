import React from 'react'
import "../App.css"
import {useNavigate} from "react-router-dom";
const Errorpage = () => {
    const navigate = useNavigate();
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2> we are sorry, page not found! </h2>
                <p className='"mb-5'>
The page you are looking for might have been removed or changed its name or its temporarily unavailable.
                </p>
                <button onClick={()=>{navigate("/")}} className='home-btn'>HOME PAGE</button>
            </div>
        </div>
    )
}
export default Errorpage