import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './StartPage';
import Quiz from './Quiz';
import Counters from './components/counters';

import Leaderboard from './LeaderBoard';

import EndPage from './EndPage';

import './App.css';
import './Form.css';
import './Buttons.css';


const App = () => {
  const [teamName, setTeamName] = useState('');
  
  const[points,setPoints]=useState(0);
  const[userAnswer,setUserAnswer]=useState(false);
  const incrementPoints = () => {
    let pts = points + 1;
    setPoints(pts);
  }
  
  const teams = [
    // Add your team data here or fetch it from the server
    { teamName: 'ABC', password: 'p1' },
    { teamName: 'Team2', password: 'password2' },
    // Add more teams as needed
  ];

  return (
    <Router>
      <div className="App" style={{minHeight: "100vh"}}>
       
        <div class="container-custom" >
        <div class="card mt-5 d-block">
          <h1>Quiz</h1>
          <Routes>
            <Route exact path="/" element={<StartPage teams={teams} setTeamName={setTeamName} /> }/>
              
            
            <Route path="/quiz" element={<Quiz teamName={teamName} points={points} setPoints={() => incrementPoints()}/>}/>
            
            <Route path="/end" element={<EndPage teamName={teamName} points={points}/>}/>
            <Route path='/counter' element={<Counters setUserAnswer={setUserAnswer} userAnswer={userAnswer} URL={"https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"}/>}/>
            <Route path='/leaderboard' element={<Leaderboard/>}/>
              
            
          </Routes>
        </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
