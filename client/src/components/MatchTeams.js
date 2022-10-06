import React, { useState, useEffect } from 'react';
import AddMatchTeamForm from "./AddMatchTeamForm";
import EditMatchTeamForm from "./EditMatchTeamForm";
import MatchTeamsTable from "./MatchTeamsTable";
import { useRecoilValue } from 'recoil';
import { tournamentState } from "../atoms/tournament";
import { locationState } from "../atoms/location";
import { matchState } from "../atoms/match";

function MatchTeams() {
  const [matchTeams, setMatchTeams] = useState([]);
  const [teams, setTeams] = useState([]);
  const tournament = useRecoilValue(tournamentState);
  const location = useRecoilValue(locationState);
  const match = useRecoilValue(matchState);
  const initMatchTeam = {id: null, lanes: '', home_team_id: '', guest_team_id: '', match_id: match.id};
  const [currentMatchTeam, setCurrentMatchTeam] = useState(initMatchTeam);
  const [editing, setEditing] = useState(false);
  const lanes = []

  async function getTeams() {
    const response = await fetch("/teams");
    const json = await response.json();
    setTeams(() => json);
  };
  
  useEffect(() => {
    getTeams();
  }, []);

  async function getMatchTeams() {
    const response = await fetch("/match_teams");
    const json = await response.json();
    setMatchTeams(json.filter((match_team) => match_team.match.id === match.id));
    console.log(json.filter((match_team) => match_team.match.id === match.id));
  };
  
  useEffect(() => {
    getMatchTeams();
  }, []);

  async function addMatchTeam(match_team) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(match_team)
    };
    const response = await fetch("/match_teams", requestOptions);
    const json = await response.json();
    setMatchTeams(match_team => match_team.concat(json));
  };

  async function deleteMatchTeam(id) {
    const response = await fetch(`/match_team/${id}`, { method: 'DELETE' });
    // const json = await response.json();
	  setEditing(false)
    setMatchTeams(matchTeams => matchTeams.filter((matchTeam) => matchTeam.id !== id));
  };

  async function updateMatchTeam(id, updatedMatchTeam) {
    console.log(id, updatedMatchTeam);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMatchTeam)
    };
    const response = await fetch(`/match_teams/${id}`, requestOptions);
    const json = await response.json();
	  setEditing(false)
		setMatchTeams(matchTeams.map(matchTeam => (matchTeam.id === id ? updatedMatchTeam : matchTeam)))
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
		<div className="container">
			<div className="row">
				<div className="add-user">
          <h2>Bowling Center: {location.name} - Torneo: {tournament.name} - Match Date: {match.date} </h2>
          {/* <>
							<h2>Add Match Teams</h2>
							<AddMatchTeamForm addMatchTeam={addMatchTeam} teams={teams} lanes={lanes} />
						</> */}
					{editing ? (
						<>
							<h2>Edit Match Teams</h2>
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
							<h2>Add Match Teams</h2>
							<AddMatchTeamForm addMatchTeam={addMatchTeam} teams={teams} lanes={lanes}/>
						</>
					)}
				</div>
				<div className="view-user">
					<h2>View Matches</h2>
					<MatchTeamsTable matchTeams={matchTeams} editRow={editRow} deleteMatchTeam={deleteMatchTeam} teams={teams} />
				</div>
			</div>
		</div>
  );
}
export default MatchTeams;