import React from 'react';
import { Card } from 'semantic-ui-react';

const Question = (props) => (
  <Card>
    <h3>Would You Rather</h3>
    <ul>
      <li>{props.question.optionOne.text}</li>
      <li>{props.question.optionTwo.text}</li>
    </ul>
  </Card>
);

export default Question;
