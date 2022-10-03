import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { teamState } from "../atoms/team";

function TeamsTable({ teams, editRow, deleteTeam }) {
  const setTeamState = useSetRecoilState(teamState);
  const navigate = useNavigate();

  function selectTeam(team) {
    setTeamState(team);
    navigate("/bowlers");
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Actions</th>
          <th>ID</th>
          <th>Name</th>
          <th>Logo</th>
        </tr>
      </thead>
      <tbody>
        {teams.length > 0 ? (
          teams.map(team => {
            const {id, name, logo} = team;
            return (
              <tr key={id}>
                <td>
                  <button onClick={() => selectTeam(team)}>Select</button>
                  <button onClick={() => editRow(team)}>Update</button>
                  <button onClick={() => deleteTeam(id)}>Delete</button>
                </td>
                <td>{id}</td>
                <td>{name}</td>
                <td>{logo}</td>
              </tr>
            )
          })
          ) : (
            <tr>
              <td colSpan={4}>No teams found</td>
            </tr>
          )   
        }
      </tbody>
    </table>
  )
}

export default TeamsTable;