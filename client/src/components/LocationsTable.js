import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { locationState } from "../atoms/location";

function LocationsTable({ locations, editRow, deleteLocation }) {
  const setLocationState = useSetRecoilState(locationState);
  const navigate = useNavigate();

  function selectLocation(location) {
    setLocationState(location);
    navigate("/tournaments");
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Actions</th>
          <th>ID</th>
          <th>Name</th>
          <th>Street Address</th>
          <th>Country</th>
          <th>State</th>
          <th>City</th>
          <th>Zip Code</th>
          <th>Phone</th>
          <th>Number Lanes</th>
        </tr>
      </thead>
      <tbody>
        {locations.length > 0 ? (
          locations.map(location => {
            const {id, name, street_address, country, state, city, zip_code, phone, number_lanes} = location;
            return (
              <tr key={id}>
                <td>
                  <button onClick={() => selectLocation(location)}>Select</button>
                  <button onClick={() => editRow(location)}>Update</button>
                  <button onClick={() => deleteLocation(id)}>Delete</button>
                </td>
                <td>{id}</td>
                <td>{name}</td>
                <td>{street_address}</td>
                <td>{country}</td>
                <td>{state}</td>
                <td>{city}</td>
                <td>{zip_code}</td>
                <td>{phone}</td>
                <td>{number_lanes}</td>
              </tr>
            )
          })
          ) : (
            <tr>
              <td colSpan={4}>No locations found</td>
            </tr>
          )   
        }
      </tbody>
    </table>
  )
}

export default LocationsTable;