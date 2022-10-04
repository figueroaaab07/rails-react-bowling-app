import React, { useState } from 'react';

function EditTournamentForm({ editing, setEditing, currentTournament, updateTournament }) {
  const [tournament, setTournament] = useState(currentTournament);

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    // setLocation({...location, [name]: (name === 'number_lanes' ? parseInt(value) : value )});
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
        <input className="start_date" type="text" value={tournament.start_date} name="start_date" onChange={handleChange} /><br></br>
        <label htmlFor="end_date">End Date:</label>
        <input className="end_date" type="text" value={tournament.end_date} name="end_date" onChange={handleChange} /><br></br>
        <label htmlFor="number_dates">Number Dates:</label>
        <input className="number_dates" type="text" value={tournament.number_dates} name="number_dates" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Edit Tournament</button>
      </form>
    </div>
  )
}

export default EditTournamentForm;
