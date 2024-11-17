import React from 'react'
import { useAuth } from '../../context/AuthContext'
const Btn = () => {
    const { isAuthorized } = useAuth();
    return (<button className="btn btn-primary w-1/3">{isAuthorized ? "تصفح الكل " : "تسجيل حساب "}</button>)
}

export default Btn;