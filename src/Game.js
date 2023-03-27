//defs
import React, { useEffect, useState } from 'react';

//styles
import './gamestyle.css';

//helpers
import { dummyArray } from './utils';

function WordTicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [squareClasses, setSquareClasses] = useState(Array(9).fill(''));
    const [xIsNext, setXIsNext] = useState(true);
    const [isGameStarted, setGameStarted] = useState(false);
    const [currentWord, setCurrentWord] = useState("");
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');


    function handleClick(i) {
        const newBoard = [...board];
        const _squareClasses = [...squareClasses];
        newBoard[i] = currentWord;
        _squareClasses[i] = xIsNext ? 'player1' : 'player2';
        setBoard(newBoard);
        setSquareClasses(_squareClasses);
        setXIsNext(!xIsNext);
        generateRandomWord();
    }

    function renderSquare(i) {
        return (
            <button disabled={!isGameStarted || !!board[i]} className={"square" + " " + squareClasses[i]} id={'square-' + i} onClick={() => handleClick(i)}>
                {board[i]}
            </button>
        );
    }

    let winner;
    let status;

    const generateRandomWord = () => {
        let randomWord = dummyArray[Math.floor(Math.random() * dummyArray.length)];
        setCurrentWord(randomWord);
        return randomWord;
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setSquareClasses(Array(9).fill(''));
        setPlayer1('');
        setPlayer2('');
        setGameStarted(false);
    }

    const startGame = () => {
        setGameStarted(true);
    }

    useEffect(() => {
        generateRandomWord();
    }, []);

    useEffect(() => {
        winner = calculateWinner(board, squareClasses);
        status = isGameStarted ? winner ? `Winner: ${!xIsNext ? player1 : player2}` : `Next player: ${xIsNext ? player1 : player2}` : '';
    }, [board]);


    return (
        <>
            <div className='game-info'>
                Player 1: <input type="text" value={player1} readOnly={isGameStarted} onChange={(e) => setPlayer1(e.target.value)} /> <br />
            </div>
            <div className='game-info'>
                Player 2: <input type="text" value={player2} readOnly={isGameStarted} onChange={(e) => setPlayer2(e.target.value)} /> <br />
            </div>
            <div className='game-info'>
                <button disabled={isGameStarted} onClick={startGame}>Start Game</button>
            </div>
            <div className="game-info">
                {isGameStarted ? <div>
                    Current Word : {currentWord}
                </div> : null}
                <div className="game-board">
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
                </div>
                <div className="game-info">
                    <div>{status}</div>
                </div>
                <div className='game-info'>
                    <button onClick={resetGame}>Reset Game</button>
                </div>
            </div>
        </>
    );
}

function hasCommonLetter(str1, str2, str3) {
    if (str1 && str2 && str3) {
        for (let i = 0; i < str1?.length; i++) {
            const char = str1[i];
            if (str2.includes(char) && str3.includes(char)) {
                return true;
            }
        }
        return false;
    }
}

const isClassSame = (class1, class2, class3) => class1 === class2 && class2 === class3;


function calculateWinner(squares, _squareClasses) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (hasCommonLetter(squares[a], squares[b], squares[c]) && isClassSame(_squareClasses[a], _squareClasses[b], _squareClasses[c])) {
            lines[i].forEach(iIndex => {
                document.getElementById('square-' + iIndex).classList.add('winner');
            });

            return squares[a];
        }
    }
    return null;
}

export default WordTicTacToe;
