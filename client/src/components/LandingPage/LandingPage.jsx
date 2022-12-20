import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage () {
    return (
        <div className = {styles.LandingContainer}>
            <h1 className = {styles.LandingTitle}>Welcome to Countries Henry App</h1>
            <Link to="/home">
                <button className = {styles.LandingButton}>Let's get started!</button>
            </Link> 
        </div>
    )
}