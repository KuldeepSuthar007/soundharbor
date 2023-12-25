import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Successful from "./pages/Successful/Successful";
import Checkout from "./pages/Checkout/Checkout";
import Cart from "./pages/Cart/Cart";
import Productdetail from "./pages/Productdetail/Productdetail";
import Productlisting from "./pages/Productlisting/Productlisting";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Productlisting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/detail" element={<Productdetail />} />
        <Route path="/Success" element={<Successful />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
