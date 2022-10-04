import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { teamState } from "../atoms/team";

function AddBowlerForm({ addBowler }) {
  const team = useRecoilValue(teamState);
  const initBowler = {id: null, last_name: '', first_name: '', street_address: '', city: '', state: '', country: '', zip_code: '', phone: '', left_handed: 0, total_pins: null, total_games: null, handicap: null, user_id: null, team_id: team.id};
  const [bowler, setBowler] = useState(initBowler);

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setBowler({...bowler, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if (!bowler.first_name) return
    handleChange(e, addBowler(bowler));
    setBowler(initBowler);
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="first_name">First Name:</label>
        <input className="first_name" type="text" value={bowler.first_name} name="first_name" onChange={handleChange} /><br></br>
        <label htmlFor="last_name">Last Name:</label>
        <input className="last_name" type="text" value={bowler.last_name} name="last_name" onChange={handleChange} /><br></br>
        <label htmlFor="street_address">Street Address:</label>
        <input className="street_address" type="text" value={bowler.street_address} name="street_address" onChange={handleChange} /><br></br>
        <label htmlFor="city">City</label>
        <input className="city" type="text" value={bowler.city} name="city" onChange={handleChange} /><br></br>
        <label htmlFor="state">State:</label>
        <input className="state" type="text" value={bowler.state} name="state" onChange={handleChange} /><br></br>
        <label htmlFor="country">Country:</label>
        <input className="country" type="text" value={bowler.country} name="country" onChange={handleChange} /><br></br>
        <label htmlFor="zip_code">Zip Code</label>
        <input className="zip_code" type="text" value={bowler.zip_code} name="zip_code" onChange={handleChange} /><br></br>
        <label htmlFor="phone">Phone:</label>
        <input className="phone" type="text" value={bowler.phone} name="phone" onChange={handleChange} /><br></br>
        <label htmlFor="left_handed">Left Handed?</label>
        <input className="left_handed" type="checkbox" value={bowler.left_handed} name="left_handed" onChange={handleChange} /><br></br>
        <label htmlFor="total_pins">Total Pins</label>
        <input className="total_pins" type="number" value={bowler.total_pins} name="total_pins" onChange={handleChange} /><br></br>
        <label htmlFor="total_games">Total Games</label>
        <input className="total_games" type="number" value={bowler.total_games} name="total_games" onChange={handleChange} /><br></br>
        <label htmlFor="handicap">Handicap</label>
        <input className="handicap" type="number" value={bowler.handicap} name="handicap" onChange={handleChange} /><br></br>
        {/* <label htmlFor="user_id">User ID</label>
        <input className="user_id" type="number" value={bowler.user_id} name="user_id" onChange={handleChange} /><br></br>
        <label htmlFor="team_id">Team ID</label>
        <input className="team_id" type="number" value={bowler.team_id} name="team_id" onChange={handleChange} /><br></br> */}
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Bowler</button>
      </form>
    </div>
  )
}

export default AddBowlerForm;
