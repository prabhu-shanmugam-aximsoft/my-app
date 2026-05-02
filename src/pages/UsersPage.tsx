
import { useEffect, useState } from 'react';
import { type User } from '../types';
import { useTitle } from '../context/TitleProvider';
import { useNavigate } from "react-router-dom";
import { Trash3, Pencil, Eye } from 'react-bootstrap-icons';
import { useUser } from '../hooks/useUser';

export default function UsersPage() {

    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');

    const navigate = useNavigate();

    const { setTitle } = useTitle();

    useEffect(() => { setTitle("User Management"); }, [setTitle]);

    const { data, loading, fetchAll, remove } = useUser();


    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        console.log(data);
        setFilteredUsers(data);
    }, [data]);


    useEffect(() => {
        let result = data;

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
    }, [search, roleFilter, data]);

    if (loading) {
        return <div className="text-center mt-5">Loading users...</div>;
    }

    function handleDelete(id: number) {
        const confirmDelete = window.confirm('Delete this user?');
        if (!confirmDelete) return;
        remove(id);
    }

    const uniqueRoles = ['All', 'admin', 'user'];

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="mb-3">Users List</h4>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control" value={search}
                                placeholder="Search by name or email" onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <select className="form-select" value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)} >
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

