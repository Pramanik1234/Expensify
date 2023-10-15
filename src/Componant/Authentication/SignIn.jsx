import React from 'react'
import { useState } from 'react';
import FormInput from './FormInput';
import { useNavigate } from 'react-router';
import { auth } from '../../Firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../../Redux/userSlice';
import { Link } from 'react-router-dom';
import Spinner from '../Utils.jsx/Spinner';

const SignIn = () => {
  const[loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Enter Your Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: " Enter Password",
      errorMessage:
        "Plese Enter Your PassWord",
      label: "Password",
      required: true,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    // login user
    setLoading(true)
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(addUser(values));
        localStorage.setItem("userEmail",values.email)
        setLoading(false)
        navigate("/")
      })
      .catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage, errorCode)
      });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className=" w-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit}
        className=" p-4 rounded-md shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] w-full md:w-[600px] bg-gray-800 ">
        <h1 className=" text-white font-mono text-lg underline underline-offset-4 m-2 text-center">LOG IN</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div className=' flex flex-col gap-2'>
          <button type="submit" className=" bg-green-600 px-4 text-base text-white rounded-md mt-4 w-full py-2 font-mono">
            <span className="flex items-center justify-center">
              {loading && <Spinner />}
              <h1>SUBMIT</h1>
            </span></button>
          <span className=" text-gray-300 ">New User?<Link onClick={() => navigate("/signup")} className=" ml-2 text-blue-500">Sign Up</Link></span>
        </div>

      </form>
    </div>
  )
}

export default SignIn