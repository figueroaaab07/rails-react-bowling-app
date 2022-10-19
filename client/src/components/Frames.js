import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
// import { teamState } from "../atoms/team";
import { gameState } from "../atoms/game";
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from "../modules/ErrorFallback"
import parseGame from "../modules/parseGame";
import FramesTable from './tables/FramesTable';

function Frames() {
  const [scoreboard, setScoreboard] = useState(() => ['8/','X','9-','X','X']);
  const [bowlerGames, setBowlerGames] = useState(() => []);
  const [frames, setFrames] = useState(() => []);
  const [frame, setFrame] = useState(() => []);
  const [teams, setTeams] = useState(() => []);
  // const team = useRecoilValue(teamState);
  const result = parseGame(scoreboard);
  const gamesFlat = useRecoilValue(gameState);
  const navigate = useNavigate();
  console.log(gamesFlat);

  const pins1 = '3';
  const pins2 = '/';
  const pins3 = null;
  const frame1 = `${pins1}${pins2}${pins3 ? pins3 : ''}`;
  console.log(frame1);

  async function getBowlerGamesAndTeams(){
    const bowlerGames = await fetch("/bowler_games").then(res => res.json()).then(data => data.filter((bowlerGame) => (bowlerGame.game.id === gamesFlat.game_id && bowlerGame.selected === true)));
    setBowlerGames(bowlerGames);
    const teams = await fetch("/teams").then(res => res.json()).then(data => data.filter((team) => (team.id === gamesFlat.home_team_id || team.id === gamesFlat.guest_team_id)));
    setTeams(teams);
    console.log(bowlerGames, teams);
    // const homeBowlerGames = bowlerGames.filter(bowlerGame => gamesFlat.home_team_id === )
  }
  useEffect(() => {
    getBowlerGamesAndTeams();
  }, []);

  console.log([...Array(10)]);
      
  return (
		<div className="some-page-wrapper">
      <h3>Tournament: {gamesFlat.tournament_name} - Date: {gamesFlat.match_date} - Game: {gamesFlat.game_number} - Lanes: {gamesFlat.match_team_lanes}</h3>
      <h3>Home Team: {gamesFlat.home_team_name}</h3>
			<div className="container">
        <FramesTable scoreboard={scoreboard} name="Richard"/>
        <FramesTable scoreboard={scoreboard} name="Patrick"/>
        <FramesTable scoreboard={scoreboard} name="Theresa"/>
      </div>
      <h3>Guest Team: {gamesFlat.guest_team_name}</h3>
			<div className="container">
      {/* <button onClick={() => setExplode(e => !e)}>toggle explode</button>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setGame(['5/','9-','X','X','5/','8'])}
      >
        {result.map(r => <div>frame: {r.outcome[0]} {r.outcome[1]}, cumulative: {r.cumulative}, score: {r.score}</div>)}
      </ErrorBoundary> */}
        <FramesTable scoreboard={scoreboard} name="Richard"/>
        <FramesTable scoreboard={scoreboard} name="Patrick"/>
        <FramesTable scoreboard={scoreboard} name="Theresa"/>
      </div>
    </div>
  )
}

export default Frames;