import React from 'react';
import NavBar from '../NavBar/NavBar';

export default function About () {
    return (
        <div>
            <NavBar />
            <h3>Hello, dear reader!</h3>
            <span>My name is Ivan Consorte and this my Individual Project for Henry's Web Development Course. In this project, I develop a web integrating several technologies that I learn on the course. </span>
            <span>This website was developed with:</span>
            <ol>
                <li>Javascript</li>
                <li>HTML/CSS</li>
                <li>React & Redux (Front-End)</li>
                <li>Node Express (Back-End)</li>
                <li>Sequeliz (Database)</li>
                <li>Jest (Testing)</li>
            </ol>
        </div>
    )
}