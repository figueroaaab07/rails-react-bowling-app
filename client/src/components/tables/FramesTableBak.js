import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { gameState } from "../../atoms/game";
import parseGame from "../../modules/parseGame";
import Frame from '../Frame';
import '../Frames.css'

function FramesTable({ scoreboard, name, allFrames, setAllFrames }) {
  const [scoreBowling, setScoreBowling] = useState(scoreboard);
  const [resultBowling, setResultBowling] = useState(parseGame(scoreboard));
  console.log(scoreboard, name, allFrames);
  
  function addUpdtFrame(frame) {
    const frameUpd = `${frame.ball_one_pins ? frame.ball_one_pins : ''}${frame.ball_two_pins ? frame.ball_two_pins : ''}${frame.ball_three_pins ? frame.ball_three_pins : ''}`;
    console.log(frame.frame_number);
    if (frame.frame_number > scoreBowling.length) {
      setResultBowling(parseGame([...scoreBowling, frameUpd]));
      setScoreBowling([...scoreBowling, frameUpd]);
      console.log([...scoreBowling, frameUpd]);
    } else {
		  setScoreBowling(scoreBowling.map((scoreFrame, index) => (index + 1 === frame.frame_number ? frameUpd : scoreFrame)));
      console.log(scoreBowling.map((scoreFrame, index) => (index + 1 === frame.frame_number ? frameUpd : scoreFrame)));
      setResultBowling(parseGame(scoreBowling.map((scoreFrame, index) => (index + 1 === frame.frame_number ? frameUpd : scoreFrame))));
      console.log(parseGame(scoreBowling.map((scoreFrame, index) => (index + 1 === frame.frame_number ? frameUpd : scoreFrame))));
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