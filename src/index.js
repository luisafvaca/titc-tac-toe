import { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Board from './components/board/component';
import BoardV2 from './components/board_v2/component.js'
import './index.css';

class App extends Component {
  render() {
    return (
    <div className="game">
      <div className="game-board">
        <Board />
        <BoardV2 />
      </div>
    </div>
    )
  }
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);