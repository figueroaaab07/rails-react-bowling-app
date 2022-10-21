import React, { useState, useEffect } from 'react';
import AddMatchForm from "./forms/AddMatchForm";
import EditMatchForm from "./forms/EditMatchForm";
import MatchesTable from "./tables/MatchesTable";
import { format, parseISO } from 'date-fns'
import { useRecoilValue } from 'recoil';
import { tournamentState } from "../atoms/tournament";
import { locationState } from "../atoms/location";
import '../newIndex.css'
import ErrorHand from "./ErrorHand";

function Matches() {
  const [matches, setMatches] = useState([]);
  const tournament = useRecoilValue(tournamentState);
  const location = useRecoilValue(locationState);
  const initMatch = {id: null, date: format(new Date(), 'yyyy-MM-dd'), number_players: '', number_games: '', tournament_id: tournament.id};
  const [currentMatch, setCurrentMatch] = useState(initMatch);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState([]);

  async function getMatches() {
    const response = await fetch("/matches");
    const json = await response.json();
    if (response.ok) {
      setMatches(json.filter((match) => match.tournament.id === tournament.id));
    } else {
      setErrors(json.errors);
    }
  };
  useEffect(() => {
    getMatches();
  }, []);

  function formattedDate(match) {
    return {...match, ["date"]: (format(match.date, 'yyyy-MM-dd'))};
  }

  async function addMatch(match) {
    const addFormatMatch = formattedDate(match);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addFormatMatch)
    };
    const response = await fetch("/matches", requestOptions);
    const json = await response.json();
    if (response.ok) {
      setMatches(matches => matches.concat(json));
    } else {
      setErrors(json.errors);
    }
  };

  async function deleteMatch(id) {
    const response = await fetch(`/matches/${id}`, { method: 'DELETE' });
    const json = await response.json();
    if (response.ok) {
      setEditing(false)
      setMatches(matches => matches.filter((match) => match.id !== id));
    } else {
      setErrors(json.errors);
    }
  };

  async function updateMatch(id, updatedMatch) {
    const updFormatMatch = formattedDate(updatedMatch);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updFormatMatch)
    };
    const response = await fetch(`/matches/${id}`, requestOptions);
    const json = await response.json();
    if (response.ok) {
      setEditing(false)
      setMatches(matches.map(match => (match.id === id ? updFormatMatch : match)))
    } else {
      setErrors(json.errors);
    }
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
            {errors.length > 0 && (<ErrorHand errors={errors} setErrors={setErrors} />)}
					  <h3>View Matches</h3>
					  <MatchesTable matches={matches} editRow={editRow} deleteMatch={deleteMatch} />
          </div>
				</div>
			</div>
		</div>
  );
}
export default Matches;