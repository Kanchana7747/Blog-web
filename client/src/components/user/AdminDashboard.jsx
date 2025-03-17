import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const res = await axios.get('http://localhost:3000/admin-api/all-users');
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    async function toggleBlockUser(clerkId) {
        try {
            await axios.put(`http://localhost:3000/admin-api/block-user/${clerkId}`);
            fetchUsers();  // Refresh users list
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    }

    return (
        <div className="container mt-5">
            <h2>Admin Dashboard</h2>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.clerkId}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                            <td>
                                <button
                                    className={`btn ${user.isBlocked ? 'btn-success' : 'btn-danger'}`}
                                    onClick={() => toggleBlockUser(user.clerkId)}
                                >
                                    {user.isBlocked ? "Unblock" : "Block"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
