import React, { useState, useEffect } from 'react';
import './Frames.css'

function Frame({ frame_number, ball_one_pins, ball_two_pins, ball_three_pins, frame_score }) {
  const initFrame = {frame_number: frame_number, ball_one_pins: ball_one_pins, ball_two_pins: ball_two_pins, ball_three_pins: ball_three_pins, frame_score: frame_score};
  const [frame, setFrame] = useState(initFrame);

  function handleChange(e) {
    console.log(e.target);
    const {name, value} = e.target;
    setFrame({...frame, [name]: value});
  }

  return (
    <div className="frame">
      <div className="frame-number">{frame.frame_number}</div>
      <div className="frame-score">
          <input className="box left" type="text" maxLength="1" size="1" value={frame.ball_one_pins} name="ball_one_pins" onChange={handleChange} />
          <input className="box right" type="text" maxLength="1" size="1" value={frame.ball_two_pins} name="ball_two_pins" onChange={handleChange} />
          <input className="box extra" type="text" maxLength="1" size="1" value={frame.ball_three_pins} name="ball_three_pins" onChange={handleChange} />
      </div>
      <div className="running-score">{!isNaN(frame.frame_score) && frame.frame_score}</div>
    </div>
  )
}

export default Frame;