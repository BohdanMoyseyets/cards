import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import MyInput from '../MyInput/MyInput';
import style from './Edit.module.css'

const Edit = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [priceError, setPriceError] = useState(false);
    const [inCart, setInCart] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const idFromUrl = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    useEffect(() => {
        fetch(`http://localhost:8000/products/${idFromUrl}`).then(res => {
            return res.json();
        })
            .then(data => {
                setTitle(data.title);
                setDescription(data.description);
                setPrice(data.price);
                setInCart(data.inCart);
            })
    }, []);

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
        fetch(`http://localhost:8000/products/${idFromUrl}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product)
        }).then(()=> {
            routeChange();
        })
        
    }

    return (
        <div className={style.edit}>
            <h2>Edit</h2>
            <form className={style.form} onSubmit={handleSubmit}>
                <MyInput type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Set title" />
                <MyInput type="text" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Set description" />
                { priceError && <div className={style.priceError}>{priceError}</div>}
                <MyInput type="number" required value={price} onChange={(e) => priceHandler(e)} placeholder="Set price" />
                <button className={style.btnEdit + " " + style.btn} disabled={!formValid}>Edit</button>
                <NavLink className={style.back + " " + style.btn} to="/">Back</NavLink>
            </form>
        </div>
    );
}
export default Edit;