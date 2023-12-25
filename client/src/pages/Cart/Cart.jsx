import React, { useState, useEffect } from "react";
import axios from "axios";
import { updateCartItemQuantity } from "../../apis/product";
import { deleteCartItem } from "../../apis/product";
import { useNavigate } from "react-router-dom";
import style from "./Cart.module.css";
import Mobfooter from "../../components/Mobfooter/Mobfooter";
import cartlogo from "../../assets/Vector.png";
import cart2 from "../../assets/empty-cart.png";
import Arrow from "../../assets/Vector (10).png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Cart() {
  const [product, setProduct] = useState([]);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const [selectedProductIds, setSelectedProductIds] = useState(() => {
    const storedIds = localStorage.getItem("selectedProductIds");
    return storedIds ? JSON.parse(storedIds) : [];
  });

  const fetchdetail = async () => {
    let email = localStorage.getItem("email");
    try {
      const reqUrl = `${backendUrl}product/get-cart`;
      const response = await axios.get(reqUrl, {
        params: {
          userId: email,
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
    } catch (error) {
      console.log(error);
    }
  };

  function handleplaceorder(productId) {
    setSelectedProductIds((prevSelectedIds) => [...prevSelectedIds, productId]);
    setTimeout(() => {
      navigate("/checkout");
    }, 1000);
  }

  const calculateTotalAmount = () => {
    let total = 0;
    product.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };
  const userId = localStorage.getItem("email");

  function updatequantity(productId, newQuantity) {
    updateCartItemQuantity(userId, productId, newQuantity);
    const updatedCartData = product.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setProduct(updatedCartData);
  }

  const handledelete = async (id) => {
    try {
      await deleteCartItem(id);
      fetchdetail();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdetail();
    const flatSelectedProductIds = selectedProductIds.flat();
    localStorage.setItem(
      "selectedProductIds",
      JSON.stringify(flatSelectedProductIds)
    );
  }, [selectedProductIds, setProduct]);
  return (
    <>
      <Header login={login} setlogin={setLogin} />
      <div className={style.nav}>
        <div className={style.top}>
          <p className={style.h5}>Home/ Cart</p>
        </div>
      </div>
      <div className={style.back_btn}>
        <button onClick={() => navigate("/")}>Back to products</button>
      </div>
      <div className={style.Arrback_btn}>
        <img src={Arrow} alt="" onClick={() => navigate("/detail")} />
      </div>
      <div className={style.heading}>
        <img src={cartlogo} alt="" style={{ width: "38px", height: "38px" }} />
        <p>My Cart</p>
      </div>
      {product.length > 0 ? (
        <>
          <div className={style.midcontainer}>
            <div className={style.leftsection}>
              <hr />
              {product?.map((item, i) => {
                return (
                  <div key={i} className={style.leftsection_top}>
                    <img src={item.product.image} alt="" />
                    <div className={style.left_top_right}>
                      <div className={style.title_color_stock}>
                        <p>
                          {item.product.company} {item.product.model}
                        </p>
                        <p>Clour : {item.product.colour}</p>
                        <p>{item.product.availability}</p>
                      </div>
                      <div className={style.price}>
                        <p>Price</p>
                        <p>₹{item.product.price}</p>
                      </div>
                      <div className={style.quantity}>
                        <p>Quantity</p>
                        <select
                          name="Quantity"
                          onChange={(e) =>
                            updatequantity(item.productId, e.target.value)
                          }
                        >
                          <option disabled selected hidden>
                            1
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>
                      <div className={style.total}>
                        <p>Total</p>
                        <p>₹{item.product.price * item.quantity}</p>
                      </div>
                      <div className={style.removebtn}>
                        <button onClick={() => handledelete(item.productId)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <hr />
              <div className={style.leftsection_bottom}>
                <p>{product.length} Item</p>
                <p>₹{calculateTotalAmount()}</p>
              </div>
            </div>
            <hr style={{ margin: "0px 30px" }} />
            <div className={style.rightsection}>
              <div className={style.rigth_top}>
                <p className={style.pricedetail}>PRICE DETAILS</p>
                <div>
                  <p>Total MRP</p>
                  <p>₹{calculateTotalAmount()}</p>
                </div>
                <div>
                  <p>Discount on MRP</p>
                  <p>₹0</p>
                </div>
                <div>
                  <p>Convenience Fee</p>
                  <p>₹45</p>
                </div>
              </div>
              <div className={style.right_bottom}>
                <p>Total Amount</p>
                <p>₹{calculateTotalAmount() + 45.0}</p>
              </div>
            </div>
          </div>
          <div className={style.placeorder}>
            {login && (
              <button
                onClick={() => {
                  handleplaceorder(
                    product.map((item) => {
                      return item.product._id;
                    })
                  );
                }}
              >
                PLACE ORDER
              </button>
            )}
            {!login && (
              <button onClick={() => navigate("/login")}>PLACE ORDER</button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={style.cart2}>
            <img src={cart2} alt="" />
          </div>

          <h1 className={style.h3}>Your Cart is Empty</h1>
        </>
      )}

      <Footer />
      <Mobfooter login={login} setlogin={setLogin} />
    </>
  );
}

export default Cart;
