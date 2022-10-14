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
      {/* </div>
      <div> */}
        {user.email ? (
          <>
            <NavLink className="navlink-title" style={style} to="/locations">Locations</NavLink>
            <NavLink className="navlink-title" style={style} to="/tournaments">Tournaments</NavLink>
            <NavLink className="navlink-title" style={style} to="/matches">Matches</NavLink>
            <NavLink className="navlink-title" style={style} to="/match_teams">Match Teams</NavLink>
            <NavLink className="navlink-title" style={style} to="/teams">Teams</NavLink>
            <NavLink className="navlink-title" style={style} to="/bowlers">Bowlers</NavLink>
            <NavLink className="navlink-title" style={style} to="/games">Games</NavLink>
            <NavLink className="navlink-title" style={style} to="/bowler_games">Bowler Games</NavLink>
            <NavLink className="navlink-title" style={style} to="/frames">Frames</NavLink>
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