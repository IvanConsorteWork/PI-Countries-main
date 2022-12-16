import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default class countryCard extends React.Component {
    render() {
        return (
            <div className = 'card'>
            <Link to = {`/home/${this.props.id}`}>
                <h3 className = 'c.name'>{this.props.name}</h3>
                <img className = 'img-c' src = {this.props.flag} alt = 'Imagen no encontrada' />
                <h5 className = 'continent'>{this.props.continent}</h5>
            </Link>            
        </div>
)}}