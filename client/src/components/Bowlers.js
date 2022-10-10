import React, { useState, useEffect } from 'react';
import AddBowlerForm from "./AddBowlerForm";
import EditBowlerForm from "./EditBowlerForm";
import BowlersTable from "./BowlersTable";
import { useRecoilValue } from 'recoil';
import { teamState } from "../atoms/team";

function Bowlers() {
  const [bowlers, setBowlers] = useState([]);
  const team = useRecoilValue(teamState);
  const initBowler = {id: null, last_name: '', first_name: '', street_address: '', city: '', state: '', country: '', zip_code: '', phone: '', left_handed: 0, total_pins: null, total_games: null, handicap: null, user_id: null, team_id: team.id};
  const [currentBowler, setCurrentBowler] = useState(initBowler);
  const [editing, setEditing] = useState(false);
  // const [isLeftHand, setIsLeftHand] = useState(false);


  async function getBowlers() {
    const response = await fetch("/bowlers");
    const json = await response.json();
    console.log(json, team.id);
    console.log(json.filter(d => d.team.id === team.id));
    setBowlers(json.filter((bowler) => bowler.team.id === team.id));
  };
  
  useEffect(() => {
    getBowlers();
  }, []);

  async function addBowler(bowler) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bowler)
    };
    const response = await fetch("/bowlers", requestOptions);
    const json = await response.json();
    setBowlers(bowlers => bowlers.concat(json));
  };

  async function deleteBowler(id) {
    const response = await fetch(`/bowlers/${id}`, { method: 'DELETE' });
    // const json = await response.json();
	  setEditing(false)
    setBowlers(bowlers => bowlers.filter((bowler) => bowler.id !== id));
  };

  async function updateBowler(id, updatedBowler) {
    console.log(id, updatedBowler);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBowler)
    };
    const response = await fetch(`/bowlers/${id}`, requestOptions);
    const json = await response.json();
	  setEditing(false)
		setBowlers(bowlers.map(bowler => (bowler.id === id ? updatedBowler : bowler)))
	}

	function editRow(bowler) {
		setEditing(true)
		setCurrentBowler({ id: bowler.id, last_name: bowler.last_name, first_name: bowler.first_name, street_address: bowler.street_address, city: bowler.city, state: bowler.state, country: bowler.country, zip_code: bowler.zip_code, phone: bowler.phone, left_handed: bowler.left_handed, total_pins: bowler.total_pins, total_games: bowler.total_games, handicap: bowler.handicap, user_id: bowler.user_id, team_id: team.id })
  }

  return (
		<div className="some-page-wrapper">
      <h3>Team: {team.name}</h3>
			<div className="row">
				<div className="column">
					{editing ? (
						<>
							<h3>Edit Bowler</h3>
							<EditBowlerForm
								editing={editing}
								setEditing={setEditing}
								currentBowler={currentBowler}
								updateBowler={updateBowler}
							/>
						</>
					) : (
						<>
							<h3>Add Bowler</h3>
							<AddBowlerForm addBowler={addBowler} />
						</>
					)}
				</div>
				<div className="double-column">
          <div className="container">
					  <h3>View Bowlers</h3>
					  <BowlersTable bowlers={bowlers} editRow={editRow} deleteBowler={deleteBowler} />
          </div>
				</div>
			</div>
		</div>
  );
}
export default Bowlers;