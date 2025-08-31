import React from 'react'
import "./Pagination.css"

const Pagination = ({totalPosts, postPerPages, onClick, currentPage}) => {
  let pages = [];

  for(let i = 1; i <= Math.ceil(totalPosts/postPerPages); i++){
    pages.push(i)
  }
  return (
    <>
    {pages.length > 1 && <ul className='pagination'>
        {pages.map(page => <li key={page}>
            <button className={
                parseInt(currentPage) === page ? "paginationButton active" : "paginationButton"}
             onClick={() => onClick(page)}>{page}</button>
            </li> )}
    </ul>}
    </>
  )
}

export default Pagination