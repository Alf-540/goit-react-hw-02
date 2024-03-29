import { useState, useEffect } from 'react';
import './App.css';
import Description from './components/Description/Description.jsx';
import Options from './components/Options/Options.jsx';
import Feedback from './components/Feedback/Feedback.jsx';
import Notification from './components/Notification/Notification.jsx';

function App() {
  const initialFeedback = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  const [types, setTypes] = useState(() => {
    const savedTypes = window.localStorage.getItem('saved-types');
    if (savedTypes) {
      return JSON.parse(savedTypes);
    }
    return initialFeedback;
  });

  useEffect(() => {
    window.localStorage.setItem('saved-types', JSON.stringify(types));
  }, [types]);

  const updateFeedback = feedbackType => {
    setTypes({
      ...types,
      [feedbackType]: types[feedbackType] + 1,
    });
  };

  const totalFeedback = types.good + types.neutral + types.bad;

  const updateTotal = () => {
    setTypes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const positiveStatistics = Math.round(
    ((types.good + types.neutral) / totalFeedback) * 100
  );

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        updateTotal={updateTotal}
      />
      {totalFeedback <= 0 ? (
        <Notification />
      ) : (
        <Feedback
          types={types}
          totalFeedback={totalFeedback}
          positiveStatistics={positiveStatistics}
        />
      )}
    </>
  );
}

export default App;
