import React, { useState } from 'react';

function Games() {
  const initGame = {id: null, game_number: null, home_team_score: null, guest_team_score: null, match_team_id: null};
  const [game, setGame] = useState(initGame);

  async function addGame(game) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game)
    };
    const response = await fetch("/games", requestOptions);
    const json = await response.json();
    setGame(json);
  };

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setGame({...game, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleChange(e, addGame(game));
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="game_number">Game Number:</label>
        <input className="game_number" type="number" value={game.game_number} name="game_number" onChange={handleChange} /><br></br>
        <label htmlFor="home_team_score">Home Team Score:</label>
        <input className="home_team_score" type="number" value={game.home_team_score} name="home_team_score" onChange={handleChange} /><br></br>
        <label htmlFor="guest_team_score">Guest Team Score:</label>
        <input className="guest_team_score" type="number" value={game.guest_team_score} name="guest_team_score" onChange={handleChange} /><br></br>
        <label htmlFor="match_team_id">Match Team ID:</label>
        <input className="match_team_id" type="number" value={game.match_team_id} name="match_team_id" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Game</button>
      </form>
    </div>
  )
}

export default Games;