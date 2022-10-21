import React, { useState } from 'react';

function AddTeamForm({ addTeam }) {
  const initTeam = {id: null, name: '', logo: ''};
  const [team, setTeam] = useState(initTeam);

  function handleChange(e) {
    const {name, value} = e.target;
    setTeam({...team, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!team.name) return
    handleChange(e, addTeam(team));
    setTeam(initTeam);
  }

  function handleCancel(e) {
    e.preventDefault();
    setTeam(initTeam);
 }

  return (
    <div className="form">
      <form>
        <label htmlFor="name">Name:</label>
        <input className="name" type="text" value={team.name} name="name" onChange={handleChange} /><br></br>
        <label htmlFor="logo">Logo:</label>
        <input className="logo" type="text" value={team.logo} name="logo" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Team</button>
        <button className="button-secondary" type="submit" onClick={handleCancel} >Cancel</button>
      </form>
    </div>
  )
}

export default AddTeamForm;
