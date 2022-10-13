import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { gameState } from "../../atoms/game";
import Frame from '../Frame';
import '../Frames.css'

function FramesTable({ game, result, name }) {
  // let score = [...game];
  // let newScore = [...score]
  // if (score.length < 10) {
  //   for (let i=0; i < 13-score.length; i++) {
  //     score = [...score, '  '];
  //   }
  // }
  // console.log(score);
  
  return (
    <div>
      <div className="player-name">{name}</div>
      <div className="score-board">
        {[...Array(10)].map((o, i) => (
          <Frame
            key={i}
            frame_number={i + 1}
            ball_one_pins={game[i][0]}
            ball_two_pins={game[i][1]}
            ball_three_pins={game[i][2]}
            frame_score={result[i].cumulative}
          />
        ))}
      </div>
    </div>
  )
}

export default FramesTable;