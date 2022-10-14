import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    const updatBowlers = bowlers.map((bowler, index) => {
      if (index === position) {
        bowler.selected = !bowler.selected;
        return bowler;
      } else {
        return bowler;
      }
    });
    setBowlers(() => updatBowlers);
    console.log(updatBowlers);
  }

  async function addBowlerGames(bowlerSelected) {
    const checkBowler = bowlerGames.filter(bowlerGame => (bowlerGame.bowler.id === bowlerSelected.bowler_id) && (bowlerGame.game.id === bowlerSelected.game_id))
    if (checkBowler.length === 0) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bowlerSelected)
      };
      const response = await fetch("/bowler_games", requestOptions);
      const json = await response.json();
      console.log(json);
      console.log(json.selected);
    }
    navigate("/frames");
  }
  
  function handleSubmit(e) {
    const bowlersSelected = bowlers.filter(bowler => bowler.selected === true)
    .map(({bowler_first_name, bowler_last_name, ...rest}) => rest);
    console.log(bowlersSelected);
    bowlersSelected.forEach(bowlerSelected => addBowlerGames(bowlerSelected));
  }

  useEffect(() => {
    fillBowlers(team, setBowlers, game);
  }, []);

  return (
		<div className="some-page-wrapper">
			<div className="row">
				<div className="column">
          <button className="button-submit" type="submit" onClick={handleSubmit} >Bowlers Selected</button>
        </div>
				<div className="double-column">
          <div className="container">
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
                  bowlers.map(({bowler_id, bowler_first_name, bowler_last_name, selected, disabled}, index)  => {
                    return (
                      <tr key={index}>
                        <td>
                          <input type="checkbox" checked={selected} disabled={disabled} name="bowler_id" value={bowler_id} onChange={() => handleOnChange(index)} />
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default BowlerGames;