import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import bg from "../img/bg.png";

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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/v1/Login", {
        username,
        password,
      });

      if (response.data.message === "Login berhasil") {
        history("/home", { state: { id: username } });
      } else {
        setErrorMessage("Username atau password salah");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Username atau password salah");
      } else {
        setErrorMessage("Terjadi kesalahan pada server");
      }
      console.error(error);
    }
  }

  return (
    <LoginContainer>
      <div className="login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      
        <form onSubmit={submit} style={{ width: '100%', maxWidth: '300px' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="username" style={{ marginBottom: '0.5rem' }}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="password" style={{ marginBottom: '0.5rem' }}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}>Login</button>
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
