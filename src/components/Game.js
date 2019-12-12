import React, { Component } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';
import { valueToNode } from '@babel/types';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      submissions: [],
      finished: false,
    }
  }

  addSubmission = (submissionString) => {
    // submission comes in as a string
    // add submission to state.submissions
    console.log('addSubmission function in Game.js - submissionString', submissionString)

    const newSubmissions = this.state.submissions

    newSubmissions.push(submissionString)


    this.setState({
      submissions: newSubmissions
    })
  }

  finishGame = () => {
    this.setState({
      finished: true 
    })
  }

  render() {

    console.log('this.state', this.state)


    const currentPlayerNumber = this.state.submissions.length + 1

    const exampleFormat = FIELDS.map((field) => {
      if (field.key) {
        return field.placeholder;
      } else {
        return field;
      }
    }).join(" ");

    const lastSubmission = this.state.submissions[0] && this.state.finished === false ? 
      <RecentSubmission
        submissionLine={this.state.submissions[this.state.submissions.length - 1]}
      />
      : ''


    // console.log('fieldsAndPlaceholders', fieldsAndPlaceholders)

    return (
      <div className="Game">
        <h2>Game</h2>

        <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

        <p>Please follow the following format for your poetry submission:</p>

        <p className="Game__format-example">
          { exampleFormat }
        </p>

        { lastSubmission }

        { this.state.finished === true ? '' : 
          <PlayerSubmissionForm 
            playerNumber={currentPlayerNumber}  
            formatFieldsPlaceholders={FIELDS}
            submitLine={this.addSubmission}
          />
        }

        <FinalPoem 
          allSubmissions={this.state.submissions}
          gameFinished={this.state.finished}
          finishGame={this.finishGame}
        />

      </div>
    );
  }
}

const FIELDS = [
  "The",
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  "the",
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  ".",
];

export default Game;
