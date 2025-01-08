import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    const [response, setresponse] = useState(null)

    const validateToken = async () => {
        const resp = await fetch(`${process.env.BACKEND_URL}api/private`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }

        })

        if (!resp.ok) {
            navigate("/")
        } else {
            const data = await resp.json();
            setresponse(data)
        };

    }



    useEffect(() => {

        if (!token) {
            navigate("/")
        }
        validateToken()

    }, [])


    return (
        <>
            {response ?
                <div style={{ width: '50%', margin: '0 auto' }}>
                    <img src="https://static.vecteezy.com/system/resources/previews/010/925/778/non_2x/colorful-welcome-design-template-free-vector.jpg" style={{ width: '100%' }} />
                </div>
                :
                <div>Loading...</div>
            }
        </>

    )
}