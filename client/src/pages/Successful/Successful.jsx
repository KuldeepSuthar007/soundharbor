import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Successful.module.css";
import Logo from "../../components/Logo/Logo";
import ppoper from "../../assets/confetti 1.png";
import Header from "../../components/Header/Header";
import Mobfooter from "../../components/Mobfooter/Mobfooter";
import Footer from "../../components/Footer/Footer";

function Successful() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const checktoken = () => {
    let token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  useEffect(() => {
    checktoken();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Header login={login} setlogin={setLogin} />
      </div>
      <div className={style.subheader}>
        <Logo />
      </div>
      <div className={style.midcontainer}>
        <img src={ppoper} alt="" />
        <p className={style.h2}>Order is placed successfully!</p>
        <p className={style.h3}>
          You will be receiving a confirmation email with order details
        </p>
        <button className={style.goback_btn} onClick={() => navigate("/")}>
          Go back to Home page
        </button>
      </div>
      <Footer />
      <Mobfooter login={login} setlogin={setLogin} />
    </div>
  );
}

export default Successful;
