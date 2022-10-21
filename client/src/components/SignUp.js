import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { userState } from "../atoms/user";

function SignUp() {
  const setUserState = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("player");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((json) => setUserState(json));
      } else {
        r.json().then((json) => setErrors(json.errors));
      }
      navigate("/");
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="role">Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="player">Bowler</option>
          <option value="captain">Captain</option>
          <option value="admin">Administrator</option>
        </select><br></br>

        <button type="submit">Sign Up</button>
      </form>
      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SignUp;