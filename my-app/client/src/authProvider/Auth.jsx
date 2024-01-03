import { useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (form, setIsLoggedIn, setForm, setLoading) => {
  try {
    setLoading(true);
    if (form.email && form.password) {
      const response = await axios.post(`${apiUrl}/user/login`, {
        password: form.password,
        email: form.email,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        setIsLoggedIn(true);
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
        });
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
export const register = async (form, setIsSignUp, setForm, setLoading) => {
  try {
    if (
      form.name &&
      form.email &&
      form.phoneNumber &&
      form.password &&
      form.confirmPassword
    ) {
      const response = await axios.post(`${apiUrl}/user/registration`, {
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
      });
      if (response.status === 200) {
        setIsSignUp(false);
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
        });
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

export const useVerifyUserLogin = (setIsLoggedIn) => {
  useEffect(() => {
    const verifyUserLogin = async () => {
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
    verifyUserLogin();
  }, [setIsLoggedIn]);
};
