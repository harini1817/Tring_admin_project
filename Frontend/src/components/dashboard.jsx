import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/dashboard.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth} from '../slices/authSlice';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    // const [email, setEmail] = useState('');
    const [rowModesModel, setRowModesModel] = useState({});
    const navigate = useNavigate();
    // const location = useLocation();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const email = useSelector(state => state.auth.email);
    
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
                // localStorage.clear();
                dispatch(clearAuth());
                alert('Session expired, please login again.');
                navigate('/login', { replace: true });
            }
        };

        const intervalId = setInterval(checkTokenExpiration, 1000);

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/users');
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

        // const userEmail = localStorage.getItem('email');
        // setEmail(userEmail);

        return () => clearInterval(intervalId);
    }, [token, navigate,dispatch]);

    const handleLogout = () => {
        // localStorage.clear();
        dispatch(clearAuth());
        navigate('/login', { replace: true });
    };

    const handleDelete = async (email) => {
        try {
            await axios.delete(`http://localhost:8081/users/${email}`);
            setUsers(users.filter(user => user.email !== email));
        } catch (err) {
            console.error("Error deleting user", err);
        }
    };

    const handleEditSave = async (user) => {
        try {
            const updatedUser = {
                name: user.name,
                email: user.email,
                city: user.city,
                contact: user.contact,
                newEmail: user.email,
            };

            await axios.put(`http://localhost:8081/users/${user.email}`,updatedUser);
            setUsers(users.map(match => (match.email === user.email ? user : match)));
        } catch (err) {
            console.error("Error updating user", err);
        }
    };

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const processRowUpdate = async (newRow) => {
        await handleEditSave(newRow);
        return newRow;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: 'edit' } });
    };

    const handleSaveClick = (id) => async () => {
        const row = users.find((user) => user.id === id);
        await handleEditSave(row);
        setRowModesModel({ ...rowModesModel, [id]: { mode: 'view' } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: 'view', ignoreModifications: true } });
    };

    const columns = [
        { field: 'name', headerName: <span style={{ fontWeight: 'bold' }}>Name</span>, width: 200, editable: true },
        { field: 'email', headerName: <span style={{ fontWeight: 'bold' }}>Email</span>, width: 250, editable: true },
        { field: 'city', headerName:  <span style={{ fontWeight: 'bold' }}>City</span>, width: 150, editable: true },
        { field: 'contact', headerName:  <span style={{ fontWeight: 'bold' }}>Contact</span>, width: 150, editable: true },
        {
        renderCell: (params) => {
                const isInEditMode = rowModesModel[params.id]?.mode === 'edit';
                return (
                    <>
                        {isInEditMode ? (
                            <>
                                <GridActionsCellItem
                                    icon={<SaveIcon />}
                                    onClick={handleSaveClick(params.id)}
                                />
                                <GridActionsCellItem
                                    icon={<CancelIcon />}
                                    onClick={handleCancelClick(params.id)}
                                />
                            </>
                        ) : (
                            <>
                                <GridActionsCellItem
                                    icon={<EditIcon />}
                                    onClick={handleEditClick(params.id)}
                                />
                                <GridActionsCellItem
                                    icon={<DeleteIcon />}
                                    onClick={() => handleDelete([params.row.email])}
                                />
                            </>
                        )}
                    </>
                );
            }
        },
    ];

    return (
        <div>
            <div className="header">
                <h1 style={{ display: 'inline-block' }}>Welcome to Dashboard</h1>
                <p className='mail'>{email}</p>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
            />
        </div>
    );
};

export default Dashboard;
