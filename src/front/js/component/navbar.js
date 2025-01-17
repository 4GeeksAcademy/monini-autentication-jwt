import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

	const navigate = useNavigate()
	const handleOnLogoutClick = () => {
		localStorage.removeItem("token")
		navigate("/")
	}
	const handleOnLoginClick = () => {
		navigate("/login")
	}

	const token = localStorage.getItem("token");
	const [autenticated, setautenticated] = useState(false)

	const validateToken = async () => {
		const resp = await fetch(`${process.env.BACKEND_URL}api/private`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			}

		})


		if (!resp.ok) {
			setautenticated(false)
		} else {
			const data = await resp.json();
			console.log(data);

			setautenticated(true)
		};

	}



	useEffect(() => {


		validateToken()

	}, [token])

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{autenticated ?
						<button onClick={handleOnLogoutClick} className="btn btn-primary">Logout</button>
						:
						<button onClick={handleOnLoginClick} className="btn btn-primary">Login</button>
					}



				</div>
			</div>
		</nav>
	);
};
