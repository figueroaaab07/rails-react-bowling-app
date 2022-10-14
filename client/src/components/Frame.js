import React, { useState, useEffect } from 'react';
import './Frames.css'

function Frame({ frame_number, ball_one_pins, ball_two_pins, ball_three_pins, frame_score }) {
  return (
    <div className="frame">
      <div className="frame-number">{frame_number}</div>
      <div className="frame-score">
        <div className="box left">{ball_one_pins || ''}</div>
        <div className="box right">{ball_two_pins || ''}</div>
        <div className="box extra">{ball_three_pins || ''}</div>
      </div>
      <div className="running-score">{!isNaN(frame_score) && frame_score}</div>
    </div>
  )
}

export default Frame;