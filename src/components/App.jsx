import React from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import { useState } from 'react';

function App() {
  // state = {
  //   good: 0,
  //   neutral: 0,
  //   bad: 0,
  // };
  // let good;
  // let neutral;
  // let bad;
  const initialValue = { good: 0, neutral: 0, bad: 0 };

  const [count, setCount] = useState(initialValue);
  const options = Object.keys(count);
  const { good, neutral, bad } = count;

  const countTotalFeedback = options =>
    options.reduce((acc, currentOption) => acc + count[currentOption], 0);
  const countPositiveFeedbackPercentage = options => {
    if (countTotalFeedback(options) === 0) {
      return 0;
    }
    return Number(
      (count[options[0]] / countTotalFeedback(options)) * (100).toFixed()
    );
  };
  const handleBtn = option =>
    setCount(prevState => ({ ...prevState, [option]: prevState[option] + 1 }));

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="PLease leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleBtn} />
        {!countTotalFeedback(options) ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback(options)}
            positivePercentage={countPositiveFeedbackPercentage(options)}
          />
        )}
      </Section>
    </div>
  );
}

export default App;
