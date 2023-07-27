import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Counters from './components/counters';

const Quiz = ({teamName, points, setPoints}) => {
  const [questions, setQuestions] = useState([]);
  const [word, setWord] = useState([]);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeToAnswer, setTimeToAnswer] = useState(50);
  const [mobileFinished, setMobileFinished] = useState(false);
  
  const [wordSubmit, setwordSubmit] = useState(false);
  const[unchanged,setUnchanged]=useState(true);
  // const [points, setPoints] = useState(0)
  
  const navigate = useNavigate();
  


    
 
  // Fetch questions from the server
  useEffect(() => {
    
    axios.get(`https://vigorous-knee-production.up.railway.app/question/getQuestion/${teamName}`) 
      .then(response => {

        console.log(response.data)
        setQuestions(response.data.qarray);
       setTimeToAnswer(response.data.remainingTime)
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });

  

    // setQuestions([{description: "What is the capital of France?", correctAnswer: "Paris", URL:"", revealLetter:"a"},
    //               {description: "What is the capital of France?", correctAnswer: "Paris", URL:"", revealLetter:"a"}]);
    }, [unchanged]);

  // Function to handle user's answer submission
  const handleAnswerSubmit = () => {
    const currentQues = questions[currentQuestion];
    if (userAnswer.toLowerCase() === currentQues.answer.toLowerCase()) {
      
      setPoints();
      console.log(points)
      setResultMessage('Correct answer!');
      setWord([...word,currentQues.revealLetter])
      setIsAnswered(true);
      axios.put("https://vigorous-knee-production.up.railway.app/question/submitSuccess", {'teamName':teamName}).then((response)=>{console.log("Put success")}).catch((error)=>{console.log(error)})
    } else {
      setResultMessage('Wrong answer! Try again.');
    }
  };

  // Function to handle the next question
  const handleNextQuestion = () => {
    setUserAnswer('');
    setResultMessage('');
    setIsAnswered(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz is finished
      // You can add more logic here if you want to display the final score, etc.
      axios.put("https://vigorous-knee-production.up.railway.app/attempt/endAttempt", {'teamName':teamName}).then((response)=>{console.log("Put success")}).catch((error)=>{console.log(error)})
      
      navigate('/end')
    }
  };

  // Timer for each question
  useEffect(() => {
    let timer;
    if (timeToAnswer > 0 && !isAnswered) {
      timer = setTimeout(() => {
        setTimeToAnswer(time => time - 1);
      }, 1000);
    } else if (!isAnswered) {
      setResultMessage('Time is up!');
      // setIsAnswered(true);
      navigate('/end');
      
    }
    return () => clearTimeout(timer);
  }, [timeToAnswer, isAnswered]);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQues = questions[currentQuestion];

 
  return (

  
    <div>
        <h2>Question {currentQuestion + 1}</h2>

        {word?(<p style={{color:'red'}}>Reveal word: {word}</p>):null}

        {currentQuestion != 4 ?(
      <div>
      <div>
          <img src={currentQues.URL} alt="image" style={{objectFit:"cover", width:"100%"}} class="my-2"/>
      </div>

      <p class="mt-3">{currentQues.description}</p>
      
      <div class="form-group">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isAnswered}
          class="form-control"
        />
      </div>
    </div>
      ):(<>
      <p>{currentQues.description}</p>
      <Counters userAnswer={userAnswer} setUserAnswer = {setUserAnswer} URL={currentQues.URL}/></>)}  

      
      {!isAnswered ?( 
                <button class="kave-btn mt-5" onClick={handleAnswerSubmit} disabled={isAnswered}>
                Submit Answer
                </button>):
                <p style={{color:"red"}}>Reveal Letter : {questions[currentQuestion].revealLetter}</p>}

      
     
      <p>Time left: {timeToAnswer} seconds</p>
      <p>{resultMessage}</p>
      {isAnswered && (
        <button class="kave-btn mt-5" onClick={handleNextQuestion}>
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish'}
        </button>
      )}
    </div>
  );
  
};


export default Quiz;
