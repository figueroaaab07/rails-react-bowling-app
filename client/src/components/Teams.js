import React, { useState, useEffect } from 'react';
import AddTeamForm from "./forms/AddTeamForm";
import EditTeamForm from "./forms/EditTeamForm";
import TeamsTable from "./tables/TeamsTable";

function Teams() {
  const [teams, setTeams] = useState([]);
  const initTeam = {id: null, name: '', logo: ''};
  const [currentTeam, setCurrentTeam] = useState(initTeam);
  const [editing, setEditing] = useState(false);

  async function getTeams() {
    const response = await fetch("/teams");
    const json = await response.json();
    setTeams(teams => teams.concat(json));
  };
  
  useEffect(() => {
    getTeams();
  }, []);

  async function addTeam(team) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team)
    };
    const response = await fetch("/teams", requestOptions);
    const json = await response.json();
    setTeams(teams => teams.concat(json));
  };

  async function deleteTeam(id) {
    const response = await fetch(`/teams/${id}`, { method: 'DELETE' });
	  setEditing(false)
    setTeams(teams => teams.filter((team) => team.id !== id));
  };

  async function updateTeam(id, updatedTeam) {
    console.log(id, updatedTeam);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTeam)
    };
    const response = await fetch(`/teams/${id}`, requestOptions);
    const json = await response.json();
	  setEditing(false)
		setTeams(teams.map(team => (team.id === id ? updatedTeam : team)))
	}

	function editRow(team) {
		setEditing(true)
		setCurrentTeam({ id: team.id, name: team.name, logo: team.logo })
  }

  return (
		<div className="some-page-wrapper">
			<div className="row">
				<div className="column">
					{editing ? (
						<>
							<h3>Edit Team</h3>
							<EditTeamForm
								editing={editing}
								setEditing={setEditing}
								currentTeam={currentTeam}
								updateTeam={updateTeam}
							/>
						</>
					) : (
						<>
							<h3>Add Team</h3>
							<AddTeamForm addTeam={addTeam} />
						</>
					)}
				</div>
				<div className="double-column">
          <div className="container">
					  <h3>View Teams</h3>
					  <TeamsTable teams={teams} editRow={editRow} deleteTeam={deleteTeam} />
          </div>
				</div>
			</div>
		</div>
  );
}
export default Teams;