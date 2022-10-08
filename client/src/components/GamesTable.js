import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { gameState } from "../atoms/game";

function GamesTable({ gamesFlat }) {
  const setGameState = useSetRecoilState(gameState);
  const navigate = useNavigate();
  console.log(gamesFlat);

  function selectGame(game) {
    setGameState(game);
    console.log(game);
    navigate("/bowler_games");
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Actions</th>
          <th>ID</th>
          <th>Game Number</th>
          <th>Date</th>
          <th>Lanes</th>
          <th>Home Team</th>
          <th>Guest Team</th>
          <th>Tournament</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {gamesFlat.length > 0 ? (
          gamesFlat.map(game => {
            const {game_id, game_number, match_team_lanes, home_team_name, guest_team_name, match_date, tournament_name, location_name} = game;
            return (
              <tr key={game_id}>
                <td>
                  <button onClick={() => selectGame(game)}>Select</button>
                </td>
                <td>{game_id}</td>
                <td>{game_number}</td>
                <td>{match_date}</td>
                <td>{match_team_lanes}</td>
                <td>{home_team_name}</td>
                <td>{guest_team_name}</td>
                <td>{tournament_name}</td>
                <td>{location_name}</td>
              </tr>
            )
          })
          ) : (
            <tr>
              <td colSpan={4}>No games found</td>
            </tr>
          )   
        }
      </tbody>
    </table>
  )
}

export default GamesTable;