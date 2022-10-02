function bowlingScore(frames) {
  let score = 0
  let frame = frames.split(' ')
  for (let i = 0; i < frame.length; i++) { 
      if (i === frame.length - 1) {
          frame = frame[i].split('')
          for (let j = 0; j < frame.length; j++) {
            score = !isNaN(frame[j]) && frame[j+1] !== '/' ? score + parseInt(frame[j]) 
              : frame[j] === 'X' || frame[j] === '/' ? score + 10 
              : score
          }
      } else {         
        score = i === frame.length - 3 && frame[i] === 'X' && frame[i+1] === 'X' && frame[i+2][0] === 'X' || i === frame.length - 2 && frame[i] === 'X' && frame[i+1][0] === 'X' && frame[i+1][1] === 'X' ? score + 30
          : i === frame.length - 2 && frame[i] === 'X' && frame[i+1][0] === 'X' && !isNaN(frame[i+1][1]) ? score + 20 + parseInt(frame[i+1][1])
          : i === frame.length - 2 && frame[i].includes('/') && frame[i+1][0] === 'X' ? score + 20
          : !isNaN(frame[i]) ? score + parseInt(frame[i][0]) + parseInt(frame[i][1])
          : frame[i] === 'X' && !isNaN(frame[i+1]) ? score + 10 + parseInt(frame[i+1][0]) + parseInt(frame[i+1][1]) 
          : frame[i].includes('/') && !isNaN(frame[i+1]) | frame[i+1].includes('/') ? score + 10 + parseInt(frame[i+1][0])
          : frame[i] === 'X' && frame[i+1].includes('/') || frame[i].includes('/') && frame[i+1] === 'X' ? score + 20
          : frame[i] === 'X' && frame[i+1] === 'X' && frame[i+2] === 'X' ? score + 30
          : frame[i] === 'X' && frame[i+1] === 'X' && frame[i+2].includes('/') | !isNaN(frame[i+2]) ? score + 20 + parseInt(frame[i+2][0])
          : null
      }
      console.log(frame.length, i, score);
  }
  return score
}

export default bowlingScore
