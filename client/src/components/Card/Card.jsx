import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

export default class countryCard extends React.Component {
    render() {
        return (
            <div className = 'card'>
            <Link to = {`/home/${this.props.id}`}>
                <h3 className = {styles.name}>{this.props.name}</h3>
                <img className = {styles.img} src = {this.props.flag} alt = 'Imagen no encontrada' />
                <h5 className = {styles.continent}>{this.props.continent}</h5>
            </Link>            
        </div>
)}}