import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage (){
    return (
        <div>
            <h1>Welcome to Countries Henry App</h1>
            <Link to="/home">
                <button>Let's get started!</button>
            </Link> 
        </div>
    )
}