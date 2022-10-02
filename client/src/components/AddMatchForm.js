import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { tournamentState } from "../atoms/tournament";

function AddMatchForm({ addMatch }) {
  const tournament = useRecoilValue(tournamentState);
  const initMatch = {id: null, date: '', number_players: '', number_games: '', tournament_id: tournament.id};
  const [match, setMatch] = useState(initMatch);

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setMatch({...match, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!match.date) return
    handleChange(e, addMatch(match));
    setMatch(initMatch);
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="date">Date:</label>
        <input className="date" type="text" value={match.date} name="date" onChange={handleChange} /><br></br>
        <label htmlFor="number_players">Start Date:</label>
        <input className="number_players" type="text" value={match.number_players} name="number_players" onChange={handleChange} /><br></br>
        <label htmlFor="number_games">End Date:</label>
        <input className="number_games" type="text" value={match.number_games} name="number_games" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Match</button>
      </form>
    </div>
  )
}

export default AddMatchForm;