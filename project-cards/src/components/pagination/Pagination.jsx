import React from 'react';
import style from './Pagination.module.css';

const Pagination = ({prodPerPage, totalProducts, paginate, currentPage}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalProducts / prodPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div >
            <ul className={style.pagination}>
                {
                    pageNumbers.map( n => (
                        <li className={style.pageItem} key={n}>
                            {currentPage === n ? <a href='#' className={style.pageCurrent} onClick={()=> paginate(n)}>{n}</a>: <a href='#' className={style.pageLink} onClick={()=> paginate(n)}>{n}</a>}
                        </li>
                    ) )
                }
            </ul>
        </div>
    );
}
export default Pagination;