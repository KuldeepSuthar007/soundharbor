import React from "react";
import style from "./GridCard.module.css";
import cartlogo from "../../assets/addcart.png";
import { useNavigate } from "react-router-dom";

function GridCard({ productitem, login, handleadd_cart }) {
  const navigate = useNavigate();
  function handledetail(id) {
    localStorage.setItem("product_id", id);
    navigate("/detail");
  }

  return (
    <>
      {productitem.map((item, i) => {
        return (
          <div key={i} className={style.card}>
            <div className={style.cardimg}>
              <div className={style.productimg}>
                <img
                  src={item.image}
                  alt=""
                  onClick={() => handledetail(item._id)}
                />
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
            <p
              className={style.cardtitle}
              onClick={() => handledetail(item._id)}
            >
              {item.company}
              {"  "} {item.model}
            </p>
            <p
              className={style.cardprice}
              onClick={() => handledetail(item._id)}
            >
              Price - ₹{item.price}
            </p>
            <p className={style.color} onClick={() => handledetail(item._id)}>
              {item.colour} | {item.headphonetype}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default GridCard;
