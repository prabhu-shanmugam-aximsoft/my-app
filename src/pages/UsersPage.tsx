
import { useEffect, useState } from 'react';
import apiClient from "../services/apiClient";
import { type User } from '../types';
import { useTitle } from '../context/TitleProvider';
import { useNavigate } from "react-router";
import axios from 'axios';
import { Trash3, Pencil,Eye } from 'react-bootstrap-icons';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');

    const navigate = useNavigate();


    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle("User Management");
    }, [setTitle]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiClient.get(`/api/users/`);
                console.log(response);
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (err) {
                console.error('Failed to fetch users', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    useEffect(() => {
        let result = users;

        if (search) {
            result = result.filter((u) =>
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (roleFilter !== 'All') {
            result = result.filter((u) => u.role === roleFilter);
        }

        setFilteredUsers(result);
    }, [search, roleFilter, users]);

    if (loading) {
        return <div className="text-center mt-5">Loading users...</div>;
    }

    async function handleDelete(id: number) {
        const confirmDelete = window.confirm('Delete this user?');
        if (!confirmDelete) return;

        try {
            const response = await apiClient.delete(`/api/users/${id}`);
            console.log(response)

            setUsers((prev) => prev.filter((u) => u.id !== id));
            setFilteredUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // TypeScript now knows this is an AxiosError
                console.error(err.response?.status); // e.g., 404
                console.error(err.response?.data);   // Server error body
                alert(err?.response?.data?.message);
            } else {
                console.error('An unexpected error occurred:', err);
                alert('Failed to Delete User');
            }
        }
    }

    const uniqueRoles = ['All', ...Array.from(new Set(users.map((u) => u.role)))];

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="mb-3">Users Management</h4>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name or email"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                {uniqueRoles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div key={user.id} className="col-md-4 mb-3">
                                    <div className="card shadow-sm h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{user.name}</h5>
                                            <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
                                            <p className="card-text"><strong>Role:</strong> {user.role}</p>


                                            <div className="d-flex gap-2 mt-3">
                                                <button className="btn btn-sm btn-info" onClick={() => navigate(`/users/view/${user.id}`)}>  <Eye size={20} /> View</button>
                                                <button className="btn btn-sm btn-warning" onClick={() => navigate(`/users/edit/${user.id}`)}> <Pencil size={20} />  Edit</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>
                                                    <Trash3 size={20} /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">No users found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

