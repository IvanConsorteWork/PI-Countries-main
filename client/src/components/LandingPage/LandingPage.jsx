import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage () {
    return (
        <div className = 'LandingContainer'>
            <h1 className = 'LandingTitle'>Welcome to Countries Henry App</h1>
            <Link to="/home">
                <button className = 'LandingButton'>Let's get started!</button>
            </Link> 
        </div>
    )
}