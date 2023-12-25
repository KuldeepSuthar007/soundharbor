import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Mobfooter.module.css";
import homeicon from "../../assets/home1.jpg";
import carticon from "../../assets/cart.jpg";
import loginicon from "../../assets/login.jpg";
import logouticon from "../../assets/logout.jpg";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Mobfooter({ login, setlogin }) {
  const [cartitemcount, setCartitemcount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const email = localStorage.getItem("email");
      try {
        const reqUrl = `${backendUrl}product/get-cart`;
        const response = await axios.get(reqUrl, {
          params: {
            userId: email,
          },
        });
        const itemCount = response.data.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setCartitemcount(itemCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  const navigate = useNavigate();
  function handlelogout() {
    localStorage.clear();
    setlogin(false);
    navigate("/");
  }
  return (
    <>
      <div className={style.footercontainer}>
        <div className={style.top}>
          <img
            src={homeicon}
            alt=""
            className={style.fotimg}
            onClick={() => navigate("/")}
          />
          <p>Home</p>
        </div>
        {login && (
          <div className={style.mid}>
            <div>
              <h6 className={style.cartnum}>{cartitemcount}</h6>
              <img
                src={carticon}
                alt=""
                className={style.fotimg}
                onClick={() => navigate("/cart")}
              />
            </div>

            <p>Cart</p>
          </div>
        )}

        <div className={style.bottom}>
          {!login && (
            <>
              <img
                src={loginicon}
                alt=""
                className={style.fotimg}
                onClick={() => navigate("/login")}
              />
              <p>Login</p>
            </>
          )}
          {login && (
            <>
              <img
                src={logouticon}
                alt=""
                className={style.fotimg}
                onClick={() => handlelogout()}
              />
              <p>Logout</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Mobfooter;
