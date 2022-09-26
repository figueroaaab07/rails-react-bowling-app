import React, { useState } from 'react';

function Matches() {
  const initMatch = {id: null, name: '', number_players: null, number_games: null, tournament_id: null};
  const [match, setMatch] = useState(initMatch);

  async function addMatch(match) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(match)
    };
    const response = await fetch("/matches", requestOptions);
    const json = await response.json();
    setMatch(json);
  };

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setMatch({...match, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleChange(e, addMatch(match));
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="date">Date:</label>
        <input className="date" type="text" value={match.date} name="date" onChange={handleChange} /><br></br>
        <label htmlFor="number_players">Number of Players:</label>
        <input className="number_players" type="number" value={match.number_players} name="number_players" onChange={handleChange} /><br></br>
        <label htmlFor="number_games">Number of Games:</label>
        <input className="number_games" type="number" value={match.number_games} name="number_games" onChange={handleChange} /><br></br>
        <label htmlFor="tournament_id">Tournament ID:</label>
        <input className="tournament_id" type="number" value={match.tournament_id} name="tournament_id" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Match</button>
      </form>
    </div>
  )
}

export default Matches;