import React, { useRef, useState } from 'react'
import { useFormik } from "formik";
import { expanseSchema } from './expenseScama';
import CustomSelect from './CustomSelec';
import CustomInput from './CustomInput';
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userName } from '../../Redux/userSlice';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase/FirebaseConfig';
import Spinner from '../Utils.jsx/Spinner';

const CreateExpenseForm = () => {
    const userRef = collection(db, "expense")
    const user = localStorage.getItem("userEmail")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const onSubmit = async (values, actions) => {
        setLoading(true)
        try {
            const docRef = await addDoc(userRef, {
                ...values, updateat: serverTimestamp(), email: user
            });
            console.log("Document written with ID: ", docRef);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoading(false)
            actions.resetForm();
            navigate("/")
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage, errorCode)
        }
    };
    
    return (
        <div className='flex items-center justify-center p-4'>
            <Formik
                initialValues={{
                    name: "",
                    Amount: "",
                    DateOfExpance: "",
                    category: "",
                    description: "",
                }}
                validationSchema={expanseSchema}
                onSubmit={onSubmit}

            >
                {({ isSubmitting }) => (
                    <Form
                        className='p-4 rounded-md shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] w-full md:w-[600px] bg-gray-800 '
                    >
                        <h1 className=" text-white font-mono text-lg underline underline-offset-2  text-center ">Create Expense</h1>
                        <CustomInput
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter Expense Name"
                        />
                        <CustomInput
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Enter description"
                        />
                        <CustomInput
                            label="Date Of Expense"
                            name="DateOfExpance"
                            type="date"
                            placeholder="Enter date"
                        />
                        <CustomSelect
                            label="Category"
                            name="category"
                            placeholder="Please select a category"
                        >
                            <option className=' bg-slate-900 overflow-hidden' value="">Please select a category</option>
                            <option className=' bg-slate-900 overflow-hidden' value="Health">Health</option>
                            <option className=' bg-slate-900 overflow-hidden' value="Electronics">Electronics</option>
                            <option className=' bg-slate-900 overflow-hidden' value="Travel">Travel</option>
                            <option className=' bg-slate-900 overflow-hidden' value="Education">Education</option>
                            <option className=' bg-slate-900 overflow-hidden' value="Books">Books</option>
                            <option className=' bg-slate-900 overflow-hidden' value="other">other</option>
                        </CustomSelect>
                        <CustomInput
                            label="Amount"
                            name="Amount"
                            type="number"
                            placeholder="Enter Amount INR"
                        />
                        <div className=' flex items-center justify-between w-full'>
                            <button className=' px-10 py-1 bg-gray-700 rounded-md text-gray-200 font-thin mt-2' onClick={() => navigate("/")} >Cancel</button>
                            <button disabled={isSubmitting} type="submit" className=' px-6 md:px-10 py-1 bg-green-700 rounded-md text-gray-200 flex items-center gap-1  font-thin mt-2'>
                                {loading && <Spinner/>}
                                Create Expense
                            </button>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateExpenseForm;