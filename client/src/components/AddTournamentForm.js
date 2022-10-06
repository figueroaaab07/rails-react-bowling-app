import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { locationState } from "../atoms/location";

function AddTournamentForm({ addTournament }) {
  const location = useRecoilValue(locationState);
  const initTournament = {id: null, name: '', start_date: '', end_date: '', number_dates: '', location_id: location.id};
  const [tournament, setTournament] = useState(initTournament);

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setTournament({...tournament, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!tournament.name) return
    handleChange(e, addTournament(tournament));
    setTournament(initTournament);
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="name">Name:</label>
        <input className="name" type="text" value={tournament.name} name="name" onChange={handleChange} /><br></br>
        <label htmlFor="start_date">Start Date:</label>
        <input className="start_date" type="text" value={tournament.start_date} name="start_date" onChange={handleChange} /><br></br>
        <label htmlFor="end_date">End Date:</label>
        <input className="end_date" type="text" value={tournament.end_date} name="end_date" onChange={handleChange} /><br></br>
        <label htmlFor="number_dates">Number Dates:</label>
        <input className="number_dates" type="text" value={tournament.number_dates} name="number_dates" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Tournament</button>
      </form>
    </div>
  )
}

export default AddTournamentForm;
