import React, { useState } from 'react';

function MatchTeams() {
  const initMatchTeam = {id: null, lanes: '', match_id: null, home_team_id: null, guest_team_id: null};
  const [matchTeam, setMatchTeam] = useState(initMatchTeam);

  async function addMatchTeam(matchTeam) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matchTeam)
    };
    const response = await fetch("/match_teams", requestOptions);
    const json = await response.json();
    setMatchTeam(json);
  };

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setMatchTeam({...matchTeam, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleChange(e, addMatchTeam(matchTeam));
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="lanes">Lanes:</label>
        <input className="lanes" type="text" value={matchTeam.lanes} name="lanes" onChange={handleChange} /><br></br>
        <label htmlFor="match_id">Match ID:</label>
        <input className="match_id" type="number" value={matchTeam.match_id} name="match_id" onChange={handleChange} /><br></br>
        <label htmlFor="home_team_id">Home Team ID:</label>
        <input className="home_team_id" type="number" value={matchTeam.home_team_id} name="home_team_id" onChange={handleChange} /><br></br>
        <label htmlFor="guest_team_id">Guest Team ID:</label>
        <input className="guest_team_id" type="number" value={matchTeam.guest_team_id} name="guest_team_id" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Match Team</button>
      </form>
    </div>
  )
}

export default MatchTeams;