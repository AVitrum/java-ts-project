import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext.tsx';
import Cookies from 'js-cookie';
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function Navbar() {
    const { token, setUserInfo, userInfo, setToken } = useContext(UserContext);
    const navigate = useNavigate();

    const profile = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUserInfo(res.data);
    };

    const logout = () => {
        Cookies.remove('userInfo');
        Cookies.remove('token');
        setUserInfo({ id: -1, firstName: '', lastName: '', email: '', role: '' });
        setToken('');
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        profile();
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Website
                    </Link>
                    <div className="d-flex align-items-center ml-auto">
                        <Link className="btn btn-outline-light me-3" to="addAnime">
                            Add Anime
                        </Link>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={<img src="public/abstract-user-flat-1.svg" alt="" style={{ width: '30px', height: '30px' }} />}
                            variant="outline-light"
                        >
                            {token ? (
                                <>
                                    <Dropdown.Item href="/dashboard">{userInfo.firstName}</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                </>
                            ) : (
                                <>
                                    <Dropdown.Item href="/login">Login</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="#register">Register</Dropdown.Item>
                                </>
                            )}
                        </DropdownButton>
                    </div>
                </div>
            </nav>
        </div>
    );
}
