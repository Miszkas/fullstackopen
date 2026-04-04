import { useState } from "react";

const Button = ({ onClick, label }) => (
  <button onClick={onClick}>{label}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all || 0;
  const positive = (good / all) * 100 || 0;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine text="Average" value={average.toFixed(1)} />
          <StatisticLine text="Positive" value={`${positive.toFixed(1)}%`} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} label="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} label="Neutral" />
      <Button onClick={() => setBad(bad + 1)} label="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
