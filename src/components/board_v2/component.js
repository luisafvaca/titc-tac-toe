import React, { useState, useEffect, useRef } from 'react';
import Square from '../square/component';

const BoardV2 = ({}) => {
  const [squares, setSquares] =  useState(Array(9).fill(null));
  const [roundIsNext, setRoundIsNext] = useState(false);
  const [winnerOptions, ] = useState([[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],]);
    const [winnerId, setWinnerId] = useState(null);

  const mounted = useRef();
    useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
    } else {
      calculateWinner(squares)
    }
  });

  const calculateWinner = (squares) => {
    console.log('entrando')
    let hasWinner = {
                      win: false,
                      winnerCode: null
                    }
    winnerOptions.map((option) => {
      console.log(option)
      const winner = (squares[option[0]] === squares[option[1]] && squares[option[0]] != null) && (squares[option[0]] === squares[option[2]] && squares[option[0]] != null)
      // console.log(winner, 'winner')
      if(winner){
        hasWinner.win = true
        hasWinner.winnerCode = squares[option[0]]
        setWinnerId(squares[option[0]])
        // setTimeout(this.restartGame, 1000)
      }
    })

    return hasWinner
  }

  const reactToClickOption = (position) => {
    const slicedSquares =  squares.slice()
    if(slicedSquares[position] === null) {
      slicedSquares[position] = roundIsNext ? '0' : 'X'
      setSquares(slicedSquares)
      setRoundIsNext(!roundIsNext)
    }
  }
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => reactToClickOption(i)}
      />
    );
  }

  const restartGame = () => {
    setSquares(Array(9).fill(null))
  }

  return (
    <div>
      <div className='title'>This TicTacToe is develop with hooks</div>
      {winnerId ? <div className='winner'> {`The winner is: ${winnerId}`} </div> : null }
      <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button onClick={restartGame}>Restart Game</button>
    </div>
  )
}


export default BoardV2;