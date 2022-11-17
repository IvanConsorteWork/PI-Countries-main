import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, createActivity, getAllActivities } from "../../redux/actions/index";
import './CreateActivity.css';

export default function CreateActivity () {
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities)
    const countries = useSelector((state) => state.countries);
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [buttonEnabled, setButtonEnabled] = useState(false);
    
    const [input, setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        relatedCountries:[]
    });

    function validate (input) {
        let errors = {};
        
        if(!input.name) {
            errors.name = "*Activity name required*";
        }

        if(input.name.length < 3 || input.name.length > 15) {
            errors.name = "*Invalid activity name*";
        }

        if(!input.duration) {
            errors.duration = "*Duration time required*";
        }

        if(!input.season) {
            errors.season = "*Please select a season*";
        }

        if(input.relatedCountries.length === 0) {
            errors.relatedCountries = "*Please select a country*";
        }

        if(!input.difficulty) {
            errors.difficulty = "*Please select a difficulty*";
        }

        if (Object.entries(errors).length === 0) {
            setButtonEnabled(true)
        } else {
            setButtonEnabled(false)
        }

        return errors
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCountrySelect(e) {
        if (input.relatedCountries.includes(e.target.value)) {
            e.target.value = 'default';
            return alert("You've already selected that country")
        } else {
        setInput({
            ...input,
            relatedCountries:[...input.relatedCountries, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))        
        }
        e.target.value = 'default';
    }

    function handleSelect(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleDelete(e){
        setInput({
            ...input,
            relatedCountries: input.relatedCountries.filter(c => c !== e)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        let validateName = activities.find(a => a.name === (input.name))
        if(validateName !== undefined) {
            alert("Activity by that name already exists!")
        } else {
            dispatch(createActivity(input))
            alert("Activity created!!")
            setInput({
                name:"",
                difficulty:"",
                duration:"",
                season:"",
                relatedCountries:[]
            })
            history.push('/home')            
        }        
    }

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getAllActivities())
        }, [dispatch]);

    return (
        <div className = 'createActivityGrid'>
            <div className = 'navBarCreate'>    
                <NavBar />
            </div>
            <div className = "contentCreate">            
                <h1>Create your Activity!</h1>
                <br></br>
                <form onSubmit = {e => handleSubmit(e)}>
                    <div>
                        <label>Activity: </label>
                        <input
                        type = "text"
                        value = {input.name}
                        name = "name"
                        onChange = {handleChange}
                        />
                        {errors.name && (
                            <p className = "p">{errors.name}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>Difficulty: </label>
                        <select defaultValue = {'default'} name = "difficulty" onChange = {e => handleSelect(e)}>
                            <option value ='default' disabled>Difficulty</option>
                            <option value ="1">1</option>
                            <option value ="2">2</option>
                            <option value ="3">3</option>
                            <option value ="4">4</option>
                            <option value ="5">5</option>
                        </select>
                    </div>
                    <div>
                    {errors.difficulty && (
                        <p className = "p">{errors.difficulty}</p>
                    )}
                    </div>
                    <br></br>
                    <div>
                        <label>Duration: </label>
                        <input
                        type = "text"
                        value = {input.duration}
                        name = "duration"
                        onChange = {handleChange}
                        />
                        {errors.duration && (
                            <p className = "p">{errors.duration}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>Season: </label>
                        <select defaultValue = {'default'} name = "season" onChange = {e => handleSelect(e)}>
                            <option value='default' disabled>Season</option>
                            <option value="summer">Summer</option>
                            <option value="winter">Winter</option>
                            <option value="autumn">Autumn</option>
                            <option value="spring">Spring</option>
                        </select>
                    </div>
                    <div>
                    {errors.season && (
                        <p className = "p">{errors.season}</p>
                    )}
                    </div>
                    <br></br>
                    <div>
                        <select defaultValue = {'default'} name = "relatedCountries" onChange = {e => handleCountrySelect(e)}>
                            <option value = 'default' disabled>Select Country</option>
                                {countries.map(c => (
                                    <option value = {c.name}>{c.name}</option>
                                ))}                    
                        </select>
                        {errors.relatedCountries && (
                                <p className = "p">{errors.relatedCountries}</p>
                            )}
                    </div>
                    <br></br>
                    <button type ='submit' disabled = {!buttonEnabled}>Create</button>
                </form>
                <br></br>
                {input.relatedCountries.map(c =>
                    <div>
                        <p>{c}         
                        <button onClick = {() => handleDelete(c)}>X</button>
                        </p>
                        <br></br>
                    </div>
                )}
            </div>
            <br></br>
                <NavLink to = '/home'>
                    <button>Back to Home</button>
                </NavLink>            
        </div>
    )
}