import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { locationState } from "../atoms/location";
import { matchState } from "../atoms/match";

function AddMatchTeamForm({ addMatchTeam, teams, lanes }) {
  const location = useRecoilValue(locationState);
  const match = useRecoilValue(matchState);
  const initMatchTeam = {id: null, lanes: '', home_team_id: '', guest_team_id: '', match_id: match.id};
  const [matchTeam, setMatchTeam] = useState(initMatchTeam);

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    console.log(name, value);
    setMatchTeam({...matchTeam, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleChange(e, addMatchTeam(matchTeam));
    setMatchTeam(initMatchTeam);
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="lanes">Lanes:</label>
        <select name="lanes" defaultValue={"choose"} onChange={handleChange} value={matchTeam.lanes}>
          <option key={"choose"} value="choose"> -- Select lanes -- </option>
          {lanes.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <label htmlFor="home_team_id">Home Team:</label>
        <select className="home_team_id" name="home_team_id" defaultValue={"choose"} onChange={handleChange} value={matchTeam.home_team_id}>
          <option key={"choose"} value="choose"> -- Select Home Team -- </option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
        <label htmlFor="guest_team_id">Guest Team:</label>
        <select className="guest_team_id" name="guest_team_id" defaultValue={"choose"} onChange={handleChange} value={matchTeam.guest_team_id}>
          <option key={"choose"} value="choose"> -- Select Guest Team -- </option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Match Team</button>
      </form>
    </div>
  )
}

export default AddMatchTeamForm;
