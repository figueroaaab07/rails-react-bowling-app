import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { teamState } from "../atoms/team";
import GamesTable from './tables/GamesTable';

function Games() {
  const [teams, setTeams] = useState([]);
  const [matchTeams, setMatchTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [games, setGames] = useState([]);
  const [gamesFlat, setGamesFlat] = useState([]);
  const initTeam = {id: null, name: '', logo: ''};
  const [currentTeam, setCurrentTeam] = useState(initTeam);
  const setTeamState = useSetRecoilState(teamState);
  const teamAtom = useRecoilValue(teamState);
  const [errors, setErrors] = useState([]);
  let uniqueMatchTeams = [];

  async function getTeams() {
    const response = await fetch("/teams");
    const json = await response.json();
    if (response.ok) {
      setTeams(json);
    } else {
      setErrors(json.errors);
    }
  };
  useEffect(() => {
    getTeams();
  }, []);

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

  async function getMatches() {
    const response = await fetch("/matches");
    const json = await response.json();
    if (response.ok) {
      setMatches(json);
    } else {
      setErrors(json.errors);
    }
  };
  useEffect(() => {
    getMatches();
  }, []);

  async function getTournaments() {
    const response = await fetch("/tournaments");
    const json = await response.json();
    if (response.ok) {
      setTournaments(json);
    } else {
      setErrors(json.errors);
    }
  };
  useEffect(() => {
    getTournaments();
  }, []);

  async function getGames() {
    const response = await fetch("/games");
    const json = await response.json();
    if (response.ok) {
      setGames(json);
    } else {
      setErrors(json.errors);
    }
  };
  useEffect(() => {
    getGames();
  }, []);

  function matchTeamsFilter(team) {
    let matchTeamsFiltered = (matchTeams.filter(matchTeam => (matchTeam.home_team.id === team.id) || (matchTeam.guest_team.id === team.id)));
    const uniqueIds = [];
    uniqueMatchTeams = matchTeamsFiltered.filter(matchTeam => {
      const isDuplicate = uniqueIds.includes(matchTeam.id);
      if (!isDuplicate) {
        uniqueIds.push(matchTeam.id);
        return true;
      }
      return false;
    });
  }

  const handleChange = (e) => {
    setCurrentTeam(teams[+e.target.value]);
    setTeamState(teams[+e.target.value]);
    matchTeamsFilter(teams[+e.target.value]);
    fillArray();
  };

  function fillArray() {
    let games = [];
    uniqueMatchTeams.forEach(matchTeam => {
      let match = matches.filter(elem => elem.id === matchTeam.match.id);
      let tournament = tournaments.filter(elem => elem.id === match[0].tournament.id);
      matchTeam.games.forEach(game => {
        games.push({"game_id": game.id, "game_number": game.game_number, "match_team_id": matchTeam.id, "match_team_lanes": matchTeam.lanes, "guest_team_id": matchTeam.guest_team.id, "guest_team_name": matchTeam.guest_team.name, "guest_team_logo": matchTeam.guest_team.logo, "home_team_id": matchTeam.home_team.id, "home_team_name": matchTeam.home_team.name, "home_team_logo": matchTeam.home_team.logo, "match_id": matchTeam.match.id, "match_date": matchTeam.match.date, "match_number_games": matchTeam.match.number_games, "match_number_players": matchTeam.match.number_players, "tournament_id": match[0].tournament.id, "tournament_name": match[0].tournament.name, "tournament_start_date": match[0].tournament.start_date, "tournament_end_date": match[0].tournament.end_date, "tournament_number_dates": match[0].tournament.number_dates, "location_id": tournament[0].location.id, "location_name": tournament[0].location.name})
      })      
    })
    setGamesFlat(() => games);
  }

  return (
		<div className="some-page-wrapper">
			<div className="row">
				<div className="column">
          <h3>Select Team</h3>
          <form>
            <label htmlFor="team">Team:</label>
            <select onChange={handleChange}>
              <option key={"choose"} value="choose"> -- Select Team -- </option>
              {teams.map((team, index) => (
                <option key={index} value={index}>
                  {team.name}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div className="double-column">
          <div className="container">
            {errors.length > 0 && (
              <ul style={{ color: "red" }}>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}					  
            <h3>View Games</h3>
            <GamesTable gamesFlat={gamesFlat} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;