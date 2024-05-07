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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/register",
        {
          email,
          password,
          username,
        }
      );

      if (response.data.message === "Email sudah terdaftar") {
        alert("Email sudah terdaftar");
      } else if (response.data.message === "Pendaftaran berhasil") {
        history("/", { state: { id: email } });
      }
    } catch (error) {
      alert("Terjadi kesalahan, silakan coba lagi");
      console.error(error);
    }
  }
  
  return (
    <LoginContainer>
    
      <div className="login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Daftar</h1>
  
        <form onSubmit={submit} style={{ width: '100%', maxWidth: '300px' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="email" style={{ marginBottom: '0.5rem' }}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
          <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="username" style={{ marginBottom: '0.5rem' }}>Nama Pengguna:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nama Pengguna"
              required
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem' }}>Daftar</button>
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