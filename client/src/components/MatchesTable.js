import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { matchState } from "../atoms/match";

function MatchesTable({ matches, editRow, deleteMatch }) {
  const setMatchState = useSetRecoilState(matchState);
  const navigate = useNavigate();

  function selectMatch(match) {
    setMatchState(match);
    navigate("/match_teams");
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Actions</th>
          <th>ID</th>
          <th>Date</th>
          <th>Number Players</th>
          <th>Number Games</th>
        </tr>
      </thead>
      <tbody>
        {matches.length > 0 ? (
          matches.map(match => {
            const {id, date, number_players, number_games} = match;
            return (
              <tr key={id}>
                <td>
                  <button onClick={() => selectMatch(match)}>Select</button>
                  <button onClick={() => editRow(match)}>Update</button>
                  <button onClick={() => deleteMatch(id)}>Delete</button>
                </td>
                <td>{id}</td>
                <td>{date}</td>
                <td>{number_players}</td>
                <td>{number_games}</td>
              </tr>
            )
          })
          ) : (
            <tr>
              <td colSpan={4}>No matches found</td>
            </tr>
          )   
        }
      </tbody>
    </table>
  )
}

export default MatchesTable;