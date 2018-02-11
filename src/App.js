import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Moment from 'react-moment';
import FontAwesome from 'react-fontawesome';
import {Sparklines, SparklinesLine, SparklinesSpots} from 'react-sparklines';

class TickerName extends Component {
    render() {
        return (<span className="Ticker-name">{this.props.name.toUpperCase()}</span>);
    }
}

class TickerPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastPrice: undefined,
            priceHistory: []
        };
    }

    render() {
        let changeClassName = 'price-same', iconName = 'minus';
        if (this.state.lastPrice) {
            if (this.props.price < this.state.lastPrice) {
                changeClassName = 'price-down';
                iconName = 'angle-double-down';
            } else if (this.props.price > this.state.lastPrice) {
                changeClassName = 'price-up';
                iconName = 'angle-double-up';
            }
        }
        return (<div className={changeClassName + " Ticker-price"}>
            <span className="price">{this.props.price.toFixed(3)}</span>
            <span className="symbol"><FontAwesome name={iconName}/></span>
            <span className="price">
                <Sparklines data={[...this.state.priceHistory, this.props.price]} limit={5}>
                    <SparklinesLine color="#1c8cdc"/>
                    <SparklinesSpots/>
                </Sparklines>
            </span>
        </div>);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.time > this.props.time) {
            const lastPrice = this.props.price;
            this.setState((prevState, props) => {
                return {
                    priceHistory: [...prevState.priceHistory, lastPrice],
                    lastPrice
                };
            });
        }
    }
}


class TickerTime extends Component {
    render() {

        return (<span className="Ticker-time"><Moment fromNow>{this.props.time}</Moment></span>);
    }
}

class TickerRow extends Component {
    render() {
        let name, price, time;
        if (this.props.header) {
            name = "Name";
            price = "Price";
            time = "Last Update";
        } else {
            name = (<TickerName name={this.props.name}/>);
            price = (<TickerPrice price={this.props.price} time={this.props.updateTime}/>);
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
        this.setState((prevState, props) => {
            const tickers = [];
            data.forEach(([name, price]) => {
                tickers[name] = {price, updateTime: new Date()};
            });
            Object.entries(prevState.tickers).forEach(([name, value]) => {
                if (!tickers[name]) {
                    tickers[name] = value;
                }
            });
            return {
                counter: prevState.counter + 1,
                tickers
            };
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            tickers: {},
            counter: 0
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

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Ticker url="ws://stocks.mnet.website"/>
            </div>
        );
    }
}

export default App;
