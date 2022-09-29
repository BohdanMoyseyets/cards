import React, { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Cart.module.css'

const Cart = (props) => {
    let [productsInCart, setProductsInCart] = useState(null);
    let [fetching, setFetching] = useState(false);
    const [inCart] = useState(false);
    
    useEffect(() => {
        fetch("http://localhost:8000/cart").then(res => {
            setFetching(true);
            return res.json();
        })
            .then(data => {
                setProductsInCart(data);
                setFetching(false);
            })
    }, []);
    let newArr = productsInCart && [...productsInCart]

    const onDelete = (p) => {
        setFetching(true);
        const product = { title: p.title, description:p.description, price:p.price, inCart };
        fetch(`http://localhost:8000/products/${p.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        }).then(() => {
            setFetching(false);
            fetch(`http://localhost:8000/cart/${p.id}`, {
                method: "DELETE"
            }).then(() => {
                const objWithIdIndex = newArr && newArr.findIndex((obj) => obj.id === p.id);
                newArr && newArr.splice(objWithIdIndex, 1);
                setProductsInCart(newArr)
            }
            )
        })

    }
    const onIncrease = (p) =>{
        setFetching(true);
        const product = { title: p.title, description:p.description, price:p.price, quantity:p.quantity+1 };
        fetch(`http://localhost:8000/cart/${p.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        }).then(() => {
            setFetching(false);
            const objWithIdIndex = newArr && newArr.findIndex((obj) => obj.id === p.id);
            newArr && newArr[objWithIdIndex].quantity++;
            setProductsInCart(newArr)
        })
    }

    const onDecrease = (p) =>{
        setFetching(true);
        const product = { title: p.title, description:p.description, price:p.price, quantity:p.quantity-1 };
        fetch(`http://localhost:8000/cart/${p.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        }).then(() => {
            setFetching(false);
            const objWithIdIndex = newArr && newArr.findIndex((obj) => obj.id === p.id);
            newArr && newArr[objWithIdIndex].quantity--;
            setProductsInCart(newArr)
        })

    }

    return (
        <div className={style.cart}>
            <h2 className={style.h2}>Cart</h2>
            <NavLink className={style.back + " " + style.btn} to="/">Go to main</NavLink>
            <div className={style.total}>Total price: {newArr && newArr.map(p => p.quantity * p.price).reduce((prev, curr) => prev + curr, 0)}$</div>
            <div className={style.productList}>
                {
                    newArr && newArr.map((product) => (
                        <div className={style.product} key={product.id}>
                            <div className={style.title}>{product.title}</div>
                            <div className={style.desc}>{product.description}</div>
                            <div className={style.price}>{product.price}$</div>
                            <div className={style.quantity}>
                                <button className={style.btn + " " + style.count} onClick={()=> onDecrease(product)} disabled={product.quantity < 2}>-1</button>
                                {product.quantity}
                                <button className={style.btn + " " + style.count} onClick={()=> onIncrease(product)}>+1</button>
                            </div>
                            <div className={style.delBtn}>
                                <button className={style.btn + " " + style.del} onClick={() => onDelete(product)}>Delete</button>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
}
export default Cart;