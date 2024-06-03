import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import bg from "../img/bg.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the UID of the newly created user
      const uid = userCredential.user.uid;

      // Add user data to Firestore collection
      const userData = {
        email: userCredential.user.email,
        name: username,
        uid: uid,
        phone: phone,
      };

      const docRef = await setDoc(
        doc(db, "users", userCredential.user.uid),
        userData
      );

      // Handle successful signup and navigate to home page
      history("/", { state: { id: userData.name } });
    } catch (error) {
      console.error(error);
      // Handle signup error
      if (error.code === "auth/email-already-in-use") {
        alert("Email sudah terdaftar");
      } else {
        alert("Terjadi kesalahan pada server");
      }
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
        <h1>Daftar</h1>

        <form onSubmit={submit} style={{ width: "100%", maxWidth: "300px" }}>
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="email" style={{ marginBottom: "0.5rem" }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
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
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="username" style={{ marginBottom: "0.5rem" }}>
              Nama Pengguna:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nama Pengguna"
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
            <label htmlFor="phone" style={{ marginBottom: "0.5rem" }}>
              Nama Pengguna:
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="No. HP"
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
            Daftar
          </button>
        </form>

        <br />
        <p>ATAU</p>
        <br />

        <Link to="/">Halaman Login</Link>
      </div>
    </LoginContainer>
  );
}

export default Login;
