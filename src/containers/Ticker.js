import React, {Component} from 'react';
import Websocket from 'react-websocket';
import TickerRow from './TickerRow';

class Ticker extends Component {
    updateTickers(data) {
        this.setState((prevState, props) => {
            const tickers = [];
            JSON.parse(data).forEach(([name, price]) => {
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
                <Websocket url={this.props.url}
                           onMessage={this.updateTickers.bind(this)}/>
            </div>
        );
    }
}


export default Ticker;