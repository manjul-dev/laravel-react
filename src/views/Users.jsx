import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const Users = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    
    useEffect(()=>{
        getUsers();
    },[]);

    const getUsers = () => {
        setLoading(true)
        axiosClient
            .get('/users')
            .then((response)=>{
                setLoading(false);
                setUser(response.data.data);
            })
            .catch((err) => {
                setLoading(false);
            })
    }

    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete this user ?")) {
            return;
        }
        setLoading(true);
        
        axiosClient
            .delete(`/users/${u.id}`)
            .then(() => {
                setLoading(false);
                getUsers();
                setNotification("User deleted successfully");
            })
    }

    return (
        <div>
            <div style={{display:"flex", justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">Add New</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Emai</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>}
                    {!loading && <tbody>
                        {user.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.create_at}</td>
                                <td>
                                    <Link className="btn-edit" to={`/users/${u.id}`}>Edit</Link>
                                    &nbsp;
                                    <button onClick={ev => onDelete(u)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ) )}
                    </tbody>}
                </table>
            </div>
        </div>
    )
}

export default Users;