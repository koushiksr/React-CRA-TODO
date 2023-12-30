import { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { login, register } from "../authProvider/Auth";
import Spinner from "../utils/spinner";

const AuthForm = ({ setIsLoggedIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      localStorage.getItem("token") || null
    }`;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (!email || !password || !confirmPassword || !name || !phoneNumber) {
        alert("All fields are required for signup");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Invalid email address");
        return;
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        alert(
          "Password must be at least 8 characters long with a mix of uppercase, lowercase, and numbers"
        );
        return;
      }
      if (password !== confirmPassword) {
        alert("Password and confirm password do not match");
        return;
      }
      if (!name.trim()) {
        alert("Name is required for signup");
        return;
      }
      if (!/^\d{10}$/.test(phoneNumber)) {
        alert("Invalid phone number");
        return;
      }
    }
    isSignUp
      ? await register(
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
        )
      : await login(
          email,
          password,
          setIsLoggedIn,
          setEmail,
          setPassword,
          setConfirmPassword,
          setName,
          setPhoneNumber,
          setLoading
        );
  };

  const handleToggleForm = (e) => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setPhoneNumber("");
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isSignUp ? "Sign Up" : "Login"}
            </h2>

            {isSignUp ? (
              <>
                <div className="mb-4">
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => {
                      const value = e.target.value;
                      setName(value);
                    }}
                    required
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      /^\d{10}$/.test(e.target.value);
                    }}
                    required
                    type="tel"
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
                    }}
                    required
                    type="email"
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
                        e.target.value
                      );
                    }}
                    required
                  />
                </div>
                <div className="mb-4  relative">
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    onBlur={() => {
                      const doPasswordsMatch = password === confirmPassword;
                      !doPasswordsMatch && alert("password do not match");
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="mb-4">
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
                    }}
                    required
                    type="email"
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
                        e.target.value
                      );
                    }}
                    required
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-between mt-4">
              <Button variant="contained" color="primary" type="submit">
                {isSignUp ? "Sign Up" : "Login"}
              </Button>
              <button
                className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                type="button"
                onClick={handleToggleForm}
              >
                {isSignUp
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default AuthForm;
