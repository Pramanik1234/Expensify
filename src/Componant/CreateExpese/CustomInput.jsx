import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="flex flex-col w-full">
            <label className="text-sm text-slate-400">{label}</label>
            <input
                {...field}
                {...props}
                className={`${meta.touched && meta.error ? " border-red-500" : ""}  px-4 py-1 my-3 rounded-md border-2 border-gray-600 bg-none outline-none bg-transparent text-white `}
            />
            {meta.touched && meta.error && <div className="text-red-600 text-sm">{meta.error}</div>}
        </div>
    );
};
export default CustomInput;