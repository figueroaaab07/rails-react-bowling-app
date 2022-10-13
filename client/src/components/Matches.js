import React, { useState, useEffect } from 'react';
import AddMatchForm from "./forms/AddMatchForm";
import EditMatchForm from "./forms/EditMatchForm";
import MatchesTable from "./tables/MatchesTable";
import { format, parseISO } from 'date-fns'
import { useRecoilValue } from 'recoil';
import { tournamentState } from "../atoms/tournament";
import { locationState } from "../atoms/location";
import '../newIndex.css'

function Matches() {
  const [matches, setMatches] = useState([]);
  const tournament = useRecoilValue(tournamentState);
  const location = useRecoilValue(locationState);
  const initMatch = {id: null, date: format(new Date(), 'yyyy-MM-dd'), number_players: '', number_games: '', tournament_id: tournament.id};
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

  function formattedDate(match) {
    console.log(match.date);
    return {...match, ["date"]: (format(match.date, 'yyyy-MM-dd'))};
  }

  async function addMatch(match) {
    const addFormatMatch = formattedDate(match);
    console.log(addFormatMatch);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addFormatMatch)
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
    const updFormatMatch = formattedDate(updatedMatch);
    console.log(id, updFormatMatch);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updFormatMatch)
    };
    const response = await fetch(`/matches/${id}`, requestOptions);
    const json = await response.json();
	  setEditing(false)
		setMatches(matches.map(match => (match.id === id ? updFormatMatch : match)))
	}

	function editRow(match) {
		setEditing(true)
		setCurrentMatch({ id: match.id, date: match.date, number_players: match.number_players, number_games: match.number_games, tournament_id: tournament.id})
  }

  return (
		<div className="some-page-wrapper">
      <h3>Bowling Center: {location.name} - Torneo: {tournament.name}</h3>
			<div className="row">
				<div className="column">
					{editing ? (
						<>
							<h3>Edit Match</h3>
							<EditMatchForm
								editing={editing}
								setEditing={setEditing}
								currentMatch={currentMatch}
								updateMatch={updateMatch}
							/>
						</>
					) : (
						<>
							<h3>Add Match</h3>
							<AddMatchForm addMatch={addMatch} />
						</>
					)}
				</div>
				<div className="double-column">
          <div className="container">
					  <h3>View Matches</h3>
					  <MatchesTable matches={matches} editRow={editRow} deleteMatch={deleteMatch} />
          </div>
				</div>
			</div>
		</div>
  );
}
export default Matches;