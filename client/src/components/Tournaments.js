import React, { useState, useEffect } from 'react';
import AddTournamentForm from "./AddTournamentForm";
import EditTournamentForm from "./EditTournamentForm";
import TournamentsTable from "./TournamentsTable";
import { useRecoilValue } from 'recoil';
import { locationState } from "../atoms/location";

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const location = useRecoilValue(locationState);
  const initTournament = {id: null, name: '', start_date: '', end_date: '', number_dates: null, location_id: location.id};
  const [currentTournament, setCurrentTournament] = useState(initTournament);
  const [editing, setEditing] = useState(false);

  async function getTournaments() {
    const response = await fetch("/tournaments");
    const json = await response.json();
    console.log(json, location.id);
    console.log(json.filter(d => d.location.id === location.id));
    setTournaments(json.filter((tournament) => tournament.location.id === location.id));
  };
  
  useEffect(() => {
    getTournaments();
  }, []);

  async function addTournament(tournament) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tournament)
    };
    const response = await fetch("/tournaments", requestOptions);
    const json = await response.json();
    setTournaments(tournaments => tournaments.concat(json));
  };

  async function deleteTournament(id) {
    const response = await fetch(`/tournaments/${id}`, { method: 'DELETE' });
    // const json = await response.json();
    setTournaments(tournaments => tournaments.filter((tournament) => tournament.id !== id));
  };

  async function updateTournament(id, updatedTournament) {
    console.log(id, updatedTournament);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTournament)
    };
    const response = await fetch(`/tournaments/${id}`, requestOptions);
    const json = await response.json();
	  setEditing(false)
		setTournaments(tournaments.map(tournament => (tournament.id === id ? updatedTournament : tournament)))
	}

	function editRow(tournament) {
		setEditing(true)
		setCurrentTournament({ id: tournament.id, name: tournament.name, start_date: tournament.start_date, end_date: tournament.end_date, number_dates: tournament.number_dates, location_id: location.id })
  }

  return (
		<div className="container">
			<div className="row">
				<div className="add-user">
          <h2>Bowling Center: {location.name}</h2>
					{editing ? (
						<>
							<h2>Edit Tournament</h2>
							<EditTournamentForm
								editing={editing}
								setEditing={setEditing}
								currentTournament={currentTournament}
								updateTournament={updateTournament}
							/>
						</>
					) : (
						<>
							<h2>Add Tournament</h2>
							<AddTournamentForm addTournament={addTournament} />
						</>
					)}
				</div>
				<div className="view-user">
					<h2>View Tournaments</h2>
					<TournamentsTable tournaments={tournaments} editRow={editRow} deleteTournament={deleteTournament} />
				</div>
			</div>
		</div>
  );
}
export default Tournaments;