import React, { useState } from 'react';

function BowlerGames() {
  const initBowlerGame = {id: null, bowler_id: null, game_id: null, game_score: null};
  const [bowlerGame, setBowlerGame] = useState(initBowlerGame);

  async function addBowlerGame(bowlerGame) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bowlerGame)
    };
    const response = await fetch("/games", requestOptions);
    const json = await response.json();
    setBowlerGame(json);
  };

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setBowlerGame({...bowlerGame, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleChange(e, addBowlerGame(bowlerGame));
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="bowler_id">Bowler ID:</label>
        <input className="bowler_id" type="number" value={bowlerGame.bowler_id} name="bowler_id" onChange={handleChange} /><br></br>
        <label htmlFor="game_id">Game ID:</label>
        <input className="game_id" type="number" value={bowlerGame.game_id} name="game_id" onChange={handleChange} /><br></br>
        <label htmlFor="game_score">Game Score:</label>
        <input className="game_score" type="number" value={bowlerGame.game_score} name="game_score" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Bowler Game</button>
      </form>
    </div>
  )
}

export default BowlerGames;