import React, { useState, useEffect } from 'react';
import AddTournamentForm from "./forms/AddTournamentForm";
import EditTournamentForm from "./forms/EditTournamentForm";
import TournamentsTable from "./tables/TournamentsTable";
import { useRecoilValue } from 'recoil';
import { locationState } from "../atoms/location";
import { format, parseISO } from 'date-fns'
import '../newIndex.css'
import ErrorHand from "./ErrorHand";

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const location = useRecoilValue(locationState);
  const initTournament = {id: null, name: '', start_date: '', end_date: '', number_dates: null, location_id: location.id};
  const [currentTournament, setCurrentTournament] = useState(initTournament);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState([]);

  async function getTournaments() {
    const response = await fetch("/tournaments");
    const json = await response.json();
    if (response.ok) {
      setTournaments(json.filter((tournament) => tournament.location.id === location.id));
    } else {
      setErrors(json.errors);
    }
  };
  useEffect(() => {
    getTournaments();
  }, []);

  function formattedDate(tournament) {
    return {...tournament, ["start_date"]: (format(tournament.start_date, 'yyyy-MM-dd')), ["end_date"]: (format(tournament.end_date, 'yyyy-MM-dd'))};
  }

  async function addTournament(tournament) {
    const addFormatTourn = formattedDate(tournament);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addFormatTourn)
    };
    const response = await fetch("/tournaments", requestOptions);
    const json = await response.json();
    if (response.ok) {
      setEditing(false);
      setTournaments(tournaments => tournaments.concat(json));
    } else {
      setErrors(json.errors);
    }
  };

  async function deleteTournament(id) {
    const response = await fetch(`/tournaments/${id}`, { method: 'DELETE' });
    const json = await response.json();
    if (response.ok) {
      setEditing(false)
      setTournaments(tournaments => tournaments.filter((tournament) => tournament.id !== id));
    } else {
      setErrors(json.errors);
    }
  };

  async function updateTournament(id, updatedTournament) {
    const updFormatTourn = formattedDate(updatedTournament);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updFormatTourn)
    };
    const response = await fetch(`/tournaments/${id}`, requestOptions);
    const json = await response.json();
    if (response.ok) {
      setEditing(false);
      setTournaments(tournaments.map(tournament => (tournament.id === id ? json : tournament)));
    } else {
      setErrors(json.errors);
    }
	}

	function editRow(tournament) {
		setEditing(true)
		setCurrentTournament({ id: tournament.id, name: tournament.name, start_date: tournament.start_date, end_date: tournament.end_date, number_dates: tournament.number_dates, location_id: location.id })
  }

  return (
		<div className="some-page-wrapper">
      <h3>Bowling Center: {location.name}</h3>
			<div className="row">
				<div className="column">
					{editing ? (
						<>
							<h3>Edit Tournament</h3>
							<EditTournamentForm
								editing={editing}
								setEditing={setEditing}
								currentTournament={currentTournament}
								updateTournament={updateTournament}
							/>
						</>
					) : (
						<>
							<h3>Add Tournament</h3>
							<AddTournamentForm addTournament={addTournament} setEditing={setEditing} />
						</>
					)}
				</div>
				<div className="double-column">
          <div className="container">
            {errors.length > 0 && (<ErrorHand errors={errors} setErrors={setErrors} />)}
					  <h3>View Tournaments</h3>
					  <TournamentsTable tournaments={tournaments} editRow={editRow} deleteTournament={deleteTournament} />
				  </div>
				</div>
			</div>
		</div>
  );
}
export default Tournaments;