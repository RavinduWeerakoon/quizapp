import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EndPage = ({ teamName, points, isTimeout }) => {
  const [submitted, setSubmitted] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

  };



  // Function to fetch leaderboard data
  useEffect(() => {
    axios.get('your-leaderboard-api-endpoint') // Update with the actual API endpoint
      .then(response => {
        setLeaderboardData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading leaderboard data...</div>;
  }

  return (
    <div>
      

      {isTimeout ?(
        <div>Timeout</div>
      ):null}
      
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2 class="mt-5">Team Name: {teamName}</h2>
          <h3 class="mt-3">Total Sucessful Answers {points}</h3>
        
          {/* <button type="submit" class="kave-btn">Submit Data</button> */}
        </form>
      ) : (
        <div>
          <p>Data submitted successfully!</p>
          <h3>Leaderboard</h3>
          <ul>
            {leaderboardData.map((item, index) => (
              <li key={index}>
                <strong>Team: </strong>
                {item.teamName}
                <br />
                <strong>Score: </strong>
                {item.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EndPage;
