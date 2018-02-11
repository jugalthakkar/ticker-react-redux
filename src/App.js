import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class TickerName extends Component {
    render() {
        return (<span className="Ticker-name">{this.props.name.toUpperCase()}</span>);
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
        let name, price, time;
        if (this.props.header) {
            name = "Name";
            price = "Price";
            time = "Update Time";
        } else {
            name = (<TickerName name={this.props.name}/>);
            price = (<TickerPrice price={this.props.price}/>);
            time = (<TickerTime time={this.props.updateTime}/>);
        }
        return (<div className={"Ticker-row" + (this.props.header ? " Ticker-header" : "")}>
            <div className="Ticker-name-container">{name}</div>
            <div className="Ticker-price-container">{price}</div>
            <div className="Ticker-time-container">{time}</div>
        </div>);
    }
}


class Ticker extends Component {

    updateTickers(data) {
        const tickers = [];
        data.forEach(([name, price]) => {
            tickers[name] = {price, updateTime: new Date()};
        });
        Object.entries(this.state.tickers).forEach(([name, value]) => {
            if (!tickers[name]) {
                tickers[name] = value;
            }
        });
        this.setState({tickers});
    }

    constructor(props) {
        super(props);
        this.state = {
            tickers: {}
        };
        const webSocket = new WebSocket(this.props.url);

        webSocket.onmessage = (event) => {
            this.updateTickers(JSON.parse(event.data));
        }
    }

    render() {
        const tickerRows = Object
            .keys(this.state.tickers)
            .sort()
            .map(key =>
                (<TickerRow
                    key={key}
                    name={key}
                    updateTime={this.state.tickers[key].updateTime}
                    price={this.state.tickers[key].price}/>)
            );
        return (
            <div className="Ticker">
                <TickerRow header={true}/>
                {tickerRows}
            </div>
        );
    }
}

class App
    extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Welcome to React</h1>
                </header>
                <Ticker url="ws://stocks.mnet.website"/>
                <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
