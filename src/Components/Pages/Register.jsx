import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Checkbox,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../utils/api"; // Giả định api có verifyEmail và Register

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    city: "",
    website: "",
  });

  const [errors, setErrors] = useState({});
  const [enteredCode, setEnteredCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("gray");

  const validate = () => {
    const err = {};
    if (!form.username || form.username.length < 3) {
      err.username = "Username must be at least 3 characters";
    }
    if (!form.email || !form.email.includes("@")) {
      err.email = "Invalid email";
    }
    if (!form.password || form.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }
    if (!form.name || form.name.length < 2) {
      err.name = "Name is required";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartVerification = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await api.verifyEmail(form.email);
      const data = await res.json();

      if (res.status === 200 && data.code) {
        setVerificationCode(data.code);
        setIsDialogOpen(true);
        setMessage("A verification code has been sent to your email.");
        setMessageColor("blue");
      } else {
        setMessage("Failed to send verification email.");
        setMessageColor("red");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setMessage("Something went wrong during email verification.");
      setMessageColor("red");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (enteredCode === verificationCode) {
      try {
        const res = await api.Register(form);
        const data = await res.json();

        if (res.status === 201) {
          setMessage("Registration successful! Redirecting to login...");
          setMessageColor("green");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setMessage(data?.message || "Registration failed.");
          setMessageColor("red");
        }
      } catch (error) {
        console.error("Registration error:", error);
        setMessage("Something went wrong during registration.");
        setMessageColor("red");
      }
    } else {
      setMessage("Invalid verification code.");
      setMessageColor("red");
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 justify-items-center items-center h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md p-4">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-24 place-items-center"
        >
          <Typography variant="h4" color="white">
            Register
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleStartVerification} className="flex flex-col gap-4">
            <Input label="Username" name="username" value={form.username} onChange={handleChange} />
            {errors.username && <Typography color="red" variant="small">{errors.username}</Typography>}

            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            {errors.email && <Typography color="red" variant="small">{errors.email}</Typography>}

            <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
            {errors.password && <Typography color="red" variant="small">{errors.password}</Typography>}

            <Input label="Name" name="name" value={form.name} onChange={handleChange} />
            {errors.name && <Typography color="red" variant="small">{errors.name}</Typography>}

            <Input label="City" name="city" value={form.city} onChange={handleChange} />
            <Input label="Website" name="website" value={form.website} onChange={handleChange} />

            <Checkbox label="I agree to the terms and conditions" />

            <Button type="submit" fullWidth color="blue">
              Register
            </Button>
          </form>

          {message && (
            <Typography variant="small" className={`mt-4 text-${messageColor}-500`}>
              {message}
            </Typography>
          )}
        </CardBody>
        <CardFooter className="pt-0 text-center">
          <Typography variant="small" className="text-gray-700">
            Already have an account?
            <Link to="/login" className="text-blue-500 font-bold ml-1">
              Login
            </Link>
          </Typography>
        </CardFooter>
      </Card>

      {/* Dialog nhập mã xác thực */}
      <Dialog open={isDialogOpen} handler={() => setIsDialogOpen(false)} size="sm">
        <DialogHeader>Verify Your Email</DialogHeader>
        <DialogBody>
          <form onSubmit={handleVerifyCode} className="flex flex-col gap-4">
            <Input
              label="Enter Verification Code"
              name="verificationCode"
              type="text"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              required
            />
            <Button type="submit" fullWidth color="green">
              Verify & Register
            </Button>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={() => setIsDialogOpen(false)} variant="text">
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Register;
