import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Productdetail.module.css";
import { addtocart } from "../../apis/product";
import star from "../../assets/Star 3.png";
import Header from "../../components/Header/Header";
import Arrow from "../../assets/Vector (10).png";
import Mobfooter from "../../components/Mobfooter/Mobfooter";
import Footer from "../../components/Footer/Footer";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Productdetail() {
  const [productdetail, setProductdetail] = useState({});
  const [selectedProductIds, setSelectedProductIds] = useState(() => {
    const storedIds = localStorage.getItem("selectedProductIds");
    return storedIds ? JSON.parse(storedIds) : [];
  });
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  let [imgurl, setImgurl] = useState("");

  const fetchdetail = async () => {
    const productid = localStorage.getItem("product_id");
    try {
      const reqUrl = `${backendUrl}product/detail-product/${productid}`;
      const response = await axios.get(reqUrl);
      setProductdetail(response.data);
      setImgurl(response.data.image);
      let token = localStorage.getItem("token");
      if (token) {
        setLogin(true);
      } else {
        setLogin(false);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const userId = localStorage.getItem("email");
  function handleadd_cart(id) {
    addtocart(userId, id);
    navigate("/cart");
  }

  function handlebuy_now(productId) {
    console.log(productId);
    setSelectedProductIds((prevSelectedIds) => [...prevSelectedIds, productId]);

    setTimeout(() => {
      navigate(`/checkout?productId=${productId}`);
    }, 1000);
  }

  useEffect(() => {
    fetchdetail();
    localStorage.setItem(
      "selectedProductIds",
      JSON.stringify(selectedProductIds)
    );
  }, [setProductdetail, selectedProductIds]);

  return (
    <>
      <Header login={login} setlogin={setLogin} />
      <div className={style.nav}>
        <div className={style.top}>
          <p className={style.h5}>
            Home/{productdetail.company} {productdetail.model}
          </p>
        </div>
      </div>
      <div className={style.back_btn}>
        <button onClick={() => navigate("/")}>Back to products</button>
      </div>

      <div className={style.Arrback_btn}>
        <img src={Arrow} alt="" onClick={() => navigate("/")} />
      </div>
      <div className={style.heading}>
        <p>{productdetail.title} </p>
      </div>
      <div className={style.maincontainer}>
        <div className={style.leftsection}>
          <img src={imgurl} className={style.mainimg} alt="" />
          <div className={style.leftbottom}>
            {productdetail.altimg?.map((img, i) => {
              return (
                <img key={i} src={img} onClick={() => setImgurl(img)} alt="" />
              );
            })}
          </div>
        </div>
        <div className={style.rightsection}>
          <p>
            {productdetail.company} {productdetail.model}
          </p>
          <div className={style.review}>
            <img
              src={star}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            <img
              src={star}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            <img
              src={star}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            <img
              src={star}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            <img
              src={star}
              alt=""
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            <p>(50 Customer reviews)</p>
          </div>
          <p>{productdetail.title} </p>
          <p>Price - ₹ {productdetail.price}</p>

          <p>
            {productdetail.colour}| {productdetail.headphonetype}
          </p>
          <p>About this item</p>

          <ul>
            {productdetail.feature?.map((feature, i) => {
              return <li key={i}>{feature}</li>;
            })}
          </ul>
          <div className={style.stocks}>
            <p>Available -</p>
            <p>{productdetail.availability}</p>
          </div>
          <div className={style.brands}>
            <p>Brand -</p>
            <p>{productdetail.company}</p>
          </div>
          {login && (
            <>
              <button
                className={style.addcart_btn}
                onClick={() => handleadd_cart(productdetail._id)}
              >
                Add to cart
              </button>
              <button
                className={style.buynow_btn}
                onClick={() => handlebuy_now(productdetail._id)}
              >
                Buy Now
              </button>
            </>
          )}
          {!login && (
            <>
              <button
                className={style.addcart_btn}
                onClick={() => navigate("/login")}
              >
                Add to cart
              </button>
              <button
                className={style.buynow_btn}
                onClick={() => navigate("/login")}
              >
                Buy Now
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
      <Mobfooter login={login} setlogin={setLogin} />
    </>
  );
}

export default Productdetail;
