import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { matchState } from "../../atoms/match";
import ErrorHand from "../ErrorHand";

function MatchesTable({ matches, editRow, deleteMatch }) {
  const [matchTeams, setMatchTeams] = useState([]);
  const setMatchState = useSetRecoilState(matchState);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  async function getMatchTeams() {
    const response = await fetch("/match_teams");
    const json = await response.json();
    if (response.ok) {
      setMatchTeams(json);
    } else {
      setErrors(json.errors);
    }
  };
  useEffect(() => {
    getMatchTeams();
  }, []);

  function selectMatch(match) {
    setMatchState(match);
    navigate("/match_teams");
  }

  return (
    <>
      {errors.length > 0 && (<ErrorHand errors={errors} setErrors={setErrors} />)}
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
              const matchAssigned = matchTeams.filter(matchTeam => matchTeam.match.id === id);
              const isDelUpdable = !(matchAssigned?.length > 0);
              return (
                <tr key={id}>
                  <td>
                    <button onClick={() => selectMatch(match)}>Select</button>
                    <button disabled={!isDelUpdable} onClick={() => editRow(match)}>Update</button>
                    <button disabled={!isDelUpdable} onClick={() => deleteMatch(id)}>Delete</button>
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
    </>
  )
}

export default MatchesTable;