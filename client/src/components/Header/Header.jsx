import React, { useState, useEffect } from "react";
import style from "./Header.module.css";
import menu from "../../assets/main-menu.png";
import searchicon from "../../assets/search.png";
import cart2 from "../../assets/cart.jpg";
import musiclogo from "../../assets/soundharbor-in-12-21-2023 (1).png";
import loca from "../../assets/loca.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Header({ login, setlogin, setSearch }) {
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
      <div className={style.header}>
        <div>
          <div className={style.top}>
            <img className={style.logo} src={musiclogo} alt="" />
          </div>
        </div>
        <div className={style.address}>
          {" "}
          <img src={loca} alt="" />
          <div>
            <p>Deliver to</p>
            <p>Ahemdabad 380001</p>
          </div>
        </div>
        <div className={style.search}>
          <img src={searchicon} alt="" />
          <input
            type="text"
            placeholder="Search "
            className={style.serachinput}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={style.bottom}>
          {!login && (
            <>
              <button
                className={style.login_btn}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              |{" "}
              <button
                className={style.sign_btn}
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </>
          )}
          {login && (
            <button className={style.logout_btn} onClick={handlelogout}>
              Logout
            </button>
          )}
        </div>
        {login && (
          <div className={style.viewcart_btn} onClick={() => navigate("/cart")}>
            <div>
              <p className={style.cartnum}>{cartitemcount}</p>
              <img
                src={cart2}
                alt=""
                style={{ width: "20px", height: "22px" }}
              />
            </div>

            <button>Cart</button>
          </div>
        )}
      </div>
      <div className={style.snav}>
        <div className={style.navtop}>
          <img src={menu} alt="" />
        </div>
        <div className={style.topheading}>
          <p>All</p>
          <p>Sell</p>
          <p>Best Sellers</p>
          <p>Today's Deals</p>
          <p>Mobiles</p>
          <p>Electronics</p>
        </div>
        <div className={style.navads}>
          <p>Get 50% off on selected items | Shop Now</p>
        </div>
      </div>
    </>
  );
}

export default Header;
