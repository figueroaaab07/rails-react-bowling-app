import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { gameState } from "../../atoms/game";
import parseGame from "../../modules/parseGame";
import Frame from '../Frame';
import '../Frames.css'

function FramesTable({ scoreboard, name }) {
  const result = parseGame(scoreboard);
  console.log(scoreboard, result);

  function addUpdtFrame(frame) {
    
  }

  return (
    <div>
      <div className="player-name">{name}</div>
      <div className="score-board">
        {new Array(10).fill(null).map((o, i) => (
          <Frame
            key={i}
            frame_number={i + 1}
            ball_one_pins={scoreboard[i]?.[0]}
            ball_two_pins={scoreboard[i]?.[1]}
            ball_three_pins={scoreboard[i]?.[2]} 
            frame_score={result[i]?.cumulative}
            addUpdtFrame={addUpdtFrame}
          />
        ))}
      </div>
    </div>
  )
}

export default FramesTable;