/**
 *
 * SpeechRecognition component
 *
 */

import React from 'react';
import {
    SpeechRecognition,
    SpeechGrammarList
} from './util';

const displayName = 'SpeechRecognition';

const colors = [
    'aqua',
    'black',
    'blue',
    'brown',
    'gold',
    'gray',
    'green',
    'lime',
    'navy',
    'orange',
    'pink',
    'purple',
    'red',
    'turquoise',
    'violet',
    'white',
    'yellow'
];
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')} ;`;

class SpeechRecognitionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.speechGrammarList.addFromString(grammar, 1);

    this.recognition.grammars = this.speechGrammarList;
    this.recognition.lang = 'en-GB';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.addEventListener('result', this.handleResult);
    this.recognition.addEventListener('speechend', this.handleSpeechEnd);
    this.recognition.addEventListener('nomatch', this.handleNoResult);
    this.recognition.addEventListener('error', this.handleError);
  }

  state = { result: ''};
  recognition = new SpeechRecognition();
  speechGrammarList = new SpeechGrammarList();

  handleClick = () => this.recognition.start();

  handleResult = event => {
    const last = event.results.length - 1;
    const result = event.results[last][0].transcript;

    this.setState({ result });
  };

  handleNoResult = () => this.setState({ result: 'No match' });

  handleError = event => this.setState({ result: `Error: ${event.error}` });

  handleSpeechEnd = () => this.recognition.stop();

  render() {
    const {
      state: { result }
    } = this;

    return (
      <div>
        <button onClick={this.handleClick} type="button">
          Start Voice Recognition
        </button>
        <p>{result}</p>
      </div>
    );
  }
}

SpeechRecognitionComponent.displayName = displayName;

export default SpeechRecognitionComponent;
