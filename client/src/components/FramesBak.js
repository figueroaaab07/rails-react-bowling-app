import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { teamState } from "../atoms/team";
import { gameState } from "../atoms/game";
import fillBowlers from "../modules/fillBowlers";
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from "../modules/ErrorFallback"
import bowlingScore from "../modules/bowlingScore";
import parseGame from "../modules/parseGame";
import FramesTable from './tables/FramesTable';

function Frames() {
  const [game, setGame] = useState(() => []);
  const result = parseGame(game);
  const [bowlerGames, setBowlerGames] = useState(() => []);
  const [frames, setFrames] = useState(() => []);
  const [frame, setFrame] = useState(() => []);
  const [teams, setTeams] = useState(() => []);
  const team = useRecoilValue(teamState);
  const gamesFlat = useRecoilValue(gameState);
  const navigate = useNavigate();

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
      <FramesTable game={game} result={result} name="Richard"/>
      <FramesTable game={game} result={result} name="Patrick"/>
      <FramesTable game={game} result={result} name="Theresa"/>
      <FramesTable game={game} result={result} name="Ernest"/>
    </div>
  )
}

export default Frames;