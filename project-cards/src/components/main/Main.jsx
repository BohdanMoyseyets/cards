import React, { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Main.module.css';
import ProductList from '../ProductList/ProductList';
import Pagination from '../pagination/Pagination';
import MySelect from '../MySelect/MySelect';
import MyInput from '../MyInput/MyInput';

const Main = (props) => {
    let [products, setProducts] = useState(null);
    let [fetching, setFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [prodPerPage] = useState(10);
    const [searchTitle, setSearchTitle] = useState("");
    const [selectedSort, setSelectedSort] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/products").then(res => {
            setFetching(true);
            return res.json();
        })
            .then(data => {
                setProducts(data);
                setFetching(false);
            })
    }, []);

    const sortedProducts = useMemo(() => {
        if (selectedSort) {
            return [...products].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
        }
        return products

    }, [selectedSort, products]);

    const sortedAndSearchedProducts = useMemo(() => {
        setCurrentPage(1);
        return sortedProducts && sortedProducts.filter(p => p.title.toLowerCase().includes(searchTitle))

    }, [searchTitle, sortedProducts]);

    const sortProducts = (sort) => {
        setSelectedSort(sort);
    }

    const onDelete = (id) => {
        setFetching(true);
        fetch(`http://localhost:8000/products/${id}`, {
            method: "DELETE"
        }).then(() => {
            setFetching(false);
            const objWithIdIndex = sortedAndSearchedProducts.findIndex((obj) => obj.id === id);
            sortedAndSearchedProducts.splice(objWithIdIndex, 1);
            fetch(`http://localhost:8000/cart/${id}`, {
                method: "DELETE"
            }).then(() => {
                setFetching(false);
            })
        })
    }
    const onAddToCart = (id, title, description, price, inCart) => {
        setFetching(true);
        const product = { title, description, price, inCart };
        fetch(`http://localhost:8000/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        }).then(() => {
            setFetching(false);
            const objWithIdIndex = sortedAndSearchedProducts.findIndex((obj) => obj.id === id);
            sortedAndSearchedProducts[objWithIdIndex].inCart = true;
            const prodInCart = { id, title, description, price, quantity: 1 };

            fetch(`http://localhost:8000/cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(prodInCart)
            }).then(() => {
                setFetching(false);
            })

        });


    }

    const lastProdIndex = currentPage * prodPerPage;
    const firstProdIndex = lastProdIndex - prodPerPage;
    const currentProd = sortedAndSearchedProducts && sortedAndSearchedProducts.slice(firstProdIndex, lastProdIndex);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className={style.main}>
            <header>
                <NavLink className={style.create} to="/create">Create</NavLink>
                <MySelect
                    value={selectedSort}
                    onChange={sortProducts}
                    defaultValue="Sorting by ..."
                    options={[{ value: "title", name: "By title" }, { value: "description", name: "By description" }]}
                />
                <MyInput type="text" value={searchTitle} onChange={e => setSearchTitle(e.target.value)} placeholder="Search..." />
                <NavLink className={style.cart} to="/cart">Cart</NavLink>
            </header>
            <div>
                {products && <ProductList products={currentProd} onDelete={onDelete} onAddToCart={onAddToCart} />}
                {products && <Pagination prodPerPage={prodPerPage} totalProducts={sortedAndSearchedProducts.length} paginate={paginate} currentPage={currentPage} />}
            </div>
        </div>
    );
}
export default Main;