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
  const [scoreboard, setScoreboard] = useState(() => []);
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
    setBowlerGames(json);
    console.log(json);
  };
  useEffect(() => {
    getBowlerGames();
  }, []);

  async function getTeams() {
    const response = await fetch("/teams");
    const json = await response.json();
    setTeams(json);
  };
  useEffect(() => {
    getTeams();
  }, []);

  console.log([...Array(10)]);
      
  return (
    <div>
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
      <FramesTable scoreboard={scoreboard} name="Ernest"/>
    </div>
  )
}

export default Frames;