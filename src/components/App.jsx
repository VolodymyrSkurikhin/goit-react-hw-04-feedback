import React,{Component} from "react";
// import Feedback from "./Feedback/Feedback";
import { Section } from "./Section/Section";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";
import { Notification } from "./Notification/Notification";

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = options =>
    options.reduce((acc, currentOption) => acc + this.state[currentOption], 0);
  countPositiveFeedbackPercentage = options => {
    if (this.countTotalFeedback(options) === 0) {
      return 0;
    }
    return (Number(
      ((this.state[options[0]] / this.countTotalFeedback(options)) *
      100)
    .toFixed()));
  };
  handleBtn = option =>
    this.setState(prevState => ({ [option]: prevState[option] + 1 }));

  render() {
    const { good, neutral, bad } = this.state;
    const options=Object.keys(this.state);
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}>
        <Section title="PLease leave feedback">
          <FeedbackOptions options={options} onLeaveFeedback={this.handleBtn} />
          {!this.countTotalFeedback(options) ?
            <Notification message="There is no feedback"/>:
            <Statistics good={good} neutral={neutral} bad={bad}
              total={this.countTotalFeedback(options)}
              positivePercentage={this.countPositiveFeedbackPercentage(options)} />}
        </Section>
      </div>
    )
  }
};

export default App;