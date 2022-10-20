import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
// import { teamState } from "../atoms/team";
import { gameState } from "../atoms/game";
import { homeBowlerGamesState } from "../atoms/homeBowlerGames";
import { guestBowlerGamesState } from "../atoms/guestBowlerGames";
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
  const gamesFlat = useRecoilValue(gameState);
  const setHomeBowlerGames = useSetRecoilState(homeBowlerGamesState);
  const setGuestBowlerGames = useSetRecoilState(guestBowlerGamesState);
  const homeAtom = useRecoilValue(homeBowlerGamesState);
  const guestAtom = useRecoilValue(guestBowlerGamesState);

  const navigate = useNavigate();
  let homeBowlerGames = [];
  let guestBowlerGames = [];
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
    const homeBowlersId = teams.filter(team => team.id === gamesFlat.home_team_id)[0].bowlers.map(bowler => bowler.id);
    const guestBowlersId = teams.filter(team => team.id === gamesFlat.guest_team_id)[0].bowlers.map(bowler => bowler.id);
    homeBowlerGames = bowlerGames.filter(bowlerGame => homeBowlersId.includes(bowlerGame.bowler.id));
    setHomeBowlerGames(homeBowlerGames);
    guestBowlerGames = bowlerGames.filter(bowlerGame => guestBowlersId.includes(bowlerGame.bowler.id));
    setGuestBowlerGames(guestBowlerGames);
    console.log(homeBowlerGames, guestBowlerGames);
    guestBowlerGames.map(({bowler, frames})  => {
      console.log(bowler.id, frames,`${bowler.first_name} ${bowler.last_name}`)
    });
  }
  useLayoutEffect(() => {
    getBowlerGamesAndTeams();
  }, []);

  return (
		<div className="some-page-wrapper">
      <h3>Tournament: {gamesFlat.tournament_name} - Date: {gamesFlat.match_date} - Game: {gamesFlat.game_number} - Lanes: {gamesFlat.match_team_lanes}</h3>
      <h3>Home Team: {gamesFlat.home_team_name}</h3>
			<div className="container">
        {homeAtom.length > 0 && (
          homeAtom.map(homeBowlerGame => {
            const {frames, bowler} = homeBowlerGame;
            return (
              <FramesTable key={bowler.id} scoreboard={frames} name={`${bowler.first_name} ${bowler.last_name}`}/>
            )
          })
        )}
      </div>
      <h3>Guest Team: {gamesFlat.guest_team_name}</h3>
			<div className="container">
        {guestAtom.length > 0 && (
          guestAtom.map((guestBowlerGame) => {
            const {frames, bowler} = guestBowlerGame;
            return (
              <FramesTable key={bowler.id} scoreboard={frames} name={`${bowler.first_name} ${bowler.last_name}`}/>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Frames;