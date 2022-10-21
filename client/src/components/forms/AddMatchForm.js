import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from 'date-fns'
import { useRecoilValue } from 'recoil';
import { tournamentState } from "../../atoms/tournament";

function AddMatchForm({ addMatch }) {
  const tournament = useRecoilValue(tournamentState);
  const initMatch = {id: null, date: '', number_players: '', number_games: '', tournament_id: tournament.id};
  const [match, setMatch] = useState(initMatch);

  function handleChange(e) {
    const {name, value} = e.target;
    setMatch({...match, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!match.date) return
    handleChange(e, addMatch(match));
    setMatch(initMatch);
  }

  function handleCancel(e) {
    e.preventDefault();
    setMatch(initMatch);
 }

  return (
    <div className="form">
      <form>
        <label htmlFor="date">Date:</label>
        <DatePicker
          selected={match.date}
          dateFormat="yyyy-MM-dd" 
          includeDateIntervals={[{ start: new Date(tournament.start_date), end: new Date(tournament.end_date) },]}
          onChange={(date) => setMatch({...match, ["date"]: date})}
        />
        <label htmlFor="number_players">Number Players:</label>
        <input className="number_players" type="text" value={match.number_players} name="number_players" onChange={handleChange} /><br></br>
        <label htmlFor="number_games">Number Games:</label>
        <input className="number_games" type="text" value={match.number_games} name="number_games" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Match</button>
        <button className="button-secondary" type="submit" onClick={handleCancel} >Cancel</button>
      </form>
    </div>
  )
}

export default AddMatchForm;
