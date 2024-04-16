import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [username, setusername] = useState("");
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
        setErrorMessage("username atau password salah");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("username atau password salah");
      } else {
        setErrorMessage("Terjadi kesalahan pada server");
      }
      console.error(error);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={submit}>
        <input
          type="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>

      <br />
      <p>ATAU</p>
      <br />

      <Link to="/signup">Halaman Pendaftaran</Link>
    </div>
  );
}

export default Login;
