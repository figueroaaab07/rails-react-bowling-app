import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { matchTeamState } from "../atoms/matchTeam";

function MatchesTable({ matchTeams, editRow, deleteMatchTeam, teams }) {
  const setMatchTeamState = useSetRecoilState(matchTeamState);
  const navigate = useNavigate();

  function selectMatchTeam(matchTeam) {
    setMatchTeamState(matchTeam);
    navigate("/games");
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Actions</th>
          <th>ID</th>
          <th>Lanes</th>
          <th>Home Team</th>
          <th>Guest Team</th>
        </tr>
      </thead>
      <tbody>
        {matchTeams.length > 0 ? (
          matchTeams.map(matchTeam => {
            const {id, lanes, home_team, guest_team} = matchTeam;
            console.log(matchTeam)
            return (
              <tr key={id}>
                <td>
                  <button onClick={() => selectMatchTeam(matchTeam)}>Select</button>
                  <button onClick={() => editRow(matchTeam)}>Update</button>
                  <button onClick={() => deleteMatchTeam(id)}>Delete</button>
                </td>
                <td>{id}</td>
                <td>{lanes}</td>
                <td>{home_team.name}</td>
                <td>{guest_team.name}</td>
              </tr>
            )
          })
          ) : (
            <tr>
              <td colSpan={4}>No match teams found</td>
            </tr>
          )   
        }
      </tbody>
    </table>
  )
}

export default MatchesTable;