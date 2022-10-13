import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { teamState } from "../../atoms/team";

function AddBowlerForm({ addBowler }) {
  const team = useRecoilValue(teamState);
  const initBowler = {id: null, last_name: '', first_name: '', street_address: '', city: '', state: '', country: '', zip_code: '', phone: '', left_handed: false, total_pins: null, total_games: null, handicap: null, user_id: null, team_id: team.id};
  const [bowler, setBowler] = useState(initBowler);

  function handleChange(e) {
    console.log(e.target);
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setBowler({...bowler, [e.target.name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleChange(e, addBowler(bowler));
    setBowler(initBowler);
    if (e.target.type === "checkbox") e.target.checked = false
  }

  function handleCancel(e) {
    e.preventDefault();
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
        <input className="left_handed" type="checkbox" checked={bowler.left_handed} name="left_handed" onChange={handleChange} /><br></br>
        <label htmlFor="handicap">Handicap</label>
        <input className="handicap" type="number" value={bowler.handicap} name="handicap" onChange={handleChange} /><br></br>
        {/* <label htmlFor="user_id">User ID</label>
        <input className="user_id" type="number" value={bowler.user_id} name="user_id" onChange={handleChange} /><br></br> */}
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Bowler</button>
        <button className="button-secondary" type="submit" onClick={handleCancel} >Cancel</button>
      </form>
    </div>
  )
}

export default AddBowlerForm;
