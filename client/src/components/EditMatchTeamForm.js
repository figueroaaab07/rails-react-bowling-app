import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function EditMatchTeamForm({ editing, setEditing, currentMatchTeam, updateMatchTeam, teams, lanes }) {
  const [matchTeam, setMatchTeam] = useState(currentMatchTeam);
  const navigate = useNavigate();

  console.log(currentMatchTeam);

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setMatchTeam({...matchTeam, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditing(false);
    handleChange(e, updateMatchTeam(matchTeam.id, matchTeam));
  }

  return (
    <div className="form">
      <form>
      <label htmlFor="lanes">Lanes:</label>
        <select name="lanes" onChange={handleChange} value={matchTeam.lanes}>
          <option key={"choose"} value="choose" disabled> -- Select lanes -- </option>
          {lanes.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <label htmlFor="home_team_id">Home Team:</label>
        <select className="home_team_id" name="home_team_id" defaultValue={matchTeam.home_team_id} onChange={handleChange} value={matchTeam.home_team_id}>
          <option key={"choose"} value="choose" disabled> -- Select Home Team -- </option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
        <label htmlFor="guest_team_id">Guest Team:</label>
        <select className="guest_team_id" name="guest_team_id" defaultValue={matchTeam.guest_team_id} onChange={handleChange} value={matchTeam.guest_team_id}>
          <option key={"choose"} value="choose" disabled> -- Select Guest Team -- </option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Edit Match Team</button>
        <button className="button-secondary" type="submit" onClick={() => navigate("/match_teams")} >Cancel</button>
      </form>
    </div>
  )
}

export default EditMatchTeamForm;
