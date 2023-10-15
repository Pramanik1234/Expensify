import { useNavigate } from 'react-router'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/FirebaseConfig';
import Pagination from './Pagination';
import ExpenseTable from './ExpenseTable';

const Home = () => {

    const navigate = useNavigate();
    const [ExpenseData, setExpenseData] = useState([]);
    const [date, setDate] = useState();
    const [searchExpense,setSearchExpense] = useState();
    const userRef = collection(db, "expense")
    const user = localStorage.getItem("userEmail");
     
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = ExpenseData.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    // if no user then autometicaly redirect page in login page
    function ChackRedirect() {
        if (user) {
            navigate("/expense")
        } else {
            navigate("/signin")
        }
    }

    // get expense data form firebase
    const getExpenseData = async () => {
        try {
            const expense = await getDocs(userRef);
            const data = expense.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setExpenseData(data)
        } catch (error) {
            console.log(error);
        }
    };

    // getExpense data by page rerender
    useEffect(() => {
        getExpenseData();
    }, []);

    // filter expense by date
    useEffect(() => {
        if(!date){
            getExpenseData();
            return;
        }
        const filterData = ExpenseData.filter((item) => item.DateOfExpance === date);
        setExpenseData(filterData);
    }, [date]);

    // filter expense by name
   useEffect(()=>{
    if(!searchExpense){
        getExpenseData();
        return;
    }
      const filterData = ExpenseData.filter((item)=>item.name.toLowerCase().startsWith(searchExpense.toLowerCase()))
      setExpenseData(filterData)
     
   },[searchExpense])

    return (
        <div className='flex flex-col gap-4'>
            <div className=' flex items-center flex-wrap w-full justify-between gap-2 '>
                <h1 className=' px-4 lg:px-10 text-gray-300 whitespace-nowrap font-bold tracking-wide font-mono'>MY EXPENSE MANAGER</h1>
                <div className=' flex-wrap flex  gap-4 justify-end items-center  px-4 lg:px-10 '>
                    <div className=' flex gap-1 md:gap-2 flex-wrap items-center justify-end '>
                        <input
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                            onClick={() => getExpenseData()}
                            placeholder='Filter by date'
                            className='py-1 px-4 my-3  rounded-md border-2 border-gray-400 bg-none outline-none bg-transparent text-white' />
                        <input
                            type="search"
                            onChange={(e) => setSearchExpense(e.target.value)}
                            className='py-1 px-4 my-3  rounded-md border-2 border-gray-400 bg-none outline-none bg-transparent text-white placeholder:text-sm'
                            placeholder=' Search Expense by Name' />
                    </div>
                    <button
                        onClick={ChackRedirect}
                        className=' text-gray-800 bg-green-500 px-4 py-1 rounded-md text-center '>
                        + New Expense
                    </button>
                </div>
            </div>

            <div className=' overflow-y-scroll md:overflow-hidden px-4 lg:px-10'>
                <ExpenseTable currentPosts={currentPosts} getExpenseData={getExpenseData}/>
                <div className='flex w-full justify-end my-3'>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={ExpenseData.length}
                        currentPage={currentPage}
                        paginate={paginate} />
                </div>
            </div>
        </div>
    )
}

export default Home;
