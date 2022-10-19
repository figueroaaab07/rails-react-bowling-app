import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { teamState } from "../atoms/team";
import { gameState } from "../atoms/game";
import fillBowlers from "../modules/fillBowlers";
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from "../modules/ErrorFallback"
import parseGame from "../modules/parseGame";
import FramesTable from './tables/FramesTable';

function Frames() {
  const [scoreboard, setScoreboard] = useState(() => ['8/','X','9-','X','X']);
  const result = parseGame(scoreboard);
  const [bowlerGames, setBowlerGames] = useState(() => []);
  const [frames, setFrames] = useState(() => []);
  const [frame, setFrame] = useState(() => []);
  const [teams, setTeams] = useState(() => []);
  const team = useRecoilValue(teamState);
  const gamesFlat = useRecoilValue(gameState);
  const navigate = useNavigate();
  console.log(gamesFlat);

  const pins1 = '3';
  const pins2 = '/';
  const pins3 = null;
  const frame1 = `${pins1}${pins2}${pins3 ? pins3 : ''}`;
  console.log(frame1);
  async function getFrames() {
    const response = await fetch("/frames");
    const json = await response.json();
    setFrames(json);
    console.log(json);
  };
  useEffect(() => {
    getFrames();
  }, []);

  async function getBowlerGames() {
    const response = await fetch("/bowler_games");
    const json = await response.json();
    console.log(json.filter((bowlerGame) => (bowlerGame.game.id === gamesFlat.game_id && bowlerGame.selected === true)));
    setBowlerGames(json);
    console.log(json);
  };
  useEffect(() => {
    getBowlerGames();
  }, []);

  async function getTeams() {
    const response = await fetch("/teams");
    const json = await response.json();
    console.log(json.filter((team) => (team.id === gamesFlat.home_team_id || team.id === gamesFlat.guest_team_id)));
    // console.log(json);
    setTeams(json.filter((team) => (team.id === gamesFlat.home_team_id || team.id === gamesFlat.guest_team_id)));
  };
  useEffect(() => {
    getTeams();
  }, []);

  function fillTeams(teams, bowlerGames) {
    console.log(teams, bowlerGames);
  }

  useEffect (() => {
    fillTeams(teams, bowlerGames);
  }, []);

  // useEffect(() => {
  //   setScoreboard(['8/','X','9-','X','X']);
  // }, []);

  console.log([...Array(10)]);
      
  return (
		<div className="some-page-wrapper">
      <h3>Tournament: {gamesFlat.tournament_name} - Date: {gamesFlat.match_date} - Game: {gamesFlat.game_number} - Lanes: {gamesFlat.match_team_lanes}</h3>
      <h3>Home Team: {gamesFlat.home_team_name}</h3>
			<div className="container">
      {/* {locations.length > 0 ? (
          locations.map(location => {
            const {id, name, street_address, country, state, city, zip_code, phone, number_lanes, tournaments} = location;
            const isDeletable = tournaments.length === 0;
            return (
              <tr key={id}>
                <td> */}

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