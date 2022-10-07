import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from 'date-fns'

function EditTournamentForm({ editing, setEditing, currentTournament, updateTournament }) {
  const [tournament, setTournament] = useState(currentTournament);
  const navigate = useNavigate();

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setTournament({...tournament, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditing(false);
    handleChange(e, updateTournament(tournament.id, tournament));
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="name">Name:</label>
        <input className="name" type="text" value={tournament.name} name="name" onChange={handleChange} /><br></br>
        <label htmlFor="start_date">Start Date:</label>
        <DatePicker
          selected={(tournament.start_date && new Date(tournament.start_date)) || null}
          dateFormat="yyyy-MM-dd" 
          selectsStart
          startDate={tournament.start_date}
          endDate={tournament.end_date}
          onChange={(date) => setTournament({...tournament, ["start_date"]: date})}
        />
        <label htmlFor="end_date">End Date:</label>
        <DatePicker
          selected={(tournament.end_date && new Date(tournament.end_date)) || null}
          dateFormat="yyyy-MM-dd" 
          selectsEnd
          startDate={tournament.start_date}
          endDate={tournament.end_date}
          minDate={tournament.start_date}
          onChange={(date) => setTournament({...tournament, ["end_date"]: date })}
        />
        <label htmlFor="number_dates">Number Dates:</label>
        <input className="number_dates" type="text" value={tournament.number_dates} name="number_dates" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Edit Tournament</button>
        <button className="button-secondary" type="submit" onClick={() => navigate("/tournaments")} >Cancel</button>
      </form>
    </div>
  )
}

export default EditTournamentForm;
