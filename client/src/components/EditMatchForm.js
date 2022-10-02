import React, { useState } from 'react';

function EditMatchForm({ editing, setEditing, currentMatch, updateMatch }) {
  const [match, setMatch] = useState(currentMatch);

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

  return (
    <div className="form">
      <form>
        <label htmlFor="date">Date:</label>
        <input className="date" type="text" value={match.date} name="date" onChange={handleChange} /><br></br>
        <label htmlFor="number_players">Start Date:</label>
        <input className="number_players" type="text" value={match.number_players} name="number_players" onChange={handleChange} /><br></br>
        <label htmlFor="number_games">End Date:</label>
        <input className="number_games" type="text" value={match.number_games} name="number_games" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Match</button>
      </form>
    </div>
  )
}

export default EditMatchForm;
