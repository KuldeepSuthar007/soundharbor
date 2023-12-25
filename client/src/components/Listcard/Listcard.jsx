import React from "react";
import style from "./List.module.css";
import cartlogo from "../../assets/addcart.png";
import { useNavigate } from "react-router-dom";

function ListCard({ productitem, login, handleadd_cart }) {
  const navigate = useNavigate();

  function handledetail(id) {
    localStorage.setItem("product_id", id);
    navigate("/detail");
  }

  return (
    <>
      {productitem.map((item) => {
        return (
          <div className={style.listcard}>
            <div
              className={style.cardimg}
              onClick={() => handledetail(item._id)}
            >
              <div className={style.productimg}>
                <img src={item.image} alt="" />
              </div>
              {login && (
                <img
                  src={cartlogo}
                  alt=""
                  className={style.cartlogo}
                  onClick={() => handleadd_cart(item._id)}
                />
              )}
            </div>
            <div className={style.carddetail}>
              <p className={style.cardtitle}>
                {item.company}
                {"  "} {item.model}
              </p>
              <p className={style.cardprice}>Price - ₹{item.price}</p>
              <p className={style.color}>
                {item.colour} | {item.headphonetype}
              </p>
              <p className={style.title}>{item.title}</p>
              <div
                className={style.detail_btn}
                onClick={() => handledetail(item._id)}
              >
                <button>Details</button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ListCard;
