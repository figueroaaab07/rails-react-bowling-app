import React, { useState, useEffect } from 'react';
import AddLocationForm from "./AddLocationForm";
import EditLocationForm from "./EditLocationForm";
import LocationsTable from "./LocationsTable";

function Locations() {
  const [locations, setLocations] = useState([]);
  const initLocation = {id: null, name: '', street_address: '', city: '', state: '', country: '', zip_code: '', phone: '', number_lanes: ''};
  const [currentLocation, setCurrentLocation] = useState(initLocation);
  const [editing, setEditing] = useState(false);

  async function getLocations() {
    const response = await fetch("/locations");
    const json = await response.json();
    setLocations(locations => locations.concat(json));
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
    setLocations(locations => locations.concat(json));
  };

  async function deleteLocation(id) {
    const response = await fetch(`/locations/${id}`, { method: 'DELETE' });
    // const json = await response.json();
	  setEditing(false)
    setLocations(locations => locations.filter((location) => location.id !== id));
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
	  setEditing(false)
		setLocations(locations.map(location => (location.id === id ? updatedLocation : location)))
	}

	function editRow(location) {
		setEditing(true)
		setCurrentLocation({ id: location.id, name: location.name, street_address: location.street_address, city: location.city, state: location.state, country: location.country, zip_code: location.zip_code, phone: location.phone, number_lanes: location.number_lanes })
  }

  return (
		<div className="container">
			<div className="row">
				<div className="add-user">
					{editing ? (
						<>
							<h2>Edit Location</h2>
							<EditLocationForm
								editing={editing}
								setEditing={setEditing}
								currentLocation={currentLocation}
								updateLocation={updateLocation}
							/>
						</>
					) : (
						<>
							<h2>Add Location</h2>
							<AddLocationForm addLocation={addLocation} />
						</>
					)}
				</div>
				<div className="view-user">
					<h2>View Locations</h2>
					<LocationsTable locations={locations} editRow={editRow} deleteLocation={deleteLocation} />
				</div>
			</div>
		</div>
  );
}
export default Locations;