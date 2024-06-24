import React, { useState, useEffect } from "react";
import { UserCircle2, Settings, LogInIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useLoggegIn from "../services/auth.service";
const DropDown = () => {
	const { isLoggedIn, setIsLoggedIn } = useLoggegIn();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		toast.success(isLoggedIn);
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, [setIsLoggedIn]);

	const handleItemClick = () => {
		setVisible(false);
	};

	const handleLogout = async () => {
		try {
			const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/v1/auth/logout`,{},{
				withCredentials:true
			});
			if (response.status === 204) {
				localStorage.removeItem("token");
				setIsLoggedIn(false);
				toast.success("Logged out successfully");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="relative inline-block">
			<div
				className="text-white flex items-center rounded-xl border-black border-2 w-fit cursor-pointer"
				onMouseEnter={() => setVisible(true)}
				onMouseLeave={() => setVisible(false)}>
				<UserCircle2 className="mr-1" />
				Account
			</div>
			{visible && (
				<ul
					className="absolute bg-white text-black shadow-lg rounded-lg mt-1 border border-gray-200 w-32 py-2 z-10 text-md"
					onMouseEnter={() => setVisible(true)}
					onMouseLeave={() => setVisible(false)}>
					{isLoggedIn ? (
						<>
							<li
								className="px-4 py-2 hover:bg-gray-200 hover:rounded-md cursor-pointer flex items-center"
								onClick={handleItemClick}>
								<Settings size={18} className="mr-1" />
								<Link to={"/settings"}>Settings</Link>
							</li>
							<li
								className="px-4 py-2 hover:bg-gray-200 hover:rounded-md cursor-pointer flex items-center"
								onClick={handleLogout}>
								<LogOutIcon size={18} className="mr-1" />
								Logout
							</li>
						</>
					) : (
						<li
							className="px-4 py-2 hover:bg-gray-200 hover:rounded-md cursor-pointer flex items-center"
							onClick={handleItemClick}>
							<LogInIcon size={18} className="mr-1" />
							<Link to={"/login"}>Sign In</Link>
						</li>
					)}
				</ul>
			)}
		</div>
	);
};

export default DropDown;
