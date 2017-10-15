import React, { Component } from 'react';
import {matchSplitText} from './typey-type';
import './App.css';

class TypedText extends Component {
  markUpTypedText(currentPhrase, actualText, settings) {
    let array = matchSplitText(currentPhrase, actualText, settings);
    let matched = array[2];
    let unmatched = array[3];
    let matchedTypedTextMarkup = `<span aria-hidden="true">&#8203;</span><span class="matched">${matched}</span><span class="unmatched">${unmatched}</span>`;
    return {__html: matchedTypedTextMarkup};
  }

  render() {
    return (
      <div className="">
        <div>Typed:</div>
        <div className="typed-text" dangerouslySetInnerHTML={this.markUpTypedText(this.props.currentPhrase, this.props.actualText, this.props.settings)} />
      </div>
    );
  }
}

export default TypedText;
