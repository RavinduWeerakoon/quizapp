import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch leaderboard data
  useEffect(() => {
    axios.get('https://vigorous-knee-production.up.railway.app/admin/order') // Update with the actual API endpoint
      .then(response => {
        setLeaderboardData(response.data.attemptArrayList);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard data:', error);
        setLoading(false);
      });
  }, []);


  const handleDelete = () => {
    axios.put("https://vigorous-knee-production.up.railway.app/admin/restart").then((response)=>{setLoading(true)}).catch((error)=>{console.log(error)})
  }

  if (loading) {
    return <div>Loading leaderboard data...</div>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Duration</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((item, index) => (
            <tr key={index}>
              <td>{item.teamName}</td>
              <td>{item.duration}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <button class="kave-btn mt-5" onClick={handleDelete}>
          Delete
        </button>
    </div>
  );
};

export default Leaderboard;
