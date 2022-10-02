import React, { useState } from "react";
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from "../modules/ErrorFallback"
import Scorecard from "./Scorecard";
import bowlingScore from "../modules/bowlingScore";
import parseGame from "../modules/parseGame";

function Frames() {
  const [game, setGame] = useState(['5/','9-','X','X','5/','8-'])
  const result = parseGame(game);
  return (
    <div>
      {/* <button onClick={() => setExplode(e => !e)}>toggle explode</button> */}
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setGame(['5/','9-','X','X','5/','8-'])}
      >
        {result.map(r => <div>frame: {r.outcome}, cumulative: {r.cumulative}, score: {r.score}</div>)}
      </ErrorBoundary>
    </div>
  )


  console.log(parseGame(game));

  // return (
  //   <>
  //     <Scorecard />
  //   </>
  // );
}

export default Frames;