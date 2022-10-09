function fillBowlers(teamSelected, setBowlers, game) {
  const updatedBowlers = []
  teamSelected.bowlers.forEach(bowler => {
    updatedBowlers.push({id: null, selected: false, bowler_id: bowler.id, bowler_first_name: bowler.first_name, bowler_last_name: bowler.last_name, game_score: null, game_id: game.game_id})
  })
  console.log(updatedBowlers);
  setBowlers(() => updatedBowlers);
  return updatedBowlers;
}

export default fillBowlers;
