import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [data, setData] = useState({})
    const[alertMessage, setAlertMesssage] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
        
        fetch(`${process.env.BACKEND_URL}api/signup`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => {
                console.log(response);
                return response.json()
            })

            .then(data => {
                console.log(data);
                if (data.msg == "User already registered") {
                    setAlertMesssage(
                        <div className="alert alert-warning" role="alert">User already registered</div>
                    )
                }

                if (data.msg == "User created") {
                    setInterval(() => {
                        navigate("/login")
                    }, 2000);

                    setAlertMesssage(
                        <div className="alert alert-success" role="alert">User created</div>
                    )
                }

            })
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        
    }


    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="imputEmail" className="form-label">Email:</label>
                <input type="email" name="email" className="form-control" id="imputEmail" onChange={e => handleChange(e)} />
            </div>

            <div className="mb-3">
                <label htmlFor="imputPassword" className="form-label">Password:</label>
                <input type="password" name="password" className="form-control" id="imputPassword" onChange={e => handleChange(e)} />
            </div>
            {alertMessage}
            <button type="submit" className="btn btn-dark">Submit</button>
        </form>
    )

}