import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const Login = async (email, password) => {
  try {
    const reqUrl = `${backendUrl}auth/login`;
    const reqpayLoad = {
      email: email,
      password: password,
    };
    const response = await axios.post(reqUrl, reqpayLoad);
    localStorage.clear();
    localStorage.setItem("token", response.data.jwToken);
    localStorage.setItem("email", response.data.user);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const Signup = async (name, mobile, email, password) => {
  try {
    const reqUrl = `${backendUrl}auth/signup`;
    const reqpayLoad = {
      name: name,
      mobile: mobile,
      email: email,
      password: password,
    };
    const response = await axios.post(reqUrl, reqpayLoad);
    return response;
  } catch (error) {
    console.log(error);
  }
};
