import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, SetIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetIsLoading(true);
    try {
      const res = await api.post("/register/", {
        username: username,
        password: password,
      });
      if (res.status === 201) {
        setUser(true);
        navigate("/login");
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setTimeout(() => {
        SetIsLoading(false);
      }, 1000);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="hero bg-base-200 min-h-screen" dir="rtl">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">إنشاء حساب جديد!</h1>
          <p className="py-6">
            التعليم هو المفتاح لتحقيق النجاح في الحياة.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">البريد الإلكتروني</span>
              </label>
              <input type="text" placeholder="البريد الإلكتروني" className="input input-bordered" required value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">كلمة المرور</span>
              </label>
              <input type="password" placeholder="كلمة المرور" className="input input-bordered" required value={password} onChange={handlePasswordChange} />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? <>"جاري التحميل..."<span className="loading loading-spinner"></span></> : "إنشاء حساب"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}