import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/grid.css';

function Dashboard(){
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:8081/users')
        .then(res =>{
        const set = res.data.map((user,index)=>({...user, id:index}));
        setUsers(set);
        })
        .catch(err => console.log("Error in Fetching users",err));
    },[]);
    const handleLogout =()=>{
        localStorage.removeItem('token');
        navigate('/login');
    };
    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'contact', headerName: 'Contact', width: 150 },
      ];
      return(
        <div className="container">
            <div className="header">
                <h1 style={{ display: 'inline-block' }}>Welcome to Dashboard</h1>
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
    
}
export default Dashboard;