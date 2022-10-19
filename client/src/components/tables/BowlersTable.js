import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { bowlerState } from "../../atoms/bowler";

function BowlersTable({ bowlers, editRow, deleteBowler }) {
  const setBowlerState = useSetRecoilState(bowlerState);
  const navigate = useNavigate();

  function selectBowler(bowler) {
    setBowlerState(bowler);
    navigate("/match_teams");
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Actions</th>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Street Address</th>
          <th>Country</th>
          <th>State</th>
          <th>City</th>
          <th>Zip Code</th>
          <th>Phone</th>
          <th>Left Handed?</th>
          <th>Total Pins</th>
          <th>Total Games</th>
          <th>Handicap</th>
        </tr>
      </thead>
      <tbody>
        {bowlers.length > 0 ? (
          bowlers.map(bowler => {
            const {id, last_name, first_name, street_address, city, state, country, zip_code, phone, left_handed, total_pins, total_games, handicap, games} = bowler;
            // const isDelUpdable = games.length === 0;
            console.log(games?.length > 0);
            const isDelUpdable = !(games?.length > 0);
            return (
              <tr key={id}>
                <td>
                  {/* <button onClick={() => selectBowler(bowler)}>Select</button> */}
                  <button disabled={!isDelUpdable} onClick={() => editRow(bowler)}>Update</button>
                  <button disabled={!isDelUpdable} onClick={() => deleteBowler(id)}>Delete</button>
                </td>
                <td>{id}</td>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{street_address}</td>
                <td>{country}</td>
                <td>{state}</td>
                <td>{city}</td>
                <td>{zip_code}</td>
                <td>{phone}</td>
                <td>{left_handed ? 'Yes' : 'No'}</td>
                <td>{total_pins}</td>
                <td>{total_games}</td>
                <td>{handicap}</td>
              </tr>
            )
          })
          ) : (
            <tr>
              <td colSpan={4}>No bowlers found</td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

export default BowlersTable;