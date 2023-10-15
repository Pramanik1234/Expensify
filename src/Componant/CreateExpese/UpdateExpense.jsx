import React, { useState } from "react";
import { useFormik } from "formik";
import { expanseSchema } from "./expenseScama";
import { db } from "../../Firebase/FirebaseConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    addDoc,
    updateDoc,
    doc,
    collection,
    serverTimestamp,
} from "firebase/firestore";
import { userName } from "../../Redux/userSlice";
import Spinner from "../Utils.jsx/Spinner";

const UpdateExpense = () => {
    const navigate = useNavigate();
    const [loading,setloading] = useState(false)
    const user = localStorage.getItem("userEmail")
    const expenseData = localStorage.getItem("userId")
    const userId = JSON.parse(expenseData)
    const expenseCollectionRef = doc(db, "expense", userId.id);
    const initialValues = {
        name: userId.name,
        description: userId.description,
        category: userId.category,
        DateOfExpance: userId.DateOfExpance,
        Amount: userId.Amount,

    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: expanseSchema,
            onSubmit: async (values, action) => {
                console.log(values);
                setloading(true)
                try {
                    await updateDoc(expenseCollectionRef, {
                        ...values,
                        updateat: serverTimestamp(),
                        email: user,
                    });
                    console.log(values);
                    setloading(false)
                    navigate("/");
                    localStorage.removeItem("userId")
                } catch (err) {
                    setloading(false)
                    alert(err);
                }
                action.resetForm();
            },
        });

    return (
        <div className="flex items-center flex-col justify-center p-4">
                <form
                    onSubmit={handleSubmit}
                    className="p-4 rounded-md shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] w-full md:w-[600px] bg-gray-800"
                >

                <h1 className=" text-white font-mono text-lg underline underline-offset-2  text-center ">Edit Expense</h1>
                    <div className=" flex flex-col gap-1 text-start">
                        <label
                            htmlFor="name"
                            className="text-sm text-slate-400"
                        >
                            Name
                        </label>
                        <input
                            className={`${errors.name && touched.name ? " border-red-500" : ""}  px-4 py-1 my-3 rounded-md border-2 border-gray-600 bg-none outline-none bg-transparent text-white `}
                            id="name"
                            type="text"
                            name="name"
                            value={values.name}
                            placeholder="Name of the Expense"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.name && touched.name && (
                            <p className="text-red-600 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className=" flex flex-col gap-1 text-start">
                        <label
                            htmlFor="description"
                            className="text-sm text-slate-400"
                        >
                            Description
                        </label>
                        <input
                            className={`${errors.description && touched.description ? " border-red-500" : ""}  px-4 py-1 my-3 rounded-md border-2 border-gray-600 bg-none outline-none bg-transparent text-white `}
                            id="description"
                            type="text"
                            value={values.description}
                            name="description"
                            placeholder="Describe the Expense"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.description && touched.description && (
                            <p className="text-red-600 text-sm ">
                                {errors.description}
                            </p>
                        )}
                    </div>
                    <div className=" flex flex-col gap-1 text-start">
                        <label
                            htmlFor="category"
                            className="text-sm text-slate-400"
                        >
                            Category
                        </label>
                        <select
                            name="category"
                            value={values.category}
                            className={`${errors.category && touched.category ? " border-red-500" : ""}  px-4 py-1 my-3 rounded-md border-2 border-gray-600 bg-none outline-none bg-transparent text-white `}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option className=' bg-slate-900 overflow-hidden'>Select Category (drop down)</option>
                            <option className=' bg-slate-900 overflow-hidden'>Health</option>
                            <option className=' bg-slate-900 overflow-hidden'>Electronics</option>
                            <option className=' bg-slate-900 overflow-hidden'>Travel</option>
                            <option className=' bg-slate-900 overflow-hidden'>Education</option>
                            <option className=' bg-slate-900 overflow-hidden'>Books</option>
                            <option className=' bg-slate-900 overflow-hidden'>Others</option>
                        </select>
                        {errors.category && touched.category && (
                            <p className="text-red-600 text-sm ">
                                {errors.category}
                            </p>
                        )}
                    </div>
                    <div className=" flex flex-col gap-1 text-start">
                        <label
                            htmlFor="dateOfExpenses"
                            className="text-sm text-slate-400"
                        >
                            Date of Expense
                        </label>
                        <input
                            className={`${errors.DateOfExpance && touched.DateOfExpance ? " border-red-500" : ""}  px-4 py-1 my-3 rounded-md border-2 border-gray-600 bg-none outline-none bg-transparent text-white `}
                            type="date"
                            name="DateOfExpance"
                            value={values.DateOfExpance}
                            placeholder="Date of Expense"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.DateOfExpance && touched.DateOfExpance && (
                            <p className="text-red-600 text-sm ">
                                {errors.DateOfExpance}
                            </p>
                        )}
                    </div>
                    <div className="w-full  flex flex-col gap-1 text-start">
                        <label
                            htmlFor="amount"
                            className="text-sm text-slate-400"
                        >
                            Expense Amount
                        </label>
                        <input
                            className={`${errors.Amount && touched.Amount ? " border-red-500" : ""}  px-4 py-1 my-3 rounded-md border-2 border-gray-600 bg-none outline-none bg-transparent text-white `}
                            type="number"
                            value={values.Amount}
                            name="Amount"
                            placeholder="Expense Amount IN INR"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.Amount && touched.Amount && (
                            <p className="text-red-600 text-sm ">
                                {errors.Amount}
                            </p>
                        )}
                    </div>
                    <div className="mt-6 flex justify-between">
                        <button className="px-8 py-1 bg-gray-600 text-white rounded-md font-thin ">
                            Cancel
                        </button>
                        <button
                            type="submit"
                        className=" px-5 md:px-8 py-1 bg-green-600 text-white rounded-md font-thin flex items-center gap-1"
                    >   {loading && <Spinner />} 
                            Update Expense
                        </button>
                    </div>
                </form>
        </div>
    );
}

export default UpdateExpense