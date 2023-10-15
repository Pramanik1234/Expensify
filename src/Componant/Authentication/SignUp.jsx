import { useState } from "react";
import FormInput from "./FormInput";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Spinner from "../Utils.jsx/Spinner";
const SignUp = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Enter Your name",
      errorMessage:
        "Enter Your name",
      label: "Name",
      required: true,
    },
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
      placeholder: " Enter 6 Digits Password",
      errorMessage:
        "Plese Enter Your  PassWord",
      label: "Password",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    // create user account in firebase
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setValues('');
        setLoading(false)
        navigate("/signin")
      })
      .catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        console.error("some error happne", errorCode, errorMessage);
      });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center p-4 ">
      <form onSubmit={handleSubmit}
        className=" p-4 rounded-md shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] w-full md:w-[600px] bg-gray-800 ">
        <h1 className=" text-white font-mono text-lg underline underline-offset-2 m-2 text-center">SIGN UP</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div className=" flex flex-col gap-2">
          <button type="submit" className="bg-green-600 px-4 text-base text-white rounded-md mt-4 w-full py-2 font-mono  "> 
          <span className="flex items-center justify-center">
              {loading && <Spinner />}
              <h1>SUBMIT</h1>
          </span>
         
          </button>
          <span className=" text-gray-300 mt-2">You already have an account?<Link onClick={() => navigate("/signin")} className=" ml-2 text-blue-500 ">Login</Link></span>
        </div>
        
      </form>
    </div>
  );
};

export default SignUp
