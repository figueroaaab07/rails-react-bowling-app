import React, { useState } from 'react';
import parseGame from "../../modules/parseGame";
import Frame from '../Frame';
import '../Frames.css'

function FramesTable({ scoreboard, name, allFrames, setAllFrames, bowlerGame }) {
  const initScoreBowling = scoreboard.length > 0 ? scoreboard.map(scoreFrame => `${scoreFrame.ball_one_pins ? scoreFrame.ball_one_pins : ''}${scoreFrame.ball_two_pins ? scoreFrame.ball_two_pins : ''}${scoreFrame.ball_three_pins ? scoreFrame.ball_three_pins : ''}`) : '';
  const [scoreBowling, setScoreBowling] = useState(initScoreBowling);
  const [resultBowling, setResultBowling] = useState(parseGame(initScoreBowling));

  async function addFrame(frame) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(frame)
    };
    const response = await fetch("/frames", requestOptions);
    const json = await response.json();
    setAllFrames(allFframes => allFframes.concat(json));
  };

  async function updateFrame(id, updatedFrame) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFrame)
    };
    const response = await fetch(`/frames/${id}`, requestOptions);
    const json = await response.json();
		setAllFrames(allFrames.map(allFrame => (allFrame.id === id ? json : allFrame)))
	}
  
  function addUpdtFrame(frame) {
    const frameUpd = `${frame.ball_one_pins ? frame.ball_one_pins : ''}${frame.ball_two_pins ? frame.ball_two_pins : ''}${frame.ball_three_pins ? frame.ball_three_pins : ''}`;
    if (frame.frame_number > scoreBowling.length) {
      const frameAdd = {...frame, ["id"]: null, ["bowler_game_id"]: bowlerGame.id};
      addFrame(frameAdd);
      setResultBowling(parseGame([...scoreBowling, frameUpd]));
      setScoreBowling([...scoreBowling, frameUpd]);
    } else {
      const framesUpdt = allFrames.filter(frameAct => (frameAct.bowler_game.id === bowlerGame.id));
      const frameUpdt = framesUpdt.filter(frameAct => (frameAct.frame_number === frame.frame_number));
      updateFrame(frameUpdt[0].id, frame);
      setScoreBowling(scoreBowling.map((scoreFrame, index) => (index + 1 === frame.frame_number ? frameUpd : scoreFrame)));
      setResultBowling(parseGame(scoreBowling.map((scoreFrame, index) => (index + 1 === frame.frame_number ? frameUpd : scoreFrame))));
      const resultUp = (parseGame(scoreBowling.map((scoreFrame, index) => (index + 1 === frame.frame_number ? frameUpd : scoreFrame))));
      framesUpdt.forEach(frameUp => updateFrame(frameUp.id, {["frame_score"]: resultUp[frameUp.frame_number - 1].cumulative}))
    }
  }

  return (
    <div>
      <div className="player-name">{name}</div>
      <div className="score-board">
        {new Array(10).fill(null).map((o, i) => (
          <Frame
            key={i}
            frame_number={i + 1}
            ball_one_pins={scoreBowling[i]?.[0]}
            ball_two_pins={scoreBowling[i]?.[1]}
            ball_three_pins={scoreBowling[i]?.[2]} 
            frame_score={resultBowling[i]?.cumulative}
            addUpdtFrame={addUpdtFrame}
            scoreBowling={scoreBowling}
            resultBowling={resultBowling}
          />
        ))}
      </div>
    </div>
  )
}

export default FramesTable;