import React, { createContext, useContext, useState, useEffect } from "react";
import { ACCESS_TOKEN, ACCESS_REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refresh = sessionStorage.getItem(ACCESS_REFRESH_TOKEN);
        try {
            const res = await api.post("token/refresh/", { refresh: refresh });

            if (res.status === 200) {
                sessionStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = sessionStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const exp = jwtDecode(token).exp;
        const now = Date.now() / 1000;
        if (exp < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthorized, auth }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};