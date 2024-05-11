import React, { useState } from "react";
import axios from "axios";

const AverageCalculator = () => {
  const [response, setResponse] = useState(null);
  const [numberId, setNumberId] = useState("");
  const windowSize = 10;

  const fetchNumbers = async () => {
    try {
      let apiUrl = "";
      switch (numberId) {
        case "p":
          apiUrl = "https://20.244.56.144/test/primes";
          break;
        case "f":
          apiUrl = "https://20.244.56.144/test/fibo";
          break;
        case "e":
          apiUrl = "https://20.244.56.144/test/even";
          break;
        case "r":
          apiUrl = "https://20.244.56.144/test/rand";
          break;
        default:
          console.error("Invalid number ID");
          return;
      }
      const response = await axios.get(apiUrl);
      setResponse(response.data);
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  };

  const handleChange = (e) => {
    setNumberId(e.target.value);
  };

  return (
    <div>
      <label htmlFor="numberId">
        Enter qualified number ID ('p', 'f', 'e', or 'r'):
      </label>
      <input
        type="text"
        id="numberId"
        value={numberId}
        onChange={handleChange}
      />
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      {response && (
        <div>
          <h2>
            Previous Window State: {JSON.stringify(response.windowPrevState)}
          </h2>
          <h2>
            Current Window State: {JSON.stringify(response.windowCurrState)}
          </h2>
          <h2>Numbers: {JSON.stringify(response.numbers)}</h2>
          <h2>Average: {response.avg}</h2>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;
