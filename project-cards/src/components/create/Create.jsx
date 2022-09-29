import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import MyInput from '../MyInput/MyInput';
import style from './Create.module.css'

const Create = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [priceError, setPriceError] = useState(false);
    const [inCart] = useState(false);
    const [formValid, setFormValid] = useState(false)
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }
    useEffect(() => {
        if(priceError || title.length == 0 || description.length == 0 || price.length == 0){
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [priceError, title, description, price])
    const priceHandler = (e) => {
        if( +(e.target.value) <= 0 ){
            setPriceError("Must be bigger than 0!!!");
            setPrice(e.target.value);
        }
        else{
            setPrice(e.target.value)
            setPriceError(null)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { title, description, price, inCart };
        fetch("http://localhost:8000/products", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product)
        }).then(()=> {
            routeChange();
        })
        
    }

    return (
        <div className={style.create}>
            <h2>Create</h2>
            <form className={style.form} onSubmit={handleSubmit}>
                <MyInput type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Set title" />
                <MyInput type="text" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Set description" />
                { priceError && <div className={style.priceError}>{priceError}</div>}
                <MyInput type="number" required value={price} onChange={(e) => priceHandler(e)} placeholder="Set price" />
                <button className={style.btnCreate + " " + style.btn} disabled={!formValid}>Create</button>
                <NavLink className={style.back + " " + style.btn} to="/">Back</NavLink>
            </form>
        </div>
    );
}
export default Create;