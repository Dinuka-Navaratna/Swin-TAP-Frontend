import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'; // Assuming you still have the scoped CSS

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null); // to track which user is being edited
    const [updatedName, setUpdatedName] = useState(''); // for holding the updated name
    const [updatedRole, setUpdatedRole] = useState(''); // for updated role
    const [updatedEmail, setUpdatedEmail] = useState(''); // for updated email
    const [updatedStatus, setUpdatedStatus] = useState(''); // for updated status
    const [updatedPhone, setUpdatedPhone] = useState(''); // for updated phone
    const [showModal, setShowModal] = useState(false); // modal state
    const [validationError, setValidationError] = useState(''); // to show validation errors

    const baseUrl = 'https://api.autoassure.me/api/users/';
    const authToken = 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjMDRmODQwNWJhNDQ2NzNlYjE2NGZjIiwibmFtZSI6Imthc3VuIiwicm9sZSI6ImFkbWluIiwicGhvbmUiOiIwNzE3NjU2NjU3IiwiZW1haWwiOiJrbWthc3VubWFkdXNhbmthQGdtYWlsLmNvbSIsImV4cCI6MTc1NTQxODcyMCwiaWF0IjoxNzIzODgyNzIwfQ.3TOQUl1htrC9rxaYIDNPKgzASp3wJLgNcJ5nwLvGACw';

    // Fetch all users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(baseUrl, {
                    headers: {
                        'Authorization': authToken
                    }
                });
                setUsers(response.data.data.value);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Open modal and set user for editing
    const openEditModal = (user) => {
        setEditingUser(user);
        setUpdatedName(user.name);
        setUpdatedRole(user.role);
        setUpdatedEmail(user.email);
        setUpdatedStatus(user.status);
        setUpdatedPhone(user.phone || ''); // Optional chaining for phone
        setShowModal(true);
    };

    // Close modal
    const closeEditModal = () => {
        setShowModal(false);
        setEditingUser(null);
        setValidationError(''); // Clear validation error
    };

    // Validate the input before submission
    const validateForm = () => {
        // Name validation (not empty)
        if (updatedName.trim() === '') {
            setValidationError('Name is required.');
            return false;
        }

        // Email validation (basic pattern)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(updatedEmail)) {
            setValidationError('Please enter a valid email.');
            return false;
        }

        // Phone validation (optional but must be valid if provided)
        const phonePattern = /^[0-9]{10,15}$/; // Ensure phone has 10-15 digits
        if (updatedPhone && !phonePattern.test(updatedPhone)) {
            setValidationError('Please enter a valid phone number (10-15 digits).');
            return false;
        }

        // Clear validation error if all validations pass
        setValidationError('');
        return true;
    };

    // Update a user
    const updateUser = async (userId) => {
        if (!validateForm()) return; // Prevent submission if validation fails

        try {
            const response = await axios.put(
                `${baseUrl}`,
                { 
                    _id: userId,
                    name: updatedName, 
                    role: updatedRole,
                    email: updatedEmail,
                    status: updatedStatus,
                    phone: updatedPhone 
                },
                {
                    headers: {
                        'Authorization': authToken
                    }
                }
            );
            alert(`User ${userId} updated successfully!`);
            // Update the local state to reflect the changes
            const updatedUsers = users.map((user) =>
                user._id === userId ? { ...user, name: updatedName, role: updatedRole, email: updatedEmail, status: updatedStatus, phone: updatedPhone } : user
            );
            setUsers(updatedUsers);
            closeEditModal();  // Close modal after updating
        } catch (error) {
            alert('Error updating user');
        }
    };

    // Delete a user
    const deleteUser = async (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
            try {
                await axios.delete(`${baseUrl}${userId}`, {
                    headers: {
                        'Authorization': authToken
                    }
                });
                alert(`User "${userName}" deleted successfully!`);
                // Remove the user from the local state
                setUsers(users.filter((user) => user._id !== userId));
            } catch (error) {
                alert('Error deleting user');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="admin-panel">
            <h2>User Data Table</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>{user.email}</td>
                            <td>{user.phone || 'N/A'}</td>
                            <td>{new Date(user.created_at).toLocaleString()}</td>
                            <td>
                                <button onClick={() => openEditModal(user)}>Edit</button>
                                <button onClick={() => deleteUser(user._id, user.name)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeEditModal}>&times;</span>
                        <h2>Edit User</h2>
                        {/* Show validation errors */}
                        {validationError && <p className="validation-error">{validationError}</p>}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            updateUser(editingUser._id);
                        }}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Role:
                                <select
                                    value={updatedRole}
                                    onChange={(e) => setUpdatedRole(e.target.value)}
                                    required
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Mechanic">Mechanic</option>
                                    <option value="Seller">Seller</option>
                                </select>
                            </label>

                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={updatedEmail}
                                    onChange={(e) => setUpdatedEmail(e.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Status:
                                <select
                                    value={updatedStatus}
                                    onChange={(e) => setUpdatedStatus(e.target.value)}
                                    required
                                >
                                    <option value="not confirm">Not Confirmed</option>
                                    <option value="confirm">Confirmed</option>
                                    <option value="Active">Active</option>
                                    <option value="de-active">De-active</option>
                                </select>
                            </label>

                            <label>
                                Phone:
                                <input
                                    type="text"
                                    value={updatedPhone}
                                    onChange={(e) => setUpdatedPhone(e.target.value)}
                                />
                            </label>

                            <button type="submit">Save</button>
                            <button type="button" onClick={closeEditModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;