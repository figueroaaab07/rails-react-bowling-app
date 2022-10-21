import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { userState } from "../atoms/user";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import Locations from "./Locations";
import Tournaments from "./Tournaments";
import Matches from "./Matches";
import MatchTeams from "./MatchTeams"
import Teams from "./Teams";
import Bowlers from "./Bowlers";
import Games from "./Games";
import BowlerGames from "./BowlerGames";
import Frames from "./Frames";
import NoMatch from "./NoMatch";

function App() {
  const [user, setUser] = useRecoilState(userState);
  
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((json) => setUser(json));
      }
    });
  }, []);

  return (
  <>
    <h1 className="header">Bowling Tournament App</h1>    
    <NavBar />
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/match_teams" element={<MatchTeams />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/bowlers" element={<Bowlers />} />
          <Route path="/games" element={<Games />} />
          <Route path="/bowler_games" element={<BowlerGames />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/frames" element={<Frames />} />
          <Route path="*" element={<NoMatch />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </>
      )}
    </Routes>
  </>
  )
}

export default App;