/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react"
import { authenticationContext } from "./AuthenticationContext"
import { useNavigate } from "react-router";


export default function Login() {
    const auth = useContext(authenticationContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.token.length) {
            navigate('/')
        }
    })
    return <form onSubmit={e => {
        e.preventDefault();

        const email = (e.target  as any).email.value;
        const password = (e.target as any).password.value;
        fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 201) return res.json();

        }).then(data => {
            console.log(data)
            auth.setToken(data.data);
            navigate('/');
        }
        )
    }}>
        <label htmlFor="email">email</label>
        <input type="text" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
    </form>
}