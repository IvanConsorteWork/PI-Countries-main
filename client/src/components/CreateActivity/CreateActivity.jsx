import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, createActivity } from "../../redux/actions/index";
import NavBar from "../NavBar/NavBar";


export default function CreateActivity () {
    const dispatch = useDispatch();
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
            // setButtonEnabled(false)
        }
        if(input.name.length < 3 || input.name.length > 15) {
            errors.name = "*Invalid activity name*";
            // setButtonEnabled(false)
        }
        if(!input.duration) {
            errors.duration = "*Duration time required*";
            // setButtonEnabled(false)
        }
        if(!input.season) {
            errors.season = "*Please select a season*";
            // setButtonEnabled(false)
        }
        if(input.relatedCountries === []) {
            errors.relatedCountries = "*Please select a country*";
            // setButtonEnabled(false)
        }
        if(!input.difficulty) {
            errors.difficulty = "*Please select a difficulty*";
            // setButtonEnabled(false)
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
        return alert("You've already selected that country");
        } else {
        setInput({
            ...input,
            relatedCountries:[...input.relatedCountries,e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        }
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

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createActivity(input))
        alert("Activity created!!")
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            relatedCountries:[]
        })
        // history.push('/home')
    }

    useEffect(() => {
        dispatch(getAllCountries())
        }, [dispatch]);

    return (
        <div>
        <NavBar />
        <div>            
            <h1>Create your Activity!</h1>
            <form onSubmit = {e => handleSubmit(e)}>
                <div>
                    <label>Activity:</label>
                    <input
                    type = "text"
                    value = {input.name}
                    name = "name"
                    onChange = {handleChange}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Difficulty:</label>
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
                    <p>{errors.difficulty}</p>
                )}
                </div>
                <div>
                    <label>Duration:</label>
                    <input
                    type = "text"
                    value = {input.name}
                    name = "duration"
                    onChange = {handleChange}
                    />
                    {errors.duration && (
                        <p>{errors.duration}</p>
                    )}
                </div>
                <div>
                    <label>Season:</label>
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
                    <p>{errors.season}</p>
                )}
                </div>
                <div>
                <select defaultValue = {'default'} name = "relatedCountries" onChange = {e => handleCountrySelect(e)}>
                <option value = 'default' disabled>Select Country</option>
                    {countries.map(c => (
                        <option value = {c.name}>{c.name}</option>
                    ))}
                
                </select>
                {errors.relatedCountries && (
                        <p>{errors.relatedCountries}</p>
                    )}
                </div>
                <button type ='submit' disabled = {!buttonEnabled}>Create</button>
            </form>
            {input.relatedCountries.map(c =>
                <div>
                    <p>{c}         
                    <button onClick = {() => handleDelete(c)}>X</button>
                    </p>
                </div>
            )}
        </div>
            <Link to = '/home'>
                <button>Back to Home</button>
            </Link>                
        </div>
    )
}