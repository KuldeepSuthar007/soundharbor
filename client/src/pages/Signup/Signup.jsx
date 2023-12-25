import React, { useState } from "react";
import style from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Logo from "../../components/Logo/Logo";
import { Signup } from "../../apis/auth";

function SignupComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handlesignup = (e) => {
    e.preventDefault();
    if (
      user.name === "" ||
      user.mobile === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      setError(true);
    } else {
      const { name, mobile, email, password } = user;
      Signup(name, mobile, email, password);
      console.log(user);
      navigate("/login");
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
          Create Account <span>.Don’t have an account?</span>{" "}
        </p>
        <form action="">
          <label>Your name</label>
          <input
            type="name"
            value={user.name}
            onInput={(e) => setUser({ ...user, name: e.target.value })}
          />
          {error && <p className={style.errortext}>Field is required</p>}
          <label>Mobile number</label>
          <input
            type="mobile"
            value={user.mobile}
            onInput={(e) => setUser({ ...user, mobile: e.target.value })}
          />
          {error && <p className={style.errortext}>Field is required</p>}
          <label>Email Id</label>
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
          <p className={style.h4}>
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from SoundHarbor.
            Message and data rates may apply.
          </p>
          <div style={{ display: "contents" }}>
            <button className={style.continue_btn} onClick={handlesignup}>
              Continue
            </button>
          </div>
        </form>
        <p className={style.term}>
          By continuing, you agree to SoundHarbor privacy notice and conditions
          of use.
        </p>
      </div>
      <p className={style.h5}>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Sign in</span>
      </p>

      <Footer />
    </div>
  );
}

export default SignupComponent;
