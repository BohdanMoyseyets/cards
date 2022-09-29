import React from 'react';
import style from './ProductList.module.css';
import { useNavigate } from "react-router-dom";

const ProductList = ({products, onDelete, onAddToCart}) => {

    let navigate = useNavigate();
    const routeChange = (id) => {
        let path = `/edit/${id}`;
        navigate(path);
    }
    
    return (
        <div className={style.productList}>
            {
                products.map((product) => (
                    <div className={style.product} key={product.id}>
                        <div className={style.title}>{product.title}</div>
                        <div className={style.desc}>{product.description}</div>
                        <div className={style.price}>price: {product.price}$</div>
                        <div>
                            <button className={style.btn + " " + style.edit} onClick={() => routeChange(product.id)}>Edit</button>
                            <button className={style.btn + " " + style.del} onClick={() => onDelete(product.id)}>Delete</button>
                            <button className={style.btn + " " + style.add} onClick={() => onAddToCart(product.id, product.title, product.description, product.price, true)} disabled={product.inCart}>Add to cart</button>
                        </div>
                    </div>
                ))
            }

        </div>
    );
}
export default ProductList;