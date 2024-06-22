import React from "react";
import logo from "../assets/primepicks.png";
import { Linkedin, Github, Instagram } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-black text-white py-8 w-full top-20 relative">
			<div className=" mx-auto flex flex-col md:flex-row justify-between items-center px-5">
				{/* Logo Section */}
				<div className="mb-4 md:mb-0">
					<img src={logo} alt="Prime Picks Logo" className="w-[300px]" />
				</div>

				{/* Navigation Links */}
				<div className="mb-4 md:mb-0">
					<ul className="space-y-2 text-center md:text-left">
						<li className="hover:underline cursor-pointer">Home</li>
						<li className="hover:underline cursor-pointer">Store</li>
						<li className="hover:underline cursor-pointer">Cart</li>
						<li className="hover:underline cursor-pointer">About</li>
					</ul>
				</div>

				{/* Contact Information */}
				<div className="mb-4 md:mb-0 text-center md:text-left">
					<p>Jagadhri</p>
					<p>Yamuna Nagar, 135003</p>
					<p>(123) 456-7890</p>
					<a href="mailto:codewithash.work@gmail.com" className="cursor-pointer">
						<p>info@primepicks.com</p>
					</a>
				</div>

				{/* Newsletter Signup */}
				<div className="mb-4 md:mb-0  ">
					<form className="flex flex-col items-center gap-4 ">
						<label htmlFor="newsletter" className="mb-2">
							Sign up for our newsletter:
						</label>
						<input
							type="email"
							id="newsletter"
							placeholder="Enter your email"
							className="p-2 rounded text-black w-[300px]"
						/>
						<button
							type="submit"
							className="mt-2 p-2 rounded-sm bg-white text-black">
							Subscribe
						</button>
					</form>
				</div>

				{/* Social Media Icons */}
				<div className="flex gap-4">
					<a
						href="https://www.linkedin.com"
						target="_blank"
						rel="noopener noreferrer">
						<Linkedin className="hover:text-gray-400" />
					</a>
					<a
						href="https://www.github.com"
						target="_blank"
						rel="noopener noreferrer">
						<Github className="hover:text-gray-400" />
					</a>
					<a
						href="https://www.instagram.com"
						target="_blank"
						rel="noopener noreferrer">
						<Instagram className="hover:text-gray-400" />
					</a>
				</div>
			</div>

			{/* Legal Links */}
			<div className="mt-8 text-center text-sm">
				<a href="/privacy-policy" className="hover:underline">
					Privacy Policy
				</a>{" "}
				|
				<a href="/terms-of-service" className="hover:underline">
					{" "}
					Terms of Service
				</a>
			</div>
		</footer>
	);
};

export default Footer;
