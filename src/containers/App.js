import React, {Component} from 'react';
import logo from '../images/logo.svg';
import './App.css';
import Ticker from './Ticker';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Ticker</h1>
                </header>
                <Ticker url="ws://stocks.mnet.website"/>
            </div>
        );
    }
}

export default App;