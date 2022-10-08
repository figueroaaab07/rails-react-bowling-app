import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { teamState } from "../atoms/team";
import { gameState } from "../atoms/game";
import { bowlerGameState } from "../atoms/bowlerGame";
import fillBowlers from "../modules/fillBowlers";

function BowlerGames() {
  const [bowlers, setBowlers] = useState(() => []);
  const [bowlerGames, setBowlerGames] = useState(() => []);
  const team = useRecoilValue(teamState);
  const game = useRecoilValue(gameState);
  const setBowlerGameState = useSetRecoilState(bowlerGameState);
  const [checkedState, setCheckedState] = useState([false , false, false, false]);

  async function getBowlerGames() {
    const response = await fetch("/bowler_games");
    const json = await response.json();
    setBowlerGames(json);
    console.log(json);
  };
  useEffect(() => {
    getBowlerGames();
  }, []);

  function handleOnChange(position) {
    const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
    setCheckedState(updatedCheckedState);
    const updatBowlers = bowlers.map((bowler, index) => {
      if (index === position) {
        bowler.checked = !bowler.checked;
        return bowler;
      } else {
        return bowler;
      }
    });
    setBowlers(() => updatBowlers);
    console.log(updatedCheckedState, updatBowlers);
  }

  useEffect(() => {
    fillBowlers(team, setBowlers, game);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Selected</th>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {bowlers.length > 0 ? (
          bowlers.map(({bowler_id, bowler_first_name, bowler_last_name}, index)  => {
            return (
              <tr key={index}>
                <td>
                  <input type="checkbox" checked={checkedState[index]} name="bowler_id" value={bowler_id} onChange={() => handleOnChange(index)} />
                </td>
                <td>{bowler_id}</td>
                <td>{bowler_first_name}</td>
                <td>{bowler_last_name}</td>
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

export default BowlerGames;