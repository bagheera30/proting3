import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="login">
      <h1>Daftar</h1>

      <form onSubmit={submit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nama Pengguna"
          required
        />
        <button type="submit">Daftar</button>
      </form>

      <br />
      <p>ATAU</p>
      <br />

      <Link to="/">Halaman Login</Link>
    </div>
  );
}

export default Login;
