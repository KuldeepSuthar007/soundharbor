import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

// add to cart api

export const addtocart = async (userId, productId, quantity) => {
  try {
    const reqUrl = `${backendUrl}product/add-to-cart`;
    const reqpayLoad = {
      userId: userId,
      productId: productId,
      quantity: quantity,
    };
    const response = await axios.post(reqUrl, reqpayLoad);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//update quantity api

export const updateCartItemQuantity = async (
  userId,
  productId,
  newQuantity
) => {
  try {
    console.log(userId, productId, newQuantity);
    const reqUrl = `${backendUrl}product/cart/update-quantity`;
    const reqpayLoad = {
      userId: userId,
      productId: productId,
      quantity: newQuantity,
    };
    const response = await axios.put(reqUrl, reqpayLoad);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//delete cart item

export const deleteCartItem = async (cartItemId) => {
  try {
    const reqUrl = `${backendUrl}product/${cartItemId}`;
    const response = await axios.delete(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};
