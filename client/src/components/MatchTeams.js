import React, { useState, useEffect } from 'react';
import AddMatchTeamForm from "./forms/AddMatchTeamForm";
import EditMatchTeamForm from "./forms/EditMatchTeamForm";
import MatchTeamsTable from "./tables/MatchTeamsTable";
import { useRecoilValue } from 'recoil';
import { tournamentState } from "../atoms/tournament";
import { locationState } from "../atoms/location";
import { matchState } from "../atoms/match";
import '../newIndex.css'
import ErrorHand from "./ErrorHand";

function MatchTeams() {
  const [matchTeams, setMatchTeams] = useState([]);
  const [teams, setTeams] = useState([]);
  const tournament = useRecoilValue(tournamentState);
  const location = useRecoilValue(locationState);
  const match = useRecoilValue(matchState);
  const initMatchTeam = {id: null, lanes: '', home_team_id: '', guest_team_id: '', match_id: match.id};
  const [currentMatchTeam, setCurrentMatchTeam] = useState(initMatchTeam);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState([]);
  const lanes = []

  async function getTeams() {
    const response = await fetch("/teams");
    const json = await response.json();
    if (response.ok) {
      setTeams(() => json);
    } else {
      setErrors(json.errors);
    }
  };
  useEffect(() => {
    getTeams();
  }, []);

  async function getMatchTeams() {
    const response = await fetch("/match_teams");
    const json = await response.json();
    if (response.ok) {
      setMatchTeams(json.filter((match_team) => match_team.match.id === match.id));
    } else {
      setErrors(json.errors);
    }
  };
  useEffect(() => {
    getMatchTeams();
  }, []);

  async function addGames(matchTeamId) {
    const game = {id: null, match_team_id: matchTeamId, game_number: null, home_team_score: null, guest_team_score: null}
    for(let i=0; i < match.number_games; i++){ 
      game.game_number = i + 1;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
      };
      const response = await fetch("/games", requestOptions);
      const json = await response.json();
      if (response.ok) {
        console.log(`Game Created: ${json}`);
      } else {
        setErrors(json.errors);
      }
    }
  }

  async function addMatchTeam(match_team) {
    const checkMatchTeam = matchTeams.filter(matchTeam => ((matchTeam.home_team.id === Number(match_team.home_team_id)) || (matchTeam.home_team.id === Number(match_team.guest_team_id)) || (matchTeam.guest_team.id === Number(match_team.home_team_id)) || (matchTeam.guest_team.id === Number(match_team.guest_team_id)) || (matchTeam.lanes === match_team.lanes)))
    if (checkMatchTeam.length === 0) {
      const requestOptions = {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(match_team)
      };
      const response = await fetch("/match_teams", requestOptions);
      const json = await response.json();
      if (response.ok) {
        setMatchTeams(match_team => match_team.concat(json));
        addGames(json.id);
      } else {
        setErrors(json.errors);
      }
    };
  }  

  async function deleteMatchTeam(id) {
    const response = await fetch(`/match_teams/${id}`, { method: 'DELETE' });
    const json = await response.json();
    if (response.ok) {
      setEditing(false)
      setMatchTeams(matchTeams => matchTeams.filter((matchTeam) => matchTeam.id !== id));
    } else {
      setErrors(json.errors);
    }
  };

  async function updateMatchTeam(id, updatedMatchTeam) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMatchTeam)
    };
    const response = await fetch(`/match_teams/${id}`, requestOptions);
    const json = await response.json();
    if (response.ok) {
      setEditing(false)
      setMatchTeams(matchTeams.map(matchTeam => (matchTeam.id === id ? json : matchTeam)))
    } else {
      setErrors(json.errors);
    }
	}

	function editRow(matchTeam) {
		setEditing(true)
		setCurrentMatchTeam({ id: matchTeam.id, lanes: matchTeam.lanes, home_team_id: matchTeam.home_team.id, guest_team_id: matchTeam.guest_team.id, match_id: match.id })
  }

  function fillLanes() {
    for(let i=0; i < location.number_lanes/2; i++){
      lanes.push(`${2*i+1}-${2*i+2}`)
    }    
  }
  fillLanes();

  return (
		<div className="some-page-wrapper">
      <h3>Bowling Center: {location.name} - Torneo: {tournament.name} - Match Date: {match.date} </h3>
			<div className="row">
				<div className="column">
					  {editing ? (
						<>
							<h3>Edit Match Teams</h3>
							<EditMatchTeamForm
								editing={editing}
								setEditing={setEditing}
								currentMatchTeam={currentMatchTeam}
								updateMatchTeam={updateMatchTeam}
                teams={teams}
                lanes={lanes}
							/>
						</>
					) : (
						<>
							<h3>Add Match Teams</h3>
							<AddMatchTeamForm addMatchTeam={addMatchTeam} teams={teams} lanes={lanes}/>
						</>
					)}
				</div>
				<div className="double-column">
          <div className="container">
            {errors.length > 0 && (<ErrorHand errors={errors} setErrors={setErrors} />)}
					  <h3>View Match Teams</h3>
					  <MatchTeamsTable matchTeams={matchTeams} editRow={editRow} deleteMatchTeam={deleteMatchTeam} teams={teams} />
          </div>
				</div>
			</div>
		</div>
  );
}
export default MatchTeams;