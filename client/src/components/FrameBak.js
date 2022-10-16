import React, { useState, useEffect } from 'react';
import './Frames.css'

function Frame({ frame_number, ball_one_pins, ball_two_pins, ball_three_pins, frame_score }) {
  const initFrame = [frame_number, ball_one_pins, ball_two_pins, ball_three_pins, frame_score];
  const [frame, setFrame] = useState(initFrame);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setFrame(initFrame);
    setIsloading(false);
  }, []);

  return (
    <div className="frame">
      <div className="frame-number">{frame.frame_number}</div>
      <div className="frame-score">
        <div className="box left" contentEditable="true">{frame.ball_one_pins}</div>
        <div className="box right" contentEditable="true">{frame.ball_two_pins}</div>
        <div className="box extra" contentEditable="true">{frame.ball_three_pins}</div>
      </div>
      <div className="running-score">{!isNaN(frame.frame_score) && frame.frame_score}</div>
    </div>
  )
}

export default Frame;