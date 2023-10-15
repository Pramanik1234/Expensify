import React from 'react'
import { FaPen } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { addUserId } from '../../Redux/ExpenseIdSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/FirebaseConfig';



const ExpenseTable = ({ currentPosts, getExpenseData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // table header 
    const tableHeader = ["Name", "Category", "Date of Expense", "Amount", "Update At", "Created by", "Action"]
    const user = localStorage.getItem("userEmail");

    // update expense data
    function update(data) {
        console.log(data);
        localStorage.setItem("userId", JSON.stringify(data))
        dispatch(addUserId(data))
        navigate("/update")
    };

    // delete expense data from firebase
    const deleteExpense = async (id) => {
        if (confirm("Are You sure you want to delete") === true) {
            const userData = doc(db, "expense", id)
            await deleteDoc(userData);
            getExpenseData();
        } else {
            return;
        }
    };


    // option use for date time formatting
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    // convert firebase timeStamp 
    function convertDate(time) {
        //time should be server timestamp seconds only
        let dateInMillis = time * 1000
        let date = new Date(dateInMillis)
        let myDate = new Intl.DateTimeFormat("en-IN", options).format(date);
        let myTime = date.toLocaleTimeString()
        return `${myDate} ${myTime}`
    }

  return (
      <table className="min-w-full border-collapse block md:table ">
          <thead className="block md:table-header-group  ">
              <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                  {tableHeader.map((headerName, index) => <th key={index} className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">{headerName}</th>)}

              </tr>
          </thead>
          <tbody className="block md:table-row-group">
              {currentPosts?.map((data, index) => {
                  return (
                      <tr key={index} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row mb-2">
                          <td className="p-2 border-b-[1px] border-gray-400 md:border md:border-grey-500 block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{tableHeader[0]}</span>{data.name}</td>
                          <td className="p-2 border-b-[1px] border-gray-400 md:border md:border-grey-500 block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{tableHeader[1]}</span>{data.category}</td>
                          <td className="p-2 border-b-[1px] border-gray-400 md:border md:border-grey-500 block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{tableHeader[2]}</span>{data.DateOfExpance}</td>
                          <td className="p-2 border-b-[1px] border-gray-400 md:border md:border-grey-500 block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{tableHeader[3]}</span>INR {data.Amount}</td>
                          <td className="p-2 border-b-[1px] border-gray-400 md:border md:border-grey-500 block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{tableHeader[4]}</span>{data.updateat && convertDate(data?.updateat?.seconds)}</td>
                          <td className="p-2 border-b-[1px] border-gray-400 md:border md:border-grey-500 block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">{tableHeader[5]}</span> {data.email === user ? "me" : data.email}</td>
                          <td className="p-2 border-b-[1px] border-gray-400 md:border md:border-grey-500 block md:table-cell">
                              <span className="inline-block w-1/2 md:hidden font-bold">{tableHeader[6]}</span>{
                                  data.email === user ? <><button className=" mx-3" onClick={() => update(data)}><FaPen /></button>
                                      <button className=" text-red-500" onClick={() => deleteExpense(data.id)}><RiDeleteBin6Fill /></button>
                                  </> : ""
                              }
                          </td>
                      </tr>
                  )
              })}

          </tbody>
      </table>
  )
}

export default ExpenseTable;