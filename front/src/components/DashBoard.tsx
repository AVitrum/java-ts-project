import {useContext, useEffect} from "react";
import { UserContext } from "./UserContext.tsx";

export default function Dashboard() {
    const { userInfo } = useContext(UserContext);

    useEffect(() => {

    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {userInfo.firstName} {userInfo.lastName}!</p>
            <p>Email: {userInfo.email}</p>
        </div>
    );
}
