function fillBowlers(teamSelected, setBowlers, game, bowlerGames) {
  const updatedBowlers = []
  teamSelected.bowlers.forEach(bowler => {
    console.log(bowlerGames);
    const checkBowler = bowlerGames.filter(bowlerGame => (bowlerGame.bowler.id === bowler.id) && (bowlerGame.game.id === game.game_id))
    console.log(checkBowler);
    const selected = (checkBowler.length) ? checkBowler.selected : false
    updatedBowlers.push({id: null, selected: selected, bowler_id: bowler.id, bowler_first_name: bowler.first_name, bowler_last_name: bowler.last_name, game_score: null, game_id: game.game_id})
  })
  console.log(updatedBowlers);
  setBowlers(() => updatedBowlers);
  return updatedBowlers;
}

export default fillBowlers;