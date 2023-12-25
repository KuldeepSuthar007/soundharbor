import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addtocart } from "../../apis/product";
import ListCard from "../../components/Listcard/Listcard";
import Header from "../../components/Header/Header";
import style from "./Productlisting.module.css";
import person from "../../assets/image_5-removebg-preview 1.png";
import Mobfooter from "../../components/Mobfooter/Mobfooter";
import gridicon from "../../assets/material-symbols_grid-view-rounded.png";
import listicon from "../../assets/material-symbols_view-list-rounded.png";
import GridCARD from "../../components/GridCard/GridCard";
import Footer from "../../components/Footer/Footer";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
function Productlisting() {
  const [login, setLogin] = useState(false);
  const [view, setView] = useState(true);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [colour, setColour] = useState("");
  const [headphonetype, setHeadphonetype] = useState("");
  const [price, setPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // const navigate = useNavigate();

  const checktoken = () => {
    let token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  const userId = localStorage.getItem("email");
  function handleadd_cart(id) {
    addtocart(userId, id);
  }

  function handlesort(value) {
    const [sortByValue, sortOrderValue] = value.split("-");
    setSortBy(sortByValue);
    setSortOrder(sortOrderValue);
  }
  const ClearFilters = () => {
    setSearch("");
    setCompany("");
    setColour("");
    setHeadphonetype("");
    setPrice("");
    setSortBy("");
    setSortOrder("");
  };

  useEffect(() => {
    checktoken();
    const fetchProduct = async () => {
      try {
        const reqUrl = `${backendUrl}product/getproduct`;

        const response = await axios.get(reqUrl, {
          params: {
            search: search,
            price: price,
            colour: colour,
            company: company,
            headphonetype: headphonetype,
            sortBy: sortBy,
            sortOrder: sortOrder,
          },
        });
        setProduct(response.data.products);
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [search, company, colour, headphonetype, sortBy, sortOrder, price]);

  return (
    <>
      <Header login={login} setlogin={setLogin} setSearch={setSearch} />
      <div className={style.advertisebox}>
        <div className={style.advertise}>
          <div>
            <p>
              Grab upto 50% off on <br /> Selected headphones
            </p>
            <div className={style.buy_btn}>
              <button>Buy Now</button>
            </div>
          </div>
          <img src={person} alt="" className={style.person} />
        </div>
      </div>

      <div className={style.filtercontainer}>
        <div className={style.viewoption}>
          <img
            src={gridicon}
            alt=""
            className={style.gridview}
            onClick={() => setView(true)}
          />
          <img
            src={listicon}
            alt=""
            className={style.listview}
            onClick={() => setView(false)}
          />
          <div className={style.filtbox}>
            <select
              name="Headphone type"
              className={style.decorated}
              onChange={(e) => setHeadphonetype(e.target.value)}
            >
              <option disabled selected hidden>
                Headphone type
              </option>
              <option value="In-ear">In-ear headphone</option>
              <option value="On-ear">On-ear headphone</option>
              <option value="Over-ear">Over-ear headphone</option>
            </select>

            <select
              name="Company"
              className={style.decorated}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option disabled selected hidden>
                Company
              </option>
              <option value="JBL">JBL</option>
              <option value="Sony">Sony</option>
              <option value="boat">boat</option>
              <option value="ZEBRONICS">ZEBRONICS</option>
              <option value="Marshall">Marshall</option>
              <option value="pTron">pTron</option>
              <option value="Noise">Noise</option>
              <option value="Redmi">Redmi</option>
              <option value="OnePlus">OnePlus</option>
              <option value="realme">realme</option>
              <option value="Apple">Apple</option>
              <option value="HyperX">HyperX</option>
              <option value="Boult">Boult</option>
              <option value="Oppo">Oppo</option>
              <option value="Samsung">Samsung</option>
              <option value="Mivi">Mivi</option>
              <option value="Amazon">Amazon</option>
            </select>

            <select
              name="Colour"
              className={style.decorated}
              onChange={(e) => setColour(e.target.value)}
            >
              <option disabled selected hidden>
                Colour
              </option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option>
              <option value="Red">Red</option>
              <option value="Silver">Silver</option>
              <option value="Green">Green</option>
              <option value="Grey">Grey</option>
            </select>

            <select
              name="Price"
              className={style.decorated}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option disabled selected hidden>
                Price
              </option>
              <option value="0-1000">₹0 - ₹1,000</option>
              <option value="1000-10000">₹1,000 - ₹10,000</option>
              <option value="10000-20000">₹10,000 - ₹20,000</option>
            </select>
          </div>
          <button onClick={ClearFilters}>Clear</button>
        </div>

        <select
          name="Sort by : Featured"
          className={style.decorated}
          onChange={(e) => handlesort(e.target.value)}
        >
          <option disabled selected hidden>
            Sort by : Featured
          </option>
          <option value="price-asc">Price:Lowest</option>
          <option value="price-desc">Price : Highest</option>
          <option value="company-asc">Name : (A-Z)</option>
          <option value="company-desc">Name : (Z-A)</option>
        </select>
      </div>
      <hr className={style.hr} />
      <div className={style.maincontainer}>
        {view ? (
          <GridCARD
            productitem={product}
            login={login}
            handleadd_cart={handleadd_cart}
          />
        ) : (
          <ListCard
            productitem={product}
            login={login}
            handleadd_cart={handleadd_cart}
          />
        )}
      </div>
      {/* <div className={style.footer}>
        <p>Musicart | All rights reserved</p>
      </div> */}
      <Footer />
      <Mobfooter login={login} setlogin={setLogin} />
    </>
  );
}

export default Productlisting;
