import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import AddUser from './pages/users/AddUser';
import EditUser from './pages/users/EditUser';

function App(): React.ReactElement {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/addUser" element={<AddUser />} />
                    <Route path="/editUser/:id" element={<EditUser />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
