import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './progress-bar.css'


import {FaInfo as Info, FaExclamation as Warning} from 'react-icons/fa';

import zxcvbn from 'zxcvbn';

const strengths = ['weakest', 'weak', 'ok', 'strong', 'strongest'];

export default function PasswordStrength(props) {
  const {password} = props;
  if (password === '')
    return '';
  const strength = zxcvbn(password);
  const {score, feedback} = strength;
  let popup = '';
  if (score <= 2) {
    if (feedback.warning !== '')
      popup = (<b>{feedback.warning}</b>);
    else if (feedback.suggestions.length > 0)
      popup = feedback.suggestions[0]
  }
  return <ProgressBar now={score*25} variant={strengths[score]}/>
}
