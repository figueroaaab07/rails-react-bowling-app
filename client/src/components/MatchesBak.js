import React, { useState, useEffect } from 'react';
import AddMatchForm from "./AddMatchForm";
import EditMatchForm from "./EditMatchForm";
import MatchesTable from "./MatchesTable";
import { useRecoilValue } from 'recoil';
import { tournamentState } from "../atoms/tournament";
import { locationState } from "../atoms/location";

function Matches() {
  const [matches, setMatches] = useState([]);
  const tournament = useRecoilValue(tournamentState);
  const location = useRecoilValue(locationState);
  const initMatch = {id: null, date: '', number_players: '', number_games: '', tournament_id: tournament.id};
  const [currentMatch, setCurrentMatch] = useState(initMatch);
  const [editing, setEditing] = useState(false);

  async function getMatches() {
    const response = await fetch("/matches");
    const json = await response.json();
    console.log(json, tournament.id);
    console.log(json.filter(d => d.tournament.id === tournament.id));
    setMatches(json.filter((match) => match.tournament.id === tournament.id));
  };
  
  useEffect(() => {
    getMatches();
  }, []);

  async function addMatch(match) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(match)
    };
    const response = await fetch("/matches", requestOptions);
    const json = await response.json();
    setMatches(matches => matches.concat(json));
  };

  async function deleteMatch(id) {
    const response = await fetch(`/matches/${id}`, { method: 'DELETE' });
    // const json = await response.json();
	  setEditing(false)
    setMatches(matches => matches.filter((match) => match.id !== id));
  };

  async function updateMatch(id, updatedMatch) {
    console.log(id, updatedMatch);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMatch)
    };
    const response = await fetch(`/matches/${id}`, requestOptions);
    const json = await response.json();
	  setEditing(false)
		setMatches(matches.map(match => (match.id === id ? updatedMatch : match)))
	}

	function editRow(match) {
		setEditing(true)
		setCurrentMatch({ id: match.id, date: match.date, number_players: match.number_players, number_games: match.number_games, tournament_id: tournament.id})
  }

  return (
		<div className="container">
			<div className="row">
				<div className="add-user">
          <h2>Bowling Center: {location.name} - Torneo: {tournament.name}</h2>
					{editing ? (
						<>
							<h2>Edit Match</h2>
							<EditMatchForm
								editing={editing}
								setEditing={setEditing}
								currentMatch={currentMatch}
								updateMatch={updateMatch}
							/>
						</>
					) : (
						<>
							<h2>Add Match</h2>
							<AddMatchForm addMatch={addMatch} />
						</>
					)}
				</div>
				<div className="view-user">
					<h2>View Matches</h2>
					<MatchesTable matches={matches} editRow={editRow} deleteMatch={deleteMatch} />
				</div>
			</div>
		</div>
  );
}
export default Matches;