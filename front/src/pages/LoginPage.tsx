import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/UserContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { setToken } = useContext(UserContext);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
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
        } catch (error) {
            setErrorMessage("Incorrect credentials");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Login</h2>
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-outline-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
