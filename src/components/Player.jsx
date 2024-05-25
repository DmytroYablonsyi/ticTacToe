import React, { useState } from 'react'

const Player = ({initialName, symbol, isActive, onChangeName}) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ playerName, setPlayerName] = useState(initialName)

    const handleEditClick = () => {
        setIsEditing(prev => !prev);

        if(isEditing){
            onChangeName(symbol, playerName);
        }
    };

    const handlePlayerName = (e) => {
        setPlayerName(e.target.value)
    };

        
    let playerNameBox = <span className='player-name'>{ playerName }</span>

    if(isEditing) {
        playerNameBox = <input onChange={handlePlayerName} value={playerName} type='text' required/>
    };
  return (
    <li className={isActive ? "active" : undefined}>
        <span className='player'>
            {playerNameBox}
            <span className='player-symbol'>{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{ isEditing ? "Save" : "Edit" }</button>
    </li>
  );
};

export default Player 