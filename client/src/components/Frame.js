import React, { useState, useEffect } from 'react';
import './Frames.css'

function Frame({ frame_number, ball_one_pins, ball_two_pins, ball_three_pins, frame_score, addUpdtFrame }) {
  const initFrame = {frame_number: frame_number, ball_one_pins: ball_one_pins, ball_two_pins: ball_two_pins, ball_three_pins: ball_three_pins, frame_score: frame_score};
  const [frame, setFrame] = useState();
  const valid_ball_one_pins = /^[XF0-9-]$/i
  const valid_ball_two_pins = /^[XF0-9-/]$/i
  const valid_ball_three_pins = /^[XF0-9-/]?$/i

  useEffect(() => {
    setFrame(initFrame);
  }, []);  
  console.log(frame);

  const nameElement = (eventTarget) => {
    switch(eventTarget) {
      case "box left":  return "ball_one_pins";
      case "box right": return "ball_two_pins";
      case "box extra": return "ball_three_pins";
   }
  }

  const onChange = (event) => {
    const name = nameElement(event.target.className);
    if (event.target.innerText.length === 1 && !valid_ball_one_pins.test(event.target.innerText)) {
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
    if (event.target.innerText.trim() === "" || event.target.innerText.length > 1) {
      setFrame({...frame, [name]: initFrame[name]});
      console.log(initFrame[name]);
    } else {
      onChange(event, addUpdtFrame(frame));
      setFrame({...frame, [name]: event.target.innerText});
      console.log({...frame, [name]: event.target.innerText});
    }
  }

  // console.log(frame);
  // function handleChange(e) {
  //   console.log(e.target);
  //   const {name, value} = e.target;
  // frame =  ({...frame, [name]: value});
  // }

  return (
      <div className="frame">
        <div className="frame-number">{frame?.frame_number}</div>
        <div className="frame-score">
          {/* <div className="box left" frame_number={frame.frame_number} name="ball_one_pins" contentEditable="true" onInput={(e) => console.log(e.target)} suppressContentEditableWarning={true}>{frame.ball_one_pins}</div>
          <div className="box right" frame_number={frame.frame_number} name="ball_two_pins" contentEditable="true" onInput={(e) => console.log(e.target)} suppressContentEditableWarning={true}>{frame.ball_two_pins}</div>
          <div className="box extra" frame_number={frame.frame_number} name="ball_three_pins" contentEditable="true" onInput={(e) => console.log(e.target)} suppressContentEditableWarning={true}>{frame.ball_three_pins}</div> */}
          <div className="box left" frame_number={frame?.frame_number} name="ball_one_pins" contentEditable="true" onInput={onChange} onBlur={onBlur} onKeyDown={onKeyDown} suppressContentEditableWarning={true}>{frame?.ball_one_pins}</div>
          <div className="box right" frame_number={frame?.frame_number} name="ball_two_pins" contentEditable="true" onInput={onChange} onBlur={onBlur} onKeyDown={onKeyDown} suppressContentEditableWarning={true}>{frame?.ball_two_pins}</div>
          <div className="box extra" frame_number={frame?.frame_number} name="ball_three_pins" contentEditable="true" onInput={onChange} onBlur={onBlur} onKeyDown={onKeyDown} suppressContentEditableWarning={true}>{frame?.ball_three_pins}</div>
        </div>
        <div className="running-score">{!isNaN(frame?.frame_score) && frame.frame_score}</div>
      </div>
  )
}

export default Frame;