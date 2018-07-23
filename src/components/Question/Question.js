import React from 'react';
import { Icon } from 'semantic-ui-react';
import './Question.min.css';

const Question = ({ question }) => (
  <div className="question">
    <div className="options">
      <div className="option-one">
        <p>{question.optionOne.text}</p>
      </div>
      <div className="question-mark">
        <Icon name="question" />
      </div>
      <div className="option-two">
        <p>{question.optionTwo.text}</p>
      </div>
    </div>
  </div>
);

export default Question;
