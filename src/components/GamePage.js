import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import './GamePage.scss';

function getTimestamp() {
  return (new Date()).getTime()
}

function prepend(string, length) {
  while(string.length < length) {
    string = '0' + string;
  }
  return string;
}

function GamePage() {
  let timerHandle, currentTime, displayOperator, operator;

  const history = useHistory();
  const { operation } = useParams();

  const [startFlag, setStartFlag] = useState(false);
  const [stopFlag, setStopFlag] = useState(false);
  const [timer, setTimer] = useState(0);
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [actualResult, setActualResult] = useState(0);
  const [round, setRound] = useState(0);
  const [passed, setPassed] = useState(0);
  const [resultInput, setResultInput] = useState('');

  switch(operation) {
    case 'addition':
      displayOperator = '+';
      operator = '+';
      break;
    case 'subtraction':
      displayOperator = '-';
      operator = '-';
      break;
    case 'multiplication':
      displayOperator = 'x';
      operator = '*';
      break;
    case 'division':
      displayOperator = <span class="division-symbol">&#247;</span>;
      operator = '/';
      break;
  }

  useEffect(() => {
    if(startFlag) {
      let startTime = getTimestamp();
      timerHandle = setInterval(() => {
        currentTime = getTimestamp();
        setTimer(currentTime - startTime);
      }, 100);

      generateInputs();
    } else {
      clearInterval(timerHandle);
    }

    return () => {
      clearInterval(timerHandle);
    };
  }, [startFlag]);

  const generateInputs = () => {
    let input1 = parseInt(Math.random() * 100), input2 = parseInt(Math.random() * 100);
    if(operation === 'multiplication' && input2 > 9) {
      input2 = input2 % 10;
    }
    setInput1(input1);
    setInput2(input2);
    setActualResult(eval(input1 + operator + input2));
  };

  const getDisplayTimer = () => {
    const minutes = Math.floor(timer / (1000 * 60));
    const seconds = (timer % (1000 * 60)) / 1000;
    return prepend(minutes.toString(), 2) + ' : ' + prepend(seconds.toFixed(1).toString(), 4);
  };

  const resultInputChanged = (e) => {
    setResultInput(e.target.value);
  };

  const resultSubmit = (e) => {
    // console.log(e);
    if(e.key === 'Enter') {
      console.log(parseInt(e.target.value), actualResult, parseInt(e.target.value) === actualResult);
      if(parseInt(e.target.value) === actualResult) {
        setPassed(passed + 1);
      }
      setRound(round + 1);
      generateInputs();
      setResultInput('');
      if(round === 9) {
        stopGame();
      }
    }
  };

  const startGame = () => {
    console.log('Game Started');
    setStartFlag(true);
    setTimeout(() => {
      document.getElementById('result').focus();
    });
  };

  const stopGame = () => {
    console.log('Game Stopped');
    setStartFlag(false);
    setStopFlag(true);
  };

  const quit = () => {
    history.push('/');
  };

  return (
    <div className="container center-center">
      <div className="game-area flex-column flex-center">
        <div className="timer">{getDisplayTimer()}</div>
        {startFlag && !stopFlag ? 
          <div className="numbers-section flex-center">
            <span className="mr-15">{input1}</span>
            <span className="mr-15">{displayOperator}</span>
            <span className="mr-15">{input2}</span>
            <span className="mr-15">=</span>
            <input id="result" className="result-input" type="number" value={resultInput} onChange={resultInputChanged} onKeyPress={resultSubmit}></input>
          </div> :
          null
        }
        {!startFlag && stopFlag ? 
          <div className="numbers-section flex-center">
            {passed} of {round} passed !
          </div> :
          null
        }
        {!startFlag && !stopFlag ? <div className="op-btn start" onClick={startGame}>Start</div> : null}
        {startFlag && !stopFlag ? <div className="op-btn stop" onClick={stopGame}>Stop</div> : null}
        {!startFlag && stopFlag ? <div className="op-btn quit" onClick={quit}>Quit</div> : null}
      </div>
    </div>
  );
}

export default GamePage;
