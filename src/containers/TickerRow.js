import React, {Component} from 'react';

import TickerName from '../components/TickerName';
import TickerPrice from '../components/TickerPrice';
import TickerTime from '../components/TickerTime';


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

export default TickerRow;