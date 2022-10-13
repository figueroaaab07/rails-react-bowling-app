import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from 'date-fns'
import { useRecoilValue } from 'recoil';
import { locationState } from "../../atoms/location";

function AddTournamentForm({ addTournament, setEditing }) {
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

  function handleCancel(e) {
    e.preventDefault();
    setTournament(initTournament);
  }  

  return (
    <div className="form">
      <form>
        <label htmlFor="name">Name:</label>
        <input className="name" type="text" value={tournament.name} name="name" onChange={handleChange} /><br></br>
        <label htmlFor="start_date">Start Date:</label>
        <DatePicker
          selected={tournament.start_date}
          dateFormat="yyyy-MM-dd" 
          selectsStart
          startDate={tournament.start_date}
          endDate={tournament.end_date}
          onChange={(date) => setTournament({...tournament, ["start_date"]: date})}
        />
        <label htmlFor="end_date">End Date:</label>
        <DatePicker
          selected={tournament.end_date}
          dateFormat="yyyy-MM-dd" 
          selectsEnd
          startDate={tournament.start_date}
          endDate={tournament.end_date}
          minDate={tournament.start_date}
          onChange={(date) => setTournament({...tournament, ["end_date"]: date })}
        />
        <label htmlFor="number_dates">Number Dates:</label>
        <input className="number_dates" type="text" value={tournament.number_dates} name="number_dates" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Tournament</button>
        <button className="button-secondary" type="submit" onClick={handleCancel} >Cancel</button>
      </form>
    </div>
  )
}

export default AddTournamentForm;
