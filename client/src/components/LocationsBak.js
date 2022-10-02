import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { locationState } from "../atoms/location";

function Locations() {
  const setLocationState = useSetRecoilState(locationState);
  const locationValue = useRecoilValue(locationState);
  const navigate = useNavigate();
  const initLocation = {id: null, name: '', street_address: '', city: '', state: '', country: '', zip_code: '', phone: '', number_lanes: 0};
  const [location, setLocation] = useState(initLocation);

  async function addLocation(location) {
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(location)
    // };
    // const response = await fetch("/locations", requestOptions);
    // const json = await response.json();
    // setLocationState(json);
    // console.log(json);
    fetch("/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    }).then((r) => {
      if (r.ok) {
        r.json().then((json) => setLocationState(json));
      }
    }).then(console.log(locationValue));
    navigate("/tournaments");
  };

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setLocation({...location, [name]: (name === 'number_lanes' ? parseInt(value) : value )});
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleChange(e, addLocation(location));
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
        <input className="number_lanes" type="text" value={location.number_lanes} name="number_lanes" onChange={handleChange} /><br></br>
        <button className="button-primary" type="submit" onClick={handleSubmit} >Add Location</button>
      </form>
    </div>
  )
}

export default Locations;