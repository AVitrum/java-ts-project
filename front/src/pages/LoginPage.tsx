import {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/UserContext";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setToken } = useContext(UserContext);

    const getToken = async () => {
        const res = await axios.post(
            "http://localhost:8080/api/v1/auth/authenticate",
            {
                email,
                password,
            }
        );
        setToken(res.data.token);
        navigate("/dashboard");
        window.location.reload();
    };


    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={getToken}>Login</button>
        </div>
    );
}
