
const GameBoard = ({ onSelectSquare, board }) => {
   
  return (
    <ol className="game-board">
        { board.map((row, rowIndex) => 
            <li key={rowIndex}>
                <ol>
                        {row.map((symbol, colIndex) => 
                    <li key={colIndex}><button onClick={() =>  onSelectSquare(rowIndex, colIndex)} disabled={symbol !== null}>{symbol}</button></li>

                    )}
                </ol>
            </li>
        ) }
    </ol>
  )
}

export default GameBoard