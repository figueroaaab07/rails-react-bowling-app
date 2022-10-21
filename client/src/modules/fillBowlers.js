function fillBowlers(teamSelected, setBowlers, game) {
  const updatedBowlers = []
  fetch("/bowler_games")
  .then((response) => response.json())
  .then((data) => {
    teamSelected.bowlers.forEach(bowler => {
      const checkBowler = data.filter(bowlerGame => (bowlerGame.bowler.id === bowler.id) && (bowlerGame.game.id === game.game_id))
      const selected = (checkBowler.length) ? checkBowler[0].selected : false;
      const disabled = (checkBowler.length) ? (checkBowler[0].frames.length ? true : false) : false;
      updatedBowlers.push({id: null, selected: selected, disabled: disabled, bowler_id: bowler.id, bowler_first_name: bowler.first_name, bowler_last_name: bowler.last_name, game_score: null, game_id: game.game_id})
    })
    setBowlers(() => updatedBowlers);
    return updatedBowlers;
  })
};

export default fillBowlers;
