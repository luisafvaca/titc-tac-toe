import { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Square from '../square/component';

class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      roundIsNext: false,
      winnerId: null,
      winnerOptions: [[0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],]
    }
  }

  reactToClickOption = (position) => {
    const squares = this.state.squares.slice();
    if(squares[position] === null) {
      squares[position] = this.state.roundIsNext ? '0' : 'X';
      this.setState(
        {
          squares: squares,
          roundIsNext: !this.state.roundIsNext
        }
      )
    }
  }

  renderSquare = (i) => {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.reactToClickOption(i)}
      />
    );
  }

  restartGame = () => {
    this.setState({squares: Array(9).fill(null)})
  }

  calculateWinner = (squares) => {
    let hasWinner = {
                      win: false,
                      winnerCode: null
                    }
    this.state.winnerOptions.map((option) => {
      const winner = (squares[option[0]] === squares[option[1]] && squares[option[0]] != null) && (squares[option[0]] === squares[option[2]] && squares[option[0]] != null)
      if(winner){
        hasWinner.win = true
        hasWinner.winnerCode = squares[option[0]]
        setTimeout(this.restartGame, 1000)
      }
    })

    return hasWinner
  }

  render() {
    let winner = this.calculateWinner(this.state.squares)

    return (
      <div>
        <div className='title'>This TicTacToe is develop with class</div>
        {winner?.winnerCode ? <div className='winner'>The winner is: {winner?.winnerCode} </div> : null}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button onClick={this.restartGame}>Restart Game</button>
      </div>
    )
  }
}

export default Board