import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import './Question.min.css';

const Question = ({ question }) => (
  <div className="question">
    <div class="options">
      <div class="option-one">
        <p>{question.optionOne.text}</p>
      </div>
      <div class="question-mark">
        <Icon name="question" />
      </div>
      <div class="option-two">
        <p>{question.optionTwo.text}</p>
      </div>
    </div>
  </div>
);

export default Question;
