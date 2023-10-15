import { useState } from "react";

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;
    
    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className=" flex flex-col w-full">
            <label className=" text-sm text-slate-400">{label}</label>
            <input
            className="p-4 my-3 rounded-md border-2 border-gray-400 bg-none outline-none bg-transparent text-white" 
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span className="text-sm text-red-400 hidden p-1">{errorMessage}</span>
        </div>
    );
};

export default FormInput;