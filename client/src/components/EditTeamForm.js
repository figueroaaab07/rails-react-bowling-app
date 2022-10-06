import React, { useState } from 'react';

function EditTeamForm({ editing, setEditing, currentTeam, updateTeam}) {
  const [team, setTeam] = useState(currentTeam);

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setTeam({...team, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditing(false);
    handleChange(e, updateTeam(team.id, team));
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="name">Name:</label>
        <input className="name" type="text" value={team.name} name="name" onChange={handleChange} /><br></br>
        <label htmlFor="logo">Logo:</label>
        <input className="logo" type="text" value={team.logo} name="logo" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Edit Team</button>
      </form>
    </div>
  )
}

export default EditTeamForm;