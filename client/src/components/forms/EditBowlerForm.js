import React, { useState } from 'react';

function EditBowlerForm({ editing, setEditing, currentBowler, updateBowler }) {
  const [bowler, setBowler] = useState(currentBowler);

  function handleChange(e) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setBowler({...bowler, [e.target.name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditing(false);
    handleChange(e, updateBowler(bowler.id, bowler));
    if (e.target.type === "checkbox") e.target.checked = false
  }

  function handleCancel(e) {
    e.preventDefault();
    setEditing(false);
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
        <input className="left_handed" type="checkbox" checked={bowler.left_handed} value={bowler.left_handed} name="left_handed" onChange={handleChange} /><br></br>
        <label htmlFor="handicap">Handicap</label>
        <input className="handicap" type="number" value={bowler.handicap} name="handicap" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Edit Bowler</button>
        <button className="button-secondary" type="submit" onClick={handleCancel} >Cancel</button>
      </form>
    </div>
  )
}

export default EditBowlerForm;
