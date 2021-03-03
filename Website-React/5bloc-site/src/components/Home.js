import React, { Component } from 'react';
import '../css/form.css';
import '../css/motion-ui.min.css'
import '../css/foundation-prototype.min.css'
import '../css/import.css'
import Form from './Form';
import Adress from './Adress';
import AdList from './AdList';
import {isMetamaskOK} from '../js/metamaskUtils';

export default class Home extends Component {
  render() {    
    return (
      <div>
        <Adress/>
        <Form/>
        <AdList/>
      </div>
    );
  }
}