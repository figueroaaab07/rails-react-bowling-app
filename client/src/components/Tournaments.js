import React, { useState } from 'react';

function Tournaments() {
  const initTournament = {id: null, name: '', start_date: '', end_date: '', number_dates: null, location_id: null};
  const [tournament, setTournament] = useState(initTournament);

  async function addTournament(tournament) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tournament)
    };
    const response = await fetch("/tournaments", requestOptions);
    const json = await response.json();
    setTournament(json);
  };

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setTournament({...tournament, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleChange(e, addTournament(tournament));
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
        <label htmlFor="number_dates">Number of Dates:</label>
        <input className="number_dates" type="number" value={tournament.number_dates} name="number_dates" onChange={handleChange} /><br></br>
        <label htmlFor="location_id">Location ID:</label>
        <input className="location_id" type="number" value={tournament.location_id} name="location_id" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Tournament</button>
      </form>
    </div>
  )
}

export default Tournaments;