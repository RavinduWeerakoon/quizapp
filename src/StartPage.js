import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const delay = require('delay');

const StartPage = ({ teams, setTeamName }) => {
  const [teamNameInput, setTeamNameInput] = useState('');
  const [numberInput, setnumberInput] = useState('');
  const [usernameExists, setUsernameExists] = useState(false);

  const navigator = useNavigate();

  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

  // Function to check if the team name exists in the database using an API endpoint
  const checkUsernameExists = () => {
    setUsernameExists(false);
    if (teamNameInput.trim() === '') {
      // Don't check empty team names
      return;
    }

    //Replace 'your-check-username-api-endpoint' with the actual API endpoint to check username existence
    axios.get(`https://vigorous-knee-production.up.railway.app/team/existsByteamName/${teamNameInput}`)
      .then(response => {
        const exists = response.data;
        if(exists == "true"){
          setUsernameExists(exists);
        }
        if(exists == true){
          setUsernameExists(exists);
        }
      })
      .catch(error => {
        console.error('Error checking username existence:', error);
      });

    // Mock data
    // setUsernameExists(false);
  };

  const handleStartQuiz = () => {
    // ... (existing handleStartQuiz code)

    // Redirect to the quiz page only if the username doesn't exist in the database
    if (!usernameExists) {
      setTeamName(teamNameInput)
      axios.post('https://vigorous-knee-production.up.railway.app/team/saveTeam', {
        teamName: teamNameInput,
        institute: 'Flintstone',
        whatsAppNumber: numberInput,
      })
      .then(function (response) {
        console.log("Success");
        navigator('/quiz');
      })
      .catch(function (error) {
        console.log(error);
      });
      sleep(1000);
      
    }
  };

  return (
    <div>
      <h3 class="mt-3">Start your Journey</h3>

      <p>Attention, brave individuals! I am President Alexander, and I bring you an urgent plea for the safety of our nation. Our worst fears have materialized as terrorists have stolen our formidable national nuclear system drive. In this critical hour, we seek your expertise to solve a series of mind-bending puzzles and algorithms to break into their territory and  retrieve the stolen drive. Before you embark on this crucial mission, I urge you to equip yourselves with pen and paper. In this intense escape room experience, technology has failed us against the terrorists' advanced AI system. Pen and paper will be your weapons of choice to decipher intricate codes, sketch out connections, and strategize your way to success Remember, the fate of millions rests on your shoulders. Work together, unlock the clues, and save the day.  

Soldiers ! Rage...Good luck, teams!"</p>
      <form>
      <div class="form-group mt-5">
          <label htmlFor="teamNameInput">Team Name:</label>
          <input
            type="text"
            id="teamNameInput"
            class="form-control"
            value={teamNameInput}
            onChange={(e) => setTeamNameInput(e.target.value)}
            onBlur={checkUsernameExists} // Check username existence when the input loses focus
            style={{ borderColor: usernameExists ? 'red' : 'initial' }} // Change border color to red if username exists
          />
        {usernameExists && (
          <p style={{ color: 'red' }}>Username already exists. Please choose another.</p>
        )}
      </div>
      <div class="form-group mt-5">
          <label htmlFor="numberInput">Whatsapp Number</label>
          <input
            type="text"
            id="numberInput"
            value={numberInput}
            class="form-control"
            onChange={(e) => setnumberInput(e.target.value)}
          />
        </div>
      </form>
      <button class=" mt-5 kave-btn" onClick={handleStartQuiz}>
      <span class="kave-line"></span>
        Start Quiz
      </button>
    </div>
  );
};

export default StartPage;
