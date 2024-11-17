import React, { useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../constants';
import { jwtDecode } from "jwt-decode";
import api from '../api';

const Dashboard = () => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setError('No access token found');
            setLoading(false);
            return;
        }

        let userId;
        try {
            userId = jwtDecode(token).user_id;
            console.log(userId);
        } catch (err) {
            setError('Invalid access token');
            setLoading(false);
            return;
        }

        fetchUser(userId);
    }, []);

    const fetchUser = async (id) => {
        try {
            const res = await api.get(`/userInfo/`, {
                'Content-Type': 'application/json',
            });
            setUser(res.data);
        } catch (err) {
            setError('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {user ? (
                <div>
                    <h1>{user.name}'s Dashboard</h1>
                    <p>Email: {user.email}</p>

                </div>
            ) : (
                <p>User not found</p>
            )}
        </div>
    );
};

export default Dashboard;
