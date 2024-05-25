import { useState } from 'react';

import GameBoard from './components/GameBoard';
import Player from './components/Player';
import GameLogo from './images/game-logo.png'
import Log from './components/Log';
import GameOver from './components/GameOver';
import { deriveWinner, deriveGameBoard, deriveActivePlayer } from './functions';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function App() {
  const [players, setPlayers] = useState({
    "X": "Player 1",
    "O": "Player 2"
  })
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns, initialGameBoard)

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner

  
  const handleSelectSquare = (rowIndex, colIndex) => {
  
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updateTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns];

      return updateTurns;
    });
  };

  const handleRematch = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  };

  return (
    <>
      <header>
        <img src={GameLogo} alt="game-logo"/>
        <h1>Tic-Tac-Toe</h1>
      </header>
      <main>
        <div className='game-container'>
          <ol className='players highlight-player'>
            <Player onChangeName={handlePlayerNameChange} initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
            <Player onChangeName={handlePlayerNameChange}  initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
          </ol>
          { (winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
        </div>
        <Log turns={gameTurns}/>
      </main>
    </>
  )
}

export default App