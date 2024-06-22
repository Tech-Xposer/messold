import { useState, useEffect } from "react";

const useLoggegIn = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	return { isLoggedIn, setIsLoggedIn };
};

export default useLoggegIn;
