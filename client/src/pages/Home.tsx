import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export default function Home(): React.ReactElement {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get<User[]>("http://localhost:8080/users");
        setUsers(result.data);
    };

    const deleteUser = async (id: number) => {
        await axios.delete(`http://localhost:8080/user/${id}`);
        await loadUsers();
    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Username</th>
                        <th scope="col">FullName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.username}</td>
                            <td>{user.firstName + ' ' + user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-primary mx-2">View</button>
                                <Link className="btn btn-outline-warning mx-2" to={`/editUser/${user.id}`}>
                                    Edit
                                </Link>
                                <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
