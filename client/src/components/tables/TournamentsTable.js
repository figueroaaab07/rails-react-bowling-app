import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { tournamentState } from "../../atoms/tournament";

function TournamentsTable({ tournaments, editRow, deleteTournament }) {
  const setTournamentState = useSetRecoilState(tournamentState);
  const navigate = useNavigate();

  function selectTournament(tournament) {
    setTournamentState(tournament);
    navigate("/matches");
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Actions</th>
          <th>ID</th>
          <th>Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Number Dates</th>
        </tr>
      </thead>
      <tbody>
        {tournaments.length > 0 ? (
          tournaments.map(tournament => {
            const {id, name, start_date, end_date, number_dates, matches} = tournament;
            const isDelUpdable = !(matches?.length > 0);
            return (
              <tr key={id}>
                <td>
                  <button onClick={() => selectTournament(tournament)}>Select</button>
                  <button disabled={!isDelUpdable} onClick={() => editRow(tournament)}>Update</button>
                  <button disabled={!isDelUpdable} onClick={() => deleteTournament(id)}>Delete</button>
                </td>
                <td>{id}</td>
                <td>{name}</td>
                <td>{start_date}</td>
                <td>{end_date}</td>
                <td>{number_dates}</td>
              </tr>
            )
          })
          ) : (
            <tr>
              <td colSpan={4}>No tournaments found</td>
            </tr>
          )   
        }
      </tbody>
    </table>
  )
}

export default TournamentsTable;