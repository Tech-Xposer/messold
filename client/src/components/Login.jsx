import React, { useEffect, useState } from "react";
import validator from "validator";
import axios from "axios";
import { Linkedin, Github, Facebook } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useLoggegIn from "../services/auth.service";

const Login = () => {
	const [showHide, setShowHide] = useState(false);
	const { setIsLoggedIn } = useLoggegIn();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleFormData = async (e) => {
		e.preventDefault();
		const { email, password } = formData;
		if (email === "" || password === "") {
			toast.error("Please fill all the fields");
			return;
		}
		if (!validator.isEmail(email)) {
			toast.error("Invalid Email");
			return;
		}
		if (password.length < 8) {
			toast.error("Password should be at least 8 characters");
			return;
		}
		if (!validator.isStrongPassword(password)) {
			toast.error("Password should be strong");
			return;
		}
		// API CALL
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_HOST}/api/v1/auth/login`,
				{
					email,
					password,
				},
				{
					withCredentials: true,
				}
			);
			console.log(response);
			if (response.status === 200) {
				toast.success("Login Successful");
				localStorage.setItem("token", response.data.data.token);
				setIsLoggedIn(true); // Update login state
				navigate("/store");
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.error);
		}
	};

	const handleValueChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handlePasswordVisibility = () => {
		setShowHide(!showHide);
	};

	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex bg-white shadow-2xl rounded-2xl h-[450px] w-[800px]">
				{/* left */}
				<div className="flex justify-center flex-col items-center w-[400px] gap-4 p-6">
					<h1 className="text-3xl font-bold">Sign In</h1>
					{/* socials login */}
					<div className="flex gap-5">
						{/*  social login buttons */}
						<button className="border-2 border-gray-300 p-1 rounded-md">
							<Github size={16} />
						</button>
						<button className="border-2 border-gray-300 p-1 rounded-md">
							<Facebook size={16} />
						</button>
						<button className="border-2 border-gray-300 p-1 rounded-md">
							<Linkedin size={16} />
						</button>
					</div>
					<p className="text-sm text-gray-600">or use your email password</p>
					{/* email login */}
					<form
						className="flex flex-col items-center gap-4"
						onSubmit={handleFormData}>
						<input
							type="email"
							name="email"
							placeholder="Email"
							className="p-2 rounded-md border border-gray-300 w-64 bg-gray-100 text-sm"
							onChange={handleValueChange}
							value={formData.email}
						/>
						<input
							type={`${showHide ? "text" : "password"}`}
							name="password"
							placeholder="Password"
							className="p-2 rounded-md border border-gray-300 w-64 bg-gray-100 text-sm"
							onChange={handleValueChange}
							value={formData.password}
						/>
						<div className="flex gap-2">
							<p className="text-[12px]">Show Password</p>
							<input
								type="checkbox"
								onChange={handlePasswordVisibility}
								checked={showHide}
							/>
						</div>
						<p className="text-sm text-gray-600 cursor-pointer">
							Forgot Your Password?
						</p>
						<button
							type="submit"
							className="p-2 w-40 bg-gradient-to-r from-[#555489] via-[#332289] to-[#35307a] text-white rounded-md hover:bg-[#3e3b97] transition duration-300">
							SIGN IN
						</button>
					</form>
				</div>
				{/* right */}
				<div className="flex justify-center  bg-gradient-to-r from-[#555489] via-[#332289] to-[#35307a] flex-col text-white items-center w-[400px] gap-8 p-6 rounded-l-[150px] rounded-r-2xl">
					<h1 className="text-3xl font-bold">Hello, Friend!</h1>
					<p className="text-sm text-gray-100 text-center px-4">
						Register with your personal details to use all of site features
					</p>
					<button className="p-2 w-40  text-white rounded-md hover:opacity-70 transition duration-300 border-gray-100 border-2">
						<Link to={"/register"}>Sign Up</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
