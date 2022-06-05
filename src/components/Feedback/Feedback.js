import React, { Component } from 'react';
import s from './Feedback.module.css';
import PropTypes from 'prop-types';

class Feedback extends Component {
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
    return (
      (this.state[options[0]] / this.countTotalFeedback(options)) *
      100
    ).toFixed();
  };
  handleBtn = option =>
    this.setState(prevState => ({ [option]: prevState[option] + 1 }));

  render() {
    const options = Object.keys(this.state);
    return (
      <div className={s.container}>
        <p className={s.title}> PLease leave feedback</p>
        <div>
          {options.map(option => (
            <button
              key={option}
              type="button"
              className={s.btn}
              onClick={() => this.handleBtn(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <p className={s.statTitle}>Statistics</p>
        <ul className={s.statList}>
          {options.map(option => (
            <li key={option} className={s.itemName}>
              {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}:{' '}
              {this.state[option]}
            </li>
          ))}
          <li className={s.itemName}>
            Total: {this.countTotalFeedback(options)}
          </li>
          <li className={s.itemName}>
            Positive feedback: {this.countPositiveFeedbackPercentage(options)}%
          </li>
        </ul>
      </div>
    );
  }
}

export default Feedback;
