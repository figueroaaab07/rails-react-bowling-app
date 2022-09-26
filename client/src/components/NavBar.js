import React from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from "../atoms/user";

let style = ({ isActive }) => ({
  margin: "0.5rem 0.5rem",
  fontWeight: isActive ? 'bold' : 'normal',
});

function NavBar() {
  const [user] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
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
       <NavLink to="/">Home</NavLink>
       <NavLink to="/about">About</NavLink>
      </div>
      <div>
        {user.email ? (
          <>
            <button onClick={handleLogoutClick}>Logout</button>
            <NavLink to="/locations">Locations</NavLink>
            <NavLink to="/tournaments">Tournaments</NavLink>
            <NavLink to="/matches">Matches</NavLink>
            <NavLink to="/match_teams">Match Teams</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/bowlers">Bowlers</NavLink>
            <NavLink to="/games">Games</NavLink>
            <NavLink to="/bowler_games">Bowler Games</NavLink>
            <NavLink to="/frames">Frames</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/Login">Login</NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;