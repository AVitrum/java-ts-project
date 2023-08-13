import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post(
            "http://localhost:8080/api/v1/auth/register",
            {
                firstName,
                lastName,
                email,
                password,
            }
        );
        navigate("/login");
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Registration</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="FirstName"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="LastName"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
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
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
