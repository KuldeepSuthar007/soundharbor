import React, { useState } from "react";
import style from "./Login.module.css";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { Login } from "../../apis/auth";

function LoginComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handlelogin = (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      setError(true);
    } else {
      const { email, password } = user;
      Login(email, password);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  return (
    <div className={style.container}>
      <Logo />
      <div className={style.greeting}>
        {" "}
        <p>Welcome</p>
      </div>
      <div className={style.formcontainer}>
        <p className={style.h2}>
          Sign in <span>. Already a customer?</span>
        </p>

        <form action="">
          <label>Enter your email or mobile number</label>
          <input
            type="email"
            value={user.email}
            onInput={(e) => setUser({ ...user, email: e.target.value })}
          />
          {error && <p className={style.errortext}>Field is required</p>}
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            onInput={(e) => setUser({ ...user, password: e.target.value })}
          />
          {error && <p className={style.errortext}>Field is required</p>}
          <div style={{ display: "contents" }}>
            <button className={style.continue_btn} onClick={handlelogin}>
              Continue
            </button>
          </div>
        </form>
        <p className={style.term}>
          By continuing, you agree to SoundHarbor privacy notice and conditions
          of use.
        </p>
      </div>
      <p className={style.h6}>New to SoundHarbor?</p>
      {/* <div>
        <p style={{ width: "10px", height: "2px", color: "black" }}>-</p>
        <p className={style.h6}>New to Musicart?</p>
        <p></p>
      </div> */}
      <button className={style.create_btn} onClick={() => navigate("/signup")}>
        Create your account
      </button>
      <Footer />
    </div>
  );
}

export default LoginComponent;
