import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { userState } from "../atoms/user";

function Login() {
  const setUserState = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((json) => setUserState(json));
      }
    });
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;