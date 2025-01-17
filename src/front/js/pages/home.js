import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Link to={"/signup"}>
				<button className="btn btn-dark mx-2">SignUp</button>
			</Link>

			<Link to={"/login"}>
				<button className="btn btn-dark mx-2">Login</button>
			</Link>

		</div>
	);
};
