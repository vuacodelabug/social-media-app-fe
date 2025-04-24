import { useField, ErrorMessage } from "formik";

export default function LoginInput({ placeholder, ...props }) {
  const [field] = useField(props);
  return (
    <div className="relative">
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
        className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
}