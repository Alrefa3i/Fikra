import React, { useEffect, useState } from "react";
import { ACCESS_REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, SetIsLoading] = useState(false);
  const { auth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetIsLoading(true);
    try {
      const res = await api.post("/token/", {
        username: username,
        password: password,
      });
      if (res.status === 200) {
        sessionStorage.setItem(ACCESS_TOKEN, res.data.access);
        sessionStorage.setItem(ACCESS_REFRESH_TOKEN, res.data.refresh);
        await auth();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {

      SetIsLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen" dir="rtl">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">تسجيل الدخول الآن!</h1>
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
              <input type="password" placeholder="كلمة المرور" className="input input-bordered" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">نسيت كلمة المرور؟</a>
              </label>
            </div>
            <div className="form-control mt-6">

              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? <>"جاري التحميل..."<span className="loading loading-spinner"></span></> : "تسجيل الدخول"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}