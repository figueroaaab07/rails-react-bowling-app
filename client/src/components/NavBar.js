import React from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from "../atoms/user";

function NavBar() {
  const [user] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  let style = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
  });

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        resetUser();
      }
    });
  }

  return (
    <header>
      <div>
       <NavLink className="navlink-title" style={style} to="/">Home</NavLink>
       <NavLink className="navlink-title" style={style} to="/about">About</NavLink>
        {user.email ? (
          <>
            {user.role === 'admin' ? (
              <NavLink className="navlink-title" style={style} to="/locations">Match Administration</NavLink>
            ) : (
              <NavLink className="navlink-title" style={style} to="/locations" onClick={event => event.preventDefault()}>Match Administration</NavLink>
            )}
            {user.role === 'captain' || 'admin' ? (
              <NavLink className="navlink-title" style={style} to="/teams">Team Administration</NavLink>
            ) : (
              <NavLink className="navlink-title" style={style} to="/teams" onClick={event => event.preventDefault()}>Team Administration</NavLink>
            )}
            {user.role === 'player' || 'captain' || 'admin' ? (
              <NavLink className="navlink-title" style={style} to="/games">Enjoy Games</NavLink>
            ) : (
              <NavLink className="navlink-title" style={style} to="/games" onClick={event => event.preventDefault()}>Enjoy Games</NavLink>
            )}
            <button onClick={handleLogoutClick}>Logout</button>
          </>
        ) : (
          <>
            <NavLink className="navlink-title" style={style} to="/signup">Sign Up</NavLink>
            <NavLink className="navlink-title" style={style} to="/Login">Login</NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;