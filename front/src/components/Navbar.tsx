import { useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext.tsx';
import Cookies from 'js-cookie';
import '../styles/navbar.css'
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function Navbar() {
    const { token, setUserInfo, userInfo, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

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

    const addAnimeClass = location.pathname === '/addAnime' ? 'btn me-3 text-decoration-underline-c fw-bold fs-5' : 'btn me-3 text-decoration-none fw-bold fs-5';

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white padding-top">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <Link className="navbar-brand text-black fs-3" to="/">
                            Vitrum
                        </Link>
                    </div>
                    <div className="d-flex align-items-center ml-auto">
                        <Link className={addAnimeClass} to="addAnime">
                            Add Anime
                        </Link>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={<img src="public/abstract-user-flat-1.svg" alt="" style={{ width: '30px', height: '30px' }} />}
                            variant="outline-dark"
                        >
                            {token ? (
                                <>
                                    <Dropdown.Item href="/dashboard" className="text-black">{userInfo.firstName}</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={logout} className="text-black">Logout</Dropdown.Item>
                                </>
                            ) : (
                                <>
                                    <Dropdown.Item href="/login" className="text-black">Login</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="/register" className="text-black">Register</Dropdown.Item>
                                </>
                            )}
                        </DropdownButton>
                    </div>
                </div>
            </nav>
        </div>
    );
}
