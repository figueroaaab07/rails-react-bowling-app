import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import './Frames.css'

function Frame({ frame_number, ball_one_pins, ball_two_pins, ball_three_pins, frame_score, addUpdtFrame, scoreBowling, resultBowling }) {
  const initFrame = {frame_number: frame_number, ball_one_pins: ball_one_pins, ball_two_pins: ball_two_pins, ball_three_pins: ball_three_pins, frame_score: frame_score};
  const [frame, setFrame] = useState(() => []);
  const valid_ball_one_pins = new RegExp('^[XF0-9-]');
  const valid_ball_two_pins = new RegExp('^[XF0-9-/]');
  const valid_ball_three_pins = new RegExp('^[XF0-9-/]');
  const div_ball_one_pins = useRef(initFrame.ball_one_pins);
  const div_ball_two_pins = useRef(initFrame.ball_two_pins);
  const div_ball_three_pins = useRef(initFrame.ball_three_pins);
  const div_frame_score = useRef(initFrame.frame_score);
  // console.log(initFrame);
  useEffect(() => {
   setFrame(initFrame);
  }, [resultBowling]);  

  const nameElement = (eventTarget) => {
    switch(eventTarget) {
      case "box left":  return "ball_one_pins";
      case "box right": return "ball_two_pins";
      case "box extra": return "ball_three_pins";
   }
  }

  const onChange = (event) => {
    const name = nameElement(event.target.className);
    const validate = `valid_${name}`;
    if (event.target.innerText.length === 1 && eval(validate).test(event.target.innerText)) {
      setFrame({...frame, [name]: event.target.innerText});
    } else {
      setFrame({...frame, [name]: initFrame[name]});
    }
  }
  
  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  }
  
  const onBlur = (event) => {
    const name = nameElement(event.target.className);
    const adjust = `div_${name}`;
    const validate = `valid_${name}`;
    if (event.target.innerText.trim() === "" || event.target.innerText.length > 1 || !eval(validate).test(event.target.innerText) || (name === "ball_two_pins" && event.target.innerText === 'X' && frame.frame_number !== 10) || (name === "ball_two_pins" && event.target.innerText !== '/' && (parseInt(event.target.innerText, 10) + parseInt(frame.ball_one_pins, 10)) > 9) || frame.frame_number > scoreBowling.length + 1 || (name === "ball_two_pins" && event.target.innerText === 'X' && frame.frame_number !== 10) || (name === "ball_two_pins" && frame.ball_one_pins === 'X' && frame.frame_number !== 10 && (event.target.innerText !== ''))) {
      setFrame(frame => ({...frame, [name]: initFrame[name]}));
      eval(adjust).current.innerText = (initFrame[name] ? initFrame[name] : '');
      console.log(initFrame[name]);
    } else {
      addUpdtFrame({...frame, [name]: event.target.innerText});
      setFrame({...frame, [name]: event.target.innerText});
      console.log({...frame, [name]: event.target.innerText});
    }
  }

  return (
      <div className="frame">
        <div className="frame-number">{frame?.frame_number}</div>
        <div className="frame-score">
          <div ref={div_ball_one_pins} className="box left" frame_number={frame?.frame_number} name="ball_one_pins" contentEditable="true" onInput={onChange} onBlur={onBlur} onKeyDown={onKeyDown} suppressContentEditableWarning={true}>{frame?.ball_one_pins}</div>
          <div ref={div_ball_two_pins} className="box right" frame_number={frame?.frame_number} name="ball_two_pins" contentEditable="true" onInput={onChange} onBlur={onBlur} onKeyDown={onKeyDown} suppressContentEditableWarning={true}>{frame?.ball_two_pins}</div>
          <div ref={div_ball_three_pins} className="box extra" frame_number={frame?.frame_number} name="ball_three_pins" contentEditable="true" onInput={onChange} onBlur={onBlur} onKeyDown={onKeyDown} suppressContentEditableWarning={true}>{frame?.ball_three_pins}</div>
        </div>
        <div ref={div_frame_score} className="running-score">{frame.frame_score}</div>
      </div>
  )
}

export default Frame;