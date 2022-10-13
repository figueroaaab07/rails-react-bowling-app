import React from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from "../atoms/user";

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
       <NavLink className="navlink-title" to="/">Home</NavLink>
       <NavLink className="navlink-title" to="/about">About</NavLink>
      </div>
      <div>
        {user.email ? (
          <>
            <button onClick={handleLogoutClick}>Logout</button>
            <NavLink className="navlink-title" to="/locations">Locations</NavLink>
            <NavLink className="navlink-title" to="/tournaments">Tournaments</NavLink>
            <NavLink className="navlink-title" to="/matches">Matches</NavLink>
            <NavLink className="navlink-title" to="/match_teams">Match Teams</NavLink>
            <NavLink className="navlink-title" to="/teams">Teams</NavLink>
            <NavLink className="navlink-title" to="/bowlers">Bowlers</NavLink>
            <NavLink className="navlink-title" to="/games">Games</NavLink>
            <NavLink className="navlink-title" to="/bowler_games">Bowler Games</NavLink>
            <NavLink className="navlink-title" to="/frames">Frames</NavLink>
          </>
        ) : (
          <>
            <NavLink className="navlink-title" to="/signup">Sign Up</NavLink>
            <NavLink className="navlink-title" to="/Login">Login</NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;