import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class TickerHeader extends Component {
    render() {
        return (<header className="Ticker-header">
            <div>Name</div>
            <div>Price</div>
            <div>Update</div>
        </header>);
    }
}

class TickerName extends Component {
    render() {
        return (<span className="Ticker-name">{this.props.name}</span>);
    }
}

class TickerPrice extends Component {
    render() {
        return (<span className="Ticker-price">{this.props.price}</span>);
    }
}

class TickerTime extends Component {
    render() {
        return (<span className="Ticker-time">{this.props.time.toLocaleTimeString()}</span>);
    }
}

class TickerRow extends Component {
    render() {
        return (<div className="Ticker-row">
            <div className="Ticker-name-container"><TickerName name={this.props.name}/></div>
            <div className="Ticker-price-container"><TickerPrice price={this.props.price}/></div>
            <div className="Ticker-time-container"><TickerTime time={new Date()}/></div>
        </div>);
    }
}


class Ticker extends Component {
    constructor(props) {
        super(props);
        this.state = [{
            name: 'AAPL',
            price: 50
        }, {
            name: 'GOOG',
            price: 80
        }];

        // var exampleSocket = new WebSocket(this.props.url);
    }

    render() {
        return (
            <div className="Ticker">
                <TickerHeader/>
                {this.state.map(tickerItem =>
                    <TickerRow key={tickerItem.name} name={tickerItem.name} price={tickerItem.price} />
                )}
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*<h1 className="App-title">Welcome to React</h1>*/}
                {/*</header>*/}
                <Ticker url="ws://stocks.mnet.website"/>
                {/*<p className="App-intro">*/}
                    {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
                {/*</p>*/}
            </div>
        );
    }
}

export default App;
