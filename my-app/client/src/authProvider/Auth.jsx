import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (
  email,
  password,
  setIsLoggedIn,
  setEmail,
  setPassword,
  setConfirmPassword,
  setName,
  setPhoneNumber,
  setLoading
) => {
  try {
    setLoading(true);
    if (email && password) {
      const response = await axios.post(`${apiUrl}/user/login`, {
        password,
        email,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("phoneNumber", response.data.phoneNumber);
        setIsLoggedIn(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setPhoneNumber("");
      } else {
      }
    }
  } catch (error) {
    console.log("login failed");
    setLoading(false);
    alert("login failed");
  }
};
export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};
export const register = async (
  name,
  email,
  phoneNumber,
  password,
  confirmPassword,
  setIsSignUp,
  setEmail,
  setPassword,
  setConfirmPassword,
  setName,
  setPhoneNumber
) => {
  try {
    if (name && email && phoneNumber && password && confirmPassword) {
      const response = await axios.post(`${apiUrl}/user/registration`, {
        name,
        email,
        phoneNumber,
        password,
      });
      if (response.status === 200) {
        setIsSignUp(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setPhoneNumber("");
        alert("Registration successful");
      } else if (response.status === 204) {
        console.log(response);
        alert("user already exist");
      } else {
        console.error("Registration failed");
        alert("Registration failed");
      }
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
};
export const verifyUserLogin = async (setIsLoggedIn) => {
  try {
    if (localStorage.getItem("token") !== null) {
      const a = await axios.post(`${apiUrl}/user/verify`);
      if (a.data) {
        localStorage.getItem("token") && a.data && setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
