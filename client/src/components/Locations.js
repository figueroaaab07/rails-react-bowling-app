import React, { useState, useEffect } from 'react';
import AddLocationForm from "./forms/AddLocationForm";
import EditLocationForm from "./forms/EditLocationForm";
import LocationsTable from "./tables/LocationsTable";
import '../newIndex.css'
import ErrorHand from "./ErrorHand";

function Locations() {
  const [locations, setLocations] = useState([]);
  const initLocation = {id: null, name: '', street_address: '', city: '', state: '', country: '', zip_code: '', phone: '', number_lanes: ''};
  const [currentLocation, setCurrentLocation] = useState(initLocation);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState([]);

  async function getLocations() {
    const response = await fetch("/locations");
    const json = await response.json();
    if (response.ok) {
      setLocations(locations => locations.concat(json));
    } else {
      setErrors(json.errors);
    }
  };
  
  useEffect(() => {
    getLocations();
  }, []);

  async function addLocation(location) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(location)
    };
    const response = await fetch("/locations", requestOptions);
    const json = await response.json();
    if (response.ok) {
      setLocations(locations => locations.concat(json));
    } else {
      setErrors(json.errors);
    }
  };

  async function deleteLocation(id) {
    const response = await fetch(`/locations/${id}`, { method: 'DELETE' });
    const json = await response.json();
    if (response.ok) {
      setEditing(false)
      setLocations(locations => locations.filter((location) => location.id !== id));
    } else {
      setErrors(json.errors);
    }
  };

  async function updateLocation(id, updatedLocation) {
    console.log(id, updatedLocation);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedLocation)
    };
    const response = await fetch(`/locations/${id}`, requestOptions);
    const json = await response.json();
    if (response.ok) {
      setEditing(false)
      setLocations(locations.map(location => (location.id === id ? updatedLocation : location)))
    } else {
      setErrors(json.errors);
    }
	}

	function editRow(location) {
		setEditing(true)
		setCurrentLocation({ id: location.id, name: location.name, street_address: location.street_address, city: location.city, state: location.state, country: location.country, zip_code: location.zip_code, phone: location.phone, number_lanes: location.number_lanes })
  }

  return (
		<div className="some-page-wrapper">
			<div className="row">
				<div className="column">
					{editing ? (
						<>
							<h3>Edit Location</h3>
							<EditLocationForm
								editing={editing}
								setEditing={setEditing}
								currentLocation={currentLocation}
								updateLocation={updateLocation}
							/>
						</>
					) : (
						<>
							<h3>Add Location</h3>
							<AddLocationForm addLocation={addLocation} />
						</>
					)}
				</div>
				<div className="double-column">
          <div className="container">
            {errors.length > 0 && (<ErrorHand errors={errors} setErrors={setErrors} />)}
            <h3>View Locations</h3>
					  <LocationsTable locations={locations} editRow={editRow} deleteLocation={deleteLocation} />
          </div>
				</div>
			</div>
		</div>
  );
}
export default Locations;