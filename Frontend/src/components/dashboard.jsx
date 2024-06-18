import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from './authorization';
import './styles/dashboard.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.state?.token;

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true });
            return;
        }

        const decodeToken = (token) => {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
                return null;
            }
        };

        const checkTokenExpiration = () => {
            const decodedToken = decodeToken(token);
            if (decodedToken && decodedToken.exp < Date.now() / 1000) {
                localStorage.clear();
                alert('Session expired, please login again.');
                navigate('/login', { replace: true });
            }
        };

        const intervalId = setInterval(checkTokenExpiration, 1000);

        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users');
                const set = response.data.map((user, index) => ({ ...user, id: index }));
                setUsers(set);
            } catch (err) {
                console.error("Error in fetching users", err);
                if (err.response && err.response.status === 401) {
                    navigate('/login', { replace: true });
                }
            }
        };

        fetchUsers();

        const userEmail = localStorage.getItem('email');
        setEmail(userEmail);

        return () => clearInterval(intervalId);
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'contact', headerName: 'Contact', width: 150 },
    ];

    return (
        <div>
            <div className="header">
                <h1 style={{ display: 'inline-block' }}>Welcome to Dashboard</h1>
                <p >{email}</p>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
};

export default Dashboard;
