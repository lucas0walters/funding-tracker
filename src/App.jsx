import { useState, useEffect } from 'react';
import FundingBarChart from './components/FundingBarChart';
import IndustryTrendChart from './components/IndustryTrendChart';
import './App.css';

function App() {
  // State to store the funding data fetched from the JSON file
  const [fundingData, setFundingData] = useState([]);

  // Fetch funding data from the JSON file when the component mounts
  useEffect(() => {
    fetch('/funding.json')
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => setFundingData(data)) // Store the data in state
      .catch((error) => console.error('Error fetching funding data:', error)); // Handle errors
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <h1>Startup Funding Tracker</h1>
      {/* Pass the fetched data to the FundingBarChart component */}
      <FundingBarChart data={fundingData} />
      {/* Pass the fetched data to the IndustryTrendChart component */}
      <IndustryTrendChart data={fundingData} />
    </div>
  );
}

export default App;
