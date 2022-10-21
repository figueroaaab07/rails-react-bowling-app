import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { matchTeamState } from "../../atoms/matchTeam";
import ErrorHand from "../ErrorHand";

function MatchesTable({ matchTeams, editRow, deleteMatchTeam, teams }) {
  const [games, setGames] = useState([]);
  const setMatchTeamState = useSetRecoilState(matchTeamState);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  async function getGames() {
    const response = await fetch("/games");
    const json = await response.json();
    if (response.ok) {
      setGames(json);
    } else {
      setErrors(json.errors);
    }
  };
  useEffect(() => {
    getGames();
  }, []);

  function selectMatchTeam(matchTeam) {
    setMatchTeamState(matchTeam);
    navigate("/games");
  }

  return (
    <>
      {errors.length > 0 && (<ErrorHand errors={errors} setErrors={setErrors} />)}
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
              const gamesFiltered = games.filter(game => game.match_team.id === id);
              let isDelUpdable = gamesFiltered.every(game => game.bowlers.length > 0);
              return (
                <tr key={id}>
                  <td>
                    <button disabled={!isDelUpdable} onClick={() => editRow(matchTeam)}>Update</button>
                    <button disabled={!isDelUpdable} onClick={() => deleteMatchTeam(id)}>Delete</button>
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
    </>
  )
}

export default MatchesTable;