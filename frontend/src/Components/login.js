import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import bg from "../img/bg.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const LoginContainer = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Login() {
  const history = useNavigate();

  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      signInWithEmailAndPassword(auth, Email, password)
        .then((userCredential) => {
          console.log(userCredential);
          localStorage.setItem("userId", userCredential.user.uid);
          // Handle successful login
          history("/home");
        })
        .catch((error) => {
          console.log(error);
          // Handle login error
          if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
          ) {
            setErrorMessage("Email atau password salah");
          } else {
            setErrorMessage("Terjadi kesalahan pada server");
          }
        });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  return (
    <LoginContainer>
      <div
        className="login"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={submit} style={{ width: "100%", maxWidth: "300px" }}>
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="Email" style={{ marginBottom: "0.5rem" }}>
              Email:
            </label>
            <input
              type="text"
              id="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            />
          </div>
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="password" style={{ marginBottom: "0.5rem" }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "0.5rem",
            }}
          >
            Login
          </button>
        </form>

        <br />
        <p>ATAU</p>
        <br />

        <Link to="/signup">Halaman Pendaftaran</Link>
      </div>
    </LoginContainer>
  );
}

export default Login;
