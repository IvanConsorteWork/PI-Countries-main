import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import { Link } from 'react-router-dom';
import './About.css';

export default function About () {
    return (
        <div>
            <div className='navBarAbout'>
                <NavBar />
            </div>
            <br></br>
            <h1>Hello, dear reader!</h1>
            <br></br>
            <span>My name is Ivan Consorte and this my Individual Project for Henry's Web Development Course. <br></br>In this project, I develop a web integrating several technologies that I learn on the course.</span>
            <br></br>
            <br></br>
            <span>This website was developed with:</span>
            <br></br>
            <br></br>
            <ol>
                <li>Javascript</li>
                <br></br>
                <li>HTML/CSS</li>
                <br></br>
                <li>React & Redux (Front-End)</li>
                <br></br>
                <li>Node JS Express (Back-End)</li>
                <br></br>
                <li>PostgresSQL & Sequelize (Database)</li>
                <br></br>
                <li>Jest (Testing)</li>
            </ol>
            <br></br>
            <Link to = '/home'>
                <button>Back to Home</button>
            </Link> 
        </div>
    )
}