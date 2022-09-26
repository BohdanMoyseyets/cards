import React from 'react';
import Cart from '../cart/Cart';
import Create from '../create/Create';
import Edit from '../edit/Edit';
import style from './Main.module.css'

const Main = (props) => {

    return (
        <div className={style.main}>
            main
            <Edit/>
            <Cart/>
            <Create/>
        </div>
    );
}
export default Main;