import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Select,
  Option
} from "@material-tailwind/react";

import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  let initialValues = {
    name: "",
    email: "",
    password: "",
    date: "",
    gender: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min(4, "Must be at least 4 characters long")
      .matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
    .required("Required")
    .min(6, "Must be at least 6 characters long")
    .matches(/^[a-zA-Z0-9]+$/, "Password must contain only letters and numbers"),  
    date: Yup.date().required("Required")
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password, date, gender } = formik.values;
    if (formik.isValid) {
      alert("Good");
    } else {
      alert("Check your input fields");
    }
  };

  const formik = useFormik({ initialValues, validationSchema, handleRegister });

  return (
    <div className='grid grid-cols-1 justify-items-center items-center h-screen'>
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Register
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form onSubmit={handleRegister}>
            <div className='mb-6'>
              <Input name="name" type="text" label="Name" size="lg" {...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name && (
                <Typography variant="small" color="red">
                  {formik.errors.name}
                </Typography>
              )}
            </div>
            <div className='mb-6'>
              <Input name="email" type="email" label="Email" size="lg" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && (
                <Typography variant="small" color="red">
                  {formik.errors.email}
                </Typography>
              )}
            </div>
            <div className='mb-6'>
              <Input name="password" type="password" label="Password" size="lg" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password && (
                <Typography variant="small" color="red">
                  {formik.errors.password}
                </Typography>
              )}
            </div>
            <div className='mb-6'>
              <Input name="date" type="date" label="Date of Birth" size="lg" {...formik.getFieldProps("date")} />
              {formik.touched.date && formik.errors.date && (
                <Typography variant="small" color="red">
                  {formik.errors.date}
                </Typography>
              )}
            </div>
            <div className='mb-6'>
              <Select name="gender" label="Gender" {...formik.getFieldProps("gender")}>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
              {formik.touched.gender && formik.errors.gender && (
                <Typography variant="small" color="red">
                  {formik.errors.gender}
                </Typography>
              )}
            </div>
            <Button variant="gradient" color="blue" fullWidth type="submit" className="mb-4">
              Register
            </Button>
          </form>
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="mt-6 flex font-roboto text-base justify-center">
            Already have an account?
            <Link to="/login">
              <p className="ml-1 font-bold font-roboto text-base text-blue-500 text-center">
                Log in
              </p>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
