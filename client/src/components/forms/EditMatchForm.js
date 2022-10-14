import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { tournamentState } from "../../atoms/tournament";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from 'date-fns'

function EditMatchForm({ editing, setEditing, currentMatch, updateMatch }) {
  const tournament = useRecoilValue(tournamentState);
  const [match, setMatch] = useState(currentMatch);
  const navigate = useNavigate();

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setMatch({...match, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditing(false);
    handleChange(e, updateMatch(match.id, match));
  }

  function handleCancel(e) {
    e.preventDefault();
    setEditing(false);
  }  

  return (
    <div className="form">
      <form>
        <label htmlFor="date">Date:</label>
        <DatePicker
          selected={new Date(match.date)}
          dateFormat="yyyy-MM-dd" 
          includeDateIntervals={[{ start: new Date(tournament.start_date), end: new Date(tournament.end_date) },]}
          onChange={(date) => setMatch({...match, ["date"]: date})}
        />
        <label htmlFor="number_players">Number Players:</label>
        <input className="number_players" type="text" value={match.number_players} name="number_players" onChange={handleChange} /><br></br>
        <label htmlFor="number_games">Number Games:</label>
        <input className="number_games" type="text" value={match.number_games} name="number_games" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Edit Match</button>
        <button className="button-secondary" type="submit" onClick={handleCancel} >Cancel</button>
      </form>
    </div>
  )
}

export default EditMatchForm;
