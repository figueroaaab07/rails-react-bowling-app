import React, { useState } from 'react';

function AddLocationForm({ addLocation }) {
  const initLocation = {id: null, name: '', street_address: '', city: '', state: '', country: '', zip_code: '', phone: '', number_lanes: ''};
  const [location, setLocation] = useState(initLocation);

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    // setLocation({...location, [name]: (name === 'number_lanes' ? parseInt(value) : value )});
    setLocation({...location, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!location.name) return
    handleChange(e, addLocation(location));
    setLocation(initLocation);
  }

  return (
    <div className="form">
      <form>
        <label htmlFor="name">Name:</label>
        <input className="name" type="text" value={location.name} name="name" onChange={handleChange} /><br></br>
        <label htmlFor="street_address">Street Address:</label>
        <input className="street_address" type="text" value={location.street_address} name="street_address" onChange={handleChange} /><br></br>
        <label htmlFor="city">City</label>
        <input className="city" type="text" value={location.city} name="city" onChange={handleChange} /><br></br>
        <label htmlFor="state">State:</label>
        <input className="state" type="text" value={location.state} name="state" onChange={handleChange} /><br></br>
        <label htmlFor="country">Country:</label>
        <input className="country" type="text" value={location.country} name="country" onChange={handleChange} /><br></br>
        <label htmlFor="zip_code">Zip Code</label>
        <input className="zip_code" type="text" value={location.zip_code} name="zip_code" onChange={handleChange} /><br></br>
        <label htmlFor="phone">Phone:</label>
        <input className="phone" type="text" value={location.phone} name="phone" onChange={handleChange} /><br></br>
        <label htmlFor="number_lanes">Number of Lanes</label>
        <input className="number_lanes" type="text" value={String(location.number_lanes)} name="number_lanes" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Location</button>
        <button className="button-secondary" type="submit" onClick={() => setLocation(initLocation)} >Cancel</button>
      </form>
    </div>
  )
}

export default AddLocationForm;
