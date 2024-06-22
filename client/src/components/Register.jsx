import React, { useEffect, useState } from "react";
import validator from "validator";
import axios from "axios";
import { Linkedin, Github, Facebook, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useLoggegIn from "../services/auth.service";

const Register = () => {
	const [showHide, setShowHide] = useState(false);
	const [tabIndex, setTabIndex] = useState(1);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		phone: "",
		name: "",
		street: "",
		city: "",
		state: "",
		pincode: "",
	});

	const handleFormData = async (e) => {
		e.preventDefault();
		const { email, password, phone, name, street, city, state, pincode } =
			formData;
		if (
			email === "" ||
			password === "" ||
			name === "" ||
			phone === "" ||
			street === "" ||
			city === "" ||
			state === "" ||
			pincode === ""
		) {
			toast.error("Please fill all the fields");
			return;
		}
		// if (!validator.isEmail(email)) {
		// 	toast.error("Invalid Email");
		// 	return;
		// }
		// if (password.length < 8) {
		// 	toast.error("Password should be at least 8 characters");
		// 	return;
		// }
		// if (!validator.isStrongPassword(password)) {
		// 	toast.error("Password should be strong");
		// 	return;
		// }
		// if (phone.length !== 10) {
		// 	toast.error("Invalid Phone Number");
		// 	return;
		// }
		// if (!validator.isPincode(pincode)) {
		// 	toast.error("Invalid Pincode");
		// 	return;
		// }
		// API CALL
		try {
			const response = await axios.post("/api/v1/auth/register", {
				email,
				password,
				phone,
				name,
				address: {
					street,
					city,
					state,
					pincode,
				},
			});
			console.log(response);
			if (response.status === 200) {
				toast.success("Registration Successful");
				navigate("/login");
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

				{/* right */}
				<div className="flex justify-center  bg-gradient-to-r from-[#555489] via-[#332289] to-[#35307a] flex-col text-white items-center w-[400px] gap-8 p-6 rounded-r-[150px] rounded-l-2xl">
					<h1 className="text-3xl font-bold">Hello, Friend!</h1>
					<p className="text-sm text-gray-100 text-center px-4">
						Already Have An Accout?
					</p>
					<button className="p-2 w-40  text-white rounded-md hover:opacity-70 transition duration-300 border-gray-100 border-2">
						<Link to={"/login"}>Login</Link>
					</button>
				</div>
				<div className="flex justify-center flex-col items-center w-[400px] gap-4 p-6">
					<h1 className="text-3xl font-bold">Sign Up</h1>
					<div className="flex justify-between w-1/2">
						<button onClick={() => setTabIndex(1)} className="">
							Personal
						</button>
						<button onClick={() => setTabIndex(2)} className="">
							Address
						</button>
					</div>
					<form
						className="flex flex-col items-center gap-4"
						onSubmit={handleFormData}>
						{tabIndex === 1 && (
							<>
								<input
									type="text"
									name="name"
									placeholder="Name"
									className="p-2 rounded-md border border-gray-300 w-64 bg-gray-100 text-sm"
									onChange={handleValueChange}
									value={formData.name}
								/>
								<input
									type="email"
									name="email"
									placeholder="Email"
									className="p-2 rounded-md border border-gray-300 w-64 bg-gray-100 text-sm"
									onChange={handleValueChange}
									value={formData.email}
								/>
								<input
									type="tel"
									name="phone"
									placeholder="Phone Number"
									className="p-2 rounded-md border border-gray-300 w-64 bg-gray-100 text-sm"
									onChange={handleValueChange}
									value={formData.phone}
									maxLength={10}
								/>
								<div className="relative w-64">
									<input
										type={showHide ? "text" : "password"}
										name="password"
										placeholder="Password"
										className="p-2 rounded-md border border-gray-300 w-full bg-gray-100 text-sm"
										onChange={handleValueChange}
										value={formData.password}
									/>
									<button
										type="button"
										className="absolute right-2 top-1/2 transform -translate-y-1/2"
										onClick={handlePasswordVisibility}>
										{showHide ? <EyeOff size={16} /> : <Eye size={16} />}
									</button>
								</div>
							</>
						)}
						{tabIndex === 2 && (
							<>
								<input
									type="text"
									name="street"
									placeholder="Address"
									className="p-2 rounded-md border border-gray-300 w-64 bg-gray-100 text-sm"
									onChange={handleValueChange}
									value={formData.street}
								/>
								<input
									type="text"
									name="city"
									placeholder="City"
									className="p-2 rounded-md border border-gray-300 w-64 bg-gray-100 text-sm"
									onChange={handleValueChange}
									value={formData.city}
								/>
								<input
									type="number"
									name="pincode"
									placeholder="Pin Code"
									className="p-2 rounded-md border border-gray-300 w-64 bg-gray-100 text-sm"
									onChange={handleValueChange}
									value={formData.pincode}
								/>
								<input
									type="text"
									name="state"
									placeholder="State"
									className="p-2 rounded-md border border-gray-300 w-64 bg-gray-100 text-sm"
									onChange={handleValueChange}
									value={formData.state}
								/>
							</>
						)}
						<button
							type="submit"
							className="p-2 w-40 bg-gradient-to-r from-[#555489] via-[#332289] to-[#35307a] text-white rounded-md hover:bg-[#3e3b97] transition duration-300">
							SIGN UP
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
