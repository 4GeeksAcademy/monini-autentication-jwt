import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [data, setData] = useState({})
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        fetch(`${process.env.BACKEND_URL}/api/signUp`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {

                }
            })

            .then(data => {
                console.log(data);

            })
    }


    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="imputEmail" className="form-label">Email:</label>
                <input type="email" name="email" className="form-control" id="imputEmail" onChange={e => handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="imputPassword" className="form-label">Password:</label>
                <input type="password" name="password" className="form-control" id="imputPassword" onChange={e => handleChange} />
            </div>
            <button type="submit" className="btn btn-dark">Submit</button>
        </form>
    )

}