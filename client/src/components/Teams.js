import React, { useState } from 'react';

function Teams() {
  const initTeam = {id: null, name: '', logo: ''};
  const [team, setTeam] = useState(initTeam);

  async function addTeam(team) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team)
    };
    const response = await fetch("/teams", requestOptions);
    const json = await response.json();
    setTeam(json);
  };

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setTeam({...team, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleChange(e, addTeam(team));
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="name">Name:</label>
        <input className="name" type="text" value={team.name} name="name" onChange={handleChange} /><br></br>
        <label htmlFor="logo">Logo:</label>
        <input className="logo" type="text" value={team.logo} name="logo" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Team</button>
      </form>
    </div>
  )
}

export default Teams;