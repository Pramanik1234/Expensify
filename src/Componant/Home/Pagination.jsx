
import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className=' flex gap-2 items-center justify-between border-[1px] border-gray-500 px-4 py-1 rounded-full'>
                {pageNumbers.map((number,index) => (
                    <li key={number} onClick={() => paginate(number)} className={`${(index + 1) === currentPage ? "bg-blue-500 px-2 rounded-full cursor-pointer" : " cursor-pointer bg-slate-600 text-gray-100 px-2 rounded-full"} `}>
                        <button>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;