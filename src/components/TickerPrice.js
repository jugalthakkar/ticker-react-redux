import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';

class TickerPrice extends Component {
    render() {
        let changeClassName = 'price-same', iconName = 'minus', iconColor = 'grey';
        if (this.props.previousPrice) {
            if (this.props.price < this.props.previousPrice) {
                changeClassName = 'price-down';
                iconName = 'angle double down';
                iconColor = 'red';
            } else if (this.props.price > this.props.previousPrice) {
                changeClassName = 'price-up';
                iconName = 'angle double up';
                iconColor = 'green';
            }
        }
        return (<div className={changeClassName + " Ticker-price"}>
            <span className="price">{this.props.price.toFixed(3)}</span>
            <span className="symbol"><Icon color={iconColor} size='large' name={iconName}/></span>
        </div>);
    }
}

export default TickerPrice;