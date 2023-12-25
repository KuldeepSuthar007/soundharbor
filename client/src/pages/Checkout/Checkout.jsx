import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteCartItem } from "../../apis/product";
import Header from "../../components/Header/Header";
import Mobfooter from "../../components/Mobfooter/Mobfooter";
import style from "./Checkout.module.css";
import Arrow from "../../assets/Vector (10).png";
import Footer from "../../components/Footer/Footer";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Checkout() {
  const [product, setProduct] = useState([]);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const [selectedProductIds, setSelectedProductIds] = useState(() => {
    const storedIds = localStorage.getItem("selectedProductIds");
    return storedIds ? JSON.parse(storedIds) : [];
  });

  const calculateTotalAmount = () => {
    let total = 0;
    product.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  function handleplaceorder(id) {
    deleteCartItem(id);
    localStorage.removeItem("selectedProductIds");
    navigate("/Success");
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (selectedProductIds.length > 0) {
          const reqUrl = `${backendUrl}product/details`;
          const response = await axios.get(reqUrl, {
            params: {
              productIds: selectedProductIds,
            },
          });
          setProduct(response.data);
          let token = localStorage.getItem("token");
          if (token) {
            setLogin(true);
          } else {
            setLogin(false);
          }
          return response;
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [selectedProductIds]);

  return (
    <div>
      <Header login={login} setlogin={setLogin} />
      <div className={style.nav}>
        <div className={style.top}></div>
        <p className={style.h5}>Home/ Checkout</p>
      </div>

      <div className={style.back_btn}>
        <button onClick={() => navigate("/cart")}>Back to cart</button>
      </div>
      <div className={style.Arrback_btn}>
        <img src={Arrow} alt="" onClick={() => navigate("/cart")} />
      </div>
      <p className={style.checkout}>Checkout</p>
      <div className={style.midcontainer}>
        <div className={style.top_section}>
          <div className={style.address}>
            <p className={style.h2}>1. Delivery address</p>
            <p className={style.h6}>
              Akash Patel <br />
              104 <br /> kk hh nagar, Lucknow <br /> Uttar Pradesh 226025
            </p>
          </div>
          <hr />
          <div className={style.payment}>
            <p className={style.h2}>2. Payment method</p>
            <p className={style.h6}>Pay on delivery ( Cash/Card)</p>
          </div>
          <hr />
          <div className={style.itemdelivery}>
            <p className={style.h2}>3. Review items and delivery</p>
            {product?.map((item, i) => {
              return (
                <div key={i}>
                  <img
                    src={item.image}
                    alt=""
                    style={{ width: "150px", height: "150px" }}
                  />
                  <p className={style.pname}>
                    {" "}
                    {item.company} {item.model}
                  </p>
                  <p className={style.pcolor}>Clour :{item.colour}</p>
                  <p className={style.pstock}>{item.availability}</p>
                  <p className={style.pdelivery}>
                    Estimated delivery : <br /> Monday — FREE Standard Delivery
                  </p>
                </div>
              );
            })}
          </div>
          <hr />
          <div className={style.bottom_section}>
            <button
              className={style.sm_placeorder}
              onClick={() => handleplaceorder()}
            >
              Place your order
            </button>
            <div>
              <p className={style.ordertotal2}>
                Order Total : ₹{calculateTotalAmount() + 45.0}
              </p>
              <p className={style.term2}>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </div>
          </div>
        </div>
        <div className={style.right_section}>
          <button
            className={style.placeorder}
            onClick={() => handleplaceorder()}
          >
            Place your order
          </button>
          <p className={style.term}>
            By placing your order, you agree to Musicart privacy notice and
            conditions of use.
          </p>
          <hr />
          <p className={style.ordersum}>Order Summary</p>
          <div className={style.item}>
            <p>Items : </p>
            <p>₹{calculateTotalAmount()}</p>
          </div>
          <div className={style.delivery}>
            <p>Delivery :</p>
            <p> ₹45.00</p>
          </div>
          <hr />
          <div className={style.ordertotal}>
            <p>Order Total : </p>
            <p>₹{calculateTotalAmount() + 45.0}</p>
          </div>
        </div>
      </div>
      <Footer />
      <Mobfooter login={login} setlogin={setLogin} />
    </div>
  );
}

export default Checkout;
