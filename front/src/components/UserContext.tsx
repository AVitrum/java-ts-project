import { createContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

interface UserContextProps {
    children: ReactNode;
}

interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface UserContextData {
    userInfo: UserInfo;
    setUserInfo: (newUserInfo: UserInfo) => void;
    token: string;
    setToken: (newToken: string) => void;
}

export const UserContext = createContext<UserContextData>({
    userInfo: {
        id: -1,
        firstName: "",
        lastName: "",
        email: "",
        role: "",
    },
    setUserInfo: () => {},
    token: "",
    setToken: () => {},
});

export function UserContextProvider({ children }: UserContextProps) {
    const [userInfo, setUserInfoState] = useState<UserInfo>(
        JSON.parse(Cookies.get("userInfo") || "{}")
    );

    const setUserInfo = (newUserInfo: UserInfo) => {
        Cookies.set("userInfo", JSON.stringify(newUserInfo));
        setUserInfoState(newUserInfo);
    };

    const [token, setTokenState] = useState(Cookies.get("token") || "");

    const setToken = (newToken: string) => {
        Cookies.set("token", newToken);
        setTokenState(newToken);
    };

    return (
        <UserContext.Provider
            value={{ userInfo, setUserInfo, token, setToken }}
        >
            {children}
        </UserContext.Provider>
    );
}
